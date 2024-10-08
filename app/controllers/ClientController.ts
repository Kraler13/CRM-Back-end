import express, { Request, Response } from "express";
import clientModel from "../models/ClientModel";

const clientController = {
  index: (_req: Request, res: Response) => {
    clientModel.find({})
      .then((clients) => {
        res.status(200).json({ clients });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Error while fetching Clients",
          error: err,
        });
      });
  },

  show: (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
  
    clientModel.findById(id)
      .then((client) => {
        if (!client) {
          return res.status(404).json({ message: "Client not found" });
        }
        return res.status(200).json(client);
      })
      .catch((err) => {
        return res.status(500).json({
          message: "Error while fetching Client",
          error: err,
        });
      });
  },

  create: (req: Request, res: Response) => {
    const { name, address, nip } = req.body;
    const newClient = new clientModel({ name, address, nip });

    newClient.save()
      .then((savedClient) => res.status(201).json(savedClient))
      .catch((err) => res.status(500).json({
        message: 'Error while creating Client',
        error: err
      }));
  },

  edit: (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const { name, address, nip } = req.body;

    clientModel.findByIdAndUpdate(id, { name, address, nip }, { new: true, runValidators: true })
      .then((updatedClient) => {
        if (!updatedClient) {
          return res.status(404).json({ message: "Client not found" });
        }
        return res.status(200).json(updatedClient);
      })
      .catch((err) => res.status(500).json({
        message: "Error while updating Client",
        error: err,
      }));
  },

  delete: (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
  
    clientModel.findByIdAndDelete(id)
      .then((client) => {
        if (!client) {
          return res.status(404).json({ message: "Client not found" });
        }
        return res.status(200).json({ id, deleted: true });
      })
      .catch((err) => res.status(500).json({
        message: "Error while deleting Client",
        error: err,
      }));
  },
};

export default clientController;
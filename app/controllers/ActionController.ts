import { Request, Response } from "express";
import Action from "../models/ActionModel";
import Client from "../models/ClientModel";
import { IAction } from "../types/Types";

const actionController = {
  index: (req: Request, res: Response) => {
    const clientId = req.params.id;

    Action.find({ client: clientId })
      .then((actions) => {
        res.status(200).json(actions);
      })
      .catch((err) => {
        res.status(500).json({
          message: "Error while fetching actions",
          error: err,
        });
      });
  },
  createAction: (req: Request<{}, {}, IAction>, res: Response) => {
    const newAction = new Action(req.body);

    newAction
      .save()
      .then((savedAction) => {
        Client.findByIdAndUpdate(req.body.client, {
          $push: { actions: savedAction._id },
        })
          .then(() => {
            res.json(savedAction);
          })
      })
      .catch((err) =>
        res.status(500).json({
          message: "Error while creating Action",
          error: err,
        })
      );
  },

  deleteAction: async (req: Request, res: Response): Promise<void> => {
    const { actionId } = req.body;

    if (!actionId) {
      res.status(400).json({ message: "actionId is required in the request body" });
      return;
    }

    try {
      const deletedAction = await Action.findByIdAndDelete(actionId);

      if (!deletedAction) {
        res.status(404).json({
          message: "Action not found",
        });
        return;
      }

      await Client.findByIdAndUpdate(deletedAction.client, {
        $pull: { actions: actionId },
      });

      res.json({
        message: "Action deleted successfully",
        deletedAction: deletedAction,
      });
    } catch (err) {
      res.status(500).json({
        message: "Error while deleting Action",
        error: err,
      });
    }
  },
  
  editAction: (req: Request<{}, {}, IAction>, res: Response) => {
    const actionId = req.body.id;
    const updatedData = req.body;

    Action.findByIdAndUpdate(actionId, updatedData, { new: true })
      .then((updatedAction) => {
        if (!updatedAction) {
          return res.status(404).json({
            message: "Action not found",
          });
        }

        res.json({
          message: "Action updated successfully",
          updatedAction: updatedAction,
        });
      })
      .catch((err) =>
        res.status(500).json({
          message: "Error while updating Action",
          error: err,
        })
      );
  },
};

export default actionController;

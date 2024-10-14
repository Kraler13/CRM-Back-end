import { Request, Response } from 'express';
import Action from '../models/ActionModel';
import Client from '../models/ClientModel';
import { Types } from 'mongoose';

const actionController = {
    createAction: async (req: Request, res: Response) => {
        const { type, description, date } = req.body;
        const clientId = req.params.id; // Używamy id z parametrów ścieżki

        try {
            const client = await Client.findById(clientId);
            if (!client) {
                return res.status(404).json({ message: 'Client not found' });
            }

            const newAction = new Action({
                type,
                description,
                date,
                client: clientId,
            });

            const savedAction = await newAction.save();

            client.actions.push(savedAction._id as Types.ObjectId); // Dodaj ID akcji do klienta
            await client.save(); // Zapisz klienta

            res.status(201).json(savedAction);
        } catch (err) {
            res.status(500).json({ message: 'Error creating action', error: err });
        }
    },
};

export default actionController;
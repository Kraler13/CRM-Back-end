import mongoose, { Schema } from "mongoose";
import { IAction } from "../types/Types";

const ActionSchema: Schema = new Schema({
    type: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true,
    },
    
});

export default mongoose.model<IAction>('Action', ActionSchema);
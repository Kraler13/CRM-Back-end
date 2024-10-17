import mongoose, { Schema } from "mongoose";
import { IClient } from "../types/Types";

const ClientSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    city: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    nbr: {
      type: String,
      required: true,
    },
  },
  nip: {
    type: String,
    required: true,
  },
  actions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Action",
    }
  ]
});

export default mongoose.model<IClient>("Client", ClientSchema);
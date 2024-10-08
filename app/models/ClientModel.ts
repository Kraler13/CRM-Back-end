import mongoose, { Schema } from "mongoose";
import { IClient } from "../types/Types";

const ClientSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  nip: {
    type: String,
    required: true,
  },
});

export default mongoose.model<IClient>("Client", ClientSchema);
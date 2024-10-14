import { Document, Types } from 'mongoose';

export interface IClient extends Document {
    name: string;
    address: {
      city: string
      street: string
      nbr: string
    }
    nip: string;
    actions: Types.ObjectId[]; 
  }

  export interface IAction extends Document {
    type: string;
    description: string;
    date: Date;
    client: Types.ObjectId;
}
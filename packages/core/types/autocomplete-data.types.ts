import { Document } from "mongoose";

export interface IAutocompleteData {
  key: string;
  label: string;
}

export interface IGenericAutocompleteDocument extends Document {
  _id: string;
  title: string;
}


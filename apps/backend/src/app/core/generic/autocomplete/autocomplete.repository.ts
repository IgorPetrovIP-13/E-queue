import { Model } from "mongoose";
import { Autocomplete } from "./autocomplete.schema";
import { CreateAutocompleteDTO } from "./autocomplete.types";

export abstract class AutocompleteRepository<T extends Autocomplete> {
  constructor(private readonly model: Model<T>) {}

  async create(data: CreateAutocompleteDTO): Promise<T> {
    const created = new this.model(data);
    return created.save();
  }

  async findAll(): Promise<T[]> {
    return this.model.find().exec();
  }
}

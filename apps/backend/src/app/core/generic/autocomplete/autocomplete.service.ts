import { AutocompleteRepository } from "./autocomplete.repository";
import { Autocomplete } from "./autocomplete.schema";
import { IAutocompleteData } from "@repo/core/types/autocomplete-data.types";
import { CreateAutocompleteDTO } from "./autocomplete.types";

export abstract class AutocompleteService<T extends Autocomplete> {
  constructor(private readonly repository: AutocompleteRepository<T>) {}

  async create(data: CreateAutocompleteDTO): Promise<T> {
    return this.repository.create(data);
  }

  async getAutocompleteData(): Promise<IAutocompleteData[]> {
    const genericAutocompleteData = await this.repository.findAll();
    return genericAutocompleteData.map(genericAutocompleteItem => ({
      key: genericAutocompleteItem._id,
      label: genericAutocompleteItem.title
    }));
  }
}

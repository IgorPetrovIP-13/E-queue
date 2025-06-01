import { IAutocompleteData } from "@repo/core/types/autocomplete-data.types";
import { axiosWithCredentialsInstance } from "../../axios/axios-with-credentials";

class ConnectionTypeService {
  private readonly BASE_URL = "/connection-types";

  async getAutocompleteData() {
    const response = await axiosWithCredentialsInstance.get<
      IAutocompleteData[]
    >(`${this.BASE_URL}/autocomplete-data`);
    return response.data;
  }
}

export const connectionTypeService = new ConnectionTypeService();

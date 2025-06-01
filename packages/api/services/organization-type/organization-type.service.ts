import { axiosWithCredentialsInstance } from "../../axios/axios-with-credentials";
import { IAutocompleteData } from "@repo/core/types/autocomplete-data.types";

export class OrganizationTypeService {
  private readonly BASE_URL = "/organization-types";

  async getAutocompleteData() {
    const response = await axiosWithCredentialsInstance.get<
      IAutocompleteData[]
    >(`${this.BASE_URL}/autocomplete-data`);

    return response.data;
  }
}

export const organizationTypeService = new OrganizationTypeService();

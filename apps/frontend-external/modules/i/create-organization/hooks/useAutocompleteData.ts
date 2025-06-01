import { addToast } from "@heroui/toast";
import { connectionTypeService } from "@repo/api/services/connection-type";
import { organizationTypeService } from "@repo/api/services/organization-type";
import { IAutocompleteData } from "@repo/core/types/autocomplete-data.types";
import { formatAxiosError } from "@repo/core/utils/formatAxiosError";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useAutocompleteData = () => {
  const [orgTypes, setOrganizationTypes] = useState<IAutocompleteData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const organizationTypes =
          await organizationTypeService.getAutocompleteData();

        setOrganizationTypes(organizationTypes);
        setIsLoading(false);
      } catch (error) {
        router.back();
        addToast({
          color: "danger",
          title: "Помилка завантаження даних",
          description: formatAxiosError(error)
        });
      }
    }
    fetchData();
  }, []);

  return {
    orgTypes,
    isLoading
  };
};

import { useMemo } from "react";
import { useProfile } from "@repo/core/hooks/useProfile";

export const useUpdateProfileInitials = () => {
  const { data, isLoading } = useProfile();

  const initialValues = useMemo(() => {
    return {
      avatar: data?.avatar || null,
      name: data?.name || "",
      surname: data?.surname || "",
      email: data?.email || "",
      password: "",
      confirmPassword: ""
    };
  }, [data]);

  return { initialValues, isLoading };
};

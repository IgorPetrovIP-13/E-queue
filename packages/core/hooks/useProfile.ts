import { QueryCache, useQuery } from "@tanstack/react-query";
import { profileService } from "@repo/api/services/profile/profile.service";
import { IGetProfileRes as Profile } from "@repo/api/services/profile/profile.types";

const queryCache = new QueryCache();

export function useProfile() {
  const cachedProfile = queryCache.find({ queryKey: ["profile"] })?.state
    .data as Profile | undefined;

  const { data, isLoading } = useQuery<Profile>({
    queryKey: ["profile"],
    queryFn: () => profileService.getProfile(),
    initialData: () => cachedProfile
  });

  return { data, isLoading };
}

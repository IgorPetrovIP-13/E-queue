import { profileService } from '@/services/profile.service'
import { useQuery } from '@tanstack/react-query'

export function useProfile() {
	const { data, isLoading } = useQuery({
		queryKey: ['profile'],
		queryFn: () => profileService.getProfile()
	})
	return { data, isLoading }
}

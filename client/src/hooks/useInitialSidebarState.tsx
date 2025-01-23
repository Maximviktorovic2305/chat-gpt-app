import useDeviceType from './useDeviceType'

export const useInitialSidebarState = () => {
	const deviceType = useDeviceType()

	if (typeof window !== 'undefined') {
		return deviceType === 'mobile' ? false : true
	}
}

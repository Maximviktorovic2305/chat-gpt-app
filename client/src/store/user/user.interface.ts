import { IUser } from "@/types"

export interface IInitialState {
	user: IUser | null
	isLoading: boolean
}

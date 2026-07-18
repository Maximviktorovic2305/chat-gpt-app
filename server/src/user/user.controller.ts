import { Controller, Delete, Get, Param, ParseIntPipe } from '@nestjs/common'
import { Auth } from '../auth/decorators/auth.decorator'
import { CurrentUser } from '../auth/decorators/user.decorator'
import { UserService } from './user.service'

@Controller('users')
@Auth('admin')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	getAllUsers() {
		return this.userService.getAllUsers()
	}

	@Delete(':id')
	deleteUser(
		@Param('id', ParseIntPipe) userId: number,
		@CurrentUser('id') actorId: number,
	) {
		return this.userService.deleteUser(userId, actorId)
	}
}

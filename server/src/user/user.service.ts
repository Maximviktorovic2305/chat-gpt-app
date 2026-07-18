import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { PrismaService } from '../common/database/prisma.service'
import { publicUserSelect } from './return-user.object'

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	async getAllUsers() {
		return this.prisma.user.findMany({
			select: publicUserSelect,
			orderBy: { createdAt: 'desc' },
		})
	}

	async deleteUser(userId: number, actorId: number) {
		if (userId === actorId) {
			throw new BadRequestException('Нельзя удалить собственную учётную запись')
		}

		const result = await this.prisma.user.deleteMany({ where: { id: userId } })
		if (result.count === 0) throw new NotFoundException('Пользователь не найден')
		return { message: 'Пользователь удален' }
	}
}

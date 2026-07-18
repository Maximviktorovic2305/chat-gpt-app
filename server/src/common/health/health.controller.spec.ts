import { PrismaService } from '../database/prisma.service'
import { HealthController } from './health.controller'

describe('HealthController', () => {
	it('reports healthy only after the database responds', async () => {
		const queryRaw = jest.fn().mockResolvedValue([{ result: 1 }])
		const controller = new HealthController({
			$queryRaw: queryRaw,
		} as unknown as PrismaService)

		await expect(controller.check()).resolves.toEqual({ status: 'ok' })
		expect(queryRaw).toHaveBeenCalledTimes(1)
	})
})

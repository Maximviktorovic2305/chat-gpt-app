import { validateEnvironment } from './validate-environment'

const validEnvironment = {
	DATABASE_URL: 'postgresql://user:password@localhost:5432/app',
	JWT_ACCESS_SECRET: 'a'.repeat(32),
	JWT_REFRESH_SECRET: 'b'.repeat(32),
	MISTRAL_API_KEY: 'test-key',
	ALLOWED_ORIGINS: 'https://example.com,http://localhost:3875',
}

describe('validateEnvironment', () => {
	it('normalizes secure defaults', () => {
		const result = validateEnvironment(validEnvironment)
		expect(result.PORT).toBe('4568')
		expect(result.RATE_LIMIT_MAX).toBe('60')
	})

	it('rejects equal JWT secrets', () => {
		expect(() =>
			validateEnvironment({
				...validEnvironment,
				JWT_REFRESH_SECRET: validEnvironment.JWT_ACCESS_SECRET,
			}),
		).toThrow('must be different')
	})

	it('rejects non-origin CORS entries', () => {
		expect(() =>
			validateEnvironment({
				...validEnvironment,
				ALLOWED_ORIGINS: 'https://example.com/path',
			}),
		).toThrow('exact HTTP(S) origins')
	})
})

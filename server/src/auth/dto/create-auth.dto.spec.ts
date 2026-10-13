import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { LoginAuthDto, RegisterAuthDto } from './create-auth.dto';
const valid = {
  email: 'consent@example.com',
  password: 'secure-test-password',
  name: 'Test',
  acceptTerms: true,
  acceptDataProcessing: true,
  legalVersion: '2026-10-13',
};
describe('Registration consent boundary', () => {
  it('accepts separate current document acceptance', async () => {
    expect(
      await validate(plainToInstance(RegisterAuthDto, valid)),
    ).toHaveLength(0);
  });
  it.each(['acceptTerms', 'acceptDataProcessing'])(
    'rejects missing, false or coerced %s',
    async (field) => {
      for (const value of [undefined, false, 1, 'yes', 'false']) {
        const errors = await validate(
          plainToInstance(RegisterAuthDto, { ...valid, [field]: value }),
        );
        expect(errors.some((error) => error.property === field)).toBe(true);
      }
    },
  );
  it('rejects outdated or missing document versions', async () => {
    for (const legalVersion of [undefined, '2020-01-01'])
      expect(
        (
          await validate(
            plainToInstance(RegisterAuthDto, { ...valid, legalVersion }),
          )
        ).some((error) => error.property === 'legalVersion'),
      ).toBe(true);
  });
  it('does not require consent again for login', async () => {
    expect(
      await validate(
        plainToInstance(LoginAuthDto, {
          email: valid.email,
          password: valid.password,
        }),
      ),
    ).toHaveLength(0);
  });
});

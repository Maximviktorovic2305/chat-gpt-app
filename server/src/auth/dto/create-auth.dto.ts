import { Transform } from 'class-transformer'
import {
	IsEmail,
	IsOptional,
	IsString,
	MaxLength,
	MinLength,
} from 'class-validator'

const normalizeEmail = ({ value }: { value: unknown }): unknown =>
	typeof value === 'string' ? value.trim().toLowerCase() : value

export class LoginAuthDto {
	@Transform(normalizeEmail)
	@IsEmail()
	@MaxLength(254)
	email!: string

	@IsString()
	@MinLength(10)
	@MaxLength(128)
	password!: string
}

export class RegisterAuthDto extends LoginAuthDto {
	@IsOptional()
	@IsString()
	@MinLength(2)
	@MaxLength(80)
	@Transform(({ value }: { value: unknown }) =>
		typeof value === 'string' ? value.trim() : value,
	)
	name?: string
}

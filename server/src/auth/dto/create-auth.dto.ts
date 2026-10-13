import { Transform } from 'class-transformer';
import {
  Equals,
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

const normalizeEmail = ({ value }: { value: unknown }): unknown =>
  typeof value === 'string' ? value.trim().toLowerCase() : value;

export class LoginAuthDto {
  @Transform(normalizeEmail)
  @IsEmail()
  @MaxLength(254)
  email!: string;

  @IsString()
  @MinLength(10)
  @MaxLength(128)
  password!: string;
}

export class RegisterAuthDto extends LoginAuthDto {
  @IsBoolean()
  @Equals(true)
  acceptTerms!: boolean;

  @IsBoolean()
  @Equals(true)
  acceptDataProcessing!: boolean;

  @Equals('2026-10-13')
  legalVersion!: '2026-10-13';

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(80)
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  name?: string;
}

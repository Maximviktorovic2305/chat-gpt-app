-- Nullable values preserve the absence of recorded consent for existing accounts.
ALTER TABLE "User" ADD COLUMN "terms_version" TEXT,
 ADD COLUMN "data_consent_version" TEXT,
 ADD COLUMN "legal_accepted_at" TIMESTAMP(3);

ALTER TABLE "project" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;
CREATE TABLE IF NOT EXISTS "project" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"user_id" text NOT NULL,
	"json" text NOT NULL,
	"width" integer NOT NULL,
	"height" integer NOT NULL,
	"thumbnail_url" text,
	"is_template" boolean,
	"is_pro" boolean,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project" ADD CONSTRAINT "project_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

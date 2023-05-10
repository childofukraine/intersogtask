CREATE TABLE IF NOT EXISTS "cards" (
	"card_id" serial PRIMARY KEY NOT NULL,
	"card_name" varchar(32) NOT NULL,
	"owner_id" integer NOT NULL,
	"card_type" varchar(10) NOT NULL
);

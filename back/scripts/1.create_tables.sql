BEGIN;

DROP TABLE IF EXISTS "user", "story", "genre", "world", "place", "npc", "item", "action", "compartment", "user_has_story", "user_has_item", "action_has_item", "story_has_genre", "compartment_has_action", "place_has_world", "npc_has_world", "npc_has_action";

-- Le mdp est maintenant chiffré.
-- CREATE DOMAIN domain_password AS TEXT
-- CHECK(
--    VALUE ~ '^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!?*_%])[a-zA-Z0-9!?*_%]{8,20}$'
-- );

--CREATE DOMAIN domain_mail AS TEXT
--CHECK(
   --VALUE ~ '^([-!#-''*+/-9=?A-Z^-~]+(\.[-!#-''*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@([0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)*|\[((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|IPv6:((((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){6}|::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){5}|[0-9A-Fa-f]{0,4}::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){4}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):)?(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){3}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,2}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){2}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,3}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,4}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::)((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3})|(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3})|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,5}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3})|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,6}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::)|(?!IPv6:)[0-9A-Za-z-]*[0-9A-Za-z]:[!-Z^-~]+)])$' 
--);

CREATE TABLE "user" (
  "id"         INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "password"   TEXT NOT NULL,
  "alias"      TEXT NOT NULL UNIQUE,
  "avatar"     TEXT,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "story" (
  "id"          INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name"        TEXT NOT NULL,
  "level"       INTEGER NOT NULL DEFAULT 1,
  "description" TEXT,
  "created_at"  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "genre" (
  "id"          INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "label"       TEXT NOT NULL,
  "img"         TEXT NOT NULL,
  "created_at"  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "world" (
  "id"          INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "label"       TEXT NOT NULL,
  "img"         TEXT NOT NULL,
  "created_at"  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "place" (
  "id"          INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "label"       TEXT NOT NULL,
  "img"         TEXT NOT NULL,
  "created_at"  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "npc" (
  "id"          INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "label"       TEXT NOT NULL,
  "img"         TEXT NOT NULL,
  "created_at"  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "item" (
  "id"          INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "label"       TEXT NOT NULL,
  "img"         TEXT NOT NULL,
  "created_at"  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "action" (
  "id"          INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "label"       TEXT NOT NULL,
  "class"       TEXT NOT NULL,
  "consequence" TEXT,
  "img"         TEXT NOT NULL,
  "created_at"  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "compartment" (
  "id"          INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "position"    INTEGER NOT NULL,
  "class"       TEXT NOT NULL,
  "children"    TEXT,
  "story_id"    INTEGER NOT NULL REFERENCES "story"("id") ON DELETE CASCADE,
  "place_id"    INTEGER NOT NULL REFERENCES "place"("id") ON DELETE CASCADE,
  "npc_id"      INTEGER REFERENCES "npc"("id") ON DELETE CASCADE,
  "created_at"  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "user_has_story"(
  "user_id" INTEGER NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "story_id" INTEGER NOT NULL REFERENCES "story"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY ("user_id", "story_id")
);

CREATE TABLE "user_has_item"(
  "user_id" INTEGER NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "item_id" INTEGER NOT NULL REFERENCES "item"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY ("user_id", "item_id")
);

CREATE TABLE "action_has_item"(
  "action_id" INTEGER NOT NULL REFERENCES "action"("id") ON DELETE CASCADE,
  "item_id" INTEGER NOT NULL REFERENCES "item"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY ("action_id", "item_id")
);

CREATE TABLE "story_has_genre"(
  "story_id" INTEGER NOT NULL REFERENCES "story"("id") ON DELETE CASCADE,
  "genre_id" INTEGER NOT NULL REFERENCES "genre"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY ("story_id", "genre_id")
);

CREATE TABLE "compartment_has_action"(
  "compartment_id" INTEGER NOT NULL REFERENCES "compartment"("id") ON DELETE CASCADE,
  "action_id" INTEGER NOT NULL REFERENCES "action"("id") ON DELETE CASCADE,
  "child" INTEGER,
  "item" INTEGER,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY ("compartment_id", "action_id")
);

CREATE TABLE "place_has_world"(
  "place_id" INTEGER NOT NULL REFERENCES "place"("id") ON DELETE CASCADE,
  "world_id" INTEGER NOT NULL REFERENCES "world"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY ("place_id", "world_id")
);

CREATE TABLE "npc_has_world"(
  "npc_id" INTEGER NOT NULL REFERENCES "npc"("id") ON DELETE CASCADE,
  "world_id" INTEGER NOT NULL REFERENCES "world"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY ("npc_id", "world_id")
);

CREATE TABLE "npc_has_action"(
  "npc_id" INTEGER NOT NULL REFERENCES "npc"("id") ON DELETE CASCADE,
  "action_id" INTEGER NOT NULL REFERENCES "action"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY ("npc_id", "action_id")
);

COMMIT;
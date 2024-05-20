export PGPORT=5432

export PGUSER=postgres
export PGPASSWORD=postgres

psql -f ./scripts/0.init_db.sql

export PGUSER=admin_gamebook
export PGPASSWORD=admin_gamebook

export PGDATABASE=gamebook

psql -f ./scripts/1.create_tables.sql

psql -f ./scripts/2.seeding.sql

psql -f ./scripts/3.functions.sql
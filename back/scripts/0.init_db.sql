DROP DATABASE IF EXISTS gamebook;
DROP ROLE IF EXISTS admin_gamebook;
DROP ROLE IF EXISTS gamebook;

CREATE USER admin_gamebook WITH PASSWORD 'admin_gamebook';
CREATE USER gamebook WITH PASSWORD 'gamebook';
CREATE DATABASE gamebook OWNER admin_gamebook;
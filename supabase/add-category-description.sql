-- Add description column to categories table (run before seed-categories.sql)
ALTER TABLE categories ADD COLUMN IF NOT EXISTS description text;

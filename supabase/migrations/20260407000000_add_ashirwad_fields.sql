-- Add ashirwad and address fields to bookings table
ALTER TABLE public.bookings ADD COLUMN ashirwad boolean NOT NULL DEFAULT false;
ALTER TABLE public.bookings ADD COLUMN address text;
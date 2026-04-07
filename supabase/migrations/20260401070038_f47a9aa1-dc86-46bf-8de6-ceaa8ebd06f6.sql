ALTER TABLE public.bookings ADD COLUMN quantity integer NOT NULL DEFAULT 1;
ALTER TABLE public.bookings ADD COLUMN delivery_address text;
-- Update profiles table to use wallet address instead of email
ALTER TABLE public.profiles DROP COLUMN IF EXISTS email;
ALTER TABLE public.profiles ADD COLUMN wallet_address TEXT UNIQUE NOT NULL DEFAULT '';

-- Update the trigger function to handle wallet-based registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, username, wallet_address)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'username', NEW.raw_user_meta_data ->> 'wallet_address');
  RETURN NEW;
END;
$$;
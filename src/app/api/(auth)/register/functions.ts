import { createClient } from "@/shared/lib/supabase/server";
import { cookies } from "next/headers";

type register = {
  email: string;
  password: string;
};

export const registerTrigger = async (data: register) => {
  const { email, password } = data;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: user, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return user;
};

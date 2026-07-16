import { create } from "zustand";
import { User as SupabaseUser } from "@supabase/supabase-js";

export type Profile = {
  avatar: string | null;
  username: string;
  firstName: string;
  lastName: string;
};

type AuthStatus = "loading" | "authenticated" | "unauthenticated";

type AuthState = {
  auth: SupabaseUser | null;
  profile: Profile | null;
  status: AuthStatus;

  setAuth: (user: SupabaseUser | null) => void;
  setProfile: (profile: Profile | null) => void;
};

export const useUserStore = create<AuthState>((set) => ({
  auth: null,
  profile: {
    avatar:
      "https://i.pinimg.com/736x/d3/60/21/d36021083aec5cae2ff1c85bb660f5f4.jpg",
    username: "",
    firstName: "",
    lastName: "",
  },
  status: "loading",

  setAuth: (auth) =>
    set({
      auth,
      status: auth ? "authenticated" : "unauthenticated",
    }),

  setProfile: (profile) =>
    set({
      profile,
    }),
}));

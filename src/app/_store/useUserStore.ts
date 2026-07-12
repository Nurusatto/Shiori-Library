import { create } from "zustand";
import { User as SupabaseUser } from "@supabase/supabase-js";

export type Profile = {
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
  profile: null,
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

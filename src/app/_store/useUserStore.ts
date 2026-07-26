import { create } from "zustand";
import { User as SupabaseUser } from "@supabase/supabase-js";

export type Profile = {
  avatar: string;
  username: string;
  displayName: string; // Оно же first_name
  bio: string | null;
  phone: string | null;
};

type AuthStatus = "loading" | "authenticated" | "unauthenticated";

type AuthState = {
  auth: SupabaseUser | null;
  profile: Profile | null;
  status: AuthStatus;

  setAuth: (user: SupabaseUser | null) => void;
  setProfile: (profile: Profile | null) => void;

  logOut: () => void;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DEFAULT_AVATAR =
  "https://i.pinimg.com/736x/d3/60/21/d36021083aec5cae2ff1c85bb660f5f4.jpg";

export const useUserStore = create<AuthState>((set) => ({
  auth: null,
  profile: null, // Изначально профиля нет, пока идет загрузка
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
  logOut: () => set({ auth: null, profile: null, status: "unauthenticated" }),
}));

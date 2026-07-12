"use client";

import { createClient } from "@/shared/lib/supabase/client";
import { useEffect } from "react";
import { useUserStore } from "@/app/_store/useUserStore";

declare global {
  interface Window {
    userStore: typeof useUserStore;
  }
}

if (typeof window !== "undefined") {
  window.userStore = useUserStore;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const supabase = createClient();
  const setAuth = useUserStore((state) => state.setAuth);
  const setProfile = useUserStore((state) => state.setProfile);

  useEffect(() => {
    async function init() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      console.log("SESSION:", session);
      if (!session) {
        setAuth(null);
        setProfile(null);
        return;
      }

      setAuth(session.user);

      const { data } = await supabase
        .from("profiles")
        .select("username, first_name, last_name")
        .eq("id", session.user.id)
        .maybeSingle();

      const profile = data
        ? {
            username: data.username,
            firstName: data.first_name,
            lastName: data.last_name,
          }
        : null;

      setProfile(profile);
    }

    init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!session) {
        setAuth(null);
        setProfile(null);
        return;
      }

      setAuth(session.user);

      const { data } = await supabase
        .from("profiles")
        .select("username, first_name, last_name")
        .eq("id", session.user.id)
        .maybeSingle();

      const profile = data
        ? {
            username: data.username,
            firstName: data.first_name,
            lastName: data.last_name,
          }
        : null;

      setProfile(profile);
    });

    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
};

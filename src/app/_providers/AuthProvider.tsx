"use client";

import { createClient } from "@/shared/lib/supabase/client";
import { useEffect } from "react";
import { useUserStore, Profile } from "@/app/_store/useUserStore";

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
    // Вспомогательная функция, чтобы не дублировать код
    async function fetchProfile(userId: string): Promise<Profile | null> {
      const { data, error } = await supabase
        .from("profiles")
        // Запрашиваем ВСЕ поля. Если какого-то поля (например, avatar_url) еще нет в БД, временно убери его из селекта
        .select("username, display_name, bio, phone, avatar_url,created_at")
        .eq("id", userId)
        .maybeSingle();

      if (error || !data) return null;

      return {
        username: data.username,
        displayName: data.display_name || "",
        bio: data.bio || null,
        phone: data.phone || null,
        avatar: data.avatar_url || null,
        createdAt: data.created_at || null,
      };
    }

    async function init() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setAuth(null);
        setProfile(null);
        return;
      }

      setAuth(session.user);
      const profile = await fetchProfile(session.user.id);
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
      const profile = await fetchProfile(session.user.id);
      setProfile(profile);
    });

    return () => subscription.unsubscribe();
  }, [setAuth, setProfile, supabase]);

  return children;
};

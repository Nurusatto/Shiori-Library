import { NextRequest } from "next/server";
import { createClient } from "@/shared/lib/supabase/server";
import { cookies } from "next/headers";

export const POST = async (req: NextRequest) => {
  try {
    const { email, password } = await req.json();

    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (authError) throw new Error(authError.message);
    if (!authData.user) throw new Error("User not found");

    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("username, display_name, bio, phone, avatar_url")
      .eq("id", authData.user.id)
      .maybeSingle();

    if (profileError) throw new Error(profileError.message);

    return Response.json({
      success: true,
      message: "Welcome back!",
      user: authData.user,
      profile: profileData
        ? {
            username: profileData.username,
            displayName: profileData.display_name || "",
            bio: profileData.bio || null,
            phone: profileData.phone || null,
            avatar: profileData.avatar_url || null,
          }
        : null,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Auth failed",
      },
      { status: 400 },
    );
  }
};

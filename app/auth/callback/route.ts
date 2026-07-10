import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * OAuth callback — exchanges the code, then applies the routing matrix:
 * new signup (no profile, or not onboarded) → /onboarding;
 * existing member → /dashboard (This week).
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=missing_code`);
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    return NextResponse.redirect(`${origin}/login?error=exchange_failed`);
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.redirect(`${origin}/login?error=no_session`);
  }

  const { data: profile } = await supabase
    .from("users")
    .select("onboarded")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile) {
    await supabase.from("users").insert({
      id: user.id,
      email: user.email ?? "",
      full_name:
        (user.user_metadata.full_name as string | undefined) ?? null,
      avatar_url:
        (user.user_metadata.avatar_url as string | undefined) ?? null,
    });
    return NextResponse.redirect(`${origin}/onboarding`);
  }

  return NextResponse.redirect(
    `${origin}${profile.onboarded ? "/dashboard" : "/onboarding"}`,
  );
}

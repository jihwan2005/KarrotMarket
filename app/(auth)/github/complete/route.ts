import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import db from "@/lib/db";
import getGitHubAccessToken from "@/lib/auth/github-AccessToken";
import getUserProfile from "@/lib/auth/github-user-profile";
import getUserEmail from "@/lib/auth/github-user-email";
import { UserLogIn } from "@/lib/login";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  if (!code) {
    return new Response(null, {
      status: 400,
    });
  }
  const { error, access_token } = await getGitHubAccessToken(code);
  if (error) {
    return new Response(null, {
      status: 400,
    });
  }

  const {
    id,
    avatar_url,
    login: username,
  } = await getUserProfile(access_token);

  const email = await getUserEmail(access_token);

  const user = await db.user.findUnique({
    where: {
      github_id: id + "",
    },
    select: {
      id: true,
    },
  });

  if (user) {
    await UserLogIn(user.id);
    return redirect("/profile");
  } else {
    const existsUserName = await db.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
      },
    });

    const newUser = await db.user.create({
      data: {
        username: existsUserName ? `${username}-gh` : username,
        email,
        github_id: id + "",
        avatar: avatar_url,
      },
      select: {
        id: true,
      },
    });
    await UserLogIn(newUser.id);
  }
  return redirect("/profile");
}

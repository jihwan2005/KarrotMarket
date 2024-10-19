interface IUserEmailData {
  email: string;
  primary: boolean;
  verified: boolean;
  visibility: string;
}

export default async function getUserEmail(access_token: string) {
  const userEmailResponse = await (
    await fetch("https://api.github.com/user/emails", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      cache: "no-cache",
    })
  ).json();

  const userEmail = userEmailResponse.find(
    (email: IUserEmailData) =>
      email.primary === true &&
      email.verified === true &&
      email.visibility === "public"
  );

  return userEmail.email;
}

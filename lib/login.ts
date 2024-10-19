import getSession from "./session";

export const UserLogIn = async (id: number) => {
  const session = await getSession();
  session.id = id;
  await session.save();
};

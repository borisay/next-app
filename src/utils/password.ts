import bcryptjs from "bcryptjs";

export async function saltAndHashPassword(password: string): Promise<string> {
  const saltRound = 10;
  return await bcryptjs.hash(password, saltRound);
}

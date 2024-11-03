import PocketBase from "pocketbase";

export default async function authenticate(pb: PocketBase) {
  const email = process.env.PB_USER;
  const password = process.env.PB_PASSWORD;

  if (!email || !password) {
    throw new Error("Admin credentials are not set in environment variables.");
  }

  const login = await pb.admins.authWithPassword(email, password);
  console.log(login);
}

import { LoginDto, LoginResponse } from "./dto/login.dto";

import client from "@/lib/clients/graphql";
import loginMutation from "./mutations/loginMutation";
import registerMutation from "./mutations/registerMutation";
import verifyQuery from "./queries/verifyQuery";
import User from "./user";

export async function verifyUser(): Promise<User> {
  const user = await client.fetch(verifyQuery);

  if (!user) {
    throw new Error("User not found");
  }

  return user as User;
}

export async function loginUser(loginData: LoginDto): Promise<LoginResponse> {
  const response = await client.fetch(loginMutation, { loginData });

  return response as LoginResponse;
}

export async function registerUser(registerData: {
  username: string;
  email: string;
  password: string;
}) {
  const response = await client.fetch(registerMutation, { registerData });

  return response as User;
}

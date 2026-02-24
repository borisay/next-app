"use server";

import { IFormData } from "../types/form-data";
import { saltAndHashPassword } from "../utils/password";
import { prisma } from "../utils/prisma";

export async function registerUser(formData: IFormData) {
  const { email, password, confirmPassword } = formData;
  if (password !== confirmPassword) {
    return { error: "Passwords dismatch" };
  }
  if (password.length < 6) {
    return { error: "Short password" };
  }
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      return { error: "User already exists" };
    }
    const pwHash = await saltAndHashPassword(password);
    const user = await prisma.user.create({
      data: {
        email: email,
        password: pwHash,
      },
    });
    console.log("user-register", user);
    return user;
  } catch (error) {
    console.error("Registration error", error);
    return { error: "Registration Error" };
  }
}

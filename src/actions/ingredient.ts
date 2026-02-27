"use server";

import { success, ZodError } from "zod";
import { ingredientSchema } from "../schema/zod";
import { prisma } from "../utils/prisma";

export async function createIngredient(formData: FormData) {
  try {
    const data = {
      name: formData.get("name") as string,
      category: formData.get("category") as string,
      unit: formData.get("unit") as string,
      pricePerUnit: formData.get("pricePerUnit")
        ? parseFloat(formData.get("pricePerUnit") as string)
        : null,
      description: formData.get("description") as string,
    };

    const validatedData = ingredientSchema.parse(data);
    const ingredient = await prisma.ingredient.create({
      data: {
        name: validatedData.name,
        category: validatedData.category,
        unit: validatedData.unit,
        pricePerUnit: validatedData.pricePerUnit,
        description: validatedData.description,
      },
    });
    return { success: true, ingredient };
  } catch (error) {
    if (error instanceof ZodError) {
      // return { error: error.errors.map((e) => e.message).join(", ") };
      return { error: error };
    }
    console.error("Error creating ingredient", error);
    return { error: "Error for creating ingredient" };
  }
}

// get all ingredients from DB
export async function getIngredients() {
  try {
    const ingredients = await prisma.ingredient.findMany();
    return { success: true, ingredients };
  } catch (error) {
    console.error("Error getting ingredient", error);
    return { error: "Error for getting ingredient" };
  }
}

// deleteing with specific id
export async function deleteIngredient(id: string) {
  try {
    console.log("id", id);
    const ingredient = await prisma.ingredient.delete({
      where: { id },
    });
    return { success: true, ingredient };
  } catch (error) {
    console.error("Error of delete", error);
    return { error: "Error for delete" };
  }
}

"use server";
import { success } from "zod";
import prisma from "../utils/prisma";

export async function getRecipes() {
  try {
    const recipes = await prisma.recipe.findMany({
      include: {
        ingredients: {
          include: {
            ingredient: true,
          },
        },
      },
    });
    return { success: true, recipes };
  } catch (error) {
    console.error("Error fetching recipes", error);
    return { success: false, error: "Error fetching recipes" };
  }
}

export async function createRecipe(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const imageUrl = formData.get("imageUrl") as string | null;

    const ingredients = Array.from(formData.entries())
      .filter(([key]) => key.startsWith("ingredient_"))
      .map(([key, value]) => ({
        ingredientId: value as string,
        quantity: parseFloat(
          formData.get(`quantity_${key.split("_")[1]}`) as string,
        ),
      }));
    console.log(Array.from(formData.entries()));
    console.log(ingredients);
    if (!name || ingredients.length === 0) {
      return {
        success: false,
        error: "Error name or ingredient recipes",
      };
    }
    const recipe = await prisma.recipe.create({
      data: {
        name,
        description,
        imageUrl,
        ingredients: {
          create: ingredients.map(({ ingredientId, quantity }) => ({
            ingredient: { connect: { id: ingredientId } },
            quantity,
          })),
        },
      },
      include: {
        ingredients: {
          include: {
            ingredient: true,
          },
        },
      },
    });
    return { success: true, recipe };
  } catch (error) {
    console.error("Error creating recipes", error);
    return { success: false, error: "Error creating recipes" };
  }
}

export async function updateRecipe(id: string, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const imageUrl = formData.get("imageUrl") as string | null;

    const ingredients = Array.from(formData.entries())
      .filter(([key]) => key.startsWith("ingredient_"))
      .map(([key, value]) => ({
        ingredientId: value as string,
        quantity: parseFloat(
          formData.get(`quantity_${key.split("_")[1]}`) as string,
        ),
      }));
    if (!name || ingredients.length === 0) {
      return {
        success: false,
        error: "Error name or ingredient recipes",
      };
    }

    const recipe = await prisma.recipe.update({
      where: { id },
      data: {
        name,
        description,
        imageUrl,
        ingredients: {
          deleteMany: {},
          create: ingredients.map(({ ingredientId, quantity }) => ({
            ingredient: { connect: { id: ingredientId } },
            quantity,
          })),
        },
      },
      include: {
        ingredients: {
          include: {
            ingredient: true,
          },
        },
      },
    });
    return { success: true, recipe };
  } catch (error) {
    console.error("Error updating recipes", error);
    return { success: false, error: "Error updating recipes" };
  }
}

export async function deleteRecipe(id: string) {
  try {
    await prisma.recipeIngredient.deleteMany({
      where: { recipeId: id },
    });
    await prisma.recipe.delete({
      where: { id },
    });
    return { success: true };
  } catch (error) {
    console.error("Error deleting recipes", error);
    return { success: false, error: "Error deleting recipes" };
  }
}

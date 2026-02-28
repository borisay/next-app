"use client";
import RecipeForm from "@/src/forms/recipe.form";

export default function NewRecipePage() {
  return (
    <div className="mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Create new recipe</h1>
      <RecipeForm />
    </div>
  );
}

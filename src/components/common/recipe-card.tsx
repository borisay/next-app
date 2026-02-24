"use client";
import { useTransition } from "react";
import { Card, CardBody, CardHeader, Button } from "@heroui/react";
import { useRecipeStore } from "@/src/store/recipe.store";
import Image from "next/image";
import { IRecipe } from "@/src/types/recipe";
import Link from "next/link";
import { UNIT_ABBREVIATIONS } from "@/src/constants/select-options";
import { useAuthStore } from "@/src/store/auth.store";

interface RecipeCardProps {
  recipe: IRecipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const { isAuth, session, status, setAuthState } = useAuthStore();
  console.log("Test status", status);
  const { removeRecipe } = useRecipeStore();
  const [isPending, startTransition] = useTransition();
  const handleDelete = () => {
    startTransition(async () => {
      try {
        await removeRecipe(recipe.id);
      } catch (error) {
        console.error("Error deleting recipe", error);
      }
    });
  };
  const getUnitLabel = (unit: string) => {
    const unitOption = UNIT_ABBREVIATIONS.find(
      (option) => option.value === unit,
    );
    return unitOption ? unitOption.label : unit.toLowerCase();
  };

  return (
    <Card className="w-full max-w-md h-[480px] flex flex-col">
      <div className="h-48 overflow-hidden">
        {recipe.imageUrl ? (
          <div className="relative h-48 group overflow-hidden">
            <Image
              src={recipe.imageUrl}
              loading="eager"
              sizes="100%"
              alt="Image for recipe"
              fill
              className="object-cover transition-transform duration-300 group-hover:text-gray-500"
            />
          </div>
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="tex-gray-500">No image</span>
          </div>
        )}
      </div>
      <CardHeader className="flex justify-between items-center text-black">
        <h2 className="text-xl fond-bold">{recipe.name}</h2>
      </CardHeader>
      <CardBody className="flex-1 text-black">
        <p className="text-gray-600  mb-4 ">
          {recipe.description || "No description"}
        </p>
        <h3 className="font-semibold">Ingredients:</h3>
        <ul className="list-disc pl-5 overflow-y-auto max-h-24">
          {recipe.ingredients.map((ing) => (
            <li key={ing.id}>
              {ing.ingredient.name}:{ing.quantity}{" "}
              {getUnitLabel(ing.ingredient.unit)}
            </li>
          ))}
        </ul>
      </CardBody>
      {status === "authenticated" ? (
        <div className="flex justify-end gap-2 p-4">
          <Link href={`/recipes/${recipe.id}`}>
            <Button color="primary" variant="light">
              Edit
            </Button>
          </Link>
          <Button
            color="danger"
            variant="light"
            onPress={handleDelete}
            isLoading={isPending}
          >
            Delete
          </Button>
        </div>
      ) : null}
    </Card>
  );
};
export default RecipeCard;

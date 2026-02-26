"use client";
import RecipeCard from "@/src/components/common/recipe-card";
import { useAuthStore } from "@/src/store/auth.store";
import { useRecipeStore } from "@/src/store/recipe.store";
import { Button } from "@heroui/react";
import Link from "next/link";

const Home = () => {
  const { status } = useAuthStore();
  const { recipes, isLoading, error } = useRecipeStore();
  return (
    <>
      {status === "authenticated" ? (
        <div className="flex w-full justify-center items-center mb-8">
          <Link href="/recipes/new">
            <Button color="primary"> Add recipe</Button>
          </Link>
        </div>
      ) : null}
      {error && <p className="tex-red-500 mb-4">{error}</p>}
      {isLoading && <p>Loading...</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full justify-items-center">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </>
  );
};
export default Home;

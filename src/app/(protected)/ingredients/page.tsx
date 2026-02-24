"use client";

import IngredientsTable from "@/src/components/UI/tables/ingredients";
import IngredientForm from "@/src/forms/ingredient.form";

const Ingredients = () => {
  return (
    <div>
      <IngredientForm />
      <IngredientsTable />
    </div>
  );
};
export default Ingredients;

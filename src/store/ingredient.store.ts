import { create } from "zustand";
import { IIngredient } from "../types/ingredient";
import {
  createIngredient,
  getIngredients,
  deleteIngredient,
} from "../actions/ingredient";
import { updateRecipe } from "../actions/recipe";

interface IngredientState {
  ingredients: IIngredient[];
  isLoading: boolean;
  error: string | null;
  loadIngredients: () => Promise<void>;
  addIngredient: (formData: FormData) => Promise<void>;
  removeIngredient: (id: string) => Promise<void>;
}
export const useIngredientStore = create<IngredientState>((set) => ({
  ingredients: [],
  isLoading: false,
  error: null,

  loadIngredients: async () => {
    //print all ingredients when page isLoading
    set({ isLoading: true, error: null });
    try {
      const result = await getIngredients();
      if (result.success) {
        set({ ingredients: result.ingredients, isLoading: false });
      } else {
        set({ error: result.error, isLoading: false });
      }
    } catch (error) {
      console.log("error", error);
      set({ error: "Error loading ingredient", isLoading: false });
    }
  },

  addIngredient: async (formData: FormData) => {
    set({ isLoading: true, error: null });
    try {
      const result = await createIngredient(formData);

      if (result.success) {
        // console.log("Result", result.ingredient);
        set((state) => ({
          ingredients: [...state.ingredients, result.ingredient],
          isLoading: false,
        }));
      } else {
        // set({ error: result.error, isLoading: false });
        set({ isLoading: false });
      }
    } catch (error) {
      console.log("error", error);
      set({ error: "Error adding ingredient", isLoading: false });
    }
  },

  removeIngredient: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const result = await deleteIngredient(id);

      if (result.success) {
        set((state) => ({
          ingredients: state.ingredients.filter(
            (ingredient) => ingredient.id !== id,
          ),
          isLoading: false,
        }));
      } else {
        set({ error: result.error, isLoading: false });
      }
    } catch (error) {
      console.log("error", error);
      set({ error: "Error deleting ingredient", isLoading: false });
    }
  },
}));

// export const useIngredientStore = [{ value: "", label: "" }] as const;

import ClientRecipeSearch from "../components/ui/RecipeSearch";
import { Ingredient } from "../types";

async function getIngredients(): Promise<Ingredient[]> {
  const response = await fetch("http://localhost:3000/api/ingredient/readall");
  const data = await response.json();

  return data.map(
    (ingredient: { _id: string; name: string; category: string }) => ({
      id: ingredient._id,
      name: ingredient.name,
      category: ingredient.category,
    })
  );
}

export default async function RecipeSearch() {
  const ingredients = await getIngredients();
  return <ClientRecipeSearch initialIngredients={ingredients} />;
}

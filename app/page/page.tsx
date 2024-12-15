"use client";

import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { CardContent } from "@mui/material";
import { Ingredient, RecipeIngredient } from "../types";
import { IngredientSearch } from "../components/ui/IngredientSearch";
import { SearchButton } from "../components/ui/SearchButton";
import { RecipeHeader } from "../components/ui/RecipeHeader";
import { RecipeIngredients } from "../components/ui/RecipeIngredients";
import { RecipeTipsAndArrangements } from "../components/ui/RecipeTipsAndArrangements";
import { RecipeSteps } from "../components/ui/RecipeSteps";

const RecipeSearch = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [recipeVisible, setRecipeVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const ingredients: Ingredient[] = [
    { label: "りんご" },
    { label: "にんじん" },
    { label: "うなぎ" },
    { label: "じゃがいも" },
  ];

  const recipeIngredients: RecipeIngredient[] = [
    { name: "米", amount: "2合" },
    { name: "豚肉", amount: "200g" },
    { name: "たまねぎ", amount: "2個" },
    { name: "にんじん", amount: "1本" },
    { name: "じゃがいも", amount: "2個" },
    { name: "カレールー", amount: "1箱" },
    { name: "水", amount: "800ml" },
    { name: "サラダ油", amount: "適量" },
  ];

  const steps: string[] = [
    "米を研いで炊飯器で炊く",
    "たまねぎ、にんじん、じゃがいもを一口大に切る",
    "豚肉を食べやすい大きさに切る",
    "鍋にサラダ油を熱し、豚肉を炒める",
    "野菜を加えて炒める",
    "水を加えて沸騰させ、アクを取り除く",
    "野菜が柔らかくなるまで煮込む（約15分）",
    "火を弱めてカレールーを溶かし入れ、とろみがつくまで煮込む（約10分）",
    "ご飯にカレーをかけて完成",
  ];

  const tips: string[] = [
    "野菜は大きさを揃えて切ると火の通りが均一になります",
    "ルーを入れた後は焦げ付かないよう弱火で煮込みましょう",
    "一晩置くと味がなじんでさらに美味しくなります",
  ];

  const arrangements: string[] = [
    "カレー粉を加えてスパイシーに",
    "ココナッツミルクを加えてマイルドに",
    "隠し味に練り味噌やソース、はちみつを加える",
    "トッピングに温泉卵や福神漬けを添える",
  ];

  const handleAddIngredient = () => {
    if (inputValue && !selectedIngredients.includes(inputValue)) {
      setSelectedIngredients([...selectedIngredients, inputValue]);
      setInputValue("");
    }
  };

  const handleDelete = (ingredientToDelete: string) => {
    setSelectedIngredients(
      selectedIngredients.filter(
        (ingredient) => ingredient !== ingredientToDelete
      )
    );
  };

  const handleSearch = async () => {
    setIsLoading(true);

    try {
      // API呼び出しの代わりにタイマーを使用（3秒待機）
      await new Promise((resolve) => setTimeout(resolve, 3000));

      setRecipeVisible(true);
    } catch (error) {
      console.error("検索中にエラーが発生しました:", error);
      // エラー処理を追加することができます
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Stack spacing={3} sx={{ maxWidth: 800, mx: "auto", p: 2 }}>
      <Paper elevation={1} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          食材からレシピ検索
        </Typography>

        <IngredientSearch
          ingredients={ingredients}
          selectedIngredients={selectedIngredients}
          inputValue={inputValue}
          onInputChange={setInputValue}
          onAddIngredient={handleAddIngredient}
          onDeleteIngredient={handleDelete}
        />

        <SearchButton isLoading={isLoading} onClick={handleSearch} />
      </Paper>

      {recipeVisible && (
        <Paper elevation={1} sx={{ p: 3 }}>
          <RecipeHeader />
          <CardContent>
            <RecipeIngredients ingredients={recipeIngredients} />
            <RecipeSteps steps={steps} />
            <RecipeTipsAndArrangements
              tips={tips}
              arrangements={arrangements}
            />
          </CardContent>
        </Paper>
      )}
    </Stack>
  );
};

export default RecipeSearch;
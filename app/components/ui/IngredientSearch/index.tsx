"use client";

import React from "react";
import { Autocomplete, TextField, Button, Box, Chip } from "@mui/material";
import { Ingredient } from "@/app/types";

interface IngredientSearchProps {
  ingredients: Ingredient[];
  selectedIngredients: string[];
  inputValue: string;
  onInputChange: (value: string) => void;
  onAddIngredient: () => void;
  onDeleteIngredient: (ingredient: string) => void;
}

export const IngredientSearch: React.FC<IngredientSearchProps> = ({
  ingredients,
  selectedIngredients,
  inputValue,
  onInputChange,
  onAddIngredient,
  onDeleteIngredient,
}) => {
  return (
    <>
      <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
        <Autocomplete
          disablePortal
          options={ingredients}
          value={inputValue ? { label: inputValue } : null}
          onChange={(_, newValue) => onInputChange(newValue?.label || "")}
          inputValue={inputValue}
          onInputChange={(_, newInputValue) => onInputChange(newInputValue)}
          sx={{ flex: 1 }}
          renderInput={(params) => (
            <TextField placeholder="食材を入力" {...params} />
          )}
        />
        <Button
          variant="contained"
          disabled={!inputValue}
          onClick={onAddIngredient}
        >
          追加
        </Button>
      </Box>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
        {selectedIngredients.map((ingredient) => (
          <Chip
            key={ingredient}
            label={ingredient}
            onDelete={() => onDeleteIngredient(ingredient)}
            sx={{
              bgcolor: "rgb(219, 234, 254)",
              color: "rgb(29, 78, 216)",
              "& .MuiChip-deleteIcon": {
                color: "rgb(29, 78, 216)",
              },
            }}
          />
        ))}
      </Box>
    </>
  );
};

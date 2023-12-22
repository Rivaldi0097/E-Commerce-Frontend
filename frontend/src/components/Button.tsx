"use client";

import React from "react";

interface CategoryProps {
  id: string;
  buttonWord: string;
  selectedCategories: string;
  setSelectedCategories: (selectedCategories: string) => void;
}

function CategoriesButton({
  buttonWord,
  selectedCategories,
  setSelectedCategories,
}: CategoryProps) {
  const changeCategories = (e: React.MouseEvent<HTMLElement>) => {
    setSelectedCategories(e.currentTarget.id);
  };

  return (
    <button
      id={buttonWord}
      type="button"
      className={
        buttonWord === selectedCategories ? "SelectedButton" : "Button"
      }
      onClick={changeCategories}
      style={{ textTransform: "capitalize" }}
    >
      {buttonWord}
    </button>
  );
}

export default CategoriesButton;

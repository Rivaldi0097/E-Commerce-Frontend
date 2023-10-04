import { useNavigate } from "react-router-dom";
import { useGetProductCategoriesQuery } from "../redux/productSlice";
import "../styles/responsiveCategoryMenu.css";

interface IResponsiveCategoryMenu {
  showCategory: boolean;
  setShowCategory: React.Dispatch<React.SetStateAction<boolean>>;
  setMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

function ResponsiveCategoryMenu({
  showCategory,
  setShowCategory,
  setMenu,
}: IResponsiveCategoryMenu) {
  const { data: categoriesData, isSuccess: categoriesSuccess } =
    useGetProductCategoriesQuery([]);
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName: string) => {
    setShowCategory(false);
    navigate(`/category/${categoryName}`);
    setMenu(false);
  };

  return (
    <div className="category__menu__responsive">
      {categoriesData?.map((categoryName: string) => {
        return (
          <div
            className="category__items__responsive"
            key={categoryName}
            onClick={() => {
              handleCategoryClick(categoryName);
            }}
          >
            {categoryName}
          </div>
        );
      })}
    </div>
  );
}

export default ResponsiveCategoryMenu;

import { useGetProductCategoriesQuery } from "../redux/productSlice";
import "../styles/responsiveCategoryMenu.css";

function ResponsiveCategoryMenu() {
  const { data: categoriesData, isSuccess: categoriesSuccess } =
    useGetProductCategoriesQuery([]);

  return (
    <div className="category__menu__responsive">
      {categoriesData?.map((categoryName: string) => {
        return (
          <div className="category__items__responsive" key={categoryName}>
            {categoryName}
          </div>
        );
      })}
    </div>
  );
}

export default ResponsiveCategoryMenu;

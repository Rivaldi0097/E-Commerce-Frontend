import { useGetProductCategoriesQuery } from "../redux/productSlice";
import "../styles/categoryMenu.css";

function CategoryMenu() {
  const { data: categoriesData, isSuccess: categoriesSuccess } =
    useGetProductCategoriesQuery([]);

  return (
    <div className="category__menu">
      {categoriesData?.map((categoryName: string) => {
        return (
          <div className="category__items" key={categoryName}>
            {categoryName}
          </div>
        );
      })}
    </div>
  );
}

export default CategoryMenu;

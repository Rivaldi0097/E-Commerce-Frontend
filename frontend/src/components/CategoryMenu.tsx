import { useNavigate } from "react-router-dom";
import { useGetProductCategoriesQuery } from "../redux/productSlice";
import "../styles/categoryMenu.css";

interface ICategoryMenu {
  showCategory: boolean;
  setShowCategory: React.Dispatch<React.SetStateAction<boolean>>;
}

function CategoryMenu({ showCategory, setShowCategory }: ICategoryMenu) {
  const { data: categoriesData, isSuccess: categoriesSuccess } =
    useGetProductCategoriesQuery([]);
  const navigate = useNavigate();
  console.log(categoriesData);
  // console.log(showCategory);
  // console.log(setShowCategory);

  // useEffect(() => {
  //   setShowCategory(false);
  // }, []);

  const handleCategoryClick = (categoryName: string) => {
    setShowCategory(false);
    navigate(`/category/${categoryName}`);
  };

  return (
    <div className="category__menu">
      {categoriesData?.map((categoryName: string) => {
        return (
          <div
            className="category__items"
            key={categoryName}
            // onClick={() => {
            //   handleCategoryClick(categoryName);
            // }}
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

export default CategoryMenu;

import "./category-item.styles.scss";

const CategoryItem = ({category}) => {
  console.log("category: ", category);

  const { title, imageUrl } = category;
  console.log('title, imageUrl: ', title, ' ', imageUrl);

  return (
      <div className="category-container">
        <div
          className="background-image"
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
        <div className="category-body-container">
          <h2>{title}</h2>
          <p>Show now</p>
        </div>
      </div>
  );
};

export default CategoryItem;

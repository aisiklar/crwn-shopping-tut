import CategoriesDirectory from "./components/categories-directory/categories.component";

const App = () => {
  const categories = [
    {
      id: 1,
      title: "hats",
      imageUrl: "https://i.ibb.co/cvpntL1/hats.png",
    },
    {
      id: 2,
      title: "jackets",
      imageUrl: "https://i.ibb.co/px2tCc3/jackets.png",
    },
    {
      id: 3,
      title: "sneakers",
      imageUrl: "https://i.ibb.co/0jqHpnp/sneakers.png",
    },
    {
      id: 4,
      title: "womens",
      imageUrl: "https://i.ibb.co/GCCdy8t/womens.png",
    },
    {
      id: 5,
      title: "mens",
      imageUrl: "https://i.ibb.co/R70vBrQ/men.png",
    },
  ];

  return (
    <div>
      <CategoriesDirectory categories={categories}/>
    </div>
  );
};

{
  /* 
    </div>
    <div className="categories-container">
      {categories.map(({title, id, imageUrl}) => (
        <div className="category-container" key={id}>
          <div className="background-image" style={{backgroundImage: `url(${imageUrl})`}}></div>
          <div className="category-body-container" >
            <h2>{title}</h2>
            <p>Show now</p>
          </div>
        </div>
      ))}
       */
}

export default App;

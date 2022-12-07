import CategoryItem from '../category-item/category-item.component';
import './categories.styles.scss';

const CategoriesDirectory = ({categories}) => {

    console.log('categories: ', categories);

    return (
        <div className='categories-container'>
            {categories.map((category) => (
            <CategoryItem key={category.id} category={category}/>               
            ))}
        </div>
    )

}

export default CategoriesDirectory;
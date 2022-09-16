const CategoryCard = ({ category, setSelectedCategory, handleChange }) => {
    return (
        <div className="category-card" >
            <img
                className="category-card-image"
                id={category}
                alt={category}
                src={category.includes('/') ? process.env.PUBLIC_URL + `/searchLogos/Icon_MRI_CAT Scan.png` : process.env.PUBLIC_URL + `/searchLogos/Icon_${category}.png`} 
                onClick={(e) => handleChange(e.target.id, setSelectedCategory)}/>
            <h4
                className="category-card-title"
                onClick={(e) => handleChange(e.target.textContent, setSelectedCategory)}
            >
                {category}
            </h4>
        </div>
    );
}

export default CategoryCard
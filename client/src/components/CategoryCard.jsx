const CategoryCard = ({category, commonCodes, selectedCategory, setSelectedCategory, handleChange, setSearchTerm}) => {
    return (
        <div className="category-card">
            <h4
                id={category}
                onClick={(e) => handleChange(e.target.id, setSelectedCategory)}
            >
                {category}
            </h4>
            {/* <div
                className="category-card-list-container"
                hidden={category === selectedCategory ? false : true}>
                <ul className="category-card-list">
                    {commonCodes?.map((code) =>
                        code.category === category ? (
                            <li className="category-card-list-item"
                                key={code.id}
                                value={code.code}
                                onClick={(e)=>handleChange(e.target.value, setSearchTerm)}
                            >
                                {code.code} : {code.description}
                            </li>
                        ) : null
                    )}
                </ul>
            </div> */}
        </div>
    );
}

export default CategoryCard
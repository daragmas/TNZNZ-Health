const CategoryCard = ({ commonCodes, selectedCategory, handleChange, setSearchTerm }) => {
    return (
        <div className="selected-category-card" hidden={selectedCategory?false:true}>
            <h2
                className="selected-category-card-title"
                id={selectedCategory}
                // onClick={(e) => handleChange(e.target.id, setSelectedCategory)}
            >
                <u>{selectedCategory}</u>
            </h2>
            <div
                className="selected-category-card-list-container"
                // hidden={category === selectedCategory ? false : true}
                >
                <ul className="selected-category-card-list">
                    {commonCodes?.map((code) =>
                        code.category === selectedCategory ? (
                            <li className="selected-category-card-list-item"
                                key={code.id}
                                value={code.code}
                                onClick={(e) => handleChange(e.target.value, setSearchTerm)}
                            >
                                {code.code} : {code.description}
                            </li>
                        ) : null
                    )}
                </ul>
            </div>
        </div>
    );
}

export default CategoryCard
import ProcedureCard from "./ProcedureCard"

const ProcedureCardsContainer = ({ handleBack, currentCategory, currentProcedures }) => {
    return (
        <div className='procedure-cards-component-container'>
            <h2>{currentCategory.name}</h2>
            <button onClick={handleBack}>Back to Categories</button>
            <div className='procedure-cards-container'>
                {currentProcedures.map((procedure) => {
                    const { id, code, description, category } = procedure
                    return (
                        <ProcedureCard
                            key={id}
                            id={id}
                            code={code}
                            description={description}
                            category={category}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default ProcedureCardsContainer
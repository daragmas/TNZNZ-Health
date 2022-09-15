const ProcedureCard = ({ id, code, description, category }) => {
    return (
        <div className='procedure-card'>
            <small>{code}</small>
            <p>{description}</p>
        </div>
    )
}

export default ProcedureCard
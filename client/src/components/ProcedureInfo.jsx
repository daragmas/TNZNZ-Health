const ProcedureInfo = ({searchedProcedure})=>{
    return (
        <div id="procedure-info">
            <h3>{searchedProcedure?.description}</h3>
            <small>{searchedProcedure?.code}</small>
        </div>
    );
}

export default ProcedureInfo
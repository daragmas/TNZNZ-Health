const Results = ({ searchedProcedure, selectedHospital }) => {
    // console.log(searchedProcedure, selectedHospital)
    const getResultInfo = async () => {
        let req = await fetch(`http://localhost:3000/pricings/hospitals/${selectedHospital.id}/procedure_codes/${searchedProcedure.id}`)
        let res = await req.json()
        console.log(res)
    }

    getResultInfo()

    return (
        <div>
            <h1>Selected Results</h1>
            <div>
                <div>
                    Selected CPT Code/Procedure: {searchedProcedure.description}

                </div>


            </div>


        </div>
    )
}

export default Results
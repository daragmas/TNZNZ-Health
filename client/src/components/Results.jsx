import { useState, useEffect } from "react"
import ResultCards from "./ResultCards"

const Results = ({ searchedProcedure, selectedHospital, nearbyHospitals, setPricingForEstimate }) => {
    const [thisHospitalData, setThisHospitalData] = useState({})
    const [selectedCost, setSelectedCost] = useState(-1)
    const [selectedInsuranceName, setSelectedInsuranceName] = useState('')

    const getResultInfo = async () => {
        let req = await fetch(`http://localhost:3000/pricings/hospitals/${selectedHospital.id}/procedure_codes/${searchedProcedure.id}`)
        let res = await req.json()
        setThisHospitalData(res)
    }

    useEffect(() => {
        getResultInfo()
    }, [])

    const handleSelectedInsurance = (e) => {
        setSelectedCost(parseFloat(e.target.value).toFixed(2))
        setSelectedInsuranceName(e.target.selectedOptions[0].text.toLowerCase().split(" ").join("_"))
    }



    return (
        <div>
            <h1>Selected Results</h1>

            <div>
                Selected CPT Code/Procedure: {searchedProcedure.description} <br /><br />


                If you do not have insurance, the cost of this procedure is listed as: ${parseFloat(thisHospitalData.discounted_cash_price).toFixed(2)}<br /><br />

                Select your insurance: {
                    <select onChange={handleSelectedInsurance}>
                        <option></option>
                        {(thisHospitalData && thisHospitalData.insurances) ? Object.keys(thisHospitalData.insurances).map((insurance, index) => {
                            return (
                                <option key={insurance} index={index} name={insurance} value={thisHospitalData.insurances[insurance]}>{insurance.split('_').map((word) =>
                                    // capitalizing the abbreviations on the list
                                    word.length <= 4 && !word.startsWith('p') ? word.toUpperCase() : word).map((word) =>
                                        word.slice(0, 1).toUpperCase() + word.slice(1)).join(' ')}
                                </option>
                            )
                        }) : null}
                    </select>
                }<br /><br />

                {!isNaN(selectedCost) && selectedCost >= 0 ?

                    <div>Cost for this code at {selectedHospital?.hospital_system} is listed as: ${selectedCost} </div>
                    :
                    <div><small>Select an insurance above to see listed pricing data...</small></div>}

                <br /><br />
            </div>

            <div>

                Compare to:
                {nearbyHospitals.map((hospital) => {
                    return (
                        <ResultCards
                            hospital={hospital}
                            searchedProcedure={searchedProcedure}
                            selectedCost={selectedCost}
                            selectedInsuranceName={selectedInsuranceName}
                            setPricingForEstimate={setPricingForEstimate}
                        />
                    )
                })}

            </div>



        </div >
    )
}

export default Results
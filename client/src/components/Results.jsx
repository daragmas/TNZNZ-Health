import { useState, useEffect } from "react"
import ResultCards from "./ResultCards"
import { useNavigate } from "react-router-dom"

const Results = ({ searchedProcedure, selectedHospital, nearbyHospitals, setPricingForEstimate, setInsuranceForEstimate }) => {
    const [thisHospitalData, setThisHospitalData] = useState({})
    const [selectedCost, setSelectedCost] = useState(-1)
    const [selectedInsuranceName, setSelectedInsuranceName] = useState('')

    const navigate = useNavigate()

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

    const handleClick = () => {
        setPricingForEstimate(thisHospitalData)
        setInsuranceForEstimate(selectedInsuranceName)
        navigate("/TNZNZ-Health/estimate")
    }

    return (
        <div>
            <h1>Selected Results</h1>

            <div>
                Selected CPT Code/Procedure: {searchedProcedure.description} <br /><br />


                Select your insurance: {
                    <select onChange={handleSelectedInsurance}>
                        <option></option>
                        {(thisHospitalData && thisHospitalData.insurances) ? Object.keys(thisHospitalData.insurances).map((insurance, index) => {
                            return (
                                <option key={insurance} index={index} name={insurance} value={thisHospitalData.insurances[insurance]}>{insurance.split('_').map((word) =>
                                    // capitalizing the abbreviations on the list
                                    word.length <= 4 && !word.startsWith('pl') ? word.toUpperCase() : word).map((word) =>
                                        word.slice(0, 1).toUpperCase() + word.slice(1)).join(' ')}
                                </option>
                            )
                        }) : null}
                    </select>
                }<br />

                <div className="compare-results">
                    If you do not have or are not using insurance, <br />the cost of this procedure at <br /> {selectedHospital?.hospital_system} <br /> is listed as:<br /> ${parseFloat(thisHospitalData.discounted_cash_price).toFixed(2)}
                </div>

                {!isNaN(selectedCost) && selectedCost >= 0 ?

                    <div className="compare-results">
                        <div>
                            The cost for this code at {selectedHospital?.hospital_system} with the insurance you've selected is listed as: <br /> ${selectedCost}
                        </div>
                        <div className='estimate-button' onClick={handleClick}>
                            Estimate
                        </div>
                    </div>
                    :
                    <div><small>
                        Select an insurance above to see listed pricing data...
                    </small></div>}

                <br /><br />
            </div>

            <div>

                Compare to:
                {nearbyHospitals.filter((hospital) => hospital.hospital_system !== selectedHospital.hospital_system).map((hospital) => {
                    return (
                        <ResultCards
                            hospital={hospital}
                            selectedHospital={selectedHospital}
                            searchedProcedure={searchedProcedure}
                            selectedCost={selectedCost}
                            selectedInsuranceName={selectedInsuranceName}
                            setPricingForEstimate={setPricingForEstimate}
                            setInsuranceForEstimate={setInsuranceForEstimate}
                        />
                    )
                })}

            </div>



        </div >
    )
}

export default Results
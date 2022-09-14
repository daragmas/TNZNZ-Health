import { useState, useEffect } from "react"
import ResultCards from "./ResultCards"

const Results = ({ searchedProcedure, selectedHospital, nearbyHospitals }) => {
    const [thisHospitalData, setThisHospitalData] = useState({})
    const [selectedCost, setSelectedCost] = useState('')
    const [selectedInsurance, setSelectedInsurance] = useState(null)
    const [selectedInuranceName, setSelectedInsuranceName] = useState('')

    console.log('nearbyH', nearbyHospitals)

    const getResultInfo = async () => {
        let req = await fetch(`http://localhost:3000/pricings/hospitals/${selectedHospital.id}/procedure_codes/${searchedProcedure.id}`)
        let res = await req.json()
        setThisHospitalData(res)
    }

    useEffect(() => {
        getResultInfo()
    }, [])

    const handleSelectedInsurance = (e) => {
        setSelectedCost(e.target.value)
        setSelectedInsurance(e.target.index)
        console.log(e.target.index)
        console.log(e.target.name)
    }

    return (
        <div>
            <h1>Selected Results</h1>

            <div>
                Selected CPT Code/Procedure: {searchedProcedure.description} <br /><br />


                If you do not have insurance, the cost of this procedure is listed as: ${thisHospitalData.discounted_cash_price}<br /><br />

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
                Cost for this code at {`${selectedHospital?.hospital_system}`} is probably going to be: ${selectedCost} <br /><br />
            </div>

            <div>

                Compare to:
                {nearbyHospitals.map((hospital) => {
                    return (
                        <ResultCards hospital={hospital} searchedProcedure={searchedProcedure} selectedCost={selectedCost}
                            selectedInsurance={selectedInsurance} />
                    )
                })}

            </div>



        </div >
    )
}

export default Results
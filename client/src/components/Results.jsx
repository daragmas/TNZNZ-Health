import { useState, useEffect } from "react"

const Results = ({ searchedProcedure, selectedHospital }) => {
    const [thisHospitalPricingData, setThisHospitalPricingData] = useState({})
    const [selectedCost, setSelectedCost] = useState('')
    const [hospitalList, setHospitalList] = useState([])
    // const [competingPrices, setCompetingPrices] = useState([])


    const getResultInfo = async () => {
        let req = await fetch(`http://localhost:3000/pricings/hospitals/${selectedHospital.id}/procedure_codes/${searchedProcedure.id}`)
        let res = await req.json()
        setThisHospitalPricingData(res)
    }

    const getHospitalList = async () => {
        let req = await fetch('http://localhost:3000/hospitals')
        let res = await req.json()
        setHospitalList(res)
    }

    console.log('hosp list', hospitalList)

    // const getCompetingPrices = async (hospitalId) => {
    //     let req = await fetch(`http://localhost:3000/pricings/hospitals/${hospitalId}/procedure_codes/${searchedProcedure.id}`)
    //     let res = await req.json()
    //     // console.log('competing prices', res)
    //     setCompetingPrices([...competingPrices, res])
    // }


    useEffect(() => {
        getResultInfo()
        getHospitalList()
        // hospitalList.map((hospital) => {
        //     getCompetingPrices(hospital.id)
        //     console.log('hospital', hospital)
        // })
    }, [])

    // console.log(competingPrices)

    const handleSelectedInsurance = (e) => {
        setSelectedCost(e.target.value)
    }

    return (
        <div>
            <h1>Selected Results</h1>

            <div>
                Selected CPT Code/Procedure: {searchedProcedure.description} <br /><br />


                If you do not have insurance, the cost of this procedure is listed as: ${thisHospitalPricingData.discounted_cash_price}<br /><br />

                Select your insurance: {
                    <select onChange={handleSelectedInsurance}>
                        <option></option>
                        {(thisHospitalPricingData && thisHospitalPricingData.insurances) ? Object.keys(thisHospitalPricingData.insurances).map((insurance) => {
                            return (
                                <option key={insurance} value={thisHospitalPricingData.insurances[insurance]}>{insurance.split('_').map((word) =>
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

            <div className="other-results">

                {hospitalList.map((hospital) => {
                    return (
                        <div>
                            {hospital.hospital_system}, cash price: { }, price with selected insurer: { }
                        </div>
                    )
                })}

            </div>



        </div>
    )
}

export default Results
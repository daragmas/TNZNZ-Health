import { useState, useEffect } from "react";

const ResultCards = ({ hospital, searchedProcedure, selectedInsuranceName, selectedHospital }) => {

    const [pricing, setPricing] = useState({})

    useEffect(() => {
        const getCompetingPrices = async () => {
            let req = await fetch(`http://localhost:3000/pricings/hospitals/${hospital.id}/procedure_codes/${searchedProcedure.id}`)
            let res = await req.json()
            setPricing(res)
        }
        getCompetingPrices()
    }, [])

    // console.log(pricing.hospital.hospital_system)
    // console.log(hospital.hospital_system)
    console.log(selectedHospital.hospital_system)

    // hospital.hospital_system ? hospital.hospital_system !==  selectedHospital.hospital_system


    return (

        < div className="compare-results">
            {hospital.hospital_system}

            <div>
                Cash Price: <br />
                ${parseFloat(pricing.discounted_cash_price).toFixed(2)}
            </div>

            {selectedInsuranceName ?
                <div>Price With Selected Insurer: <br />
                    ${parseFloat(pricing.insurances[selectedInsuranceName]).toFixed(2)} </div> : null}
        </div>
    )
}

export default ResultCards;
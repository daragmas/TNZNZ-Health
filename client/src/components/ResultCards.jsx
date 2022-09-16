import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ResultCards = ({ hospital, searchedProcedure, selectedInsuranceName, setPricingForEstimate, setInsuranceForEstimate }) => {

    const [pricing, setPricing] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        const getCompetingPrices = async () => {
            let req = await fetch(`http://localhost:3000/pricings/hospitals/${hospital.id}/procedure_codes/${searchedProcedure.id}`)
            let res = await req.json()
            setPricing(res)
        }
        getCompetingPrices()
    }, [])

    const handleClick = () => {
        setPricingForEstimate(pricing)
        setInsuranceForEstimate(selectedInsuranceName)
        navigate("/estimate")
    }

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
            {selectedInsuranceName ?
                <div className='estimate-button' onClick={handleClick}>
                    Estimate
                </div> : null}
        </div>
    )
}

export default ResultCards;
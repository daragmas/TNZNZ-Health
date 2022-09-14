import { useState, useEffect } from "react";

const ResultCards = ({ hospital, searchedProcedure, selectedCost, selectedInsurance }) => {

    const [pricing, setPricing] = useState({})


    useEffect(() => {
        const getCompetingPrices = async () => {
            let req = await fetch(`http://localhost:3000/pricings/hospitals/${hospital.id}/procedure_codes/${searchedProcedure.id}`)
            let res = await req.json()
            setPricing(res)
        }
        getCompetingPrices()
    }, [])

    return (
        < div >
            {hospital.hospital_system}: cash price ${pricing.discounted_cash_price}, price with selected insurer ${selectedInsurance}
        </div>
    )
}

export default ResultCards;
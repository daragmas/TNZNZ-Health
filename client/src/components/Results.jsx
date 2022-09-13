import { useState, useEffect } from "react"

const Results = ({ searchedProcedure, selectedHospital }) => {
    const [data, setData] = useState({})
    const [selectedCost, setSelectedCost] = useState('')

    console.log(`selected hospital: `, data)

    const getResultInfo = async () => {
        let req = await fetch(`http://localhost:3000/pricings/hospitals/${selectedHospital.id}/procedure_codes/${searchedProcedure.id}`)
        let res = await req.json()
        console.log('res', res)
        setData(res)
    }

    const handleSelectedInsurance = (e) => {
        setSelectedCost(e.target.value)
    }

    useEffect(() => {
        getResultInfo()
    }, [])

    console.log('data', data?.insurances)

    return (
        <div>
            <h1>Selected Results</h1>
            <div>
                <div>
                    Selected CPT Code/Procedure: {searchedProcedure.description} <br /><br />

                    Cost for this code at {`${selectedHospital?.hospital_system}`} is probably going to be something along the lines of: ${selectedCost} <br /><br />

                    If you do not have insurance, the cost of this procedure is listed as: ${data.discounted_cash_price}<br /><br />

                    Select your insurance: {
                        <select onChange={handleSelectedInsurance}>
                            <option></option>
                            {(data && data.insurances) ? Object.keys(data.insurances).map((insurance) => {
                                return (
                                    <option key={insurance} value={data.insurances[insurance]}>{insurance.split('_').map((word) =>
                                        // capitalizing the abbreviations on the list
                                        word.length <= 4 && !word.startsWith('p') ? word.toUpperCase() : word).map((word) =>

                                            word.slice(0, 1).toUpperCase() + word.slice(1)).join(' ')



                                    }</option>
                                )
                            }) : null}
                        </select>
                    }<br /><br />
                </div>


            </div>


        </div>
    )

}

export default Results
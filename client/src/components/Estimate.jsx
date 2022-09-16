import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Estimate = ({ pricingForEstimate, insurance }) => {
    const [copay, setCopay] = useState(0)
    const [maxDeductible, setMaxDeductible] = useState(0)
    const [deductibleMet, setDeductibleMet] = useState(0)
    const [coinsurance, setCoinsurance] = useState(0)
    const [maxOutOfPocket, setMaxOutOfPocket] = useState(0)
    const [outOfPocketMet, setOutOfPocketMet] = useState(0)
    const [userResult, setUserResult] = useState({})
    const [awaitingResult, setAwaitingResult] = useState(true)
    const [isParticipating, setIsParticipating] = useState("Yes")
    const [isCovered, setIsCovered] = useState("Yes")

    const navigate = useNavigate()

    const {
        id,
        hospital_id,
        procedure_code_id,
        gross_charges,
        discounted_cash_price,
        insurances,
        hospital,
        procedure_code
    } = pricingForEstimate

    useEffect(() => {
        const getPricingWithHospitalAndProcedure = async () => {
            let req = await fetch(`http://localhost:3000/pricings/${id}/`)
            let res = await req.json()
        }
        getPricingWithHospitalAndProcedure()
    }, [])

    const getBoolean = (string) => {
        if (string == "Yes") {
            return true
        } else {
            return false
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let obj = {
            ...userResult,
            insurance: insurance,
            copay: copay,
            deductible: maxDeductible,
            deductible_met: deductibleMet,
            coinsurance: coinsurance,
            out_of_pocket: maxOutOfPocket,
            out_of_pocket_met: outOfPocketMet,
            service_category: procedure_code.category,
            in_network: getBoolean(isParticipating)
        }
        // setAwaitingResult(false)
        console.log(obj)
        setUserResult(obj)
        console.log(calculate())
    }

    const evaluateOOP = (num) => {
        let target = maxOutOfPocket - outOfPocketMet
        if (num > target) {
            return target 
        } else return num
    }

    const calculate = () => {
        let cost = parseFloat(pricingForEstimate.insurances[insurance])
        let deduct = maxDeductible - deductibleMet
        if (cost > 0) {
            if (maxOutOfPocket == outOfPocketMet) {
                return 0
            } else if (cost < copay) {
                return evaluateOOP(cost)
            } else if (cost < (copay + deduct)) {
                return evaluateOOP(cost)
            } else if (cost > (copay + deduct)) {
                let ptr = copay + deduct
                let coinsAmt = (cost - ptr) * coinsurance
                return evaluateOOP(ptr + coinsAmt)
            }
        } else alert('invalid input')
    }

    const adjustName = (name) => {
        return name.split('_').map((word) =>
            // capitalizing the abbreviations on the list
            word.length <= 4 && !word.startsWith('p') ? word.toUpperCase() : word).map((word) =>
                word.slice(0, 1).toUpperCase() + word.slice(1)).join(' ')
    }
    
    const handleChangeP = (e) => {
        setIsParticipating(e.target.value)
    }

    const handleChangeC = (e) => {
        setIsCovered(e.target.value)
    }

    return (
        <div className='estimate'>
        { awaitingResult 
            ?
                <div className='estimate-form-container'>
                    <div>{procedure_code.description} at {hospital.hospital_system}: Gross charges ${parseFloat(gross_charges).toFixed(2)} Insurance Rate through {adjustName(insurance)}: ${parseFloat(insurances[insurance]).toFixed(2)}</div>
                    <form onSubmit={handleSubmit}>
                        <div className='estimate-question'>
                            <p>Does this hospital participate with your insurance?</p>
                            <div className='radio-container'>
                                <input type='radio' onChange={handleChangeP} checked={isParticipating === "Yes"} value="Yes"/><label>Yes</label>
                                <input type='radio' onChange={handleChangeP} checked={isParticipating === "No"} value="No"/><label>No</label>
                                <br />
                            </div>
                        </div>
                        <div className='estimate-question'>
                            <p>Does your insurance cover this procedure?</p>
                            <div className='radio-container'>
                                <input type='radio' onChange={handleChangeC} checked={isCovered === "Yes"} value="Yes" /><label>Yes</label>
                                <input type='radio' onChange={handleChangeC} checked={isCovered === "No"} value="No" /><label>No</label>
                                <br />
                            </div>
                        </div>
                        <div className='estimate-question'>
                            <div className='number-container'>
                                <label> Copayment for service </label><input type='number' value={parseFloat(copay)} onChange={(e => setCopay(parseFloat(e.target.value)))}/>
                                <br />
                            </div>
                        </div>
                        <div className='estimate-question'>
                            <div className='number-container'>
                                <label> Annual deductible </label><input type='number' value={parseFloat(maxDeductible)} onChange={(e => setMaxDeductible(parseFloat(e.target.value)))}/>
                                <label> Amount met to date </label><input type='number' value={parseFloat(deductibleMet)} onChange={(e => setDeductibleMet(parseFloat(e.target.value)))}/><span>/{maxDeductible}</span>
                                <br />
                            </div>
                        <div className='estimate-question'>
                            <div className='number-container'>
                                <label> Coinsurance for service </label><input type='number' min="0" max="100" value={parseFloat(coinsurance)} onChange={(e => setCoinsurance(parseFloat(e.target.value)))}/>%
                                <br />
                            </div>
                        </div>
                        </div>
                        <div className='estimate-question'>
                            <div className='number-container'>
                                <label> Annual out-of-pocket maximum </label><input type='number' value={maxOutOfPocket} onChange={(e => setMaxOutOfPocket(parseFloat(e.target.value)))} />
                                <label> Amount met to date </label><input type='number' value={outOfPocketMet} onChange={(e => setOutOfPocketMet(parseFloat(e.target.value)))} /><span>/{maxOutOfPocket}</span>
                                <br />
                            </div>
                        </div>
                        <div className='submission-div'>
                            <button type='submit'>Calculate</button>
                        </div>

                    </form>
                </div>
            :
                <div className='estimate-results-container'>
                    <div className='estimate-card'>
                        <div>
                            Your expected cost: {}
                        </div>
                    </div>
                </div>
        }
        </div>
    )
}

export default Estimate
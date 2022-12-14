import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Cookies from 'js-cookie'

const Estimate = ({ pricingForEstimate, insurance }) => {
    const user = useSelector((state) => state.user.value)
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
    const [calculatedCost, setCalculatedCost] = useState(null)
    const [copayApplication, setCopayApplication] = useState(0)
    const [deductibleApplication, setDeductibleApplication] = useState(0)
    const [coinsuranceApplication, setCoinsuranceApplication] = useState(0)
    const [showNicknameMenu, setShowNicknameMenu] = useState(false)
    const [nickname, setNickname] = useState('')

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

    const getBoolean = (string) => {
        if (string == "Yes") {
            return true
        } else {
            return false
        }
    }

    const postInsurance = async () => {
        if (user.id != null) {
            let req = await fetch('http://localhost:3000/insurances', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(userResult)
            })
            if (req.ok) {
                let res = await req.json()
            } else {
                alert(':^)')
            }
        } else {
            alert('Please log in')
        }
    }

    const handleClickSave = () => {
        setShowNicknameMenu(true)
    }

    const handleChangeN = (e) => {
        setNickname(e.target.value)
    }


    const handleSubmitSave = async (e) => {
        e.preventDefault()
        await postInsurance()
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (deductibleMet > maxDeductible || outOfPocketMet > maxOutOfPocket) {
            alert('Please review the form for issues.')
        } else {
            let obj = {
                ...userResult,
                coinsurance: coinsurance,
                copay: copay,
                deductible: maxDeductible,
                deductible_met: deductibleMet,
                insurance: insurance,
                in_network: getBoolean(isParticipating),
                nickname: `${insurance} ${procedure_code.category.toLowerCase()}`,
                out_of_pocket: maxOutOfPocket,
                out_of_pocket_met: outOfPocketMet,
                service_category: procedure_code.category,
                user_id: user.id
            }
            setUserResult(obj)
            // console.log(obj)
            setCalculatedCost(calculate())
        }
        setAwaitingResult(false)
    }
    
    const evaluateOOP = (num) => {
        let target = maxOutOfPocket - outOfPocketMet
        if (num > target) {
            return target 
        } else return num
    }
    
    const calculate = () => {
        let cost = parseFloat(pricingForEstimate.insurances[insurance])
        if (!getBoolean(isCovered) || !getBoolean(isParticipating)) {
            return parseFloat(discounted_cash_price).toFixed(2)
        }
        let deduct = maxDeductible - deductibleMet
        if (cost > 0) {
            if (maxOutOfPocket == outOfPocketMet && maxOutOfPocket > copay) {
                return 0
            } else if (cost < copay) {
                maxOutOfPocket != 0 ? setCopayApplication(evaluateOOP(cost)) : setCopayApplication(cost)
                return evaluateOOP(cost)
            } else if (cost < (copay + deduct)) {
                setCopayApplication(copay)
                setDeductibleApplication(evaluateOOP(cost) - copay)
                return evaluateOOP(cost)
            } else if (cost > (copay + deduct)) {
                setCopayApplication(copay)
                setDeductibleApplication(deduct)
                let ptr = copay + deduct
                let coinsAmt = (cost - ptr) * coinsurance / 100
                setCoinsuranceApplication(coinsAmt)
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
                            <label> Copayment for service </label><input type='number' min={0} value={parseFloat(copay)} onChange={(e => setCopay(parseFloat(e.target.value)))}/>
                            <br />
                        </div>
                    </div>
                    <div className='estimate-question'>
                        <div className='number-container'>
                            <label> Annual deductible </label><input type='number' min={0} value={parseFloat(maxDeductible)} onChange={(e => setMaxDeductible(parseFloat(e.target.value)))}/>
                            <label> Amount met to date </label><input type='number' min={0} value={parseFloat(deductibleMet)} onChange={(e => setDeductibleMet(parseFloat(e.target.value)))}/><span>/{maxDeductible}</span>
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
                            <label> Annual out-of-pocket maximum </label><input type='number' min={maxDeductible} value={maxOutOfPocket} onChange={(e => setMaxOutOfPocket(parseFloat(e.target.value)))} />
                            <label> Amount met to date </label><input type='number' min={0} value={outOfPocketMet} onChange={(e => setOutOfPocketMet(parseFloat(e.target.value)))} /><span>/{maxOutOfPocket}</span>
                            <br />
                        </div>
                    </div>
                    <div className='submission-div'>
                        <button type='submit'>{awaitingResult ? "Calculate" : "Re-calculate"}</button>
                    </div>

                </form>
            </div>
            {awaitingResult
                ? 
                <div>
                    Disclaimer: a calculation provided by this website is not a guarantee of payment. For complete details regarding your insurance policy, please contact your insurance provider.
                </div>
                :
                <div className='estimate-results-container'>
                    <div className='estimate-card'>
                        <div className='cost-container'>
                            Your expected responsibility: ${maxOutOfPocket !== 0 ? parseFloat(calculatedCost).toFixed(2) : parseFloat(copayApplication).toFixed(2)}
                        </div>
                        {(!getBoolean(isCovered) || !getBoolean(isParticipating)) && awaitingResult                           
                            ?
                            <div className='responsibility-container'>
                                Your responsibility for non-covered services or services rendered by an out-of-network proivder may equal 100% of billed charges. 
                            </div>
                            :
                            <div className='breakdown-container'>
                                <div className='amounts-container'>
                                    <div>
                                        Amount applied to copay: ${parseFloat(copayApplication).toFixed(2)}
                                    </div>
                                    <div>
                                        Amount applied to deductible: ${parseFloat(deductibleApplication).toFixed(2)}
                                    </div>
                                    <div>
                                        Amount applied to coinsurance: ${parseFloat(coinsuranceApplication).toFixed(2)}
                                    </div>
                                    <div>
                                        Your Savings: ${parseFloat(gross_charges - parseFloat(coinsuranceApplication).toFixed(2) - parseFloat(deductibleApplication).toFixed(2) - parseFloat(copayApplication).toFixed(2)).toFixed(2)}
                                    </div>
                                    <div>
                                        Insurance Discount: ${parseFloat(gross_charges - insurances[insurance]).toFixed(2)}
                                    </div>
                                    <div>
                                        Insurance Payout: ${parseFloat(insurances[insurance] - parseFloat(coinsuranceApplication).toFixed(2) - parseFloat(deductibleApplication).toFixed(2) - parseFloat(copayApplication).toFixed(2)).toFixed(2)}
                                    </div>
                                </div>
                                <div>
                                    <div className='save-insurance-button' onClick={handleClickSave}>
                                        Save This Policy Info
                                    </div>
                                    { showNicknameMenu 
                                    ? 
                                        <div className='nickname-container'>
                                            <form onSubmit={handleSubmitSave}>
                                            <input type='text' name='nn' value={nickname} placeholder='nickname' onChange={handleChangeN} /> 
                                            <button type='submit'>Save</button>
                                            </form>
                                        </div>
                                    : 
                                        null 
                                    }
                                </div>
                            </div>
                        }
                    </div>
                </div>
        }
            {deductibleMet > maxDeductible ? <div>Error: the amount met toward your deductible cannot exceed your annual deductible.</div> : <></>}
            {outOfPocketMet > maxOutOfPocket ? <div>Error: the amount met toward your out-of-pocket maximum cannot exceed your annual out-of-pocket maximum.</div> : <></>}
        </div>
    )
}

export default Estimate
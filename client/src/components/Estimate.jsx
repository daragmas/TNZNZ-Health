import { useState } from 'react'

const Estimate = () => {
    const [copay, setCopay] = useState(null)
    const [maxDeductible, setMaxDeductible] = useState(null)
    const [deductibleMet, setDeductibleMet] = useState(null)
    const [maxOutOfPocket, setMaxOutOfPocket] = useState(null)
    const [outOfPocketMet, setOutOfPocketMet] = useState(null)
    const [userResult, setUserResult] = useState({})
    const [awaitingResult, setAwaitingResult] = useState(true)

    const handleSubmit = (e) => {
        e.preventDefault()
        setUserResult({
            ...userResult,
            copay: copay,
            deductible: maxDeductible,
            deductibleMet: deductibleMet,
            outOfPocket: maxOutOfPocket,
            outOfPocketMet: outOfPocketMet,
            priceWithInsurer: 0 // tbd
        }) 
        setAwaitingResult(false)
    }



    return (
        <div className='estimate'>
        { awaitingResult 
            ?
                <div className='estimate-form-container'>
                    <form onSubmit={handleSubmit}>
                        <div className='estimate-question'>
                            <p>Does this hospital participate with your insurance?</p>
                            <div className='radio-container'>
                                <input type='radio' /><label>Yes</label>
                                <input type='radio' /><label>No</label>
                                <br />
                                <input type='radio' /><label>I don't know</label>
                            </div>
                        </div>
                        <div className='estimate-question'>
                            <p>Does your insurance cover this procedure?</p>
                            <div className='radio-container'>
                                <input type='radio' /><label>Yes</label>
                                <input type='radio' /><label>No</label>
                                <br />
                                <input type='radio' /><label>I don't know</label>
                            </div>
                        </div>
                        <div className='estimate-question'>
                            <div className='number-container'>
                                <label> Copayment for service </label><input type='number' value={copay} onChange={(e => setCopay(e.target.value))}/>
                                <br />
                                <input type='radio' /><label>I don't know</label>
                            </div>
                        </div>
                        <div className='estimate-question'>
                            <div className='number-container'>
                                <label> Annual deductible </label><input type='number' value={maxDeductible} onChange={(e => setMaxDeductible(e.target.value))}/>
                                <label> Amount met to date </label><input type='number' /><span>/{maxDeductible}</span>
                                <br />
                                <input type='radio' /><label>I don't know</label>
                            </div>
                        </div>
                        <div className='estimate-question'>
                            <div className='number-container'>
                                <label> Annual out-of-pocket maximum </label><input type='number' value={maxOutOfPocket} onChange={(e => setMaxOutOfPocket(e.target.value))} />
                                <label> Amount met to date </label><input type='number' /><span>/{maxOutOfPocket}</span>
                                <br />
                                <input type='radio' /><label>I don't know</label>
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
                    </div>
                </div>
        }
        </div>
    )
}

export default Estimate
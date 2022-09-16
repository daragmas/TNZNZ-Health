import { useState, useEffect } from 'react'
import SavedInsuranceCard from "./SavedInsuranceCard"
import { useSelector } from 'react-redux'
import Cookies from 'js-cookie';

const SavedInsurances = ({ adjustName }) => {
    const user = useSelector((state) => state.user.value)
    const [userInsurances, setUserInsurances] = useState([])
    
    useEffect(() => {
        const getInsurances = async () => {
            let req = await fetch(`http://localhost:3000/users/${user.id}/insurances`)
            let res = await req.json()
            setUserInsurances(res)
        }
        getInsurances()
    }, [])

    return (
        <div className='saved-insurance-container'>
            {userInsurances.map((insurance) => {
                return (
                    <SavedInsuranceCard
                        key={insurance.id}
                        insuranceBody={insurance}
                        adjustName={adjustName}
                    />
                )
            })}
        </div>
    )
}

export default SavedInsurances
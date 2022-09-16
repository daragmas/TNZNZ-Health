const SavedInsuranceCard = ({ insuranceBody, adjustName }) => {

    const {id, coinsurance, copay, deductible, insurance, nickname, out_of_pocket, service_category} = insuranceBody
    return (
        <div className='insurance-card'>
            <p>
                {nickname}
            </p>
            <p>
                {adjustName(insurance)}
            </p>
            <p>
                {service_category}
            </p>
        </div>
    )
}

export default SavedInsuranceCard
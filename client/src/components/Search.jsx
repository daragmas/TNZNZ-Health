import { useState } from "react"

const Search = () => {
    //User Input
    const [searchTerm, setSearchTerm] = useState("")
    const [searchZip, setSearchZip] = useState("")

    //Server Responses
    const [searchedProcedure, setSearchedProcedure] = useState({})
    const [nearbyHospitals, setNearbyHospitals] = useState([])

    //Listener Functions
    const handleChange = (e, setter) => {
        setter(e.target.value)
        console.log(e.target.value)
    }

    const handleHospitalClick = ()=>{
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(searchTerm)
        //TODO: Put in database URL once routes are set up
        const req = await fetch(`http://localhost:3000/procedure_codes/by_code/${searchTerm}`)
        const res = await req.json()
        console.log(res)
        setSearchedProcedure(res)
    }

    const handleZipSubmit = async (e) => {
        e.preventDefault()
        // console.log(searchZip)
        const req = await fetch(`http://localhost:3000/hospitals/nearby/${searchZip}`)
        const res = await req.json()
        console.log(res)
        setNearbyHospitals(res)
    }

    // Dynamic HTML Components

    const hospital_list = () => {
        return (
            <div id="nearby-hopitals">
                {nearbyHospitals.map((hospital) => {
                    return (
                        <div className="hospital-card" key={hospital.id}>
                            <h3>{hospital.hospital_system}</h3>
                            <small>{hospital.address}</small>
                        </div>)
                })}
            </div>
        )
    }


    const procedureInfo = () => {
        // console.log(searchedProcedure)
        return (
            <div id="procedure-info">
                <h3 onClick={handleHospitalClick}>{searchedProcedure.description}</h3>
                <small>{searchedProcedure.code}</small>
            </div>)
    }

    const zip_entry = () => {
        return (
            <>
                <label htmlFor="zip-entry">Zip Code</label>
                <form id='zip-entry' onSubmit={handleZipSubmit}>
                    <input type='text' onChange={(e) => handleChange(e, setSearchZip)} />
                    <input type='submit' />
                </form>
            </>)
    }

    //Exported Component
    return (
        <>
            <label htmlFor="cpt-search-form">Search</label>
            <form id="cpt-search-form" onSubmit={handleSubmit} >
                <input
                    type='text'
                    onChange={(e) => handleChange(e, setSearchTerm)}
                    placeholder="Enter keyword or CPT code"
                />
                <input type='submit' />
            </form>

            {procedureInfo()}

            {searchedProcedure != "" ? zip_entry() : null}

            {hospital_list()}

        </>
    )
}

export default Search
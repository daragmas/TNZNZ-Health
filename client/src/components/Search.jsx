import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Search = ({ searchedProcedure, setSelectedHospital, setSearchedProcedure }) => {
    //Setting up redirect
    let navigate = useNavigate()
    //User Input
    const [searchTerm, setSearchTerm] = useState("")
    const [searchZip, setSearchZip] = useState("")
    const [isDisabled, setIsDisabled] = useState(true)

    //Server Responses
    // const [searchedProcedure, setSearchedProcedure] = useState({})
    const [nearbyHospitals, setNearbyHospitals] = useState([])
    const [commonCodes, setCommonCodes] = useState([])

    const getCommonCodes = async () => {
        const req = await fetch('http://localhost:3000/common_procedure_codes')
        const res = await req.json()
        setCommonCodes(res)
    }

    //Setting up categories
    useEffect(()=>{        
        getCommonCodes()
    },[])


    //Listener Functions
    const handleChange = (e, setter) => {
        setter(e.target.value)
        console.log(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(searchTerm)
        //TODO: Put in database URL once routes are set up
        const req = await fetch(`http://localhost:3000/procedure_codes/by_code/${searchTerm}`)
        const res = await req.json()
        console.log(res)
        setSearchedProcedure(res)
        if (res) {setIsDisabled(false) }
    }

    const handleZipSubmit = async (e) => {
        e.preventDefault()
        // console.log(searchZip)
        const req = await fetch(`http://localhost:3000/hospitals/nearby/${searchZip}`)
        const res = await req.json()
        console.log(res)
        setNearbyHospitals(res)
    }

    const handleHospitalClick = (e) => {
        console.log(e.target.id)
        setSelectedHospital(nearbyHospitals[e.target.id])
        navigate("/results")
    }

    // Dynamic HTML Components

    const hospital_list = () => {
        return (
            <div id="nearby-hopitals">
                {nearbyHospitals.map((hospital, index) => {
                    return (
                        <div className="hospital-card" key={hospital.id}>
                            <h3 id={index} onClick={handleHospitalClick}>{hospital.hospital_system}</h3>
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
                <h3>{searchedProcedure.description}</h3>
                <small>{searchedProcedure.code}</small>
            </div>)
    }
    let categories = []
    commonCodes.map((code) => categories.includes(code.category) ? null : categories.push(code.category) )
    
    console.log(commonCodes)
    console.log(categories)

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

            <label htmlFor="zip-entry">Zip Code</label>
            <form id='zip-entry' onSubmit={handleZipSubmit}>
                <input type='text' onChange={(e) => handleChange(e, setSearchZip)} />
                <button disabled={isDisabled} >Submit</button>
            </form>

            {hospital_list()}

            <hr></hr>

            <h2>Common Categories</h2>
            {categories.map((category)=>{
                return(
                    <div className="category-card">
                        <h4>{category}</h4>
                    </div>
                )
            })}

        </>
    )
}

export default Search
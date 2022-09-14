import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Search = ({ searchedProcedure, setSelectedHospital, setSearchedProcedure }) => {
    //Setting up redirect
    let navigate = useNavigate()

    //User Input
    const [searchTerm, setSearchTerm] = useState("")
    const [searchZip, setSearchZip] = useState("")
    const [isDisabled, setIsDisabled] = useState(true)
    const [selectedCategory, setSelectedCategory] = useState('')

    //Server Responses
    const [nearbyHospitals, setNearbyHospitals] = useState([])
    const [commonCodes, setCommonCodes] = useState([])
    const [categories, setCategories] = useState([])

    const getData = async (setter, route) => {
        const req = await fetch(`http://localhost:3000/${route}`)
        const res = await req.json()
        setter(res)
    }

    //Setting up categories
    useEffect(() => {
        // getCommonCodes()
        getData(setCommonCodes, "common_procedure_codes")
        getData(setCategories, "categories")
    }, [])


    //Listener Functions
    const handleChange = (value, setter) => {
        setter(value)
        // console.log(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(searchTerm)
        //TODO: Put in database URL once routes are set up
        const req = await fetch(`http://localhost:3000/procedure_codes/by_code/${searchTerm}`)
        const res = await req.json()
        // console.log(res)
        setSearchedProcedure(res)
        if (res) { setIsDisabled(false) }
    }

    const handleZipSubmit = async (e) => {
        e.preventDefault()
        // console.log(searchZip)
        const req = await fetch(`http://localhost:3000/hospitals/nearby/${searchZip}`)
        const res = await req.json()
        // console.log(res)
        setNearbyHospitals(res)
    }

    const handleHospitalClick = (e) => {
        // console.log(e.target.id)
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

    let common_categories = []
    commonCodes.map((code) => common_categories.includes(code.category) ? null : common_categories.push(code.category) )

    console.log("Common Codes: ", commonCodes)
    console.log("categories: ", categories)
    console.log("Common Categories: ", common_categories)
    console.log("selected Category: ", selectedCategory)

    //Exported Component
    return (
        <>
            <label htmlFor="cpt-search-form">Search</label>
            <form id="cpt-search-form" onSubmit={handleSubmit} >
                <input
                    type='text'
                    onChange={(e) => handleChange(e.target.value, setSearchTerm)}
                    placeholder="Enter keyword or CPT code"
                />
                <input type='submit' />
            </form>

            {procedureInfo()}

            <label htmlFor="zip-entry">Zip Code</label>
            <form id='zip-entry' onSubmit={handleZipSubmit}>
                <input type='text' onChange={(e) => handleChange(e.target.value, setSearchZip)} />
                <button disabled={isDisabled} >Submit</button>
            </form>

            {hospital_list()}

            <hr></hr>

            <h2>Common Categories</h2>
            {common_categories.map((category)=>{
                return(
                    <div className="category-card">
                        <h4 id={category} onClick={(e)=>handleChange(e.target.id,setSelectedCategory)}>{category}</h4>
                        <div className="category-card-list-container" hidden={category===selectedCategory? false:true}>
                            <ul className="categord-card-list">
                                {commonCodes.map((code)=>code.category==category ? <li>{code.code}:{code.description}</li>:null)}
                            </ul>
                        </div>
                    </div>
                )
            })}

        </>
    )
}

export default Search
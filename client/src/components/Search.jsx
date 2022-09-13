import { useState } from "react"

const Search = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [searchZip, setSearchZip] = useState("")
    const [searchedProcedure, setSearchedProcedure] = useState({})

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
    }

    const handleZipSubmit = async (e) => {
        e.preventDefault()
        console.log(searchZip)
        /*TODO: Once Geocoder is configured, get hospitals closest to zip code. Then, return procedure costs for those hospital(s) */
    }

    const procedureInfo = () => {
        // console.log(searchedProcedure)
        return (
            <div id="procedure-info">
                <h3>{searchedProcedure.description}</h3>
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

    return (
        <>
            <form onSubmit={handleSubmit} >
                <input
                    type='text'
                    onChange={(e) => handleChange(e, setSearchTerm)}
                    placeholder="Enter keyword or CPT code"
                />
                <input type='submit' />
            </form>

            {procedureInfo()}

            {searchedProcedure != "" ? zip_entry() : null}

        </>
    )
}

export default Search
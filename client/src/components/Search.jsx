import { useState } from "react"

const Search = () => {
    const [searchTerm, setSearchTerm] = useState("")

    const handleChange = (e) => {
        setSearchTerm(e.target.value)
        console.log(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(searchTerm)
        //TODO: Put in database URL once routes are set up
        const req = await fetch(`http://localhost:3000/procedure_codes/by_code/${searchTerm}`)
        const res = await req.json()
        console.log(res)

    }
    return (
        <>
            <form onSubmit={handleSubmit} >
                <input
                    type='text'
                    onChange={handleChange}
                    placeholder="Enter keyword or CPT code"
                    />
                <input type='submit' />

            </form>

        </>
    )
}

export default Search
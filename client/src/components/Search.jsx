import { useState } from "react"

const Search = ()=>{
    const [searchTerm, setSearchTerm] = useState("")

    const handleChange = (e) =>{
        setSearchTerm(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        //TODO: Put in database URL once routes are set up
        const req = await fetch("localhost:3000/search", {
        header:{"Content-type":"application/json"},
        body: {"search_query":`${searchTerm}`}
        })
        const res = await req.json()
        
    }
    return (
        <>
            <input 
                type='text' 
                onChange={handleChange} 
                placeholder="Enter keyword or CPT code"
                onSubmit={handleSubmit}/>
        </>
    )
}

export default Search
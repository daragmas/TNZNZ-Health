import { useState } from "react"

const Search = ()=>{
    const [searchTerm, setSearchTerm] = useState("")

    const handleChange = (e) =>{
        setSearchTerm(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
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
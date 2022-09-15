import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CategoryCard from "./CategoryCard";
import HostpitalList from "./HospitalList";
import ProcedureInfo from "./ProcedureInfo";
import { useSelector } from 'react-redux'
const Search = ({
    searchedProcedure,
    setSelectedHospital,
    setSearchedProcedure,
    nearbyHospitals,
    setNearbyHospitals,
}) => {

    //Setting up redirect
    let navigate = useNavigate();
    let user = useSelector(state => state.user.value)
    console.log(user.zip_code)
    //User Input
    const [searchTerm, setSearchTerm] = useState("");
    const [searchZip, setSearchZip] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    //Server Responses
    const [commonCodes, setCommonCodes] = useState([])

    useEffect(() => {
        setSearchZip(user.zip_code)
    }, [user])
    const getData = async (setter, route) => {
        // console.log("token", Cookies.get("token"));
        const req = await fetch(`http://localhost:3000/${route}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
        });
        const res = await req.json();
        setter(res);
    };

    //Setting up categories
    useEffect(() => {
        getData(setCommonCodes, "common_procedure_codes");
    }, []);

    //Listener Functions
    const handleChange = (value, setter) => {
        setter(value);
        // console.log(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        //TODO: Replace with remote database URL
        const req = await fetch(
            `http://localhost:3000/procedure_codes/by_code/${searchTerm}`,
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
            }
        );
        const res = await req.json();
        setSearchedProcedure(res);
    };

    const handleZipSubmit = async (e) => {
        e.preventDefault();
        // console.log(searchZip)
        const req = await fetch(
            `http://localhost:3000/hospitals/nearby/${searchZip}`,
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
            }
        );
        const res = await req.json();
        // console.log("res2", res);
        if (searchedProcedure.id === undefined) {
            const _req = await fetch(
                `http://localhost:3000/procedure_codes/by_code/${searchTerm}`,
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("token")}`,
                    },
                }
            );
            const _res = await _req.json();
            setSearchedProcedure(_res);
        }
        setNearbyHospitals(res);
    };

    const handleHospitalClick = (e) => {
        // console.log(e.target.id)
        setSelectedHospital(nearbyHospitals[e.target.id]);
        navigate("/results");
    };

    // Dynamic HTML Components

    let common_categories = [];

    commonCodes.map((code) =>
        common_categories.includes(code.category)
            ? null
            : common_categories.push(code.category)
    );

    //Exported Component
    return (
        <>
            <label htmlFor="cpt-search-form">Search</label>
            <form id="cpt-search-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => handleChange(e.target.value, setSearchTerm)}
                    placeholder={searchTerm ? searchTerm : "Enter CPT code"}
                />
                <input type="submit" />
            </form>

            <label htmlFor="zip-entry">Zip Code</label>
            <form id="zip-entry" onSubmit={handleZipSubmit}>
                <input
                    value={searchZip}
                    type="text"
                    onChange={(e) => handleChange(e.target.value, setSearchZip)}
                />
                <button disabled={searchTerm ? false : true}>Submit</button>
            </form>

            <ProcedureInfo searchedProcedure={searchedProcedure} />
            <HostpitalList hospitals={nearbyHospitals} hospitalClick={handleHospitalClick} />

            <hr></hr>

            <h2>Common Categories</h2>
            {common_categories?.map((category) =>
                <CategoryCard
                    category={category}
                    commonCodes={commonCodes}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    handleChange={handleChange}
                    setSearchTerm={setSearchTerm}
                    key={category}
                />)}
        </>
    );
};

export default Search;

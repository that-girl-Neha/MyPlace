import "./Filter.scss";
import  {useSearchParams} from "react-router-dom";
import { useState } from "react";

function Filter(){
 const [searchParams,setSearchParams] = useSearchParams();
//  console.log(searchParams.get("location"));

const [query,setQuery] = useState({
    type:  searchParams.get("type") || "",
    location:  searchParams.get("location") || "",
    property:  searchParams.get("property") || "",
    minPrice:  searchParams.get("minPrice") || 0,
    maxPrice:  searchParams.get("maxPrice") || 10000000,
    bedroom:  searchParams.get("bedroom") || 1,

});

const handleChange= (e)=>{

    setQuery({
        ...query,
        [e.target.name]:e.target.value,
    });
};

const handleFilter = ()=>{
setSearchParams(query);

};
    return (<>
         <div className="Filter">
            <h1>Search results for <b>{searchParams.get("location")}</b></h1>
            <div className="top">
                <div className="item">
                    <label htmlFor="area">Location</label>
                    <input type="text"
                     id="location"
                      name="location"
                       placeholder="Area Location"
                        onChange={handleChange}
                        defaultValue={query.location}
                       />
                </div>
            </div>

            <div className="bottom">
            <div className="item">
                    <label htmlFor="type">Type</label>
                    <select name="type" id="type" onChange={handleChange}  defaultValue={query.type}>
                        <option value="buy">Buy</option>
                        <option value="rent">Rent</option>
                    </select>
                </div>

                <div className="item">
                    <label htmlFor="property">Property</label>
                    <select name="property" id="property" onChange={handleChange}  defaultValue={query.property}>
                        <option value="vila">Vila</option>
                        <option value="apartment">Apartment</option>
                        <option value="land">Land</option>
                        <option value="house">House</option>
                        <option value="business">Business</option>
                    </select>
                </div>

                <div className="item">
                    <label htmlFor="minPrice">minPrice</label>
                    <input type="number" 
                    id="minPrice" 
                    name="minPrice" 
                    placeholder="any"
                    onChange={handleChange}
                    defaultValue={query.minPrice}
                    />
                </div>

                <div className="item">
                    <label htmlFor="maxPrice">maxPrice</label>
                    <input type="number"
                     id="maxPrice"
                      name="maxPrice"
                       placeholder="any"
                       onChange={handleChange}
                       defaultValue={query.maxPrice}
                       />
                </div>

                <div className="item">
                    <label htmlFor="bedroom">bedroom</label>
                    <input type="number" 
                    id="bedroom" 
                    name="bedroom" 
                    placeholder="any"
                    onChange={handleChange}
                    defaultValue={query.bedroom}
                    />
                </div>

                <button onClick={handleFilter}>
                    <img src="/search.png" alt=""/>
                </button>
            </div>
         </div>
    </>);
}

export default Filter;
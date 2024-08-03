import "./Homepage.scss";
import SearchBar from "../SearchBar/SearchBar";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Homepage(){
const {currentUser} =useContext(AuthContext);

console.log(currentUser);
    return(<>
        <div className="Homepage">
          <div className="textContainer">
           <div className="wrapper">
           <h1 class="title"> Find your dream place that give you peace and space at MyPlace.</h1>
           <p>MyPlace: Your portal to the perfect place like home. We offer a curated selection of properties, 
           from city apartments to countryside havens. 
           Find your ideal space where tranquility meets comfort, all at your fingertips.</p>
           <SearchBar/>
           <div className="boxes">

            <div className="box">
              <h1>10+</h1>
              <p>Years of Experience</p>
            </div>

            <div className="box">
              <h1>500</h1>
              <p>Awards Gained</p>
            </div>

            <div className="box">
              <h1>1200+</h1>
              <p>Property Ready</p>
            </div>

           </div>
           </div>
          </div>
          <div className="imgContainer">
            <img src="/bg.png" alt=""/>
          </div>
        </div>
    </>);
}
export default Homepage;
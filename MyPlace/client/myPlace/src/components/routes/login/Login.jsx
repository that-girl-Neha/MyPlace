import "./Login.scss";
import apiRequest from "../../../library/apiRequest";
import { Link } from "react-router-dom";
import { useState,useContext  } from "react";
import { AuthContext } from "../../../context/AuthContext";

function Login() {

    const [error,setError]=useState("");
    const [isLoading,setIsLoading] =useState(false);
    const {updateUser} =useContext(AuthContext);
   
    const handleSubmit= async (e)=>{
        e.preventDefault();
        setError("");
        setIsLoading(true);
        const formData = new FormData(e.target);

        const username = formData.get("username");
       
        const password = formData.get("password");

       try{
        const res = await apiRequest.post("/auth/login",{
            username,password
        });
      updateUser(res.data);
       }
       catch(err){
         setError(err.response.data.message);
       }
       finally{
        setIsLoading(false);
       }
        
    }
  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input name="username" required minLength={3} maxLength={20} type="text" placeholder="Username" />
          <input name="password" type="password" placeholder="Password" />
          <button disabled={isLoading}>Login</button>
          {error && <span>{error}</span>}
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;
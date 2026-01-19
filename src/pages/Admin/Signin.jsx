import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../services/AdminServices/userService";
import { LoginContext } from "../App";
import { useContext, useState } from "react";
import "./Signin.css";   
import {jwtDecode} from 'jwt-decode'
 

function Signin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setLoginStatus } = useContext(LoginContext);

  const signinClick = async () => {
    if (email === "") return toast.warn("Email is required");
    if (password === "") return toast.warn("Password is required");

    const result = await signIn(email, password);

    if (result.status === "success") {
      sessionStorage.setItem("email", email);
      const token= result.data.token
      sessionStorage.setItem("token",token );
      const decodeUser=jwtDecode(token)
      console.log(decodeUser.role)
      if(decodeUser.role ==='admin'){
          setLoginStatus(true);
          toast.success("Signin successful");

          navigate("/admin/home");
      }
      else{
      
   toast.error("you are not a valid user")
         sessionStorage.clear();        
         setLoginStatus(false);         
         navigate("/"); 
      }
      
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="signin-bg">
      <div className="signin-card shadow-lg">
        <h3 className="text-center fw-bold mb-4 text-primary">Admin Login</h3>

        <div className="mb-3">
          <label className="form-label fw-semibold">Email</label>
          <input
            type="email"
            className="form-control signin-input"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Password</label>
          <input
            type="password"
            className="form-control signin-input"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button onClick={signinClick} className="btn signin-btn w-100">
          Sign in
        </button>

    

        <ToastContainer />
      </div>
    </div>
  );
}

export default Signin;
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { SignupUser } from "../../services/UserServices/userService";
import { ToastContainer, toast } from "react-toastify";

function Signup() {
   
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  

  const navigate = useNavigate();

  const register = async () => {
    console.log("Signup btn");
    if (!email.trim()) {
      toast.warn("Email is required");
      return;
    }
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        toast.warn("Enter valid email");
        return false;
    }
    
    if (!password.trim()) {
      toast.warn("Password is required");
      return;
    }

    if (!confirmpassword.trim()) {
      toast.warn("Confirm Password is required");
      return;
    }

    if(confirmpassword===password){
    const result = await SignupUser(email, password);
    console.log("Signup result", result);
    if (result.status === "success") {
      toast.success("Signup successful");
      setTimeout(() => navigate("/"), 1200);
    } else {
      toast.error(result.error);
    }
    }
    else{
        toast.error("Both Password's Not Matched")
    }
  };

  return (
    <>
      {/* Header */}
      <div
        className="py-5 text-center"
        style={{
          background: "linear-gradient(90deg, #0d6efd, #6610f2)",
          color: "white",
        }}
      >
        <h1 className="fw-bold">✨ Create Your Account</h1>
        <p className="mb-0 opacity-75">
          Start learning with Exciting courses
        </p>
      </div>

      <div className="container d-flex justify-content-center mt-5">
        <div
          className="card shadow-lg border-0 p-4"
          style={{ maxWidth: "420px", width: "100%" }}
        >
           
          
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Create a password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="form-label fw-semibold"> Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm password"
              onChange={(e) => setConfirmpassword(e.target.value)}
            />
          </div>

          <button
            className="btn btn-primary w-100 fw-semibold mb-3"
            onClick={register}
          >
            Sign Up
          </button>

          <div className="text-center small">
            <span className="text-muted">
              Already have an account?
            </span>{" "}
            <Link to="/" className="text-primary fw-semibold">
              Login
            </Link>
          </div>

          <ToastContainer />
        </div>
      </div>
    </>
  );
}

export default Signup;

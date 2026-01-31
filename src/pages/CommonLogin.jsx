import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { LoginContext } from "../App";
import { loginUser } from "../services/UserServices/userService";   // Use ONLY ONE login API

function CommonLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setLoginStatus } = useContext(LoginContext);

  const signin = async () => {
    if (!email.trim()) return toast.warn("Email is required");
    if (!password.trim()) return toast.warn("Password is required");

    const result = await loginUser(email, password);
    console.log(result);
    if (result.status === "success") {
      const token = result.data.token;
      sessionStorage.setItem("token", token);

      const decoded = jwtDecode(token);
      const role = decoded.role;

      toast.success("Login successful");
      setLoginStatus(true);

      // ✅ Role Based Navigation
      setTimeout(() => {
        if (role === "admin") {
          navigate("/admin/home");      // admin route
        } else if (role === "user") {
          navigate("/home");            // user route
        } else {
          toast.error("Invalid role");
          sessionStorage.clear();
          setLoginStatus(false);
        }
      }, 1200);

    } else {
      toast.error(result.data || "Invalid email or password");
    }
  };

  return (
    <>
      <div
        className="py-5 text-center"
        style={{
          background: "linear-gradient(90deg, #0d6efd, #6610f2)",
          color: "white",
        }}
      >
        <h1 className="fw-bold">🔐 Login</h1>
        <p className="mb-0 opacity-75">
          Login as Admin or User
        </p>
      </div>

      <div className="container d-flex justify-content-center mt-5">
        <div className="card shadow-lg border-0 p-4" style={{ maxWidth: "420px", width: "100%" }}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="admin@gmail.com for admin"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="admin  //for admin login"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="btn btn-primary w-100 fw-semibold mb-3" onClick={signin}>
            Login
          </button>

          <div className="text-center small">
            <span className="text-muted">Don’t have an account?</span>{" "}
            <Link to="/signup" className="text-primary fw-semibold">
              Register
            </Link>
          </div>

          <ToastContainer />
        </div>
      </div>
    </>
  );
}

export default CommonLogin;

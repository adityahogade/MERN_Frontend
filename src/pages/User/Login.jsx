import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { loginUser } from "../services/userService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signin = async () => {
    if (!email.trim()) {
      toast.warn("Email is required");
      return;
    }
    if (!password.trim()) {
      toast.warn("Password is required");
      return;
    }

    const result = await loginUser(email, password);
    console.log(result);
    if (result.status === "success") {
      sessionStorage.setItem("token", result.data.token)
      toast.success("Login successful");
      setTimeout(() => navigate("/home"), 1200);
    } else {
      console.log(result);
      toast.error(result.data);
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
        <h1 className="fw-bold">🔐 Welcome Back</h1>
        <p className="mb-0 opacity-75">
          Login to continue your learning journey
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
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="btn btn-primary w-100 fw-semibold mb-3"
            onClick={signin}
          >
            Login
          </button>

          <div className="text-center small">
            <span className="text-muted">
              Don’t have an account?
            </span>{" "}
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

export default Login;

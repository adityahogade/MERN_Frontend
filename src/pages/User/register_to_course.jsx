import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { registe_to_course } from "../../services/UserServices/userService";
import Navbar from "../../components/NavbarUser";
import { useParams, useNavigate } from "react-router";

export function Register() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [mobileNo, setMobileNo] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    register_course
    if (!token) {
      toast.warn("Login required");
      navigate("/login");
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setEmail(payload.email);
    } catch (err) {
      toast.error("Invalid session");
    }
  }, []);

  const register_course = async () => {
   
    console.log(id)
    if (!name.trim()) {
      toast.warn("Name is required");
      return;
    }
    if (!mobileNo.trim()) {
      toast.warn("Mobile number is required");
      return;
    }
    const token=sessionStorage.getItem("token")
    const result = await registe_to_course(
      id,
      email,
      name,
      mobileNo,
      token
    );
   console.log(result.data)
    if (result.status === "success") {
     
      toast.success("Course registered successfully");
      setTimeout(() => navigate("/mycourses"), 1200);
    } else {
      toast.error(result.data);
    }
  };

  return (
    <>
      <Navbar />

     
      <div
        className="py-5 text-center"
        style={{
          background: "linear-gradient(90deg, #0d6efd, #6610f2)",
          color: "white",
        }}
      >
        <h1 className="fw-bold">📝 Course Registration</h1>
        <p className="mb-0 opacity-75">
          Confirm your details to enroll
        </p>
      </div>

      <div className="container d-flex justify-content-center mt-5">
        <div
          className="card shadow-lg border-0 p-4"
          style={{ maxWidth: "500px", width: "100%" }}>

            
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              readOnly
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your full name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Mobile Number</label>
            <input
              type="tel"
              className="form-control"
              placeholder="Enter mobile number"
              onChange={(e) => setMobileNo(e.target.value)}
            />
          </div>

          <button
            className="btn btn-primary w-100 fw-semibold"
            onClick={register_course}
          >
            ✅ Confirm Enrollment
          </button>
        </div>

        <ToastContainer />
      </div>
    </>
  );
}

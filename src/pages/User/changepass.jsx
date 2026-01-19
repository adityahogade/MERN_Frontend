import React, { useState } from "react";
import { useNavigate } from "react-router";
import { changePassword } from "../../services/UserServices/userService";
import { toast, ToastContainer } from "react-toastify";
import Navbar from '../../components/NavbarUser';

function ChangePassword() {
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  const handleChangePassword = async () => {
    if (!newPass || !confirmPass) {
      toast.warn("⚠️ Please fill all fields");
      return;
    }

    if (newPass !== confirmPass) {
      toast.error("Passwords do not match");
      return;
    }

    const payload = JSON.parse(atob(token.split(".")[1]));
    const email = payload.email;

    const result = await changePassword(token, email, newPass, confirmPass);
    if (result.status === "success") {
      toast.success("Password updated successfully");
      setNewPass("");
      setConfirmPass("");
    } else {
      toast.error(result.error || "Something went wrong");
    }
  };

  return (
    <>
      <Navbar />

      <div
        className="text-center text-white"
        style={{
          background: "linear-gradient(135deg, #0d6efd, #230b4a)",
          padding: "80px 0",
        }}
      >
        <h1 className="fw-bold">Change Password</h1>
        <p className="opacity-75">Update your account password securely</p>
      </div>

      <div className="container" style={{ marginTop: "-80px" }}>
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="card shadow-lg border-0 p-4 rounded-4">
              <input
                type="password"
                className="form-control mb-3"
                placeholder="New Password"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
              />

              <input
                type="password"
                className="form-control mb-4"
                placeholder="Confirm Password"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
              />

              <button
                className="btn btn-primary w-100 fw-semibold"
                onClick={handleChangePassword}
              >
                🔄 Update Password
              </button>

              <button
                className="btn btn-dark w-100 mt-3 fw-semibold"
                onClick={() => navigate("/profile")}
              >
                🔙 Back to Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer/>

      <style>{`
        .card {
          transition: all 0.3s ease;
        }
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }
      `}</style>
    </>
  );
}

export default ChangePassword;

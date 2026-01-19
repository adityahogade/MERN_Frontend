import React, { useEffect, useState } from "react";
import Navbar from "../../components/NavbarUser";
import { useNavigate } from "react-router";
import { getUserProfile } from "../../services/UserServices/userService";
import { toast, ToastContainer } from "react-toastify";

export function Profile() {
  const [user, setUser] = useState({ name: "", email: "", mobile: "" });
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      toast.warn("Login required"); 
      navigate("/");
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      loadProfile(payload.email);
    } catch {
      toast.error("Invalid session");
    }
  }, []);

  const loadProfile = async (email) => {
    const result = await getUserProfile(email, token);
    if (result.status === "success") {
      const u = result.data[0];
      setUser({ name: u.name, email, mobile: u.mobile_no });
    }
  };

  const logout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <>
      <Navbar />

      
      <div
        className="profile-header text-center text-white"
        style={{
          background: "linear-gradient(135deg, #0d6efd, #230b4a)",
          padding: "80px 0",
        }}
      >
        <h1 className="fw-bold">My Profile</h1>
        <p className="opacity-75">
          {user.name ? `Welcome back, ${user.name}` : "Welcome back"}
        </p>
      </div>

      
      <div className="container profile-container">
        <div className="card profile-card border-0 shadow-lg text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            className="profile-avatar shadow"
            alt="profile"
          />

          <div className="card-body pt-5">
            <h4 className="fw-bold">{user.name}</h4>
            <p className="text-muted">{user.email}</p>

            <div className="profile-info mt-4">
              <div className="info-row">
                <span>👤 Role</span>
                <strong>User</strong>
              </div>

              {user.mobile ? (
                <div className="info-row">
                  <span>📞 Mobile</span>
                  <strong>{user.mobile}</strong>
                </div>
              ) : (
                <p className="text-center text-muted mt-3 small">
                  📌 Register to a course to see full profile
                </p>
              )}
            </div>

            <button
              className="btn btn-primary w-100 mt-4 fw-semibold"
              onClick={() => navigate("/changepass")}
            >
              🔄 Update Password
            </button>

            <button
              className="btn btn-danger w-100 mt-3 fw-semibold"
              onClick={logout}
            >
              🚪 Logout
            </button>
          </div>
        </div>
      </div>

      <ToastContainer />

      <style>{`
        .profile-container {
          margin-top: -80px;
          display: flex;
          justify-content: center;
        }

        .profile-card {
          max-width: 500px;
          width: 100%;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          padding: 30px 20px;
          transition: all 0.3s ease;
        }

        .profile-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.2);
        }

        .profile-avatar {
          width: 130px;
          height: 130px;
          border-radius: 50%;
          border: 5px solid white;
          margin-top: -65px;
          background: white;
        }

        .profile-info {
          text-align: left;
          padding: 0 10px;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid #eee;
          font-size: 15px;
        }

        @media (max-width: 768px) {
          .profile-card {
            width: 90%;
          }
        }
      `}</style>
    </>
  );
}

export default Profile;

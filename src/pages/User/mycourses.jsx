import { useEffect, useState } from "react";
import Navbar from "../../components/NavbarUser";
import { getmycourses } from "../../services/UserServices/mycoursesService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import dayjs from "dayjs";

export default function Mycourses() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getcourses();
  }, []);

  const getcourses = async () => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      toast.warn("You need to login first!");
      return;
    }

    const result = await getmycourses(token);
    if (result.status === "success") {
      setItems(result.data);
    }
  };

  const go_tocourse = (course_id) => {
    navigate(`/mycourseswithvideo/${course_id}`);
  };

  return (
    <>
      <Navbar />

      
      <div
        className="py-5 mb-4 text-center"
        style={{
          background: "linear-gradient(90deg, #198754, #0d6efd)",
          color: "white",
        }}
      >
        <h1 className="fw-bold">📚 My Learning Dashboard</h1>
        <p className="mb-0 opacity-75">
          Continue learning from where you left off
        </p>
      </div>

      <div className="container">
        <div className="row g-4">
          {items.map((e, index) => (
            <div key={index} className="col-lg-3 col-md-4 col-sm-12">
              <div
                className="card h-100 border-0 shadow-sm"
                style={{ transition: "0.3s" }}
                onMouseEnter={(el) =>
                  (el.currentTarget.style.transform = "translateY(-6px)")
                }
                onMouseLeave={(el) =>
                  (el.currentTarget.style.transform = "translateY(0)")
                }
              >
              
                <img
                  src="https://www.pngarts.com/files/7/Education-Course-PNG-Image-Transparent.png"
                  className="card-img-top"
                  alt="Course"
                  style={{ height: "200px", objectFit: "contain" }}
                />

                <div className="card-body d-flex flex-column">
                  <h5 className="fw-bold text-primary">
                    {e.course_name}
                  </h5>

                  <span className="badge bg-success align-self-start mb-2">
                    Enrolled
                  </span>

                  <p className="card-text text-muted flex-grow-1">
                    {e.description}
                  </p>

                  <div className="small text-secondary mb-3">
                    <div>📅 Start: {dayjs(e.start_date).format("DD MMM YYYY")}</div>
                    <div>⏳ End: {dayjs(e.end_date).format("DD MMM YYYY")}</div>
                    <div>💰 Fees: ₹{e.fees}</div>
                  </div>

                  <button
                    className="btn btn-success w-100 fw-semibold"
                    onClick={() => go_tocourse(e.course_id)}
                  >
                    ▶ Continue Course
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {items.length === 0 && (
          <p className="text-center text-muted mt-5">
            You have not enrolled in any courses yet
          </p>
        )}
      </div>
    </>
  );
}

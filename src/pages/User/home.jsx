import { getAllCourses } from "../../services/UserServices/userService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Navbar from "../../components/NavbarUser";
import { useNavigate } from "react-router";
import dayjs from "dayjs";

export default function Home() {
  const [course, setCourse] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCourse();
  }, []);

  const getCourse = async () => {
    const token = sessionStorage.getItem("token");
    const result = await getAllCourses(token);

    if (result.status === "success") {
      setCourse(result.data);
    } else {
      toast.error("Invalid token");
    }
  };

  const enrollCourse = (id) => {

    navigate(`/register/${id}`);
  };

  return (
    <>
      <Navbar />

      
      <div
        className="py-5 mb-4 text-center"
        style={{
          background: "linear-gradient(90deg, #0d6efd, #6610f2)",
          color: "white",
        }}
      >
        <h1 className="fw-bold">🎓 Explore Our Courses</h1>
        <p className="mb-0 opacity-75">
          Learn. Grow. Build your future with us.
        </p>
      </div>

      <div className="container">
        <div className="row g-4">
          {course.map((e, index) => (
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
                  <h5 className="card-title fw-bold text-primary">
                    {e.course_name}
                  </h5>

                  <span className="badge bg-success align-self-start mb-2">
                    ₹ {e.fees}
                  </span>

                  <p className="card-text text-muted flex-grow-1">
                    {e.description}
                  </p>

                  <div className="small text-secondary mb-3">
                    <div>📅 Start: {dayjs(e.start_date).format("DD MMM YYYY")}</div>
                    <div>⏳ End: {dayjs(e.end_date).format("DD MMM YYYY")}</div>
                  </div>

                  <button
                    className="btn btn-primary w-100 fw-semibold"
                    onClick={() => enrollCourse(e.course_id)}
                  >
                    📝 Enroll Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {course.length === 0 && (
          <p className="text-center text-muted mt-5">
            No courses available
          </p>
        )}
      </div>
    </>
  );
}

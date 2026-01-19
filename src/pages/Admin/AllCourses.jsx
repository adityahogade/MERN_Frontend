import  {  useEffect, useState } from "react";
import { getAllCourses } from "../../services/AdminServices/course";
import { ToastContainer, toast} from "react-toastify";
import dayjs from "dayjs";
import Navbar from "../../components/NavbarAdmin";
import "./AllCourses.css";   
import { deleteCourse } from "../../services/AdminServices/course";
import{ useNavigate } from "react-router-dom";


function AllCourses() {
const navigateTo=useNavigate();

  const [allCourselist, setAllCourselist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    const token = sessionStorage.getItem("token");
    const result = await getAllCourses(token);

    if (result.status === "success") {
      setAllCourselist(result.data);
    } else {
      toast.error("Invalid token");
    }
    setLoading(false);
  };

  const deleteCourseClick = async (id) => {
    const token = sessionStorage.getItem("token");
    const result = await deleteCourse(token, id);
    console.log(result);

    if (result.status === "success") {
      toast.success("Course deleted successfully");
      getCourses(); // Refresh the course list
    } else {
      toast.error("Failed to delete course");
    }
  };

  // UPDATE FUNCTION (will redirect later)
  const updateCourse = (id) => {
   navigateTo(`/updatecourse/${id}`);
  };

  return (
    <div className="allcourse-bg">
      <Navbar />

      <div className="container mt-4">

        <div className="card shadow-lg border-0">
          <div className="card-header custom-header text-white text-center">
            <h4 className="mb-0">All Courses</h4>
          </div>

          <div className="card-body">
            {loading ? (
              <p className="text-center text-muted">Loading courses...</p>
            ) : allCourselist.length === 0 ? (
              <p className="text-center text-danger">No courses available</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-bordered table-hover custom-table">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Course Name</th>
                      <th>Fees</th>
                      <th>Description</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {allCourselist.map((course, idx) => (
                      <tr key={course.course_id}>
                        <td>{idx + 1}</td>
                        <td className="fw-bold text-primary">{course.course_name}</td>
                        <td>₹{course.fees}</td>
                        <td>{course.description}</td>
                        <td>{dayjs(course.start_date).format("YYYY-MM-DD")}</td>
                        <td>{dayjs(course.end_date).format("YYYY-MM-DD")}</td>

                        <td className="text-center">

                          {/* Update Button */}
                          <button
                            className="btn btn-sm btn-outline-success me-2 action-btn"
                            onClick={() => updateCourse(course.course_id)}
                          >
                            ✏️
                          </button>

                          {/* Delete Button */}
                          <button
                            className="btn btn-sm btn-outline-danger action-btn"
                            onClick={() => deleteCourseClick(course.course_id)}
                          >
                            🗑️
                          </button>

                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>

      </div>
      
    </div>
    
   
  );
}

export default AllCourses;

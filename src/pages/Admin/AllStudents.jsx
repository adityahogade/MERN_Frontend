import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../../components/NavbarAdmin";
import "./AllCourses.css";
import { getStudent } from "../../services/AdminServices/userService";

function AllStudents() {
  const [studentlist, setStudentlist] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter state
  const [filterCourse, setFilterCourse] = useState("");

  useEffect(() => {
    getStudents();
  }, []);

  const getStudents = async () => {
    const token = sessionStorage.getItem("token");
    const result = await getStudent(token);

    if (result.status === "success") {
      console.log(result.data);
      setStudentlist(result.data);
    } else {
      console.log(result.data);
      toast.error("Invalid token");
    }
    setLoading(false);
  };

  // Extract unique course names
  const courseNames = [...new Set(studentlist.map((s) => s.course_name))];

  // Apply filter
  const filteredStudents = filterCourse
    ? studentlist.filter((s) => s.course_name === filterCourse)
    : studentlist;

  return (
    <div className="allcourse-bg">
      <Navbar />

      <div className="container mt-4">
        <div className="card shadow-lg border-0">
          <div className="card-header custom-header text-white text-center">
            <h4 className="mb-0">All Students</h4>
          </div>

          <div className="card-body">

            {/* Filter Dropdown */}
            {/* Compact Filter Bar */}
<div className="d-flex justify-content-between align-items-center mb-3">
  <h5 className="m-0">Filter</h5>

  <div className="d-flex align-items-center" style={{ width: "250px" }}>
    <label className="me-2 fw-semibold">Course:</label>
    <select
      className="form-select form-select-sm"
      value={filterCourse}
      onChange={(e) => setFilterCourse(e.target.value)}
    >
      <option value="">All</option>
      {courseNames.map((course, index) => (
        <option key={index} value={course}>
          {course}
        </option>
      ))}
    </select>
  </div>
</div>


            {loading ? (
              <p className="text-center text-muted">Loading students...</p>
            ) : filteredStudents.length === 0 ? (
              <p className="text-center text-danger">No students available</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-bordered table-hover custom-table">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Student Name</th>
                      <th>Email</th>
                      <th>Mobile No</th>
                      <th>Course</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredStudents.map((student, idx) => (
                      <tr key={student.reg_no}>
                        <td>{idx + 1}</td>
                        <td className="fw-bold text-primary">{student.name}</td>
                        <td>{student.email}</td>
                        <td>{student.mobile_no}</td>
                        <td>{student.course_name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default AllStudents;

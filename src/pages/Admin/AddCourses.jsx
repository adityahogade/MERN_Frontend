import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { addCourses } from "../../services/AdminServices/course";
import Navbar from "../../components/NavbarAdmin";
import "./AddCourses.css"; 

function AddCourses() {
  const [course_name, setCourse_name] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [fees, setFees] = React.useState("");
  const [start_date, setStart_date] = React.useState("");
  const [end_date, setEnd_date] = React.useState("");
  const [video_expiry_days, setVideo_expiry_days] = React.useState("");

  const addCourseClick = async () => {
    const token = sessionStorage.getItem("token");

    const data = {
      course_name,
      description,
      fees,
      start_date,
      end_date,
      video_expiry_days,
    };

    const result = await addCourses(token, data);

    if (result.status === "success") {
      toast.success("Course added successfully");
    } else {
      toast.error(result.status);
      toast.error(result.data);
    }
  };

  return (
    <div className="addcourse-bg">
      <Navbar />

      <div className="container mt-4">
        <div className="form-card shadow-lg">

          <h3 className="fw-bold text-primary mb-3 text-center">Add New Course</h3>

          {/* Form */}
          <div className="row">

            <div className="col-md-6 mt-3">
              <label className="form-label fw-semibold">Course Name</label>
              <input
                type="text"
                className="form-control form-input"
                placeholder="Enter course name"
                onChange={(e) => setCourse_name(e.target.value)}
              />
            </div>

            <div className="col-md-6 mt-3">
              <label className="form-label fw-semibold">Fees</label>
              <input
                type="number"
                className="form-control form-input"
                placeholder="Enter course fees"
                onChange={(e) => setFees(e.target.value)}
              />
            </div>

            <div className="col-md-12 mt-3">
              <label className="form-label fw-semibold">Description</label>
              <textarea
                className="form-control form-input"
                rows="3"
                placeholder="Enter course description"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="col-md-6 mt-3">
              <label className="form-label fw-semibold">Start Date</label>
              <input
                type="date"
                className="form-control form-input"
                onChange={(e) => setStart_date(e.target.value)}
              />
            </div>

            <div className="col-md-6 mt-3">
              <label className="form-label fw-semibold">End Date</label>
              <input
                type="date"
                className="form-control form-input"
                onChange={(e) => setEnd_date(e.target.value)}
              />
            </div>

            <div className="col-md-6 mt-3">
              <label className="form-label fw-semibold">Video Expiry Days</label>
              <input
                type="number"
                className="form-control form-input"
                placeholder="Enter expiry days"
                onChange={(e) => setVideo_expiry_days(e.target.value)}
              />
            </div>

          </div>

          <div className="text-center mt-4">
            <button
              type="submit"
              onClick={addCourseClick}
              className="btn btn-primary px-5 py-2 submit-btn"
            >
              Submit
            </button>
          </div>

          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default AddCourses;

import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/NavbarAdmin";
import { toast } from "react-toastify";
import { updateCourseDetails } from "../../services/AdminServices/course";

function UpdateCourse() {
  const { id } = useParams();
  console.log("Course ID to update:", id);
  const navigate = useNavigate();

  const [course_name, setCourse_name] = useState("");
  const [description, setDescription] = useState("");
  const [fees, setFees] = useState("");
  const [start_date, setStart_date] = useState("");
  const [end_date, setEnd_date] = useState("");
  const [video_expiry_days, setVideo_expiry_days] = useState("");

  const updateCourseClick = async () => {
    const token = sessionStorage.getItem("token");

    const data = {
                 
      course_name,
      description,
      fees,
      start_date,
      end_date,
      video_expiry_days,
    };

    const result = await updateCourseDetails(id,data,token);

    if (result.status === "success") {
      toast.success("Course updated successfully");
      navigate("/admin/allcourse");
    } else {
      toast.error("Failed to update course");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="container mt-4 w-50">
        <h3 className="fw-bold text-primary">Update Course</h3>

        <label className="form-label">Course Name</label>
        <input
          type="text"
          className="form-control"
          onChange={(e) => setCourse_name(e.target.value)}
        />

        <label className="form-label mt-3">Description</label>
        <input
          type="text"
          className="form-control"
          onChange={(e) => setDescription(e.target.value)}
        />

        <label className="form-label mt-3">Fees</label>
        <input
          type="number"
          className="form-control"
          onChange={(e) => setFees(e.target.value)}
        />

        <label className="form-label mt-3">Start Date</label>
        <input
          type="date"
          className="form-control"
          onChange={(e) => setStart_date(e.target.value)}
        />

        <label className="form-label mt-3">End Date</label>
        <input
          type="date"
          className="form-control"
          onChange={(e) => setEnd_date(e.target.value)}
        />

        <label className="form-label mt-3">Video Expiry Days</label>
        <input
          type="number"
          className="form-control"
          onChange={(e) => setVideo_expiry_days(e.target.value)}
        />

        <button
          className="btn btn-primary mt-3"
          onClick={updateCourseClick}
        >
          Update Course
        </button>
      </div>
    </div>
  );
}

export default UpdateCourse;

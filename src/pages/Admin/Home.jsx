import Navbar from "../../components/NavbarAdmin";
import React, { useEffect, useState } from "react";
import { getActiveCourses, getAllCourses } from "../../services/AdminServices/course";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import "./Home.css";  
import { useNavigate } from "react-router-dom";

import { getStudent } from "../../services/AdminServices/userService";

export default function Home() {
  const navigateTo=useNavigate();

  const [totalStudent,setTotalStudent] = useState(0)
  const [course, setCourse] = useState([]);
  const [lenAllC, setLenAllC] = useState(0);

  useEffect(() => {
    getCourse();
  }, []);

  const showvideoclick = (id) => {
    navigateTo(`/my-videos/${id}`)

  }
  const getCourse = async () => {
    const token = sessionStorage.getItem("token");

    const result = await getActiveCourses(token);
    const allC = await getAllCourses(token);
    const StuTotal = await getStudent(token)
    setTotalStudent(StuTotal.data.length)

    setLenAllC(allC.data.length);

    if (result.status === "success") {
      setCourse(result.data);
    } else {
      toast.error("Invalid token");
    }
  };

  return (
    <div className="home-bg">
      <Navbar />

      <div className="container mt-4">

        <div className="dashboard-header">
          <h2 className="fw-bold text-primary m-0">Admin Dashboard</h2>
          <p className="text-muted mt-1">Welcome back! Here is the latest summary.</p>
        </div>

        <div className="row mt-4">

          <div className="col-md-4">
            <div className="stat-card stat-blue">
              <h6>Total Courses</h6>
              <h2 className="fw-bold">{lenAllC}</h2>
            </div>
          </div>

          <div className="col-md-4">
            <div className="stat-card stat-green">
              <h6>Active Courses</h6>
              <h2 className="fw-bold">{course.length}</h2>
            </div>
          </div>

               <div className="col-md-4">
            <div className="stat-card stat-blue">
              <h6>Total Students</h6>
              <h2 className="fw-bold">{totalStudent}</h2>
            </div>
          </div>

        </div>

        <h3 className="mt-5 fw-bold">Active Courses</h3>

        <div className="row mt-3">
          {course.map((e) => (
            <div className="col-md-4 mt-3" key={e.course_id}>
              <div className="course-card card shadow-sm border-0">
                <div className="card-body">

                  <h5 className="fw-bold text-primary">{e.course_name}</h5>

                  <h6 className="text-muted mb-2">
                    Fees: <span className="fee-text">₹{e.fees}</span>
                  </h6>

                  <p className="text-secondary small">{e.description}</p>

                  <p className="m-0 text-secondary">
                    <strong>Start Date:</strong> {dayjs(e.start_date).format("YYYY-MM-DD")}
                  </p>

                  <p className="m-0 text-secondary">
                    <strong>End Date:</strong> {dayjs(e.end_date).format("YYYY-MM-DD")}
                  </p>
                
                <button
  className="show-video-btn mt-3"
  onClick={() => showvideoclick(e.course_id)}
>
  🎥 Show Videos
</button>


                </div>
              </div>
            </div>
          ))}

          {course.length === 0 && (
            <p className="text-center text-muted mt-4">
              No active courses found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

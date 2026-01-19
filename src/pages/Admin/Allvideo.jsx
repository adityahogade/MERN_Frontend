import React, { useEffect, useState } from "react";
import { getAllVideos, deleteVideo } from "../../services/AdminServices/VideoService";
import { getAllCourses } from "../../services/AdminServices/course";
import { toast } from "react-toastify";
import Navbar from "../../components/NavbarAdmin";
import { useNavigate } from "react-router-dom";
import "./AllVideo.css"; 
import dayjs from "dayjs"

function AllVideo() {
  const [videoList, setVideoList] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    const token = sessionStorage.getItem("token");

    const resultVideos = await getAllVideos(token);
    const resultCourses = await getAllCourses(token);

    if (resultVideos.status === "success") {
      setVideoList(resultVideos.data);
      setFilteredVideos(resultVideos.data);
    } else {
      toast.error("Failed to load videos");
    }

    if (resultCourses.status === "success") {
      setCourses(resultCourses.data);
    } else {
      toast.error("Failed to load courses");
    }

    setLoading(false);
  };

  const handleCourseFilter = (e) => {
    const selectedCourseId = Number(e.target.value);

    if (selectedCourseId === 0) {
      setFilteredVideos(videoList);
    } else {
      setFilteredVideos(videoList.filter(v => v.course_id === selectedCourseId));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this video?")) return;

    const token = sessionStorage.getItem("token");
    await deleteVideo(id, token);

    toast.success("Video deleted");
    loadAllData();
  };

  const getCourseName = (id) => {
    const course = courses.find((c) => c.course_id === id);
    return course ? course.course_name : "Unknown";
  };

  if (loading) {
    return <h4 className="text-center mt-5">Loading...</h4>;
  }

  return (
    <div className="allvideo-bg">
      <Navbar />

      <div className="container mt-4">

        <div className="video-card shadow-lg">
          <h3 className="text-center fw-bold text-primary mb-4">All Videos</h3>

          <div className="d-flex justify-content-end mb-3">
            <select className="form-select filter-select" onChange={handleCourseFilter}>
              <option value="0">All Courses</option>
              {courses.map((c) => (
                <option key={c.course_id} value={c.course_id}>
                  {c.course_name}
                </option>
              ))}
            </select>
          </div>

          <div className="table-responsive">
            <table className="table table-hover table-bordered video-table">
              <thead className="table-primary">
                <tr>
                  <th>ID</th>
                  <th>Course</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Video</th>
                  <th>Added At</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredVideos.map((v) => (
                  <tr key={v.video_id}>
                    <td>{v.video_id}</td>
                    <td className="fw-semibold text-primary">{getCourseName(v.course_id)}</td>
                    <td>{v.title}</td>
                    <td>{v.description}</td>

                    <td>
                      {v.youtube_url ? (
                        <a
                          href={v.youtube_url}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-sm btn-outline-danger"
                        >
                          Watch
                        </a>
                      ) : (
                        <span className="text-muted">No Video</span>
                      )}
                    </td>

                    <td>{dayjs(v.added_at).format("YYYY-MM-DD")}</td>

                    <td className="text-center">
                      <button
                        className="btn btn-sm btn-outline-warning me-2 action-btn"
                        onClick={() => navigate(`/update-video/${v.video_id}`)}
                      >
                        ✏️
                      </button>

                      <button
                        className="btn btn-sm btn-outline-danger action-btn"
                        onClick={() => handleDelete(v.video_id)}
                      >
                        🗑️
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AllVideo;
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "../../components/NavbarAdmin";

import { getAllVideos, updateVideo } from "../../services/AdminServices/VideoService";

import { getAllCourses } from "../../services/AdminServices/course"; // ✅ add this

function UpdateVideo() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]); //  dynamic courses
  const [course_id, setCourseId] = useState("");
  const [title, setTitle] = useState("");
  const [youtube_url, setYoutubeUrl] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    loadCourses();
    loadVideo();
  }, []);


  const loadCourses = async () => {
    const token = sessionStorage.getItem("token");
    const result = await getAllCourses(token);

    if (result.status === "success") {
      setCourses(result.data);
    } else {
      toast.error("Failed to load courses");
    }
  };

  const loadVideo = async () => {
    const token = sessionStorage.getItem("token");
    const result = await getAllVideos(token);

    if (result.status === "success") {
      const video = result.data.find((v) => v.video_id === Number(id));

      if (!video) {
        toast.error("Video not found");
        return;
      }

      setCourseId(video.course_id);
      setTitle(video.title);
      setYoutubeUrl(video.youtube_url || "");
      setDescription(video.description);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!course_id || !title) {
      toast.warn("Please fill required fields");
      return;
    }

    const token = sessionStorage.getItem("token");

    const videoData = {
      course_id,
      title,
      youtube_url: youtube_url.trim(),
      description,
      video_id: id,
    };

    const result = await updateVideo(id, token, videoData);

    if (result.status === "success") {
      toast.success("Video updated successfully");
      navigate("/admin/allvideos");
    } else {
      toast.error("Failed to update video");
    }
  };

  return (
    <div className="container mt-5">
      <Navbar />

      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "600px" }}>
        <h4 className="text-center mb-4">Update Video</h4>

        <form onSubmit={handleUpdate}>

          <div className="mb-3">
            <label className="form-label">Course</label>

            <select
              className="form-select"
              value={course_id}
              onChange={(e) => setCourseId(e.target.value)}
            >
              <option value="">Select Course</option>

              {courses.map((course) => (
                <option key={course.course_id} value={course.course_id}>
                  {course.course_name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Video Title</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">YouTube URL</label>
            <input
              type="text"
              className="form-control"
              value={youtube_url}
              onChange={(e) => setYoutubeUrl(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-warning">
              Update Video
            </button>
          </div>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
}

export default UpdateVideo;

import React, { useState, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { newvideo } from '../../services/AdminServices/VideoService'
import Navbar from "../../components/NavbarAdmin"
import { getAllCourses } from '../../services/AdminServices/course'

export function AddVideo() {

  const [courses, setCourses] = useState([]);

  const [course_id, setcourse_id] = useState('');
  const [title, setTitle] = useState('');
  const [youtube_url, setyoutube_url] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    loadCourses();
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

  const addVideo = async (e) => {
    e.preventDefault();

    if (!course_id || !title || !youtube_url) {
      toast.warn("Please fill the required fields");
      return;
    }

    const token = sessionStorage.getItem('token');

    const videoData = {
      course_id,
      title,
      youtube_url,
      description
    };

    const result = await newvideo(token, videoData);

    if (result.status === 'success') {
      toast.success('Video added successfully');
      setcourse_id('');
      setTitle('');
      setyoutube_url('');
      setDescription('');
    } else {
      toast.error(result.data || 'Failed to add video');
    }
  };

  return (
    <div className="container mt-5">
      <Navbar />
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: '600px' }}>
        <h4 className="text-center mb-4">Add New Video</h4>

        <form onSubmit={addVideo}>

          {/* ========== Dynamic Course Dropdown ========== */}
          <div className="mb-3">
            <label className="form-label">Course</label>

            <select
              className="form-select"
              value={course_id}
              onChange={(e) => setcourse_id(e.target.value)}
            >
              <option value="">Select Course</option>

              {courses.map((c) => (
                <option key={c.course_id} value={c.course_id}>
                  {c.course_name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Video Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter video title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">YouTube URL</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter YouTube URL"
              value={youtube_url}
              onChange={(e) => setyoutube_url(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              rows="3"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Add Video
            </button>
          </div>

        </form>
      </div>

      <ToastContainer />
    </div>
  );
}

export default AddVideo;
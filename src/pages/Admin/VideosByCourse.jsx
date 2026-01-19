import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import Navbar from "../../components/NavbarAdmin";
import { getVideosByCourse } from "../../services/AdminServices/VideoService";
import './VideosByCourse.css';

function VideosByCourse() {
  const { course_id } = useParams();

  const [videoList, setVideoList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideos();
  }, [course_id]);

  const fetchVideos = async () => {
    const token = sessionStorage.getItem("token");
    const result = await getVideosByCourse(course_id, token);

    if (result.status === "success") {
      setVideoList(result.data);
    } else {
      toast.error("Unable to load videos");
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar />

      <div className="videos-bg">
        <div className="container mt-4">

          <div className="video-card shadow-lg">
            <h3 className="text-center fw-bold text-primary mb-3">Course Videos</h3>

            {loading ? (
              <p className="text-center text-muted">Loading videos...</p>
            ) : videoList.length === 0 ? (
              <p className="text-center text-danger">No videos available</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover table-bordered video-table">
                  <thead className="table-primary">
                    <tr>
                      <th>No.</th>
                      <th>Title</th>
                      <th>Description</th>
                      <th>YouTube</th>
                      <th>Added At</th>
                    </tr>
                  </thead>

                  <tbody>
                    {videoList.map((video, idx) => (
                      <tr key={video.video_id}>
                        <td>{idx + 1}</td>
                        <td className="fw-semibold text-primary">{video.title}</td>
                        <td>{video.description}</td>
                        <td>
                          <a
                            href={video.youtube_url}
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-sm btn-outline-danger watch-btn"
                          >
                            Watch
                          </a>
                        </td>
                        <td>
                          {video.added_at
                            ? dayjs(video.added_at).format("YYYY-MM-DD")
                            : "-"}
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
    </>
  );
}

export default VideosByCourse;
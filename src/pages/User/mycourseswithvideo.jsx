import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import Navbar from "../../components/NavbarUser";
import { getVideosByCourse } from "../../services/UserServices/VideoService";

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

      
      <div
        className="py-5 text-center text-white"
        style={{
          background: "linear-gradient(135deg, #0d6efd, #198754)",
        }}
      >
        <h2 className="fw-bold">🎬 Course Videos</h2>
        <p className="opacity-75">
          Learn with high-quality recorded lessons
        </p>
      </div>

      <div className="container mt-4">
        {loading ? (
          <p className="text-center text-muted">Loading videos...</p>
        ) : videoList.length === 0 ? (
          <p className="text-center text-danger">No videos available</p>
        ) : (
          <div className="row">
            {videoList.map((video, idx) => (
              <div
                className="col-lg-4 col-md-6 col-sm-12 mb-4"
                key={video.video_id}
              >
                <div className="card h-100 shadow-sm border-0 video-card">
                  
                  
                  <div className="video-thumb">
                 <img
                  src="https://png.pngtree.com/png-clipart/20190516/original/pngtree-video-camera-icon-design-png-image_4273169.jpg"
                  alt="Course Video"
                  className="card-img-top p-3"
                  style={{
                    height: "200px",
                    objectFit: "contain",
                    backgroundColor: "#f8f9fa",
                    borderTopLeftRadius: "16px",
                    borderTopRightRadius: "16px",
                  }}
                />


          </div>


                  <div className="card-body d-flex flex-column">
                    <h5 className="fw-bold text-primary">
                      {idx + 1}. {video.title}
                    </h5>

                    <p className="text-muted small flex-grow-1">
                      {video.description}
                    </p>

                    <a
                      href={video.youtube_url}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-danger btn-sm mb-2"
                    >
                      ▶ Watch Video
                    </a>

                    <small className="text-muted">
                      📅 Added on{" "}
                      {video.added_at
                        ? dayjs(video.added_at).format("DD MMM YYYY")
                        : "-"}
                    </small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      
      <style>{`
        .video-card {
          border-radius: 16px;
          transition: all 0.3s ease;
        }

        .video-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }

        .video-card img {
          border-top-left-radius: 16px;
          border-top-right-radius: 16px;
          object-fit: cover;
        }
          .video-thumb {
  position: relative;
}

.video-thumb img {
  width: 100%;
  height: 180px;
  object-fit: cover;   
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
}

      `}</style>
    </>
  );
}

export default VideosByCourse;

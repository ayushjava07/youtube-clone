import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

interface VideoDetails {
  title: string;
  thumbnail: string;
  description: string;
  user: {
    username: string;
    ProfileImage: string;
    channelName: string;
    subscriberCount: number;
  };
}

export function VideoPage() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id") || "";
  const [recommendations, setRecommendations] = useState<VideoDetails[]>([]);
  const [videoDetails, setVideoDetails] = useState<VideoDetails | null>(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/video/${id}`).then((response) => {
      setVideoDetails(response.data);
      console.log(response.data);
    });

    axios.get(`http://localhost:3001/videos`).then((response) => {
      setRecommendations(response.data);
      console.log(response.data);
    });
  }, [id]);

  return (
    <div style={{ color: "wheat" }}>
      <h1 style={{ color: "wheat" }}>Video Page</h1>
      {videoDetails && (
        <div style={{ display: "flex", gap: "40px", margin: "0 40px" }}>
          <div>
            <video controls>
              <source src={videoDetails.thumbnail} type="video/mp4" />
            </video>
            <h2>{videoDetails.title}</h2>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "100%",
                    overflow: "hidden",
                  }}
                >
                  <img
                    style={{ height: "100%" }}
                    src={videoDetails.user.ProfileImage}
                    alt={videoDetails.user.username}
                  />
                </div>
                <div>
                  <h3>{videoDetails.user.username}</h3>
                  <p>{videoDetails.user.subscriberCount} subscribers</p>
                </div>
              </div>
              <div>
                  <button>Subscribe</button>
              </div>
            </div>
          </div>
          <div className="recommendations">
            <h3>Recommendations</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {recommendations.map((video) => (
                <div key={video.title} style={{ display: "flex", gap: "20px" }}>
                  <img
                    style={{ width: "120px", height: "80px", borderRadius: "12px" }}
                    src={video.thumbnail}
                    alt={video.title}
                  />
                  <div>
                    <h4>{video.title}</h4>
                    <p>{video.user.username}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

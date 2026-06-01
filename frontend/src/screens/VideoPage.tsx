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
    });

    axios.get(`http://localhost:3001/videos`).then((response) => {
      setRecommendations(response.data);
    });
  }, [id]);

  return (
    <div className="app-shell">
      <div className="page-container video-page">
        <h1 className="page-header">Watch</h1>
        {videoDetails && (
          <div className="video-page-main">
            <div>
              <div className="video-wrapper">
                <video controls>
                  <source src={videoDetails.thumbnail} type="video/mp4" />
                </video>
              </div>
              <div className="video-info">
                <h2 className="video-title">{videoDetails.title}</h2>
                <div className="video-author">
                  <div className="channel-info">
                    <div className="channel-avatar">
                      <img
                        src={videoDetails.user.ProfileImage}
                        alt={videoDetails.user.username}
                      />
                    </div>
                    <div className="channel-text">
                      <p className="channel-name">{videoDetails.user.username}</p>
                      <p className="channel-sub">
                        {videoDetails.user.subscriberCount} subscribers
                      </p>
                    </div>
                  </div>
                  <button className="subscribe-button">Subscribe</button>
                </div>
              </div>
            </div>

            <aside className="recommendations-panel">
              <h3>Recommendations</h3>
              <div>
                {recommendations.map((video) => (
                  <div key={video.title} className="recommendation-item">
                    <img
                      className="recommendation-thumb"
                      src={video.thumbnail}
                      alt={video.title}
                    />
                    <div className="recommendation-details">
                      <h4 className="recommendation-title">{video.title}</h4>
                      <p className="recommendation-author">{video.user.username}</p>
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}

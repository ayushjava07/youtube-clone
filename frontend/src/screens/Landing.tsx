import axios from "axios";
import { useEffect, useState } from "react";
import { Navbar } from "./navbar";

interface Video {
  thumbnail: string;
  user: {
    ProfileImage: string;
    username: string;
  };
  title: string;
  id: string;
}

export function Landing() {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/videos")
      .then((response) => {
        const data = response.data as Video[];
        setVideos(data);
      })
      .catch((error) => {
        console.error("Error fetching videos:", error);
      });
  }, []);

  return (
    <div className="app-shell">
      <div className="page-container">
        <Navbar />
        <h1 className="page-header">Trending Videos</h1>
        <div className="landing-grid">
          {videos.map((video) => (
            <VideoCard
              key={video.id}
              imageUrl={video.thumbnail}
              title={video.title}
              profileImg={video.user.ProfileImage}
              userName={video.user.username}
              href={`/watch?id=${video.id}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface IVideoCard {
  imageUrl: string;
  title: string;
  profileImg: string;
  userName: string;
  href: string;
}

function VideoCard({ imageUrl, title, profileImg, userName, href }: IVideoCard) {
  return (
    <div className="video-card" onClick={() => (window.location.href = href)}>
      <img src={imageUrl} alt={title} />
      <div className="video-card-content">
        <div className="video-card-avatar">
          <img src={profileImg} alt={userName} />
        </div>
        <div className="video-card-text">
          <h3 className="video-card-title">{title}</h3>
          <p className="video-card-meta">{userName}</p>
          <p className="video-card-meta">2.1K views • 3 hours ago</p>
        </div>
      </div>
    </div>
  );
}

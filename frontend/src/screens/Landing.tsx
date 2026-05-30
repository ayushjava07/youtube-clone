import axios from "axios";
import { useEffect, useState } from "react";

interface Video {
  thumbnail: string;
  user: {
    ProfileImage: string;
    username: string;
  };
  title: string;
}

export function Landing() {
  const [videos, setVideos] = useState<Video[]>([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/videos")
      .then((response) => {
        const data = response.data as Video[];
        setVideos(data);
        console.log("Fetched videos:", data);
      })
      .catch((error) => {
        console.error("Error fetching videos:", error);
      });
  }, []);
  return (
    <div>
      <h1>Landing Page</h1>

      <div style={{display:"flex ", flexWrap:"wrap",gap:"40px",margin:"0 40px 0 40px", justifyContent:"center" }}>
        {videos.map((video) => (
        <VideoCard
          imageUrl={video.thumbnail}
          title={video.title}
          profileImg={video.user.ProfileImage}
          userName={video.user.username}
        />
      ))}
      {videos.map((video) => (
        <VideoCard
          imageUrl={video.thumbnail}
          title={video.title}
          profileImg={video.user.ProfileImage}
          userName={video.user.username}
        />
      ))}
      </div>
    </div>
  );
}
interface IVideoCard {
  imageUrl: string;
  title: string;
  profileImg: string;
  userName: string;
  
}
function VideoCard({ imageUrl, title, profileImg, userName }: IVideoCard) {
  return (
    <div
      style={{
        width: "460px",
        color: "white",
      }}
    >
      <img
        src={imageUrl}
        style={{
          display: "block",
          width: "100%",
          borderRadius: "12px",
          objectFit: "cover",
        }}
      />

      <div
        style={{
          display: "flex",
          marginTop: "10px",
          gap: "12px",
        }}
      >
        <img
          src={profileImg}
          alt={userName}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              fontWeight: 600,
              marginBottom: "5px",
            }}
          >
            {title}
          </div>

          <div
            style={{
              color: "#aaa",
              fontSize: "14px",
            }}
          >
            {userName}
          </div>

          <div
            style={{
              display: "flex",
              gap: "8px",
              color: "#aaa",
              fontSize: "14px",
            }}
          >
            <span>2.1K views</span>
            <span>•</span>
            <span>3 hours ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}

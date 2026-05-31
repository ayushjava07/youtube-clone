import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
interface videoDetails {
  title: string;
  thumbnail: string;
  description: string;
}
export function VideoPage() {
  const [searchParams,setSearchParams] = useSearchParams("id");
  const id = searchParams.get("id") || "";

  const [videodetails, setVideodetails] = useState<videoDetails | null>(null);
  useEffect(() => {
    axios.get(`http://localhost:3001/video/${id}`).then((response) => {
      setVideodetails(response.data);
    });
  }, [id]);
  return (
    <div>
      <h1>Video Page</h1>
      {videodetails && (
        <div>
          <h2>{videodetails.title}</h2>
          <video controls>
            <source src={videodetails.thumbnail} type="video/mp4" />
          </video>
          <p>{videodetails.description}</p>
        </div>
      )}  
    </div>
  );
}

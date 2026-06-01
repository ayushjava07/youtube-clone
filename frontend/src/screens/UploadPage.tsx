import axios from "axios";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

export default function UploadPage() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "video/*": [],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setVideoFile(acceptedFiles[0] || null);
    },
  });

  const {
    getRootProps: getThumbnailRootProps,
    getInputProps: getThumbnailInputProps,
  } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setThumbnailFile(acceptedFiles[0] || null);
    },
  });

  async function uploadFunction() {
    try {
      if (!videoFile) {
        alert("Please select a video");
        return;
      }

      if (!thumbnailFile) {
        alert("Please select a thumbnail");
        return;
      }

      if (!title.trim()) {
        alert("Please enter a title");
        return;
      }

      setLoading(true);

      const videoFormData = new FormData();
      videoFormData.append("file", videoFile);
      videoFormData.append("upload_preset", "youtube_clone");
      const videoResponse = await fetch(
        "https://api.cloudinary.com/v1_1/dhirmdjpz/video/upload",
        {
          method: "POST",
          body: videoFormData,
        }
      );
      const videoData = await videoResponse.json();

      if (!videoData.secure_url) {
        throw new Error("Video upload failed");
      }

      const thumbnailFormData = new FormData();
      thumbnailFormData.append("file", thumbnailFile);
      thumbnailFormData.append("upload_preset", "youtube_clone");
      const thumbnailResponse = await fetch(
        "https://api.cloudinary.com/v1_1/dhirmdjpz/image/upload",
        {
          method: "POST",
          body: thumbnailFormData,
        }
      );
      const thumbnailData = await thumbnailResponse.json();

      if (!thumbnailData.secure_url) {
        throw new Error("Thumbnail upload failed");
      }

      await axios.post(
        "http://localhost:3001/upload",
        {
          VideoUrl: videoData.secure_url,
          title,
          thumbnail: thumbnailData.secure_url,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        }
      );

      alert("Video uploaded successfully!");
      window.location.href = "/";
    } catch (error) {
      console.error(error);
      alert("Upload failed. Check console.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-page">
      <div className="form-card">
        <h1>Upload Video</h1>
        <input
          className="form-field"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Video Title"
        />

        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          {videoFile ? (
            <div>
              <p>Video Selected</p>
              <p>{videoFile.name}</p>
            </div>
          ) : (
            <p>Drag & drop a video file here</p>
          )}
        </div>

        <div {...getThumbnailRootProps()} className="dropzone">
          <input {...getThumbnailInputProps()} />
          {thumbnailFile ? (
            <div>
              <p>Thumbnail Selected</p>
              <p>{thumbnailFile.name}</p>
            </div>
          ) : (
            <p>Drag & drop a thumbnail image here</p>
          )}
        </div>

        <button className="form-button" onClick={uploadFunction} disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </div>
  );
}

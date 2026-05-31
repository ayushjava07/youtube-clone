import axios from "axios";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

export default function UploadPage() {
  const [videoFile, setVideoFile] =
    useState<File | null>(null);

  const [thumbnailFile, setThumbnailFile] =
    useState<File | null>(null);

  const [title, setTitle] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const {
    getRootProps,
    getInputProps,
  } = useDropzone({
    accept: {
      "video/*": [],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setVideoFile(
        acceptedFiles[0] || null
      );
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
      setThumbnailFile(
        acceptedFiles[0] || null
      );
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

      // Upload Video
      const videoFormData =
        new FormData();

      videoFormData.append(
        "file",
        videoFile
      );

      videoFormData.append(
        "upload_preset",
        "youtube_clone"
      );

      const videoResponse =
        await fetch(
          "https://api.cloudinary.com/v1_1/dhirmdjpz/video/upload",
          {
            method: "POST",
            body: videoFormData,
          }
        );

      const videoData =
        await videoResponse.json();

      console.log(
        "Video Upload:",
        videoData
      );

      if (
        !videoData.secure_url
      ) {
        throw new Error(
          "Video upload failed"
        );
      }

      // Upload Thumbnail
      const thumbnailFormData =
        new FormData();

      thumbnailFormData.append(
        "file",
        thumbnailFile
      );

      thumbnailFormData.append(
        "upload_preset",
        "youtube_clone"
      );

      const thumbnailResponse =
        await fetch(
          "https://api.cloudinary.com/v1_1/dhirmdjpz/image/upload",
          {
            method: "POST",
            body: thumbnailFormData,
          }
        );

      const thumbnailData =
        await thumbnailResponse.json();

      console.log(
        "Thumbnail Upload:",
        thumbnailData
      );

      if (
        !thumbnailData.secure_url
      ) {
        throw new Error(
          "Thumbnail upload failed"
        );
      }

      // Save Metadata
      await axios.post(
        "http://localhost:3001/upload",
        {
          VideoUrl:
            videoData.secure_url,
          title,
          thumbnail:
            thumbnailData.secure_url,
        },
        {
          headers: {
            Authorization: `Bearer ${
              localStorage.getItem(
                "token"
              ) || ""
            }`,
          },
        }
      );

      alert(
        "Video uploaded successfully!"
      );

      window.location.href = "/";
    } catch (error) {
      console.error(error);
      alert(
        "Upload failed. Check console."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "#0f0f0f",
        color: "white",
        display: "flex",
        flexDirection:
          "column",
        alignItems: "center",
        justifyContent:
          "center",
        gap: "20px",
        padding: "20px",
      }}
    >
      <h1>
        Upload Video
      </h1>
         {/* TITLE */}
      <input
        value={title}
        onChange={(e) =>
          setTitle(
            e.target.value
          )
        }
        placeholder="Video Title"
        style={{
          width: "500px",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "16px",
        }}
      />
      {/* VIDEO */}
      <div
        {...getRootProps()}
        style={{
          width: "500px",
          height: "200px",
          border:
            "2px dashed white",
          borderRadius:
            "12px",
          display: "flex",
          justifyContent:
            "center",
          alignItems:
            "center",
          cursor: "pointer",
        }}
      >
        
        <input
          {...getInputProps()}
        />

        {videoFile ? (
          <div>
            <p>
              Video Selected
            </p>
            <p>
              {
                videoFile.name
              }
            </p>
          </div>
        ) : (
          <p>
            Drag & Drop
            Video Here
          </p>
        )}
      </div>

   

      {/* THUMBNAIL */}
      <div
        {...getThumbnailRootProps()}
        style={{
          width: "500px",
          height: "200px",
          border:
            "2px dashed white",
          borderRadius:
            "12px",
          display: "flex",
          justifyContent:
            "center",
          alignItems:
            "center",
          cursor: "pointer",
        }}
      >
        <input
          {...getThumbnailInputProps()}
        />

        {thumbnailFile ? (
          <div>
            <p>
              Thumbnail
              Selected
            </p>
            <p>
              {
                thumbnailFile.name
              }
            </p>
          </div>
        ) : (
          <p>
            Drag & Drop
            Thumbnail Here
          </p>
        )}
      </div>

      <button
        onClick={
          uploadFunction
        }
        disabled={loading}
        style={{
          padding:
            "12px 24px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        {loading
          ? "Uploading..."
          : "Upload"}
      </button>
    </div>
  );
}
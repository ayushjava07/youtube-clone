import axios from "axios";

function UploadPage() {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f87d7d",
      }}
    >
      <h1
        style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "20px" }}
      >
        Upload Video
      </h1>
      <input
        className="video"
        style={{ marginBottom: "10px", padding: "10px", fontSize: "16px" }}
        type="file"
        placeholder="Enter video URL"
      />
      <input
        className="videoTitle"
        style={{ marginBottom: "10px", padding: "10px", fontSize: "16px" }}
        type="text"
        placeholder="Enter video title"
      />
      <input
        className="thumbnailUrl"
        style={{ marginBottom: "10px", padding: "10px", fontSize: "16px" }}
        type="url"
        placeholder="Enter thumbnail URL"
      />
      <button
        style={{ marginTop: "20px", padding: "10px 20px", fontSize: "16px" }}
        onClick={uploadFunction}
      >
        Upload
      </button>
    </div>
  );
}

export default UploadPage;

async function uploadFunction() {
  const videoEl = document.querySelector<HTMLInputElement>(".video");
  const videoTitleEl = document.querySelector<HTMLInputElement>(".videoTitle");
  const thumbnailUrlEl =
    document.querySelector<HTMLInputElement>(".thumbnailUrl");

  if (!videoEl || !videoTitleEl || !thumbnailUrlEl) return;
  if (!videoEl.files || !videoEl.files[0]) return;

//   const videoUrl = videoEl.value;
  const videoTitle = videoTitleEl.value;
  const thumbnailUrl = thumbnailUrlEl.value;
  const formData = new FormData();

  formData.append("file", videoEl.files[0]);
  formData.append("upload_preset", "youtube_clone");

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/dhirmdjpz/video/upload",
    {
      method: "POST",
      body: formData,
    },
  );

  const cloudinaryData = await response.json();
   const videoUrl =
    cloudinaryData.secure_url;
  const data = await axios
    .post(
      "http://localhost:3001/upload",
      {
        VideoUrl: videoUrl,
        title: videoTitle,
        thumbnail: thumbnailUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      },
    )
    .then((response) => {
      console.log("Upload successful:", response.data);
      alert("Video uploaded successfully!");
      window.location.href = "/";
    })
    .catch((error) => {
      console.error("Upload failed:", error);
      alert("Failed to upload video. Please try again.");
    });
}
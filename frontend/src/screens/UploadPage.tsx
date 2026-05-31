import axios from "axios";

function UploadPage() {
  return (
    <div style={{width:"100%", height:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", backgroundColor:"#f87d7d"   }}>
        <h1 style={{fontSize:"32px", fontWeight:"bold", marginBottom:"20px"}}>Upload Video</h1>
        <input className="videoUrl" style={{marginBottom:"10px", padding:"10px", fontSize:"16px"}} type="url" placeholder="Enter video URL" />
        <input className="videoTitle" style={{marginBottom:"10px", padding:"10px", fontSize:"16px"}} type="text" placeholder="Enter video title" />
        <input className="thumbnailUrl" style={{marginBottom:"10px", padding:"10px", fontSize:"16px"}} type="url" placeholder="Enter thumbnail URL" />
        <button style={{marginTop:"20px", padding:"10px 20px", fontSize:"16px"}} onClick={uploadFunction}>Upload</button>
    </div>
  );
}

export default UploadPage;

async function uploadFunction(){
    const videoUrlEl = document.querySelector<HTMLInputElement>(".videoUrl");
    const videoTitleEl = document.querySelector<HTMLInputElement>(".videoTitle");
    const thumbnailUrlEl = document.querySelector<HTMLInputElement>(".thumbnailUrl");

    if (!videoUrlEl || !videoTitleEl ||  !thumbnailUrlEl) return;

    const videoUrl = videoUrlEl.value;
    const videoTitle = videoTitleEl.value;
    const thumbnailUrl = thumbnailUrlEl.value;

    const data = await axios.post("http://localhost:3001/upload", {
        VideoUrl: videoUrl,
        title: videoTitle,
        thumbnail: thumbnailUrl,
    },{
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`
        },
    }
    ).then((response) => {        console.log("Upload successful:", response.data);
        alert("Video uploaded successfully!");
        window.location.href = "/";
    }).catch((error) => {
        console.error("Upload failed:", error);
        alert("Failed to upload video. Please try again.");
    });
}
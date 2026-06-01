export function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-brand">YOUTUBE</div>
      <button className="navbar-button" onClick={uploadFunction}>
        Uploads
      </button>
    </div>
  );
}

function uploadFunction() {
  window.location.href = "/upload";
}
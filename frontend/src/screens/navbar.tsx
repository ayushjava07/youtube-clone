export function Navbar() {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "20px" }}>
        <div style={{ fontWeight: "bold", fontSize: "20px"}}><p style={{color:"red"}}>YOUTUBE</p></div>
        <button style={{fontSize:"16px"}} onClick={uploadFunction}>uploads</button>
    </div>
  );
}
function uploadFunction(){
  window.location.href = "/upload"
}
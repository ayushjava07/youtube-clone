import axios from "axios";

export function Signin() {
  return (
    <div className="form-page">
      <div className="form-card">
        <h1>Sign In</h1>
        <input className="form-field" type="text" placeholder="Username" />
        <input className="form-field" type="password" placeholder="Password" />
        <button className="form-button" onClick={handleSignin}>
          Sign In
        </button>
      </div>
    </div>
  );
}

async function handleSignin() {
  const username = (document.querySelector('input[type="text"]') as HTMLInputElement).value;
  const password = (document.querySelector('input[type="password"]') as HTMLInputElement).value;

  await axios
    .post("http://localhost:3001/login", {
      username,
      password,
    })
    .then((response) => {
      const { token, userId } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      window.location.href = "/";
    })
    .catch((error) => {
      console.error("Sign-in failed:", error);
    });
}

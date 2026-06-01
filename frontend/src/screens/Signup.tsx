import axios from "axios";

export function Signup() {
  return (
    <div className="form-page">
      <div className="form-card">
        <h1>Sign Up</h1>
        <input className="form-field" type="text" placeholder="Username" />
        <input className="form-field" type="password" placeholder="Password" />
        <button className="form-button" onClick={handleSignup}>
          Sign Up
        </button>
      </div>
    </div>
  );
}

async function handleSignup() {
  const username = (document.querySelector('input[type="text"]') as HTMLInputElement).value;
  const password = (document.querySelector('input[type="password"]') as HTMLInputElement).value;

  await axios
    .post("http://localhost:3001/signup", {
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
      console.error("Sign-up failed:", error);
    });
}

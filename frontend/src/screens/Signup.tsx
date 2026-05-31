import axios from "axios";

export function Signup() {
  return (
    <div>
      <h1>Sign Up</h1>
      <input type="text" placeholder="username" />
      <input type="password" placeholder="Password" />
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
}

async function handleSignup() {
  const username = (document.querySelector('input[type="text"]') as HTMLInputElement).value;
  const password = (document.querySelector('input[type="password"]') as HTMLInputElement).value;
  // Implement sign-up logic here
  await axios.post("http://localhost:3001/signup", {
    username: username,
    password: password
  }).then((response) => {
    const { token, userId } = response.data;
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    window.location.href = "/";
    console.log("Sign-up successful:", response.data);
  }).catch((error) => {
    console.error("Sign-up failed:", error);
  });
}
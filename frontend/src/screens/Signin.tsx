import axios from "axios";

export function Signin() {
  return (
    <div>
      <h1>Sign In</h1>
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      <button onClick={handleSignin}>Sign In</button>
    </div>
  );
}

async function handleSignin() {
  const username = (document.querySelector('input[type="text"]') as HTMLInputElement).value;
  const password = (document.querySelector('input[type="password"]') as HTMLInputElement).value;
  // Implement sign-in logic here
  await axios.post("/api/signin", {
    username: username,
    password: password
  }).then((response) => {
    const { token, userId } = response.data;
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    window.location.href = "/";
    console.log("Sign-in successful:", response.data);    
  }).catch((error) => {
    console.error("Sign-in failed:", error);
  });
}
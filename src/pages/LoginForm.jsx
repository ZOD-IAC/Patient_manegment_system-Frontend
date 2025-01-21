import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setError(""); // Clear previous errors

  //   try {
  //     const response = await fetch("/api/auth/login", {
  //       method: "POST",
  //       credentials: "include", // Include cookies in the request
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ username: "admin", password: "password123" }),
  //     })
  //       .then((res) => res.json())
  //       .then((data) => console.log(data));

  //     const data = await response.json();

  //     if (response.ok) {
  //       // Store token in localStorage and redirect or proceed
  //       localStorage.setItem("token", data.token);
  //       alert("Login successful!");

  //       console.log("Token:", data.token);
  //     } else {
  //       // Show error message
  //       setError(data.error || "Login failed. Please try again.");
  //     }
  //   } catch (err) {
  //     setError("Server error. Please try again later.");
  //     console.error(err);
  //   }
  // };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("username : ", username, "\n", "password :", password);

    try {
      if (!username && !password) {
        return setError("please enter both username and password");
      }

      if (username === "admin" && password === "password") {
        setError("success");
        return navigate("/patient/findPatient");
      } else {
        return setError("incorrect username or password");
      }
    } catch (error) {
      console.log("error occurred : ", error);
      return setError("something went wrong");
    }

    setTimeout(() => {
      setError("");
    }, 2000);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[--bgColor]">
      <div className="w-full max-w-md p-8 bg-[--baseColor] rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-200">Login</h2>
        <form className="mt-6" onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-200"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-200"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
              placeholder="Enter your password"
              required
            />
          </div>
          {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

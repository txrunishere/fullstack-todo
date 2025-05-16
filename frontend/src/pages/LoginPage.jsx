import { useEffect, useId, useState } from "react";
import { isCookie, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { usePostData } from "../hooks/usePostData";

const LoginPage = () => {
  const id = useId();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const handleForm = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.warn("All Fields are required!");
      return;
    }

    try {
      const data = await usePostData("/server/user/login", {
        email,
        password,
      });
      console.log(data);
      toast.success(data.data.message);
      localStorage.setItem("accessToken", data.data.accessToken)
      navigate("/");
    } catch (error) {
      const errorMsg = error.response?.data?.error;
      toast.error(errorMsg);
    }
  }

  return (
    <>
      <form onSubmit={handleForm}>
        <div className="mb-4">
          <label className="mr-2" htmlFor={id + "-login-email"}>
            Enter Email
          </label>
          <input
            type="email"
            placeholder="Email"
            id={id + "-login-email"}
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="mr-2" htmlFor={id + "-login-password"}>
            Enter Password
          </label>
          <input
            type="password"
            placeholder="Password"
            id={id + "-login-password"}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 rounded px-2 py-1"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default LoginPage;

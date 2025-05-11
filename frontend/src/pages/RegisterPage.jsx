import { useId, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const RegisterPage = () => {
  const id = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const handleForm = async e => {
    e.preventDefault()

    if (!name || !email || !password) {
      toast.warn("All Fields are required!");
      return;
    }

    try {
      const data = await axios.post(
        "/server/user/register",
        {
          name,
          email,
          password,
        }
      );
      toast.success(data.data.message)
      navigate('/')
    } catch (error) {
      const errorMsg = error.response?.data?.error
      toast.error(errorMsg)

      if (typeof errorMsg === "object") {
        errorMsg.forEach(e => {
          toast.error(e)
        });
      }
    }
  };

  return (
    <section>
      <form onSubmit={handleForm}>
        <div className="mb-4">
          <label className="mr-2" htmlFor={id + "-name"}>Enter Name</label>
          <input
            required
            type="text"
            placeholder="Name"
            id={id + "-name"}
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="mr-2" htmlFor={id + "-email"}>Enter Email</label>
          <input
            required
            type="email"
            placeholder="Email"
            id={id + "-email"}
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="mr-2" htmlFor={id + "-password"}>Enter Password</label>
          <input
            required
            type="password"
            placeholder="Password"
            id={id + "-password"}
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
    </section>
  );
};

export default RegisterPage;

import { toast } from "react-toastify";

const LoginPage = () => {
  const notify = () => toast.success("OK Report")

  return (
    <>
      <div>Login Page</div>
      <button className="border-[2px] my-4 px-4 py-1 rounded-4xl cursor-pointer" onClick={notify}>Notify</button>
    </>
  );
};

export default LoginPage;

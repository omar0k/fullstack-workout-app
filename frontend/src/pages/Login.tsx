import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import { AppDispatch, RootState } from "../app/store";
const Login = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const { user, isError, isLoading, isSuccess, message } = useSelector(
    (state: RootState) => state.auth
  );
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);
  const { email, password } = loginData;
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt />
          Login
        </h1>
        <p>Login and start creating workouts</p>
      </section>
      <section className="form">
        <form action="" onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              name="email"
              id="email"
              className="form-control"
              onChange={onChange}
              placeholder="Enter email"
              value={email}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              value={password}
              placeholder="Enter password"
              onChange={onChange}
              className="form-control"
              name="password"
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Login
            </button>
          </div>
        </form>
      </section>
    </>
  );
};
export default Login;

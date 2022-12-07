import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = loginData;
  const login = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login", loginData);
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

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
        <form action="" onSubmit={login}>
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

import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import { AppDispatch, RootState } from "../app/store";
import { Button, Container, Form, FormControl } from "react-bootstrap";
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
    <Container className="mt-5 p-5">
      <Container className="text-center">
        <h1 className="text-center ">
          <FaSignInAlt />
          Login
        </h1>
        <p>Login and start creating workouts</p>
      </Container>
      <Container className="d-flex justify-content-center">
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <FormControl
              type="email"
              name="email"
              id="email"
              // style={{ width: "50%" }}
              className="mb-2"
              onChange={onChange}
              placeholder="Enter email"
              value={email}
            />
          </Form.Group>
          <Form.Group>
            <FormControl
              type="password"
              id="password"
              style={{ width: "300px" }}
              value={password}
              placeholder="Enter password"
              onChange={onChange}
              name="password"
            />
          </Form.Group>
          <Form.Group className="mt-2 text-center">
            <Button type="submit" className="btn btn-block w-100">
              Login
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </Container>
  );
};
export default Login;

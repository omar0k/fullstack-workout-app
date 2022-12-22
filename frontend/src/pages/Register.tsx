import { useState, useEffect, EventHandler, ChangeEvent } from "react";
import type { TypedUseSelectorHook } from "react-redux";
import { FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import { RootState } from "../app/store";
import { Button, Container, Form, FormControl } from "react-bootstrap";
const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: RootState) => state.auth
  );
  useEffect(() => {
    if (isError) {
      // @ts-ignore
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };
      dispatch(register(userData));
    }
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <Container className="mt-5 p-5">
      <Container className="text-center">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </Container>
      <Container className="d-flex justify-content-center ">
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <FormControl
              type="text"
              style={{ width: "300px" }}
              className="mb-2"
              id="name"
              value={name}
              name="name"
              placeholder="Enter your name"
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group>
            <FormControl
              type="email"
              className="mb-2"
              id="email"
              value={email}
              name="email"
              onChange={onChange}
              placeholder="Enter your email"
            />
          </Form.Group>
          <Form.Group>
            <FormControl
              type="password"
              className="mb-2"
              id="password"
              value={password}
              name="password"
              onChange={onChange}
              placeholder="Enter password"
            />
          </Form.Group>
          <Form.Group>
            <FormControl
              type="password"
              className="form-control"
              id="password2"
              value={password2}
              name="password2"
              onChange={onChange}
              placeholder="Confirm password"
            />
          </Form.Group>
          <Form.Group className="mt-2 text-center">
            <Button type="submit" className="w-100">
              Register
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </Container>
  );
};
export default Register;

import { FaUser, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { AppDispatch, RootState } from "../app/store";

import { Navbar, Nav, Button } from "react-bootstrap";

const Header = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const onLogout = () => {
    dispatch(reset());
    dispatch(logout());
    navigate("/");
  };
  return (
    <Navbar bg="dark" variant="dark">
      <div className="d-flex justify-content-between px-5 align-items-center">
        <Navbar.Brand as={Link} to="/">
          Fitness Bud
        </Navbar.Brand>
        {user ? (
          <Nav.Link
            as={Link}
            to="/exercises"
            className="align-middle text-secondary"
          >
            Exercises List
          </Nav.Link>
        ) : null}
      </div>
      <Nav className="ms-auto px-5">
        {user ? (
          <Nav.Link as={Button} onClick={onLogout}>
            <FaSignInAlt /> Logout
          </Nav.Link>
        ) : (
          <Nav.Link as={Link} to="/login">
            <FaSignOutAlt /> Login
          </Nav.Link>
        )}
        <Nav.Link as={Link} to="/register">
          <FaUser /> Register
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};
export default Header;

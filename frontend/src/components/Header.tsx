import { FaUser, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { AppDispatch, RootState } from "../app/store";

const Header = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };
  return (
    <header className="header">
      <div className="logo">
        <Link to={"/"}> Fitness Bud</Link>
      </div>
      <ul>
        {user ? (
          <li>
            <button className="btn" onClick={onLogout}>
              <FaSignInAlt /> Logout
            </button>
          </li>
        ) : (
          <li>
            <Link to={"/login"}>
              <FaSignOutAlt /> Login
            </Link>
          </li>
        )}

        <li>
          <Link to={"/register"}>
            <FaUser /> Register
          </Link>
        </li>
      </ul>
    </header>
  );
};
export default Header;

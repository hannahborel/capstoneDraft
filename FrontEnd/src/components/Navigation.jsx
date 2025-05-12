import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectToken, logout } from "../redux/authSlice";
import "./Navigation.css";
import { useFetchCartQuery } from "../api/API";

function Navigation() {
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const { data, isLoading, isError } = useFetchCartQuery(user?.id);

  const totalItems =
    data?.reduce((total, item) => total + item.quantity, 0) || 0;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="navigation">
      <div className="nav-content">
        <div className="nav-left">
          <Link to="/products" className="nav-link">
            Products
          </Link>
        </div>

        <div className="nav-right">
          {token ? (
            <>
              {user.is_admin && (
                <Link to="/admin" className="nav-link">
                  Admin
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="nav-button logout-button"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-button register-button">
                Register
              </Link>
            </>
          )}
        </div>

        <div className="nav-cart">
          <Link to="/cart" className="cart-link">
            <span className="cart-icon">🛒</span>
            {totalItems > 0 && user && (
              <span className="cart-count">{totalItems}</span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;

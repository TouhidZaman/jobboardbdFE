import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";

import auth from "../../firebase/firebase.config";
import { logOut } from "features/auth/authSlice";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const { pathname } = useLocation();
  const {
    user: { email },
  } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch(logOut());
      })
      .catch((error) => {
        toast.error("Oops failed to logout");
      });
  };

  return (
    <nav
      className={`h-14 fixed w-full z-[999] ${pathname === "/" ? null : "bg-white"}`}
    >
      <ul className="max-w-7xl mx-auto flex gap-3 h-full items-center">
        <li className="flex-auto font-semibold text-2xl">
          <Link to="/">JobBoardBD</Link>
        </li>

        <li>
          <Link className="hover:text-primary" to="/jobs">
            Jobs
          </Link>
        </li>
        {!email ? (
          <li>
            <Link className="hover:text-primary" to="/login">
              Login
            </Link>
          </li>
        ) : (
          <>
            <li>
              <button className="hover:text-primary" onClick={handleLogout}>
                Logout
              </button>
            </li>
            <li>
              <Link
                className="border border-black px-2 py-1 rounded-full hover:border-primary hover:text-white hover:bg-primary hover:px-4 transition-all "
                to="/register"
              >
                Get Started
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;


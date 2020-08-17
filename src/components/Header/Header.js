import React from "react";
import styles from "./header.module.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "../../config/firebase";

const Header = () => {
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const logout = () => {
    auth.signOut();
    dispatch({ type: "LOGOUT" });
  };

  return (
    <header className={styles.contain}>
      <div className={styles.container}>
        <Link to="/">
          <h2 className={styles.logo}>Pictagram</h2>
        </Link>
        <div className={styles.links}>
          {userData.login ? (
            <ul className={styles.header_ul}>
              <li>
                <Link to={`/profile/${userData.user.uid}`}>Profile</Link>
              </li>
              <li onClick={logout}>logout</li>
            </ul>
          ) : (
            <>
              <Link to="/login" className={styles.link}>
                Login
              </Link>
              <Link to="/register" className={styles.link}>
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;

import React from "react";
import styles from "./header.module.css";
import { Link } from "react-router-dom";
import Container from "../Container/Container";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "../../config/firebase";

const Header = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const logout = () => {
    auth.signOut();
    dispatch({ type: "LOGOUT" });
  };

  return (
    <header className={styles.container}>
      <Link to="/">
        <h2 className={styles.logo}>Pictagram</h2>
      </Link>
      <div className={styles.links}>
        {user.login ? (
          <p style={{ cursor: "pointer" }} onClick={logout}>
            logout
          </p>
        ) : (
          <>
            <Link to="/login" className={styles.link}>
              Login
            </Link>
            <Link to="/register" className={styles.link}>
              Register
            </Link>{" "}
          </>
        )}
      </div>
    </header>
  );
};
export default Header;

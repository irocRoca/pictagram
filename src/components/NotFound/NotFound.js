import React from "react";
import Container from "../Container/Container";
import styles from "./notfound.module.css";

const NotFound = () => {
  return (
    <Container>
      <div className={styles.page}>
        <h2 className={styles.title}>404 Page not found</h2>
        <p>Oops!</p>
      </div>
    </Container>
  );
};

export default NotFound;

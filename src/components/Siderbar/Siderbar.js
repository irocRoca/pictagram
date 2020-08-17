import React from "react";
import styles from "./siderbar.module.css";
import Avatar from "@material-ui/core/Avatar";

const Siderbar = ({ user }) => {
  console.log(user);
  return (
    <section className={styles.sidebar}>
      <div className={styles.header}>
        <Avatar className={styles.avatar} src={user && user.photoURL} />
        <div className={styles.header_contain}>
          <h3 className={styles.username}>
            {!user ? user.displayName : "Username"}
          </h3>
          <p className={styles.bio}>
            Random information that would need to be pulled from database to
            store as bio
          </p>
        </div>
      </div>
      <div className={styles.suggestions}>Suggestions for you</div>
      <div className={styles.footer}>&copy; 2020 Rights Reserved</div>
    </section>
  );
};

export default Siderbar;

import React from "react";
import styles from "./comment.module.css";
import { Link } from "react-router-dom";

const Comment = ({ username, comment, userid }) => {
  return (
    <p className={styles.comment}>
      <span className={styles.caption_username}>
        <Link to={`/profile/${userid}`}>{username}</Link>
      </span>
      {comment}
    </p>
  );
};

export default React.memo(Comment);

import React from "react";
import styles from "./comment.module.css";

const Comment = ({ username, comment }) => {
  return (
    <p className={styles.comment}>
      <span className={styles.caption_username}>{username}</span>
      {comment}
    </p>
  );
};

export default Comment;

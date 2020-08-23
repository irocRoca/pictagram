import React, { useState, useEffect } from "react";
import Modal from "../../Modal/Modal";
import { db } from "../../../config/firebase";
import styles from "./extendedpost.module.css";

const ExtendedPost = ({ open, setOpen, postId }) => {
  const [post, setPost] = useState({});
  const handleClose = () => {
    setOpen(!open);
  };

  useEffect(() => {
    db.collection("posts")
      .doc(postId)
      .get()
      .then((ref) => {
        setPost(ref.data());
      });
  }, [postId]);

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <div style={{ display: "flex" }}>
          <div>
            <span className={styles.like} />
            <img
              src={post.photourl}
              alt="pic"
              style={{ height: "200px", width: "200px" }}
            />
          </div>

          <div>
            <div className={styles.header}>
              <div className={styles.avatar}>R</div>
              <div className={styles.username}>{post.username}</div>
            </div>

            <section>Comments</section>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ExtendedPost;

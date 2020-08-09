import React, { useEffect } from "react";
import styles from "./post.module.css";
import { db } from "../../config/firebase";

const Post = () => {
  useEffect(() => {
    // db.collection("posts")
    //   .add({
    //     userName: "irocRoca",
    //     imageUrl: "something url",
    //   })
    //   .then((docRef) => {
    //     console.log(docRef.id);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, []);

  return (
    <section className={styles.post}>
      <div className={styles.header}>
        <div className={styles.avatar}>R</div>
        <div className={styles.username}>Username</div>
      </div>
      <img src="./images/yoda.jpg" alt="pic" className={styles.image} />
      <div className={styles.comment_section}>
        {/* Make images clickable */}
        <div className={styles.icons}>
          <img src="./images/heart.png" alt="like" />
          <img src="./images/comment.png" alt="comment" />
        </div>
        <div className={styles.likes}>1400 Likes</div>
        {/* Make comment a component later*/}
        <p className={styles.comment}>
          <span className={styles.caption_username}>johnDoe: </span> Random
          infomation about this post. you look pretty.
        </p>
        <p className={styles.comment}>
          <span className={styles.caption_username}>irocRoca: </span> Looks
          cool!!
        </p>
      </div>
    </section>
  );
};

export default Post;

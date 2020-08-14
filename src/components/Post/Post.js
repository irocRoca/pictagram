import React, { useEffect, useState } from "react";
import Comment from "./Comment/Comment";
import styles from "./post.module.css";
import { db } from "../../config/firebase";
import AddComment from "./AddComment/AddComment";
import { useSelector } from "react-redux";

const Post = ({ username, caption, id, photourl, dim }) => {
  const userData = useSelector((state) => state.user);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [active, setActive] = useState(false);

  useEffect(() => {
    let sub = db
      .collection("posts")
      .doc(id)
      .collection("comments")
      .orderBy("createdAt", "asc")
      .onSnapshot((snap) => {
        setComments(
          snap.docs.map((item) => {
            return { id: item.id, ...item.data() };
          })
        );
      });
    return () => sub();
  }, []);

  useEffect(() => {
    let likeSub = db
      .collection("posts")
      .doc(id)
      .collection("likes")
      .onSnapshot((snap) => {
        snap.docs.map((doc) => {
          if (doc.data().id === userData.user.uid) {
            setActive(true);
          }
        });
        setLikes(snap.size);
      });
    return () => likeSub();
  }, []);

  const handleDoubleClick = (e) => {
    let likeRef = db.collection("posts").doc(id).collection("likes");

    likeRef
      .where("id", "==", userData.user.uid)
      .get()
      .then((doc) => {
        if (doc.size > 0) {
          let docId = doc.docs[0].id;
          likeRef.doc(docId).delete();
          setActive(false);
        } else {
          likeRef.add({
            username,
            id: userData.user.uid,
          });
        }
      });
  };

  return (
    <section className={styles.post}>
      <div className={styles.header}>
        <div className={styles.avatar}>R</div>
        <div className={styles.username}>{username}</div>
      </div>
      <div
        className={styles.image_container}
        style={{ paddingBottom: `${dim}%`, cursor: "pointer" }}
        onDoubleClick={handleDoubleClick}
      >
        <span className={styles.like} />
        <img src={photourl} alt="pic" className={styles.image} />
      </div>
      <div className={styles.comment_section}>
        {/* Make images clickable */}
        <div className={styles.icons}>
          <i
            className={`far fa-heart ${styles.heart} ${
              active && styles.active
            }`}
          ></i>
          {/* On click it would take me to all comments on mobile screen */}
          <i className={`far fa-comment ${styles.comment_icon}`}></i>
        </div>
        <div className={styles.likes}>{likes} Likes</div>
        {/* Make comment a component later*/}
        <p className={styles.caption}>
          <span className={styles.caption_username}>{username}:</span>
          {caption}
        </p>
        {comments && comments.length > 5 ? (
          <>
            <p className={styles.view_comment}>
              View all {comments.length} comment
            </p>
            {comments
              .slice(comments.length - 2, comments.length)
              .map((item) => (
                <Comment
                  username={item.username}
                  comment={item.comment}
                  key={item.id}
                />
              ))}
          </>
        ) : (
          comments.map((item) => (
            <Comment
              username={item.username}
              comment={item.comment}
              key={item.id}
            />
          ))
        )}
        {userData.login && <AddComment postId={id} />}
      </div>
    </section>
  );
};

export default Post;
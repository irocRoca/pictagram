import React, { useEffect, useState } from "react";
import Comment from "./Comment/Comment";
import styles from "./post.module.css";
import { db } from "../../config/firebase";
import AddComment from "./AddComment/AddComment";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ExtendedPost from "./ExtendedPost/ExtendedPost";

const Post = ({ username, caption, id, photourl, dim, userid }) => {
  const userData = useSelector((state) => state.user);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

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
  }, [id]);

  useEffect(() => {
    let likeSub;
    if (userData) {
      likeSub = db
        .collection("posts")
        .doc(id)
        .collection("likes")
        .onSnapshot((snap) => {
          snap.docs.forEach((doc) => {
            if (doc.data().id === userData.user.uid) {
              setActive(true);
            }
          });
          setLikes(snap.size);
        });
    }
    return () => likeSub();
  }, [userData, id]);

  const handleDoubleClick = (e) => {
    if (userData.login) {
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
    } else {
      console.log("must sign in to like photo");
    }
  };

  const handleClick = () => {
    setOpen(true);
  };

  return (
    <section className={styles.post}>
      <div className={styles.header}>
        <div className={styles.avatar}>R</div>
        <div className={styles.username}>
          <Link to={`/profile/${userid}`}>{username}</Link>
        </div>
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
            onClick={handleDoubleClick}
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
          <span className={styles.caption_username}>
            <Link to={`/profile/${userid}`}>{username}</Link>:
          </span>
          {caption}
        </p>
        {comments && comments.length > 5 ? (
          <>
            <p className={styles.view_comment} onClick={handleClick}>
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
              userid={item.userid}
            />
          ))
        )}
        {userData.login && <AddComment postId={id} />}
      </div>
      {open && <ExtendedPost setOpen={setOpen} open={open} postId={id} />}
    </section>
  );
};

export default Post;

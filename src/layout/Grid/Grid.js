import React, { useState, useEffect } from "react";
import Post from "../../components/Post/Post";
import styles from "./grid.module.css";
import CreatePostButton from "../../components/CreatePost/CreatePostButton.js/CreatePostButton";
import Container from "../../components/Container/Container";
import { useSelector, useDispatch } from "react-redux";
import { auth, db } from "../../config/firebase";
import Siderbar from "../../components/Siderbar/Siderbar";

const GridLayout = () => {
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [post, setPost] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        if (!userData.login) {
          dispatch({ type: "LOGIN", payload: user });
        }
      }
    });
    return () => {
      unsubscribe();
    };
  }, [userData, dispatch]);

  useEffect(() => {
    let unsub = db
      .collection("posts")
      .orderBy("createdAt", "desc")
      .onSnapshot((snap) => {
        setPost(
          snap.docs.map((item) => {
            return { id: item.id, ...item.data() };
          })
        );
      });
    return () => unsub();
  }, []);

  return (
    <>
      <Container>
        {userData.login && userData.uid}
        <div className={styles.grid}>
          <main className={styles.main}>
            {post.map((item) => (
              <Post
                username={item.username}
                caption={item.caption}
                photourl={item.photourl}
                key={item.id}
                id={item.id}
                dim={item.dim}
              />
            ))}
          </main>
          <Siderbar user={userData.user} />
        </div>
        {userData.login && <CreatePostButton />}
      </Container>
    </>
  );
};

export default GridLayout;

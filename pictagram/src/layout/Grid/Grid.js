import React, { useState, useEffect } from "react";
import Post from "../../components/Post/Post";
import styles from "./grid.module.css";
import Modal from "../../components/Modal/Modal";
import CreatePostButton from "../../components/CreatePost/CreatePostButton.js/CreatePostButton";
import Register from "../../components/Register/Register";
import Container from "../../components/Container/Container";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "../../config/firebase";

const GridLayout = () => {
  const [open, setOpen] = useState(false);
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        console.log(userData);
        if (!userData.login) {
          dispatch({ type: "LOGIN", payload: user });
        }
      }
    });
    return () => {
      unsubscribe();
    };
  }, [userData]);

  return (
    <>
      <Container>
        {userData.login && userData.uid}
        <div className={styles.grid}>
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
        <CreatePostButton />
        <Modal status={open}>
          <Register />
        </Modal>
      </Container>
    </>
  );
};

export default GridLayout;

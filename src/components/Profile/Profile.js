import React, { useEffect, useState } from "react";
import { Avatar } from "@material-ui/core";
import Container from "../Container/Container";
import styles from "./profile.module.css";
import { useParams, useHistory } from "react-router-dom";
import { db } from "../../config/firebase";

const Profile = (props) => {
  let { id } = useParams();
  let history = useHistory();
  const [data, setData] = useState([]);

  useEffect(() => {
    db.collection("posts")
      .where("userid", "==", id)
      .get()
      .then((snap) => {
        let info = [];
        snap.forEach((doc) => {
          info.push({ docid: doc.id, ...doc.data() });
        });
        setData(info);
      });
  }, [id]);

  return (
    <Container>
      <header className={styles.header}>
        <Avatar style={{ width: "80px", height: "80px" }} />

        <section className={styles.section}>
          <div>
            <span className={styles.username}>Username</span>
            <button
              className={styles.btn}
              onClick={() => history.push(`/profile/edit/${id}`)}
            >
              Edit Profile
            </button>
          </div>
          <div className={styles.bio}>
            Random information about a random person that would be long.
          </div>
        </section>
      </header>
      <div className={styles.divider}></div>

      {/* Grid of three images */}
      <div className={styles.center}>
        <div className={styles.grid}>
          {data &&
            data.map((item) => (
              <div
                key={item.docid}
                className={styles.contain}
                style={{ paddingTop: `${item.dim}%` }}
              >
                <img src={item.photourl} alt="" className={styles.image} />
              </div>
            ))}
        </div>
      </div>
    </Container>
  );
};

export default Profile;

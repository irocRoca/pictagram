import React from "react";
import TextField from "@material-ui/core/TextField";
import { Avatar, Button } from "@material-ui/core";
import styles from "./account.module.css";

const Account = () => {
  return (
    <div className={styles.container}>
      {/* {error && <Alert severity="error">{error}</Alert>} */}

      <h3 className={styles.title}>
        <Avatar />
      </h3>
      <form>
        <div className={styles.row}>
          <TextField
            label="Username"
            margin="dense"
            name="username"
            variant="outlined"
            type="text"
          />
        </div>
        <div className={styles.row}>
          <TextField
            label="First Name"
            margin="dense"
            name="firstname"
            variant="outlined"
            type="text"
          />
        </div>
        <div className={styles.row}>
          <TextField
            label="Last Name"
            margin="dense"
            name="lastname"
            variant="outlined"
            type="text"
          />
        </div>
        <div className={styles.row}>
          <TextField
            label="Bio"
            margin="dense"
            name="bio"
            variant="outlined"
            multiline
            rows={4}
            type="text"
          />
        </div>

        <div className={styles.btncontain}>
          <Button
            variant="contained"
            color="primary"
            style={{ textAlign: "center" }}
            type="submit"
          >
            Update
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Account;

import React from "react";
import Fab from "@material-ui/core/Fab";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "../../Modal/Modal";
import CreatePost from "../CreatePost";

const useStyles = makeStyles((theme) => ({
  btn: {
    position: "fixed",
    bottom: "15px",
    right: "15px",
  },
}));

const CreatePostButton = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {!open && (
        <Fab
          size="medium"
          color="secondary"
          aria-label="add"
          className={classes.btn}
          onClick={handleClick}
        >
          +
        </Fab>
      )}
      <Modal open={open} onClose={handleClose}>
        <CreatePost onClose={handleClose} />
      </Modal>
    </>
  );
};

export default CreatePostButton;

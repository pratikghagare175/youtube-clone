import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import { useState, useRef } from "react";

const useStyles = makeStyles((theme) => ({
  addComment: {
    marginBottom: "2rem",
    marginTop: "0.5rem",
  },

  avatar: {
    margin: "0.5rem 0rem",
  },
  commentInput: {
    width: "73ch",
    verticalAlign: "middle",
    marginLeft: "1rem",
    marginTop: "-2.5rem",
  },

  commentBtn: {
    backgroundColor: "#3EA6FF",
    color: "#FFFFFF",
    borderRadius: 0,
  },

  cancelBtn: {
    color: "#FFFFFF",
    marginRight: "1rem",
    borderRadius: 0,
  },
}));

const Comments = () => {
  const classes = useStyles();
  const [showCommentBtn, setShowCommentBtn] = useState(false);
  let commentInput = useRef(null);

  const handleCommentChange = () => {
    setShowCommentBtn(true);
  };

  const handleCancel = () => {
    commentInput.current.value = "";
    setShowCommentBtn(false);
  };

  return (
    <>
      <Typography>1,234 Comments</Typography>
      <Grid container alignItems="flex-end" className={classes.addComment}>
        <Grid item>
          <Avatar
            alt="Remy Sharp"
            src="https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
            className={classes.avatar}
          />
        </Grid>
        <Grid item>
          <form noValidate autoComplete="off">
            <Input
              placeholder="Add a public comment"
              inputProps={{ "aria-label": "description" }}
              fullWidth
              inputRef={commentInput}
              onChange={handleCommentChange}
              className={classes.commentInput}
            />
          </form>
        </Grid>
        {showCommentBtn && (
          <Grid item xs={12}>
            <div style={{ float: "right" }}>
              <Button onClick={handleCancel} className={classes.cancelBtn}>
                Cancel
              </Button>
              <Button className={classes.commentBtn}>Comment</Button>
            </div>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default Comments;

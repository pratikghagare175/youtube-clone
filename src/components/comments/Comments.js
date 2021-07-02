import React, { useState, useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { addComments, fetchVideoComments } from "../../redux/slices/watchScreenSlice";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  addComment: {
    marginBottom: "1.5rem",
    marginTop: "0.6rem",
  },

  avatar: {
    margin: "0.5rem 0rem",
    [theme.breakpoints.down("md")]: {
      margin: "0rem 0.5rem",
    },
  },
  commentInput: {
    width: "73ch",
    verticalAlign: "middle",
    marginLeft: "1rem",
    marginTop: "-2.5rem",
    [theme.breakpoints.down("md")]: {
      width: "30ch",
      marginLeft: "0.5rem",
      marginTop: "-2.0rem",
    },
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

  comment: {
    marginLeft: "-0.6rem",
    verticalAlign: "middle",
    [theme.breakpoints.down("xs")]: {
      marginLeft: "0.7rem",
    },
  },
}));

const Comments = ({ videoId }) => {
  const classes = useStyles();
  const [showCommentBtn, setShowCommentBtn] = useState(false);
  const [commentText, setCommentText] = useState("");
  let commentInput = useRef(null);
  const dispatch = useDispatch();

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
    setShowCommentBtn(true);
  };

  const handleCancel = () => {
    commentInput.current.value = "";
    setShowCommentBtn(false);
  };

  useEffect(() => {
    dispatch(fetchVideoComments({ videoId }));
  }, [dispatch, videoId]);

  //? grab the comments from the store
  const comments = useSelector((state) => state.watchScreen.comments);

  const _comments = comments?.map((comment) => comment.snippet.topLevelComment.snippet);

  const postComment = () => {
    dispatch(addComments({ videoId, comment: commentText }));
  };

  const UserComment = ({ comment }) => {
    return (
      <Grid container style={{ marginBottom: "1.5rem" }}>
        <Grid item xs={1}>
          <Avatar alt={comment.authorDisplayName} src={comment.authorProfileImageUrl} />
        </Grid>
        <Grid item xs={10}>
          <div className={classes.comment}>
            <Typography variant="body2">
              <strong>{comment.authorDisplayName}</strong> {moment(comment.publishedAt).fromNow()}
            </Typography>
            <Typography variant="body2">{comment.textDisplay}</Typography>
          </div>
        </Grid>
      </Grid>
    );
  };

  return (
    <>
      {/* <Typography>1,234 Comments</Typography> */}
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
              value={commentText}
              onChange={(e) => handleCommentChange(e)}
              className={classes.commentInput}
            />
          </form>
        </Grid>
        {showCommentBtn && (
          <Grid item xs={11}>
            <div style={{ float: "right" }}>
              <Button onClick={handleCancel} className={classes.cancelBtn}>
                Cancel
              </Button>
              <Button className={classes.commentBtn}>Comment</Button>
            </div>
          </Grid>
        )}
      </Grid>
      {_comments?.map((comment, index) => {
        return <UserComment comment={comment} key={index} />;
      })}
    </>
  );
};

export default Comments;

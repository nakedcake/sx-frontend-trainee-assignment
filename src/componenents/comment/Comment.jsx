import React, { useEffect, useState } from "react";
import { sanitize } from "dompurify";
import { connect } from "react-redux";
import cn from "clsx";
import { foramtDate } from "../../services/formatter";
import { addItems as addItemsAction } from "../../services/store";
import { Comments } from "../Comments";
import s from "./Comment.module.css";

const CommentComponent = ({ comment, forceOpen = false, addItems }) => {
  const [open, setOpen] = useState(forceOpen);

  useEffect(() => {
    if (open && comment) {
      addItems([comment.id]);
    }
  }, [open, comment]);

  const handleOpen = () => setOpen(!open);

  if (comment && comment.dead) return null;

  if (!comment)
    return (
      <div className={s.root}>
        <div className={s.rootCommentContainer}>
          <div className={s.comment}>
            <div className={cn(s.header, s.headerSkeleton)} />
            <div className={s.message}><div className={s.messageSkeleton}/>
            <div className={s.messageSkeleton}/>
            </div>
          </div>
        </div>
      </div>
    );

  const commentComponent = (
    <div className={s.comment}>
      <div className={s.header}>
        <span className={s.nickname}>{comment.by}</span>{" "}
        {foramtDate(comment.time)}
      </div>
      <div
        className={s.message}
        dangerouslySetInnerHTML={{ __html: sanitize(comment.text) }}
      />
    </div>
  );

  const isButton = Boolean(!forceOpen && comment.kids && comment.kids.length);

  return (
    <div className={s.root}>
      <div className={s.rootCommentContainer}>
        {Boolean(isButton) ? (
          <button className={s.button} onClick={handleOpen}>
            <div className={cn(s.kidsDot, open && s.kidDotOpen)}>
              {comment.kids.length}
            </div>
            {commentComponent}
          </button>
        ) : (
          commentComponent
        )}
      </div>
      {open && (
        <div className={s.child}>
          <Comments commensIds={comment.kids} forceOpen />
        </div>
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addItems: (list, options) => dispatch(addItemsAction(list, options)),
});

export const Comment = connect(null, mapDispatchToProps)(CommentComponent);

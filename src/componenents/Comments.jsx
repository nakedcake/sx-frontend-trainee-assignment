import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { addItems } from "../services/store";
import { Comment } from "./comment";

const CommentsComponent = ({
  addItems,
  commensIds,
  itemsMap,
  forceOpen = false,
}) => {
  useEffect(() => {
    if (commensIds) {
      addItems(commensIds);
    }
  }, [commensIds]);

  if (!commensIds) return null;

  return (
    <div>
      {commensIds.map((id) => {
        const comment = itemsMap.get(id);
        return (
          <div key={id}>
            <Comment comment={comment} forceOpen={forceOpen} />
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = ({ itemsMap }) => ({ itemsMap });

const mapDispatchToProps = (dispatch) => ({
  addItems: (list) => dispatch(addItems(list)),
});

export const Comments = connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentsComponent);

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { addItems as addItemsAction } from "../../services/store";
import { Comments } from "../Comments";
import { foramtDate } from "../../services/formatter";

const StoryPageComponent = ({ itemsMap, addItems }) => {
  const { itemId } = useParams();

  const handleGetItem = () => addItems([itemId], { forceUpdate: true });

  useEffect(() => {
    handleGetItem();
    const intervalId = setInterval(
      handleGetItem,
      process.env.API_REFRESH_TIMEOUT_MILLISECONDS
    );

    return () => clearInterval(intervalId);
  }, [itemId]);

  const item = itemsMap.get(parseInt(itemId));

  if (!item) return null;

  const url = item.url ? new URL(item.url) : null;

  return (
    <div>
      <div>{item.title}</div>
      <div>{url && <a href={url.href}>({url.host})</a>}</div>
      <div>
        {item.by} at {foramtDate(item.time)}
      </div>
      <div>
        Comments {Boolean(item.descendants) && `(${item.descendants})`}{" "}
        <button onClick={handleGetItem}>Refresh</button>
      </div>
      {Boolean(item.kids) && <Comments commensIds={item.kids} />}
    </div>
  );
};

const mapStateToProps = ({ itemsMap }) => ({ itemsMap });

const mapDispatchToProps = (dispatch) => ({
  addItems: (list, options) => dispatch(addItemsAction(list)),
});

export const StoryPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(StoryPageComponent);

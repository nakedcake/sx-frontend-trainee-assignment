import React, { useEffect } from "react";
import { Story } from "./story";
import { connect } from "react-redux";
import {
  addItems as addItemsAction,
  getItemsIds as getItemsIdsAction,
} from "../services/store";

const StoriesComponent = ({ itemsIds, itemsMap, addItems, getItemsIds }) => {
  useEffect(() => {
    getItemsIds();
    const intervalId = setInterval(
      () => getItemsIds(),
      process.env.API_REFRESH_TIMEOUT_MILLISECONDS
    );

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    addItems(itemsIds);
  }, [itemsIds]);

  return (
    <div>
      <button onClick={getItemsIds}>Refresh</button>
      {itemsIds.map((id) => (
        <Story key={id} story={itemsMap.get(id)} />
      ))}
    </div>
  );
};

const mapStateToProps = ({ itemsMap, itemsIds }) => ({ itemsMap, itemsIds });

const mapDispatchToProps = (dispatch) => ({
  getItemsIds: () => dispatch(getItemsIdsAction()),
  addItems: (list) => dispatch(addItemsAction(list)),
});

export const Stories = connect(
  mapStateToProps,
  mapDispatchToProps
)(StoriesComponent);

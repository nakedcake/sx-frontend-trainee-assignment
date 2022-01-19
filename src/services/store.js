import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { getItem, getItemsIds as getItemsIdsFromApi } from "./api";

const ITEMS_LIMIT = process.env.STORIES_LIST_LIMIT;

const ADD_ITEMS_IDS = "ADD_ITEMS_IDS";
const ADD_ITEMS = "ADD_ITEMS";

function appReducer(state = { itemsIds: [], itemsMap: new Map() }, action) {
  switch (action.type) {
    case ADD_ITEMS_IDS:
      return {
        ...state,
        itemsIds: [...new Set([...action.ids, ...state.itemsIds])].slice(
          0,
          ITEMS_LIMIT
        ),
      };
    case ADD_ITEMS:
      return {
        ...state,
        itemsMap: new Map([
          ...action.items?.reduce(
            (prev, curr) => prev.set(curr.id, curr),
            state.itemsMap
          ),
        ]),
      };
    default:
      return state;
  }
}

export const store = createStore(appReducer, applyMiddleware(thunk));

const addItemsIdsAction = (ids) => ({
  type: ADD_ITEMS_IDS,
  ids,
});

const addItemsAction = (items) => ({
  type: ADD_ITEMS,
  items,
});

export const getItemsIds = () => async (dispatch) =>
  getItemsIdsFromApi().then((list) => dispatch(addItemsIdsAction(list)));

export const addItems = (items, options = { forceUpdate: false }) => {
  return (dispatch, getState) => {
    const { itemsMap } = getState();

    const getItemsBatch = (batchStartIndex) => {
      if (batchStartIndex >= items.length) {
        return null;
      }

      const BATCH_SIZE = 5;

      const remainItems = items.length - batchStartIndex;

      const remainBatchSize =
        remainItems < BATCH_SIZE ? remainItems : BATCH_SIZE;

      let requests = [];

      let batchIndex = 0;

      while (remainBatchSize > batchIndex) {
        if (
          options.forceUpdate ||
          !itemsMap.has(items[batchStartIndex + batchIndex])
        ) {
          requests.push(getItem(items[batchStartIndex + batchIndex]));
        }
        batchIndex += 1;
      }

      Promise.all(requests).then((items) => {
        dispatch(addItemsAction(items.filter((item) => item)));
      });

      getItemsBatch(batchStartIndex + BATCH_SIZE);
    };

    getItemsBatch(0);
  };
};

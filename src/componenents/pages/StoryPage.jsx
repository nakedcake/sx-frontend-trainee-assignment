import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { routes } from "../../routes";
import { addItems as addItemsAction } from "../../services/store";
import { Comments } from "../Comments";
import { ButtonBase } from "../common/ButtonBase";
import { Link } from "../common/Link";
import { Refresh } from "../icons/Refresh";
import { ArrorLeft } from "../icons/ArrorLeft";
import { Story } from "../story";
import s from "./StoryPage.module.css";

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

  if (item && item.dead) return null;

  return (
    <div className={s.root}>
      <Link className={s.back} href={routes.app.index.getRoute()}>
        <ArrorLeft />
        back
      </Link>
      <Story className={s.story} story={item} />
      {item && (
        <>
          <div className={s.comments}>
            Comments {Boolean(item.descendants) && item.descendants}
            <ButtonBase onClick={handleGetItem} className={s.refresh}>
              <Refresh />
            </ButtonBase>
          </div>
          {Boolean(item.kids) && <Comments commensIds={item.kids} />}
        </>
      )}
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

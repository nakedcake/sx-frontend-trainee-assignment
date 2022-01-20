import React from "react";
import cn from "clsx";
import { routes } from "../../routes";
import { foramtDate } from "../../services/formatter";
import { Link } from "../common/Link";
import s from "./Story.module.css";

export const Story = ({ story }) => {
  if (!story) {
    return (
      <div className={cn(s.root, s.rootSkeleton)}>
        <div className={cn(s.title, s.titleSkeleton)} />
        <div className={cn(s.details, s.detailsSkeleton)} />
      </div>
    );
  }
  return (
    <Link className={s.root} href={routes.app.story.getRoute(story.id)}>
      <div className={s.title}>{story.title}</div>
      <div className={s.details}>
        {story.score} points by <span className={s.nickname}>{story.by}</span>{" "}
        <span className={s.time}>{foramtDate(story.time)}</span>
      </div>
    </Link>
  );
};

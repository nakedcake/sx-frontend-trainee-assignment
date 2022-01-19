import React from "react";
import { routes } from "../routes";
import { foramtDate } from "../services/formatter";
import { Link } from "./common/Link";

export const StoryPreview = ({ story }) => {
  if (!story) return null;

  return (
    <div>
      <div>
      <Link href={routes.story.getRoute(story.id)}>{story.title}</Link>
      </div>
      <div>
        {story.score} points by {story.by} at {foramtDate(story.time)}
      </div>
      <div></div>
    </div>
  );
};

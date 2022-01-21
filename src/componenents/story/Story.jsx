import React from "react";
import cn from "clsx";
import { routes } from "../../routes";
import { foramtDate } from "../../services/formatter";
import { Link } from "../common/Link";
import { Link as LinkIcon } from "../icons/Link";
import s from "./Story.module.css";

export const Story = ({ className, story, isLink = false }) => {
  if (!story) {
    return (
      <div className={cn(s.root, s.rootSkeleton)}>
        <div className={cn(s.title, s.titleSkeleton)} />
        <div className={cn(s.details, s.detailsSkeleton)} />
      </div>
    );
  }

  if (story.dead) return null;

  const Container = ({ children }) =>
    isLink ? (
      <Link
        className={cn(s.root, className)}
        href={routes.app.story.getRoute(story.id)}
      >
        {children}
      </Link>
    ) : (
      <div className={className}>{children}</div>
    );

  const url = story.url ? new URL(story.url) : null;

  return (
    <Container>
      <div className={s.title}>{story.title}</div>
      {!isLink && url && (
        <div className={s.url}>
          <a href={url.href}>
            <LinkIcon className={s.linkIcon} />
            {url.host}
            {url.pathname.length > 1 && (
              <span className={s.urlPathname}>{url.pathname}</span>
            )}
          </a>
        </div>
      )}
      <div className={s.details}>
        {story.score} {story.score === 1 ? "point" : "points"} by{" "}
        <span className={s.nickname}>{story.by}</span> {foramtDate(story.time)}
      </div>
    </Container>
  );
};

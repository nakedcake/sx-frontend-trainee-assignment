import { routes } from "../routes";

const API_ENDPOINT = `${process.env.API_HOST}:${process.env.API_PORT}`;

const fetcher = (url) =>
  fetch(`${API_ENDPOINT}${url}`).then((res) => res.json());

export const getItemsIds = () => fetcher(routes.api.stories.getRoute());

export const getItem = (id) => fetcher(routes.api.item.getRoute(id));

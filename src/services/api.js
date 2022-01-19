const fetcher = (url) => fetch(url).then((res) => res.json());

export const getItemsIds = () =>
  fetcher("https://hacker-news.firebaseio.com/v0/newstories.json");

export const getItem = (id) =>
  fetcher(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);

module.exports = {
  routes: {
    api: {
      stories: {
        getRoute: () => `/api/stories`,
      },
      item: {
        getRoute: (itemId) => `/api/items/${itemId}`,
      },
    },
    app: {
      index: {
        getRoute: () => "/",
      },
      story: {
        getRoute: (itemId) => `/stories/${itemId}`,
      },
    },
  },
};

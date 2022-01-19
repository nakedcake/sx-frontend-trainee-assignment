module.exports = {
  routes: {
    index: {
      getRoute: () => "/",
    },
    story: {
      getRoute: (itemId) => `/stories/${itemId}`,
    },
  },
};

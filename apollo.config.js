module.exports = {
  client: {
    includes: ['./src/**/*.{tsx,ts}'],
    tagName: 'gql',
    service: {
      name: 'hi-agile',
      url: 'http://hi-agile.herokuapp.com/graphql',
    },
  },
};

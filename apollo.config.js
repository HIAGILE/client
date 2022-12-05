module.exports = {
  client: {
    includes: ['./src/**/*.{tsx,ts}'],
    tagName: 'gql',
    service: {
      name: 'hi-agile',
      url: 'https://hi-agile.herokuapp.com/graphql',
    },
  },
};

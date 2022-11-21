module.exports = {
  client: {
    includes: ['./src/**/*.{tsx,ts}'],
    tagName: 'gql',
    service: {
      name: 'hi-agile',
      url: 'http://localhost:4000/graphql',
    },
  },
};

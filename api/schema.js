import { makeExecutableSchema } from 'graphql-tools';
import NewsAPI from 'newsapi';
import newsApiSchema from './newsapi/schema';
import {
  NEWS_API_KEY,
} from './apiKeys';

const newsapi = new NewsAPI(NEWS_API_KEY);

const rootSchema = [`
# A list of options for the sort order of the feed
enum SortType {
  # Requests a list of the source's headlines sorted in the order they appear on its homepage.
  top
  # Requests a list of the source's headlines sorted in chronological order, newest first.
  latest
  # Requests a list of the source's current most popular or currently trending headlines.
  popular
}
type Query {
  # News feed
  feed(
    # Source of the article
    source: String!,
    # The sort order for the feed
    sortBy: SortType!,
    # The number of items to skip, for pagination
    offset: Int,
    # The number of items to fetch starting from the offset, for pagination
    limit: Int
  ): [NewsFeed]
}
schema {
  query: Query
}
`];

const rootResolvers = {
  Query: {
    feed(root, {
      source,
      sortBy,
      // offset,
      // limit,
    }, /* context */) {
      return new Promise((resolve, reject) => {
        // To query articles
        newsapi.articles({
          source, // required
          sortBy, // optional
        }).then(articlesResponse => resolve([articlesResponse]))
            .catch(error => reject(error));
      });
    },
  },
};
const schema = [...rootSchema, ...newsApiSchema];
const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers: rootResolvers,
});

export default executableSchema;

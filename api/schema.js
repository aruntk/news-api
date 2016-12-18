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

  enum Language {
  # English
  en
  # German
  de
  # French
  fr
  }
  enum Country {
  # Australia
  au
  # Germany
  de
  # Great Britain
  gb
  # India
  in
  # Italy
  it
  # USA
  us
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
  sources(
    # The category you would like to get sources for. Possible options: business, entertainment, gaming, general, music, science-and-nature, sport, technology. Default: empty (all sources returned)
    category: String,
    # The 2-letter ISO-639-1 code of the language you would like to get sources for. Possible options: en, de, fr. Default: empty (all sources returned)
    language: Language,
    # The 2-letter ISO 3166-1 code of the country you would like to get sources for. Possible options: au, de, gb, in, it, us. Default: empty (all sources returned)
    country: Country
    ): [Sources]
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
    sources(root, {
      category,
      language,
      country,
    }, /* context */) {
      return new Promise((resolve, reject) => {
        // To query sources
        newsapi.sources({
          category, // optional
          language, // optional
          country, // optional
        }).then(sourcesResponse => resolve([sourcesResponse]))
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

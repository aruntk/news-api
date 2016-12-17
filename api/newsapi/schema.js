// eg article
/*
{
  "status": "ok",
    "source": "the-next-web",
    "sortBy": "latest",
    -"articles": [
      -{
        "author": "Bryan Clark",
        "title": "Washington Post launches Chrome plug-in to fact-check Trump on Twitter",
        "description": "Proving even traditional media is capable of having fun, The Washington Post today released a plugin designed to fact-check our President-elect. ‘RealDonaldContext’ is a Chrome plugin that scours Trump’s tweets and adds fact-check summaries beneath them. As for what’s deemed inaccurate, that’s for WaPo’s editors to decide. Its creator, Phillip Bump did point out that readers …",
        "url": "http://thenextweb.com/media/2016/12/17/washington-post-launches-chrome-plug-in-to-fact-check-trump-on-twitter/",
        "urlToImage": "https://cdn3.tnwcdn.com/wp-content/blogs.dir/1/files/2016/12/Screen-Shot-2016-12-16-at-5.16.12-PM.png",
        "publishedAt": "2016-12-17T01:24:25Z"
      }
    ]
}
*/
export const ArticleSchema = [`
type Article {
  author: String
  title: String!
  description: String
  url: String!
  urlToImage: String
  publishedAt: String!
}
type NewsFeed {
  status: String!
  source: String
  sortBy: String
  articles: [Article]
}
`
];

// sources schema
/*
{
  "status": "ok",
    "sources": [
      {
        "id": "abc-news-au",
        "name": "ABC News (AU)",
        "description": "Australia's most trusted source of local, national and world news. Comprehensive, independent, in-depth analysis, the latest business, sport, weather and more.",
        "url": "http://www.abc.net.au/news",
        "category": "general",
        "language": "en",
        "country": "au",
        -"urlsToLogos": {
          "small": "http://i.newsapi.org/abc-news-au-s.png",
          "medium": "http://i.newsapi.org/abc-news-au-m.png",
          "large": "http://i.newsapi.org/abc-news-au-l.png"
        },
        "sortBysAvailable": [
          "top"
        ]
      }
    ]
}
*/

export const SourcesSchema = [`
type Sources {
  status: String
  sources: [Source]
}
type Source {
  id: String!
  name: String!
  description: String
  url: String!
  category: String
  language: String
  country: String
  urlsToLogos: UrlsToLogos
  sortBysAvailable: [String]
}
  type UrlsToLogos {
  small: String
  medium: String
  large: String
  }
`
]

const schema = [...SourcesSchema, ...ArticleSchema];
export default schema;

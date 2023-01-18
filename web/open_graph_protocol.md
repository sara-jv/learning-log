## The Open Graph protocol

### What is it?
- An internet protocol created by facebook to standardize use of metadata to represent content.
- Enables web page to become object in a social graph.
  - A Social Graph is a graph that represents social relations between entities.

### Why do you need it?
- Allows for effective preview when sharing a page via link.
- Without it, when a social network tries to preview the page, it will incoreectly grab page title and description. 

### How to implement?
Basic implementation:
```
<meta property=“[NAME]” content=“[VALUE]” />

```
#### Required
Add basic metadata to your page.
  - Ideally in your head tag
- There are 4 required properties
  - `og:title` - The title of your object as it should appear within the graph, e.g., "The Rock".
  - `og:type` - The type of your object, e.g., "video.movie". Depending on the type you specify, other properties may also be required.
    - Can be website, article, video, etc.
    - https://ogp.me/#types 
  - `og:image` - An image URL which should represent your object within the graph.
  - `og:url` - The canonical URL of your object that will be used as its permanent ID in the graph, e.g., "https://www.imdb.com/title/tt0117500/".

#### Optional
- `og:audio` - A URL to an audio file to accompany this object.
- `og:description` - A one to two sentence description of your object.
- `og:determiner` - The word that appears before this object's title in a sentence. An enum of (a, an, the, "", auto). If auto is chosen, the consumer of your data should chose between "a" or "an". Default is "" (blank).
- `og:locale` - The locale these tags are marked up in. Of the format language_TERRITORY. Default is en_US.
- `og:locale:alternate` - An array of other locales this page is available in.
- `og:site_name` - If your object is part of a larger web site, the name which should be displayed for the overall site. e.g., "IMDb".
- `og:video` - A URL to a video file that complements this object.

### On social networks
Example - Twitter allows you to specify a `twitter:card`, which includes:
1. summary
2. summary_large_image
3. app
4. player

[Read more here](https://developer.twitter.com/en/docs/twitter-for-websites/cards/guides/getting-started)


#### References:
- https://ogp.me/
- https://www.freecodecamp.org/news/what-is-open-graph-and-how-can-i-use-it-for-my-website/
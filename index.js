const queryGroups = require('./queryGroups');
const findArticles = require('./findArticles');
const searchArticle = require('./searchArticle');
const aggregateArticles = require('./aggregateArticles');

const program = require('commander');

program
    .version('0.0.1')
    .option('-q, --query <s>', 'Query String')
    .option('-a, --articles <n>', 'Number of articles to be searched (approx.)', parseInt)
    .parse(process.argv);

const pages = program.articles / 20;

findArticles(program.query, pages).map(articleUrl =>
    searchArticle(articleUrl, queryGroups)
        .catch(a => a)
).reduce(aggregateArticles, {}
).then(aggregateMap => console.log(aggregateMap))

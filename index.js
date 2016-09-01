const queryGroups = require('./queryGroups');
const findArticles = require('./findArticles');
const searchArticle = require('./searchArticle');
const aggregateArticles = require('./aggregateArticles');

const program = require('commander');

program
    .version('0.0.1')
    .option('-q, --query <s>', 'Query String')
    .option('-a, --articles <n>', 'Number of articles to be searched (approx.)', parseInt)
    .option('-l --language <s>', 'Query language')
    .option('-d --domain <s>', 'Search domain (news organisation)')
    .parse(process.argv);

const articles = program.articles;
const language = program.language;
const domain = program.domain;

findArticles[domain](program.query, articles).map(articleUrl =>
    searchArticle[domain](articleUrl, queryGroups[language])
        .catch(a => a)
).reduce(aggregateArticles, {}
).then(aggregateMap => console.log(aggregateMap))

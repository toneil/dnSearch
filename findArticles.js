const Promise = require('bluebird');
const axios = require('axios');
const cheerio = require('cheerio');
const _ = require('lodash');

const extractArticlesFromPage = (query, currentPage, lastPage, articleUrls) => new Promise((resolve, reject) => {
    if (currentPage <= lastPage) {
        axios.get(`http://www.dn.se/sok/?s=${query}&p=${currentPage}`).then(response => {
            const html = response.data;
            const $ = cheerio.load(html);
            return _.flatten($('.search-result-item').children('div').get().map(elem =>
                elem.children
                    .filter(child => child.name === 'a')
                    .map(child => child.attribs.href)
                )
            );
        }).then(urls => {
            console.log(`Got page ${currentPage} of ${lastPage}`);
            return extractArticlesFromPage(query, currentPage + 1,
                    lastPage, _.concat(urls, articleUrls))
            .then(allArticleUrls => resolve(allArticleUrls))

        });
    } else {
        resolve(articleUrls);
    }
})

module.exports = (query, maxPages) => {
    return extractArticlesFromPage(query, 1, maxPages)
}

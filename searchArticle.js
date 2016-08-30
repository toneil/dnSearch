const Promise = require('bluebird');
const axios = require('axios');
const cheerio = require('cheerio');
const _ = require('lodash');

const extractTextFromHtml = html => {
    const $ = cheerio.load(html);
    const textList = $('.article__body-content').children('p').map((i, paragraph)  =>
        paragraph.children.filter(leaf => leaf.type === 'text').map(leaf => leaf.data)
    ).get();
    return _.join(textList, " ")
}

const extractDateFromHtml = html => {
    const $ = cheerio.load(html);
    const dateString = $('.js-article').attr('data-article-publish-date');
    const yearAndMonth = dateString.substr(0,7)
    return yearAndMonth
}
const containsWords = (text, queryGroups) => {
    const queryMap = {};
    queryGroups.forEach(group => {
        queryMap[group.title] = 0;
        group.terms.forEach(term => {
            queryMap[group.title] = text.indexOf(term) !== -1 ? 1 : queryMap[group.title]
        })
    });
    return queryMap;
}

module.exports = (articleUrl, queryGroups) => {
    if (!articleUrl || articleUrl.indexOf('webb-tv') !== -1) return Promise.reject(null);
    return axios.get(articleUrl).then(response => {
        const html = response.data;
        const text = extractTextFromHtml(html);
        const date = extractDateFromHtml(html);
        const queryMap = containsWords(text, queryGroups);
        return { queryMap, date };
    }).catch(err => console.log(err))
}

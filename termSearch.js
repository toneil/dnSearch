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

module.exports = {
    containsWords
};

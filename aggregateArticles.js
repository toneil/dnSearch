
module.exports = (aggregateMap, articleMap) => {
    if (!articleMap) return aggregateMap;
    if (!aggregateMap[articleMap.date])
        aggregateMap[articleMap.date] = {};
    Object.keys(articleMap['queryMap']).forEach(country => {
        if (!aggregateMap[articleMap.date][country])
            aggregateMap[articleMap.date][country] = 0;
        aggregateMap[articleMap.date][country] += articleMap['queryMap'][country];
    });
    return aggregateMap;
};

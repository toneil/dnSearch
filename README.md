# dnSearch
Search module for term co-occurrence in the Swedish newspaper Dagens Nyheter

## What does it do?
Given a query string, this tool searches the Swedish newspaper Dagens Nyheter for matching articles. Each of these are then queried by a set of terms found in `queryGroups.js`, and the total numbers of articles matching any term in each of these groups is then computed and printed out, split up by months. 

## How do I run it?
You need [Node.js](http://www.nodejs.org) and [npm](http://www.npmjs.com) to run this tool. After installing these, clone this repo and run
```shell
npm install
node index.js -q <primary-query> -a <number-of-scanned-articles>
```

## Example run 

```shell
node index.js -q "flyktingar, asylsökande" -a 1000 
{ '2016-03': { Syrien: 38, Afghanistan: 10, Etiopien: 1, Somalia: 2, Irak: 11 },
  '2016-04': { Syrien: 27, Afghanistan: 4, Etiopien: 0, Somalia: 2, Irak: 8 },
  '2016-05': { Syrien: 32, Afghanistan: 9, Etiopien: 0, Somalia: 4, Irak: 10 },
  '2016-06': { Syrien: 15, Afghanistan: 7, Etiopien: 3, Somalia: 3, Irak: 12 },
  '2016-07': { Syrien: 14, Afghanistan: 3, Etiopien: 1, Somalia: 0, Irak: 3 },
  '2016-08': { Syrien: 23, Afghanistan: 3, Etiopien: 1, Somalia: 3, Irak: 8 } }
```

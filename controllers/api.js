const fetch = require('node-fetch');
const url = 'https://api.hatchways.io/assessment/blog/posts?tag=';

module.exports = {
    ping,
    postsGet,
}

function ping(req, res) {
    res.status(200).json({
        success:'true'
    })
}

function postsGet(req, res) {
    let tags = req.query.tags.split(',');
    let sortBy = req.query.sortBy;
    let direction = req.query.direction;
    const sortCategory = ['id', 'reads', 'likes', 'popularity', null, undefined];
    const sortDirection = ['asc', 'desc', null, undefined];

    if (tags.length > 0) {
        if (!sortCategory.includes(sortBy)) {
            res.status(400).json({error: 'sortBy parameter is invalid'})
        } else if (sortBy == (null || undefined)) {sortBy = 'id'}
        
        if (!sortDirection.includes(direction)) {res.status(400).json({error: 'direction for sorting is invalid'})
        } else if (direction == (null || undefined)) {direction = 'asc'}
        
        async function renderPosts(tagsList) {
            let postsUnsorted = [];
            
            async function fetchPosts(tag) {
                let response = await fetch(url+`${tag}`);
                let json = await response.json();
                return json;
            }
            
            async function forTags(tags) {
                let postsRaw =[];
                for (let i=0; tags.length > i; i++) {
                    postsRaw[i] = await fetchPosts(tags[i]);
                }
                return postsRaw;
            }

            async function postsProcessing(rawList) {
                // postsUnsorted and rawlist are the same variable????!!?!?!?
                rawList = await forTags(tagsList);
                for (let i=0; rawList.length > i; i++) {
                    for (let j=0; rawList[i].posts.length > j; j++) {
                        postsUnsorted[rawList[i].posts[j].id] = rawList[i].posts[j];
                    }
                }
                let filteredPosts = postsUnsorted.filter(Boolean);
                return filteredPosts;
            }

            // calling processing on the posts unsorted and it turns into rawlist and gets processed but is still posts unsorted
            let postsSorted = await postsProcessing(postsUnsorted);
            res.status(200).json(postsSorted);
        }
        
        renderPosts(tags);

    } else {
        res.status(400).json({error: 'Tags parameter is required'})
    }
}
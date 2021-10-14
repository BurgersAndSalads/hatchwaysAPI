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
            let posts = [];
            
            async function fetchPosts(tag) {
                let response = await fetch(url+`${tag}`);
                let post = await response.json();
                return post;
            }

            async function forTags(tags) {
                for (let i=0; tags.length > i; i++) {
                    posts[i] = await fetchPosts(tags[i]);
                }
                return posts;
            }
 
            await forTags(tagsList);
            res.status(200).json(posts);
        }
        
        renderPosts(tags);

    } else {
        res.status(400).json({error: 'Tags parameter is required'})
    }
}
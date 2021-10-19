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

    if(!req.query.tags) {
        res.status(400).json({error: 'The tag parameter is required'});
        return
    }

    let tags = req.query.tags.split(',');
    let sortBy = req.query.sortBy;
    let direction = req.query.direction;
    const sortCategory = ['id', 'reads', 'likes', 'popularity', null, undefined, ''];
    const sortDirection = ['asc', 'desc', null, undefined, ''];

    if (tags.length > 0) {
        if (!sortCategory.includes(sortBy)) {
            res.status(400).json({error: 'sortBy parameter is invalid'})
            return
        } else if (sortBy == (null || undefined)) {sortBy = 'id'}
        
        if (!sortDirection.includes(direction)) {
            console.log(typeof(direction))
            res.status(400).json({error: 'direction for sorting is invalid'})
            return
        } else if (direction == (null || undefined)) {direction = 'asc'}
        
        async function renderPosts(tagsList) {
            
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
                let postsSorted = [];
                rawList = await forTags(tagsList);
                for (let i=0; rawList.length > i; i++) {
                    for (let j=0; rawList[i].posts.length > j; j++) {
                        postsSorted.push(rawList[i].posts[j]);
                    }
                }

                if (sortBy) {
                    if (direction == 'asc') {
                        postsSorted = postsSorted.sort((a, b) => a[sortBy] - b[sortBy]);
                    } else {
                        postsSorted = postsSorted.sort((a, b) => b[sortBy] - a[sortBy]);
                    }
                }

                return postsSorted;
            }

            let postsSorted = await postsProcessing();
            res.status(200).json(postsSorted);
        }
        
        renderPosts(tags);

    } else {
        res.status(400).json({error: 'Tags parameter is required'});
    }
}
const fetch = require('node-fetch');

module.exports = {
    ping,
    posts,
}

function ping(req, res) {
    res.status(200).json({
        success:'true'
    })
}

function posts(req, res) {
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
        
        // need to get data from source and sort it, api only take one param at a time, will need to take care of duplicates and sort them in local cache
        tags.forEach(tag => {
            fetch(`https://api.hatchways.io/assessment/blog/posts?tag=${tag}`)
                .then(data => data.json())
                .then(json => posts.push(json));
        });

        res.status(200);
    } else {
        res.status(400).json({error: 'Tags parameter is required'})
    }
}
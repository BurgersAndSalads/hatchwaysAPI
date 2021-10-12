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
    let tags = req.query.tags;
    let sortBy = req.query.sortBy;
    let direction = req.query.direction;
    const sortCategory = ['id', 'reads', 'likes', 'popularity', null, undefined];
    const sortDirection = ['asc', 'desc', null, undefined];

    if (tags) {
        if (!sortCategory.includes(sortBy)) {
            res.status(400).json({error: 'sortBy parameter is invalid'})
        } else if (sortBy == (null || undefined)) {sortBy = 'id'}
        
        if (!sortDirection.includes(direction)) {res.status(400).json({error: 'direction for sorting is invalid'})
        } else if (direction == (null || undefined)) {direction = 'asc'}
        
        res.status(200);
        fetch(`https://api.hatchways.io/assessment/blog/posts?tag=${tags}&sortBy=${sortBy}&direction=${direction}`)
            .then(data => data.json())
            .then(json => res.json(json));
        
    } else {
        res.status(400).json({error: 'Tags parameter is required'})
    }
}
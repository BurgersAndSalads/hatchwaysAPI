module.exports = {
    ping,
    posts,
}

function ping(req, res) {
    res.status(200).json({
        success:'true',
    })
}

function posts(req, res) {
    let tags = req.query.tags;
    let sortBy = req.query.sortBy;
    let direction = req.query.direction;
    const sortCategory = ['id', 'reads', 'likes', 'popularity', null, undefined];
    const sortDirection = ['asc', 'desc', null, undefined];
    console.log([sortBy, direction]);
    if (tags) {
        
        if (!sortCategory.includes(sortBy)) {
            res.status(400).json(
                {
                    error: 'sortBy parameter is invalid'
                }
            )
        }
        
        if (!sortDirection.includes(direction)) {
            res.status(400).json(
                {
                    error: 'direction for sorting is invalid'
                }
            )
        }

        

    } else {
        res.status(400).json(
            {
                error: 'Tags parameter is required'
            }
        )
    }
    res.send([tags,sortBy,direction]);
}
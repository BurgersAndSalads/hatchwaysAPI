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
    let tags = req.query.tags.split(',');
    let sortBy = req.query.sortBy;
    let direction = req.query.direction;
    const sortCategory = ['id', 'reads', 'likes', 'popularity'];
    const sortDirection = ['asc', 'desc'];
    res.send([tags,sortBy,direction]);
}
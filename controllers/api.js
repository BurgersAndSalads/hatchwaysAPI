const { render } = require('ejs');
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
                console.log(url+`${tag}`)
                let response = await fetch(url+`${tag}`);
                console.log('got the data')
                let post = await response.json();
                return post;
            }

            async function forTags (tags) {
                for (let i=0; tags.length > i; i++) {
                    posts[i] = await fetchPosts(tags[i]);
                }
                console.log('out of the loop')
                return posts;
            }
            await forTags(tagsList);
            // tagsList.forEach(tag => {
            //     let data = await fetchPosts(tag);
            //     posts.push(data);
            // });
            console.log('ready to send');
            res.status(200).json(posts);
            console.log('sent')
        }
        
        renderPosts(tags);
        // let i =0;
        // let data = [];
        // tags.forEach(tag => {
        //     fetch(url+`${tag}`)
        //     .then(response => response.json())
        //     .then(json => {
        //         json.posts.forEach(post => {
        //             data[i] = post;
        //             i++;
        //         });
        //         return data
        //     });
        // });

    } else {
        res.status(400).json({error: 'Tags parameter is required'})
    }
}
// FAKE POST CONTENT ARRAY
var posts = [];

var data = [
    {
        user: 'Alice 1.2',
        text: 'Wait, I just realized that Apple is a real fruit??',
        likes: 236,
        views: 1204,
        id: 0
    },
    {
        user: 'SpookyN8',
        text: 'anyone wanna doordash me $100 dollars worth of food? (1 burger)',
        likes: 26891,
        views: 102421,
        id: 1
    },
    {
        user: 'Matt B',
        text: 'They really need to make waking up at 7AM illegal.',
        likes: 203752,
        views: 423654,
        id: 2
    },
    {
        user: 'le turkey',
        text: 'bro??? my headphones just broke in the middle of a game???',
        likes: 6,
        views: 52,
        id: 3
    },
    {
        user: 'Barbara',
        text: 'Anyone want to come over for dinner tonight? 😃',
        likes: 2,
        views: 6,
        id: 4
    },
    {
        user: 'Dale',
        text: 'John Deere thinks they cant let me repair my own darn tractor???',
        likes: 306,
        views: 2407,
        id: 5
    },
    {
        user: 'housecat0021675352',
        text: 'Just caught the fattest mouse ive ever seen in my entire life',
        likes: 2,
        views: 7,
        id: 6
    },
    {
        user: 'grimacefanpage',
        text: 'that purple guy just warms my heart',
        likes: 5072,
        views: 8983,
        id: 7
    },
];

// POST OBJECT
function Post(user, text, likes, views, id) {
    this.user = user;
    this.text = text;
    this.likes = likes;
    this.views = views;
    this.id = id;
}

// ADD COMMAS TO BIG NUMBERS (stolen from online)
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// CREATE POST IN DOM
function createPost(post) {
    var postUser = document.createTextNode(
        post.user
    );
    var postText = document.createTextNode(
        post.text
    );
    var postLikes = document.createTextNode(
        numberWithCommas(post.likes) + ' likes'
    );
    var postViews = document.createTextNode(
        numberWithCommas(post.views) + ' views'
    );
    
    var id = 'item-' + post.id;

    // CREATES POST AND ENGAGEMENT CONTAINER
    var postContainer = document.createElement('div');
    var engagementContainer = document.createElement('div');

    // CREATES ELEMENTS FOR USER AND TEXT
    var userEl = document.createElement('h3');
    userEl.appendChild(postUser);
    var postEl = document.createElement('p');
    postEl.appendChild(postText);
    var likesEl = document.createElement('a');
    likesEl.appendChild(postLikes);
    var viewsEl = document.createElement('p');
    viewsEl.appendChild(postViews);

    // APPENDS LIKES AND VIEWS TO ENGAGEMENT CONTAINER
    engagementContainer.appendChild(likesEl);
    engagementContainer.appendChild(viewsEl);

    // APPENDS ALL OF THE ABOVE TO THE POST CONTAINER
    postContainer.appendChild(userEl);
    postContainer.appendChild(postEl);
    postContainer.appendChild(engagementContainer);

    // ADDITIONAL STEPS
    likesEl.id = id;
    engagementContainer.className = 'engagement';
    postContainer.className = 'post';

    return postContainer;
}

function postHandler(event) {
    var user, likes, views;
    var id = posts.length;
    var postInput = document.getElementById('post-input');
    var contentContainerEl = document.getElementById('content-container');

    // SETS DEFAULTS
    user = 'You';
    likes = 0;
    views = 0;

    // CREATES POST
    if (postInput.value != '') {
        var post = new Post(user, postInput.value, likes, views, id);
        posts.unshift(post);

        var el = createPost(post);

        // PREPEND SO IT GOES ON TOP OF ALL OTHER POSTS
        contentContainerEl.prepend(el);

        // RESETS INPUT
        postInput.value = '';
    }
}



function loadSeedData() {
    // PUSHES POSTS TO ARRAY
    for (var i = 0; i < data.length; i++) {
        var post = new Post(data[i].user, data[i].text, data[i].likes, data[i].views, data[i].id);
        posts.push(post);
    }

    var contentContainerEl = document.getElementById('content-container');

    // PUSHES POSTS TO DOM
    for (var i = 0; i < posts.length; i++) {
        var post = posts[i];
        console.log(post.user + "'s post: " + post.text + ' with ' + post.likes + ' likes and ' + post.views + ' views');
        var el = createPost(post);

        contentContainerEl.appendChild(el);
    }
}

function likePost(event) {
    var likes = event.target;
    var id = likes.id;
    console.log(likes.id);

    for (var i = 0; i < posts.length; i++) {
        if ('item-' + posts[i].id === id) {
            console.log('matched');
            // PREVENTS LIKING MORE THAN ONCE
            if (likes.classList.contains('liked')) {
                posts[i].likes = posts[i].likes - 1;
                likes.classList.remove('liked');
            } else {
                posts[i].likes = posts[i].likes + 1;
                likes.classList = 'liked';
            }

            likes.innerHTML = numberWithCommas(posts[i].likes) + ' likes';
            console.log(posts[i].likes);
            break;
        }
    }
}

// LOADS FAKE POST DATA AND SETS UP BUTTONS
var init = function() {
    document.getElementById('post-button').onclick = postHandler;
    document.getElementById('content-container').onclick = likePost;

    loadSeedData();
};

init();
let Post = require('./post');

module.exports = class Election {
    constructor(electionConfig) {

    }
    static deserialize(election) {
        var newElection = new Election();
        newElection.institution = election.institution;
        newElection.deserializePosts(election.posts);
        return newElection;
    }
    deserializePosts(posts) {
        this.posts = [];
        for (let post of posts) {
            this.addPost(Post.deserialize(post));
        }
        return this.posts;
    }
    addPost(post) {
        this.posts.push(post);
    }
}

let Candidate = require('./candidate')
module.exports = class Post {
    constructor() {

    }
    static deserialize(post) {
        var newPost = new Post();
        newPost.name = post.name;
        newPost.deserializeCandidates(post.candidates);
        return newPost;
    }
    deserializeCandidates(candidates) {
        this.candidates = [];
        for (let candidate of candidates) {
            this.addCandidate(Candidate.deserialize(candidate));
        }
        return this.candidates;
    }
    addCandidate(candidate) {
        this.candidates.push(candidate);
    }
}

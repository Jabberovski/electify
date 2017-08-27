module.exports = class Candidate {
    constructor() {

    }
    static deserialize(candidate) {
        var newCandidate = new Candidate();
        newCandidate.name = candidate.name;
        newCandidate.image = candidate.image;
        return newCandidate;
    }
}

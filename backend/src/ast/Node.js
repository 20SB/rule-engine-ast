class Node {
    constructor(type, value = null) {
        this.type = type;
        this.left = null;
        this.right = null;
        this.value = value;
    }
}

module.exports = Node;

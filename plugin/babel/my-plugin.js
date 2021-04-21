module.exports = function () {
    return {
        visitor: {
            Identifier(path, state) {
                console.log(path, 'kkkkk')
                const name = path.node.name;
                if (name == 'app') {
                    path.node.name += 1;
                }
            },
            // ASTNodeTypeHere(path, state) {}
        },
    };
}
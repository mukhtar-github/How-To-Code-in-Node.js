const Todos = require('./index');
const assert = require('assert').strict;

describe("integration test", function () {
    it("should be able to add and complete TODOs", function () {
        let todos = new Todos();
        assert.strictEqual(todos.list().length, 0);
    });
});

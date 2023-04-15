const assert = require('chai').assert;
const Generate = require('../src/index.js');

describe('hello world', () => {
    it('returns hello', () => {
        assert.strictEqual(Generate.example(), 'hello');
    });
    it('returns world', () => {
        assert.strictEqual(Generate.example_pt2(), 'world');
    });
});

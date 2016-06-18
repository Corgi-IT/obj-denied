"use strict";
require('should');
const denied = require('../index');

describe('denied', function () {
    const obj = {
        foo: 'bar',
        baz: 'qux',
        nope: null,
        obj: {exists: 'Yup'},
        arr: ['element']
    };

    it('Should return false of all required properties exist and are not null or undefined', function () {
        const result = denied(obj, ['foo', 'baz', 'obj', 'arr']);
        result.should.be.a.Boolean();
        result.should.equal(false);
    });

    it('Should return true if one of the required properties is null', function () {
        const result = denied(obj, ['foo', 'nope', 'obj']);
        result.should.be.a.Boolean();
        result.should.equal(true);
    });

    it('Should return true if one of the required properties is undefined', function () {
        const result = denied(obj, ['foo', 'non-existend', 'obj']);
        result.should.be.a.Boolean();
        result.should.equal(true);
    });

    it('Should return false if the second parameter is an existing String', function () {
        const result = denied(obj, 'foo');
        result.should.be.a.Boolean();
        result.should.equal(false);
    });

    it('Should return true if the second parameter is a non existent String', function () {
        const result = denied(obj, 'non-existend');
        result.should.be.a.Boolean();
        result.should.equal(true);
    });

    it('Should return false if a custom object has a required property', function () {
        const result = denied(new Foo(), 'foo');
        result.should.be.a.Boolean();
        result.should.equal(false);
    });
});

class Foo {
    constructor() {
        this.foo = 'bar'
    }
}

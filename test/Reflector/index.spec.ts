import Reflector from "@/Reflector";

/*
 * @Date: 2022-01-11 16:43:47
 * @LastEditors: 曾令宇
 * @FilePath: /project-enigma-core/test/Reflector/index.spec.ts
 */

const testData = [{
    "value1": 1,
    "value2": 2
}, {
    "value1": 3,
    "value2": 4
}, {
    "value1": 5,
    "value2": 6
}, {
    "value1": 7,
    "value2": 8
}, {
    "value1": 9,
    "value2": 10
}, {
    "value1": 11,
    "value2": 12
}, {
    "value1": 13,
    "value2": 14
}, {
    "value1": 15,
    "value2": 16
}, {
    "value1": 17,
    "value2": 18
}, {
    "value1": 19,
    "value2": 20
}, {
    "value1": 21,
    "value2": 22
}, {
    "value1": 23,
    "value2": 24
}, {
    "value1": 25,
    "value2": 0
    }];
test('Reflection test', () => {
    const reflector = new Reflector(testData);
    expect(reflector.getValue(5)).not.toBe(5);
});

test('Consistency test', () => {
    const reflector = new Reflector(testData);
    const target = reflector.getValue(5);
    expect(reflector.getValue(target)).toBe(5);
});
/*
 * @Date: 2022-01-11 15:07:38
 * @LastEditors: 曾令宇
 * @FilePath: /project-enigma-core/test/Wheel/index.spec.ts
 */
import { Wheel } from '../../src';

const testData = [0, 1, 2, 3, 20, 21, 4, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 22, 23, 24, 25, 5, 6, 7, 8];

test('To left testing', () => {
    const wheel = new Wheel(testData);
    const target = wheel.toLeft(25);
    expect(target).not.toBe(25);
});

test('To right testing', () => {
    const wheel = new Wheel(testData);
    const target = wheel.toRight(25);
    expect(target).not.toBe(25);
});

test('Circle testing', () => {
    const wheel = new Wheel(testData);
    const encodeResults: number[] = [];
    wheel.setWheelPosition(0);
    testData.forEach(() => {
        wheel.setWheelPosition();
        const result = wheel.toLeft(0);
        encodeResults.push(result);
    });
    const decodeResults: number[] = [];
    wheel.setWheelPosition(0);
    encodeResults.forEach(e => {
        wheel.setWheelPosition();
        decodeResults.push(wheel.toRight(e));
    });
    const flg = decodeResults.some(e => e !== 0);
    expect(flg).toBe(false);
});
/*
 * @Date: 2022-01-11 15:07:38
 * @LastEditors: 曾令宇
 * @FilePath: /project-enigma-core/test/Wheel/index.spec.ts
 */
import Wheel from '@/Wheel'

const testData = [0, 1, 2, 3, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 4, 5, 6, 7,]

test('Base testing', () => {
    const wheel = new Wheel(testData);
    const currentPosition = wheel.position;
    const target = wheel.toLeft(25)
    expect(wheel.setWheelPosition(currentPosition).toRight(target)).toBe(25);
})

test('Unique testing', () => {
    const wheel = new Wheel(testData);
    wheel.setWheelPosition()
    const target = wheel.toLeft(25)
    expect(wheel.setWheelPosition().toRight(25)).not.toBe(target);
})
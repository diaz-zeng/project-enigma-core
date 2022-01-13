import { Enigma } from "@/Enigma";

/*
 * @Date: 2022-01-12 16:05:14
 * @LastEditors: 曾令宇
 * @FilePath: /project-enigma-core/test/Enigma/index.spec.ts
 */
test('inputTest instance', () => {
    const instance = new Enigma();
    instance.setWheelsPosition([0, 25, 20]);
    const encode = instance.input('HEllO WORlD');
    instance.setWheelsPosition([0, 25, 20]);
    expect(instance.input(encode)).toBe('HELLO WORLD');
});
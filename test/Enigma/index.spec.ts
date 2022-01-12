import Enigma from "@/Enigma";

/*
 * @Date: 2022-01-12 16:05:14
 * @LastEditors: 曾令宇
 * @FilePath: /project-enigma-core/test/Enigma/index.spec.ts
 */
test('Create instance', () => {
    const instance = new Enigma();
    expect(JSON.stringify(instance)).not.toBe('');
});
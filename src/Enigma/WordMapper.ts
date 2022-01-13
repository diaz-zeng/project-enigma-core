/*
 * @Date: 2022-01-12 17:31:02
 * @LastEditors: 曾令宇
 * @FilePath: /project-enigma-core/src/Enigma/WordMapper.ts
 */
import { wordMaps } from '@/defaultSettings.json';
export default class WordMapper {
    private wordMap: Map<string, string> = new Map();
    private error = new Error('字符映射设置错误,每个字符只能被映射一次');
    constructor(map: typeof wordMaps) {
        this.setWordMaps(map);
    }

    public setWordMaps(map: typeof wordMaps) {
        const testMap: Record<string, number> = {};
        const reg = /^[A-Z]$/;
        map.forEach((e: { value1: string, value2: string }) => {
            const value1 = e.value1.toUpperCase(), value2 = e.value2.toUpperCase();
            if (!reg.test(value1) || !reg.test(value2)) {
                throw this.error;
            }
            testMap[value1] = testMap[value1] ?? 0 + 1;
            testMap[value2] = testMap[value2] ?? 0 + 1;
            this.wordMap.set(value1, value2);
            this.wordMap.set(value2, value1);
        });
        for (const key in testMap) {
            if (testMap[key] > 1) {
                throw this.error;
            }
        }

    }
    public getValue(input: string): string {
        return this.wordMap.get(input) ?? input;
    }
}
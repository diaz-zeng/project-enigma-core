/*
 * @Date: 2022-01-12 17:31:02
 * @LastEditors: 曾令宇
 * @FilePath: /project-enigma-core/src/Enigma/WordMapper.ts
 */
import { WordMap } from '../Settings';

/**
 * @description: 字符输入转换器，将输入的字符转换为另一个字符，可选配置
 */
export default class WordMapper {
    private wordMap: Map<string, string> = new Map();
    private error = new Error('字符映射设置错误,每个字符只能被映射一次');
    constructor(map: WordMap[] = []) {
        this.setWordMaps(map);
    }
    /**
     * @description: 设置字符转换，每个字符只能出现一次，最多可设置13组字符相互转换
     * @param {WordMap} map 要转换的字符组
     */
    public setWordMaps(map: WordMap[] = []) {
        this.wordMap = new Map();
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
    /**
     * @description: 获取转换值，没有设置相关映射时返回原始字符
     * @param {string} input 要转换的字符
     * @return {string} 转换后的结果
     */
    public getValue(input: string): string {
        return this.wordMap.get(input) ?? input;
    }
}
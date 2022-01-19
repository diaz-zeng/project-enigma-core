import { WordMap } from '../Settings';
/**
 * @description: 字符输入转换器，将输入的字符转换为另一个字符，可选配置
 */
export default class WordMapper {
    private wordMap;
    private error;
    constructor(map?: WordMap[]);
    /**
     * @description: 设置字符转换，每个字符只能出现一次，最多可设置13组字符相互转换
     * @param {WordMap} map 要转换的字符组
     */
    setWordMaps(map?: WordMap[]): void;
    /**
     * @description: 获取转换值，没有设置相关映射时返回原始字符
     * @param {string} input 要转换的字符
     * @return {string} 转换后的结果
     */
    getValue(input: string): string;
}

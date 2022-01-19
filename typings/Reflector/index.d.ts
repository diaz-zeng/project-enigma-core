import { ReflectorSetting } from '../Settings';
/**
 * @description: 反射器
 */
export declare class Reflector {
    private reflexMap;
    private settingError;
    private notFindError;
    /**
     * @description: 构造器
     * @param {ReflectorSetting[]} setting 设置对象
     */
    constructor(setting: ReflectorSetting[]);
    /**
     * @description: 获取反射后的值
     * @param {number} input 输入值
     * @return {number} 返回值
     */
    getValue(input: number): number;
}

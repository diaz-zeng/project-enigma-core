/**
 * @description: 转轮组件
 */
export declare class Wheel {
    private setting;
    private notFindError;
    private reflexSettingError;
    private currentPosition;
    /**
     * @description: 构造器
     * @param {number} setting 转轮序列设置
     * @param {*} initPosition 初始位置
     * @return {*}
     */
    constructor(setting: number[], initPosition?: number);
    get position(): number;
    /**
     * @description: 设置转轮位置
     * @param {*} value 转轮位置
     * @return {*} 当前转轮实例
     */
    setWheelPosition(value?: number): Wheel;
    /**
     * @description: 向左转换
     * @param {number} input 输入值
     * @return {*} 转换后的值
     */
    toLeft(input: number): number;
    /**
     * @description: 向右转换
     * @param {number} input 输入值
     * @return {*} 转换后的值
     */
    toRight(input: number): number;
}

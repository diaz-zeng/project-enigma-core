import { Wheel } from "../Wheel";
import { Reflector } from "../Reflector";
import { Settings, WordMap, ReflectorSetting } from "../Settings";
export declare type wheelDirection = 'left' | 'right';
/**
 * @description: 密码机
 */
export declare class Enigma {
    /**
     * @description: 构造函数
     * @param {Settings} settings 设置对象
     */
    constructor(settings?: Settings);
    private wordMapper;
    /**
     * @description: 转轮组
     */
    get wheels(): Wheel[];
    private _wheels;
    /**
     * @description: 反射器
     */
    get reflector(): Reflector;
    private _reflector;
    /**
     * @description: 转轮组设置
     */
    get wheelsSetting(): number[][];
    private _wheelsSetting;
    /**
     * @description: 反射器设置
     */
    get reflectorSetting(): ReflectorSetting[];
    private _reflectorSetting;
    /**
     * @description: 输入映射，将字母映射为数字
     */
    get inputMapper(): string[];
    private _inputMapper;
    private wheelsPosition;
    /**
     * @description: 事件触发器
     * @param {EventType} eventType 事件类型
     * @param {unknown} value 事件的Payload
     */
    private emitEvent;
    /**
      * @description: 注册事件监听
      * @param {EventType} eventType 事件类型
      * @param {EventFn} fn 监听回调
      * @return {*} 事件的注册id
      */
    addEventListener: (eventType: import("../EventHandler").EventType, fn: import("../EventHandler").EventFn) => number;
    /**
     * @description: 移除事件监听
     * @param {EventType} eventType 事件类型
     * @param {number} listenerKey 事件的注册id
     */
    removeEventListener: (eventType: import("../EventHandler").EventType, listenerKey: number) => void;
    /**
     * @description: 设置反射器配置
     * @param {ReflectorSetting} setting 配置对象
     * @return {*} 当前实例
     */
    setReflectorSetting(setting: ReflectorSetting[]): Enigma;
    /**
     * @description: 设置转轮对象，设置转轮对象将重置转轮位置
     * @param {number[][]} setting 设置对象
     * @return {*} 当前实例
     */
    setWheelsSetting(setting: number[][]): Enigma;
    /**
     * @description: 设置输入映射
     * @param {string[]} setting 设置对象，数组的索引将会是字符映射后的数字
     * @return {*} 当前实例
     */
    setInputMapper(setting: string[]): Enigma;
    /**
     * @description: 设置转轮位置
     * @param {number[]} setting 设置对象，有几个转轮就传几个元素，多余的会被忽略，缺失的会补0，范围是0-25，超过将会被取模
     * @return {*} 当前实例
     */
    setWheelsPosition(setting?: number[]): Enigma;
    /**
     * @description: 设置字符转换，例如将A转为B
     * @param {WordMap} map 设置对象
     * @return {*} 当前实例
     */
    setWordMapperSetting(map?: WordMap[]): Enigma;
    /**
     * @description: 输入方法，输入原文返回密文或输入密文返回原文，左右字符将被转为大写
     * @param {string} input 输入值
     * @return {*} 加密/解密结果
     */
    input(input: string): string;
    private wheelProcess;
    private increaseWheel;
}

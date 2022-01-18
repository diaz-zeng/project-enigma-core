/*
 * @Date: 2022-01-13 10:35:55
 * @LastEditors: 曾令宇
 * @FilePath: /project-enigma-core/src/Enigma/Enigma.ts
 */

import { Wheel } from "../Wheel";
import { Reflector } from "../Reflector";
import { createEventHandler } from '../EventHandler';
import WordMapper from "./WordMapper";
import { Settings, WordMap, defaultSettings, ReflectorSetting } from "../Settings";

export type wheelDirection = 'left' | 'right'

/**
 * @description: 密码机
 */
export class Enigma {

    /**
     * @description: 构造函数
     * @param {Settings} settings 设置对象
     */
    constructor(settings?: Settings) {
        const { addEventListener, removeEventListener, emitEvent } = createEventHandler();
        this.addEventListener = addEventListener;
        this.removeEventListener = removeEventListener;
        this.emitEvent = emitEvent;
        const { inputMapper, wheels, wheelsPosition, reflector, wordMaps } = settings ?? defaultSettings;
        this.setInputMapper(inputMapper ?? defaultSettings.inputMapper);
        this.setWheelsSetting(wheels ?? defaultSettings.wheels);
        this.setWheelsPosition(wheelsPosition ?? defaultSettings.wheelsPosition);
        this.setReflectorSetting(reflector ?? defaultSettings.reflector);
        this.setWordMapperSetting(wordMaps ?? defaultSettings.wordMaps);
    }

    private wordMapper: WordMapper = new WordMapper(defaultSettings.wordMaps);

    /**
     * @description: 转轮组
     */
    public get wheels(): Wheel[] {
        return this._wheels;
    }
    private _wheels!: Wheel[];

    /**
     * @description: 反射器
     */
    public get reflector(): Reflector {
        return this._reflector;
    }
    private _reflector!: Reflector;
    /**
     * @description: 转轮组设置
     */
    public get wheelsSetting() {
        return this._wheelsSetting;
    }
    private _wheelsSetting!: number[][];

    /**
     * @description: 反射器设置
     */
    public get reflectorSetting() {
        return this._reflectorSetting;
    }
    private _reflectorSetting!: ReflectorSetting[];

    /**
     * @description: 输入映射，将字母映射为数字
     */
    public get inputMapper() {
        return this._inputMapper;
    }
    private _inputMapper!: string[];

    private wheelsPosition!: number[];

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
    public addEventListener;

    /**
     * @description: 移除事件监听
     * @param {EventType} eventType 事件类型
     * @param {number} listenerKey 事件的注册id
     */
    public removeEventListener;

    /**
     * @description: 设置反射器配置
     * @param {ReflectorSetting} setting 配置对象
     * @return {*} 当前实例
     */
    public setReflectorSetting(setting: ReflectorSetting[]): Enigma {
        this._reflectorSetting = setting;
        this._reflector = new Reflector(setting);
        this.emitEvent('reflectorSettingChange', setting);
        return this;
    }
    /**
     * @description: 设置转轮对象，设置转轮对象将重置转轮位置
     * @param {number[][]} setting 设置对象
     * @return {*} 当前实例
     */
    public setWheelsSetting(setting: number[][]): Enigma {
        this._wheelsSetting = setting;
        this._wheels = [];
        this.wheelsSetting.forEach((e) => {
            this._wheels.push(new Wheel(e));
        });
        this._wheels.reverse();
        this.emitEvent('wheelSettingChange', setting);
        this.emitEvent('wheelPositionChange', this.wheels.map(e => e.position).reverse());
        return this;
    }
    /**
     * @description: 设置输入映射
     * @param {string[]} setting 设置对象，数组的索引将会是字符映射后的数字
     * @return {*} 当前实例
     */
    public setInputMapper(setting: string[]): Enigma {
        this._inputMapper = setting.map(e => e.toUpperCase());
        this.emitEvent('inputMapperChange', setting);
        return this;
    }

    /**
     * @description: 设置转轮位置
     * @param {number[]} setting 设置对象，有几个转轮就传几个元素，多余的会被忽略，缺失的会补0，范围是0-25，超过将会被取模
     * @return {*} 当前实例
     */
    public setWheelsPosition(setting: number[]): Enigma {
        this.wheelsPosition = setting;
        this.wheelsPosition.reverse();
        this.wheels.forEach((w, index) => {
            w.setWheelPosition(this.wheelsPosition[index] ?? 0);
        });
        this.emitEvent('wheelPositionChange', this.wheels.map(e => e.position).reverse());
        return this;
    }
    /**
     * @description: 设置字符转换，例如将A转为B
     * @param {WordMap} map 设置对象
     * @return {*} 当前实例
     */
    public setWordMapperSetting(map?: WordMap[]): Enigma {
        this.wordMapper.setWordMaps(map);
        this.emitEvent('wordMapsChange', map);
        return this;
    }
    /**
     * @description: 输入方法，输入原文返回密文或输入密文返回原文，左右字符将被转为大写
     * @param {string} input 输入值
     * @return {*} 加密/解密结果
     */
    public input(input: string): string {
        const words = input.split('').map(e => e.toUpperCase());
        const reg = /^[A-Z]$/;
        const result: string[] = [];
        words.forEach(w => {
            if (reg.test(w)) {
                const afterMapper = this.wordMapper.getValue(w);
                const initIndex = this.inputMapper.indexOf(afterMapper);
                if (initIndex === -1) {
                    throw new Error('非法输入');
                }
                const beforeReflector = this.wheelProcess(initIndex, 'left');
                const afterReflector = this.reflector.getValue(beforeReflector);
                const afterWheel = this.wheelProcess(afterReflector, 'right');
                const beforeOutput = this.inputMapper[afterWheel];
                const outputChar = this.wordMapper.getValue(beforeOutput);
                result.push(outputChar);
            } else {
                result.push(w);
            }
        });
        const resultStr = result.join('');
        this.emitEvent('input', resultStr);
        return resultStr;
    }
    private wheelProcess(input: number, direction: wheelDirection): number {
        let result = input;
        switch (direction) {
            case 'left': {
                this.increaseWheel();
                this.wheels.forEach(wheel => {
                    result = wheel.toLeft(result);
                });
                break;
            }
            case 'right': {
                const temp = [...this.wheels].reverse();
                temp.forEach(wheel => {
                    result = wheel.toRight(result);
                });
                break;
            }
        }
        return result;
    }
    private increaseWheel(): void {
        this.wheels.some((wheel) => {
            wheel.setWheelPosition();
            return wheel.position !== 0;
        });
        this.emitEvent('wheelPositionChange', this.wheels.map(e => e.position).reverse());
    }
}
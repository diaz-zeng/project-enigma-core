/*
 * @Date: 2022-01-13 10:35:55
 * @LastEditors: 曾令宇
 * @FilePath: /project-enigma-core/src/Enigma/Enigma.ts
 */

import { Wheel } from "@/Wheel";
import { Reflector } from "@/Reflector";
import * as Setting from '@/defaultSettings.json';
import { createEventHandler } from '@/EventHandler';
import WordMapper from "./WordMapper";

export type wheelDirection = 'left' | 'right'

export class Enigma {

    constructor(settings?: typeof Setting) {
        const { addEventListener, removeEventListener, emitEvent } = createEventHandler();
        this.addEventListener = addEventListener;
        this.removeEventListener = removeEventListener;
        this.emitEvent = emitEvent;
        const { inputMapper, wheels, wheelsPosition, reflector, wordMaps } = settings ?? Setting;
        this.setInputMapper(inputMapper);
        this.setWheelsSetting(wheels);
        this.setWheelsPosition(wheelsPosition);
        this.setReflectorSetting(reflector);
        this.setWordMapperSetting(wordMaps);
    }

    private wordMapper = new WordMapper(Setting.wordMaps);

    private _wheels!: Wheel[];
    public get wheels(): Wheel[] {
        return this._wheels;
    }

    private _reflector!: Reflector;
    public get reflector(): Reflector {
        return this._reflector;
    }

    private _wheelsSetting = Setting.wheels;
    public get wheelsSetting() {
        return this._wheelsSetting;
    }

    private _reflectorSetting = Setting.reflector;
    public get reflectorSetting() {
        return this._reflectorSetting;
    }

    private _inputMapper = Setting.inputMapper;
    public get inputMapper() {
        return this._inputMapper;
    }

    private wheelsPosition = Setting.wheelsPosition;

    private emitEvent;

    public addEventListener;

    public removeEventListener;

    public setReflectorSetting(setting: typeof Setting.reflector): Enigma {
        this._reflectorSetting = setting;
        this._reflector = new Reflector(setting);
        this.emitEvent('reflectorSettingChange');
        return this;
    }

    public setWheelsSetting(setting: typeof Setting.wheels): Enigma {
        this._wheelsSetting = setting;
        this._wheels = [];
        this.wheelsSetting.forEach((e) => {
            this._wheels.push(new Wheel(e));
        });
        this._wheels.reverse();
        this.emitEvent('wheelSettingChange');
        return this;
    }

    public setInputMapper(setting: typeof Setting.inputMapper): Enigma {
        this._inputMapper = setting.map(e => e.toUpperCase());
        this.emitEvent('inputMapperChange');
        return this;
    }

    public setWheelsPosition(setting?: typeof Setting.wheelsPosition): Enigma {
        this.wheelsPosition = (setting ?? Setting.wheelsPosition);
        this.wheelsPosition.reverse();
        this.wheels.forEach((w, index) => {
            w.setWheelPosition(this.wheelsPosition[index] ?? 0);
        });
        this.emitEvent('wheelPositionChange', this.wheels.map(e => e.position).reverse());
        return this;
    }

    public setWordMapperSetting(map: typeof Setting.wordMaps): Enigma {
        this.wordMapper.setWordMaps(map);
        this.emitEvent('wordMapsChange');
        return this;
    }

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
            }
            else if (w === ' ') {
                result.push(' ');
            } else {
                throw new Error('非法输入');
            }
        });

        return result.join('');
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
        this.wheels.some((wheel, index) => {
            wheel.setWheelPosition();
            return wheel.position !== 0;
        });
        this.emitEvent('wheelPositionChange', this.wheels.map(e => e.position).reverse());
    }
}
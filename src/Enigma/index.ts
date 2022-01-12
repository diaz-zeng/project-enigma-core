/*
 * @Date: 2022-01-11 17:20:50
 * @LastEditors: 曾令宇
 * @FilePath: /project-enigma-core/src/Enigma/index.ts
 */
import Wheel from "@/Wheel";
import Reflector from "@/Reflector";
import { inputMapper, reflector, wheels, wheelsPosition, wordMaps } from '@/defaultSettings.json';
import { createEventHandler } from './EventHandler';
import { WordMapper } from "./WordMapper";
class Enigma {

    constructor() {
        const { addEventListener, removeEventListener, emitEvent } = createEventHandler();
        this.addEventListener = addEventListener;
        this.removeEventListener = removeEventListener;
        this.emitEvent = emitEvent;
    }

    private wordMapper = new WordMapper(wordMaps);

    private _wheels!: Wheel[];
    public get wheels(): Wheel[] {
        return this._wheels;
    }

    private _reflector!: Reflector;
    public get reflector(): Reflector {
        return this._reflector;
    }

    private _wheelsSetting = wheels;
    public get wheelsSetting() {
        return this._wheelsSetting;
    }

    private _reflectorSetting = reflector;
    public get reflectorSetting() {
        return this._reflectorSetting;
    }

    private _inputMapper = inputMapper;
    public get inputMapper() {
        return this._inputMapper;
    }

    private wheelsPosition = wheelsPosition;

    private emitEvent;

    public addEventListener;

    public removeEventListener;

    public setReflectorSetting(setting: typeof reflector): Enigma {
        this._reflectorSetting = setting;
        this._reflector = new Reflector(setting);
        this.emitEvent('reflectorSettingChange');
        return this;
    }

    public setWheelsSetting(setting: typeof wheels): Enigma {
        this._wheelsSetting = setting;
        this._wheels = [];
        setting.forEach((e) => {
            this.wheels.push(new Wheel(e));
        });
        this.emitEvent('wheelSettingChange');
        return this;
    }

    public setInputMapper(setting: typeof inputMapper): Enigma {
        this._inputMapper = setting;
        return this;
    }

    public setWheelsPosition(setting: typeof wheelsPosition): Enigma {
        this.wheelsPosition = setting;
        this.wheels.forEach((w, index) => {
            w.setWheelPosition(this.wheelsPosition[index] ?? 0);
        });
        this.emitEvent('wheelPositionChange', this.wheels.map(e => e.position));
        return this;
    }

    public setWordMapperSetting(map: typeof wordMaps): Enigma {
        this.wordMapper.setWordMaps(map);
        return this;
    }
}

export default Enigma;
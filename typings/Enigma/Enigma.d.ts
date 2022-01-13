import { Wheel } from "../Wheel";
import { Reflector } from "../Reflector";
import * as Setting from '../defaultSettings.json';
export declare type wheelDirection = 'left' | 'right';
export declare class Enigma {
    constructor(settings?: typeof Setting);
    private wordMapper;
    private _wheels;
    get wheels(): Wheel[];
    private _reflector;
    get reflector(): Reflector;
    private _wheelsSetting;
    get wheelsSetting(): number[][];
    private _reflectorSetting;
    get reflectorSetting(): {
        value1: number;
        value2: number;
    }[];
    private _inputMapper;
    get inputMapper(): string[];
    private wheelsPosition;
    private emitEvent;
    addEventListener: (eventType: import("../EventHandler").EventType, fn: import("../EventHandler").EventFn) => number;
    removeEventListener: (eventType: import("../EventHandler").EventType, listenerKey: number) => void;
    setReflectorSetting(setting: typeof Setting.reflector): Enigma;
    setWheelsSetting(setting: typeof Setting.wheels): Enigma;
    setInputMapper(setting: typeof Setting.inputMapper): Enigma;
    setWheelsPosition(setting?: typeof Setting.wheelsPosition): Enigma;
    setWordMapperSetting(map: typeof Setting.wordMaps): Enigma;
    input(input: string): string;
    private wheelProcess;
    private increaseWheel;
}

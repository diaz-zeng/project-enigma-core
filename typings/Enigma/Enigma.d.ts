import { Wheel } from "../Wheel";
import { Reflector } from "../Reflector";
import { Settings, WordMap, ReflectorSetting } from "../Settings";
export declare type wheelDirection = 'left' | 'right';
export declare class Enigma {
    constructor(settings?: Settings);
    private wordMapper;
    private _wheels;
    get wheels(): Wheel[];
    private _reflector;
    get reflector(): Reflector;
    private _wheelsSetting;
    get wheelsSetting(): number[][];
    private _reflectorSetting;
    get reflectorSetting(): ReflectorSetting[];
    private _inputMapper;
    get inputMapper(): string[];
    private wheelsPosition;
    private emitEvent;
    addEventListener: (eventType: import("../EventHandler").EventType, fn: import("../EventHandler").EventFn) => number;
    removeEventListener: (eventType: import("../EventHandler").EventType, listenerKey: number) => void;
    setReflectorSetting(setting: ReflectorSetting[]): Enigma;
    setWheelsSetting(setting: number[][]): Enigma;
    setInputMapper(setting: string[]): Enigma;
    setWheelsPosition(setting?: number[]): Enigma;
    setWordMapperSetting(map?: WordMap[]): Enigma;
    input(input: string): string;
    private wheelProcess;
    private increaseWheel;
}

export interface Settings {
    inputMapper: string[];
    wheels: number[][];
    reflector: ReflectorSetting[];
    wordMaps?: WordMap[];
    wheelsPosition: number[];
}
export interface WordMap {
    value1: string;
    value2: string;
}
export interface ReflectorSetting {
    value1: number;
    value2: number;
}
export declare const defaultSettings: Settings;

export declare type ReflexMapSetting = {
    value1: number;
    value2: number;
}[];
export declare type ReflexMap = {
    [input: number]: number;
};
export declare class Reflector {
    private reflexMap;
    private settingError;
    private notFindError;
    constructor(setting: ReflexMapSetting);
    getValue(input: number): number;
}

export declare class Wheel {
    private codes;
    private notFindError;
    private reflexSettingError;
    private currentPosition;
    constructor(codes: number[], initPosition?: number);
    get position(): number;
    setWheelPosition(value?: number): Wheel;
    toLeft(input: number): number;
    toRight(input: number): number;
}

export declare type EventType = 'input' | 'wheelPositionChange' | 'wheelSettingChange' | 'reflectorSettingChange' | 'inputMapperChange' | 'wordMapsChange';
export declare type EventFn = ((value?: unknown) => void);
export declare const createEventHandler: () => {
    addEventListener: (eventType: EventType, fn: EventFn) => number;
    removeEventListener: (eventType: EventType, listenerKey: number) => void;
    emitEvent: (eventType: EventType, value?: unknown) => void;
};

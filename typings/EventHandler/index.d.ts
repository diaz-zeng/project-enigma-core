/**
 * @description: 事件类型
 */
export declare type EventType = 'input' | 'wheelPositionChange' | 'wheelSettingChange' | 'reflectorSettingChange' | 'inputMapperChange' | 'wordMapsChange';
export declare type EventFn = ((value?: unknown) => void);
/**
 * @description: 创建一个事件处理器的副本
 */
export declare const createEventHandler: () => {
    addEventListener: (eventType: EventType, fn: EventFn) => number;
    removeEventListener: (eventType: EventType, listenerKey: number) => void;
    emitEvent: (eventType: EventType, value?: unknown) => void;
};

/*
 * @Date: 2022-01-12 16:31:30
 * @LastEditors: 曾令宇
 * @FilePath: /project-enigma-core/src/Enigma/EventHandler.ts
 */
export type EventType = 'input' | 'wheelPositionChange' | 'wheelSettingChange' | 'reflectorSettingChange' | 'inputMapperChange' | 'wordMapsChange'

export type EventFn = ((value?: unknown) => void)

export const createEventHandler = () => {

    const eventPool: Map<EventType, Map<number, EventFn>> = new Map();

    const addEventListener = (eventType: EventType, fn: EventFn): number => {
        const key = Date.now();
        const eventMap: Map<number, EventFn> = eventPool.get(eventType) ?? new Map();
        eventMap.set(key, fn);
        eventPool.set(eventType, eventMap);
        return key;
    };

    const removeEventListener = (eventType: EventType, listenerKey: number): void => {
        const eventMap = eventPool.get(eventType);
        if (eventMap) {
            eventMap.delete(listenerKey);
            eventPool.set(eventType, eventMap);
        }
    };

    const emitEvent = (eventType: EventType, value?: unknown): void => {
        const eventMap = eventPool.get(eventType);
        if (eventMap) {
            eventMap.forEach(e => {
                e(value);
            });
        }
    };
    return {
        addEventListener,
        removeEventListener,
        emitEvent
    };
};
/*
 * @Date: 2022-01-14 11:10:11
 * @LastEditors: 曾令宇
 * @FilePath: /project-enigma-core/src/Settings/index.ts
 */

import * as settings from './defaultSettings.json';
export interface Settings {
    inputMapper: string[];
    wheels: number[][];
    reflector: ReflectorSetting[]
    wordMaps?: WordMap[]
    wheelsPosition: number[]
}
export interface WordMap { value1: string, value2: string }
export interface ReflectorSetting { value1: number, value2: number }
export const defaultSettings = settings as Settings;
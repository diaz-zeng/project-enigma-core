/*
 * @Date: 2022-01-06 16:23:44
 * @LastEditors: 曾令宇
 * @FilePath: /project-enigma-core/src/Reflector/index.ts
 * @description:反射器组件
 */
import { ReflectorSetting } from '../Settings';

type ReflexMap = { [input: number]: number }

/**
 * @description: 反射器
 */
export class Reflector {

  private reflexMap!: ReflexMap;

  private settingError = new Error('反射器设置错误，反射器设置应为数字0～25的相互映射，映射条目数量应为13，且不可重复，每个元素仅能出现一次');

  private notFindError = new Error('映射失败，请检查配置');

  /**
   * @description: 构造器
   * @param {ReflectorSetting[]} setting 设置对象
   */
  constructor(setting: ReflectorSetting[]) {
    if (setting.length !== 13) {
      throw this.settingError;
    }
    const testMap: ReflexMap = {
    };
    setting.forEach((e) => {
      if (e.value1 < 0 || e.value1 > 25 || e.value2 < 0 || e.value2 > 25) {
        throw this.settingError;
      }
      testMap[e.value1] = e.value2;
      testMap[e.value2] = e.value1;
    });
    if (Object.keys(testMap).length !== 26) {
      throw this.settingError;
    }
    this.reflexMap = testMap;
  }

  /**
   * @description: 获取反射后的值
   * @param {number} input 输入值
   * @return {number} 返回值
   */
  public getValue(input: number): number {
    const result = this.reflexMap[input] ?? -1;
    if (result !== -1) {
      return result;
    } throw this.notFindError;
  }
}

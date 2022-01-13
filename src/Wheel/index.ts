/*
 * @Date: 2022-01-06 11:09:28
 * @LastEditors: 曾令宇
 * @FilePath: /project-enigma-core/src/Wheel/index.ts
 * @description: 转轮组件
 */
export class Wheel {

  private codes!: number[];

  private notFindError = new Error('输入错误，没有指定的映射');

  private reflexSettingError = new Error('转轮设定错误，转轮映射应当为由数字0～25组成的长度为26且元素不重复的数组');

  private currentPosition = 0;

  constructor(codes: number[], initPosition = 0) {
    this.setWheelPosition(initPosition);
    if (codes.length === 26) {
      const testMap: Record<number, number> = {};
      codes.forEach((i) => {
        testMap[i] = i;
        if (i < 0 || i > 25) {
          throw this.reflexSettingError;
        }
      });
      if (Object.keys(testMap).length !== 26) {
        throw this.reflexSettingError;
      } else {
        this.codes = codes;
      }
    } else {
      throw this.reflexSettingError;
    }
  }

  get position(): number {
    return this.currentPosition;
  }

  public setWheelPosition(value = -1): Wheel {
    if (value !== -1) {
      this.currentPosition = + value % 26;
    } else {
      this.currentPosition = (this.currentPosition + 1) % 26;
    } return this;
  }

  public toLeft(input: number): number {
    const target = (input + this.position) % 26;
    let result = -1;
    const flg = this.codes.some((code, index) => {
      result = index;
      return code === target;
    });
    if (flg && result !== -1) {
      return result;
    }
    throw this.notFindError;

  }

  public toRight(input: number): number {
    const value = this.codes[input] ?? -1;
    if (value !== -1) {
      return (value - this.position + 26) % 26;
    }
    throw this.notFindError;
  }
}

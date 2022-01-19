/*
 * @Date: 2022-01-06 11:09:28
 * @LastEditors: 曾令宇
 * @FilePath: /project-enigma-core/src/Wheel/index.ts
 */

/**
 * @description: 转轮组件
 */
class Wheel {
  /**
   * @description: 构造器
   * @param {number} setting 转轮序列设置
   * @param {*} initPosition 初始位置
   * @return {*}
   */
  constructor(setting, initPosition = 0) {
    this.notFindError = new Error('输入错误，没有指定的映射');
    this.reflexSettingError = new Error('转轮设定错误，转轮映射应当为由数字0～25组成的长度为26且元素不重复的数组');
    this.currentPosition = 0;
    this.setWheelPosition(initPosition);

    if (setting.length === 26) {
      const testMap = {};
      setting.forEach(i => {
        testMap[i] = i;

        if (i < 0 || i > 25) {
          throw this.reflexSettingError;
        }
      });

      if (Object.keys(testMap).length !== 26) {
        throw this.reflexSettingError;
      } else {
        this.setting = setting;
      }
    } else {
      throw this.reflexSettingError;
    }
  }

  get position() {
    return this.currentPosition;
  }
  /**
   * @description: 设置转轮位置
   * @param {*} value 转轮位置
   * @return {*} 当前转轮实例
   */


  setWheelPosition(value = -1) {
    if (value !== -1) {
      this.currentPosition = +value % 26;
    } else {
      this.currentPosition = (this.currentPosition + 1) % 26;
    }

    return this;
  }
  /**
   * @description: 向左转换
   * @param {number} input 输入值
   * @return {*} 转换后的值
   */


  toLeft(input) {
    const target = input;
    let result = -1;
    const flg = this.setting.some((code, index) => {
      result = index;
      return code === target;
    });

    if (flg && result !== -1) {
      return (result + this.position) % 26;
    }

    throw this.notFindError;
  }
  /**
   * @description: 向右转换
   * @param {number} input 输入值
   * @return {*} 转换后的值
   */


  toRight(input) {
    const temp = input - this.position;
    const target = temp < 0 ? temp + 26 : temp;
    const value = this.setting[target] ?? -1;

    if (value !== -1) {
      return value;
    }

    throw this.notFindError;
  }

}

/**
 * @description: 反射器
 */
class Reflector {
  /**
   * @description: 构造器
   * @param {ReflectorSetting[]} setting 设置对象
   */
  constructor(setting) {
    this.settingError = new Error('反射器设置错误，反射器设置应为数字0～25的相互映射，映射条目数量应为13，且不可重复，每个元素仅能出现一次');
    this.notFindError = new Error('映射失败，请检查配置');

    if (setting.length !== 13) {
      throw this.settingError;
    }

    const testMap = {};
    setting.forEach(e => {
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


  getValue(input) {
    const result = this.reflexMap[input] ?? -1;

    if (result !== -1) {
      return result;
    }

    throw this.notFindError;
  }

}

/**
 * @description: 创建一个事件处理器的副本
 */
const createEventHandler = () => {
  const eventPool = new Map();

  const addEventListener = (eventType, fn) => {
    const key = Date.now();
    const eventMap = eventPool.get(eventType) ?? new Map();
    eventMap.set(key, fn);
    eventPool.set(eventType, eventMap);
    return key;
  };

  const removeEventListener = (eventType, listenerKey) => {
    const eventMap = eventPool.get(eventType);

    if (eventMap) {
      eventMap.delete(listenerKey);
      eventPool.set(eventType, eventMap);
    }
  };

  const emitEvent = (eventType, value) => {
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

/**
 * @description: 字符输入转换器，将输入的字符转换为另一个字符，可选配置
 */
class WordMapper {
  constructor(map = []) {
    this.wordMap = new Map();
    this.error = new Error('字符映射设置错误,每个字符只能被映射一次');
    this.setWordMaps(map);
  }
  /**
   * @description: 设置字符转换，每个字符只能出现一次，最多可设置13组字符相互转换
   * @param {WordMap} map 要转换的字符组
   */


  setWordMaps(map = []) {
    this.wordMap = new Map();
    const testMap = {};
    const reg = /^[A-Z]$/;
    map.forEach(e => {
      const value1 = e.value1.toUpperCase(),
            value2 = e.value2.toUpperCase();

      if (!reg.test(value1) || !reg.test(value2)) {
        throw this.error;
      }

      testMap[value1] = testMap[value1] ?? 0 + 1;
      testMap[value2] = testMap[value2] ?? 0 + 1;
      this.wordMap.set(value1, value2);
      this.wordMap.set(value2, value1);
    });

    for (const key in testMap) {
      if (testMap[key] > 1) {
        throw this.error;
      }
    }
  }
  /**
   * @description: 获取转换值，没有设置相关映射时返回原始字符
   * @param {string} input 要转换的字符
   * @return {string} 转换后的结果
   */


  getValue(input) {
    return this.wordMap.get(input) ?? input;
  }

}

var inputMapper = [
	"a",
	"b",
	"c",
	"d",
	"e",
	"f",
	"g",
	"h",
	"i",
	"j",
	"k",
	"l",
	"m",
	"n",
	"o",
	"p",
	"q",
	"r",
	"s",
	"t",
	"u",
	"v",
	"w",
	"x",
	"y",
	"z"
];
var wheels = [
	[
		0,
		1,
		2,
		3,
		4,
		5,
		6,
		7,
		8,
		9,
		10,
		11,
		12,
		13,
		14,
		15,
		16,
		17,
		18,
		19,
		20,
		21,
		22,
		23,
		24,
		25
	],
	[
		13,
		1,
		22,
		6,
		0,
		18,
		2,
		5,
		7,
		3,
		8,
		4,
		9,
		25,
		10,
		12,
		14,
		17,
		16,
		19,
		21,
		20,
		23,
		15,
		11,
		24
	],
	[
		7,
		4,
		0,
		1,
		12,
		21,
		16,
		3,
		24,
		5,
		6,
		9,
		14,
		10,
		13,
		8,
		11,
		15,
		17,
		2,
		23,
		18,
		20,
		22,
		25,
		19
	]
];
var wheelsPosition = [
	0,
	0,
	0
];
var reflector = [
	{
		value1: 1,
		value2: 2
	},
	{
		value1: 3,
		value2: 4
	},
	{
		value1: 5,
		value2: 6
	},
	{
		value1: 7,
		value2: 8
	},
	{
		value1: 9,
		value2: 10
	},
	{
		value1: 11,
		value2: 12
	},
	{
		value1: 13,
		value2: 14
	},
	{
		value1: 15,
		value2: 16
	},
	{
		value1: 17,
		value2: 18
	},
	{
		value1: 19,
		value2: 20
	},
	{
		value1: 21,
		value2: 22
	},
	{
		value1: 23,
		value2: 24
	},
	{
		value1: 25,
		value2: 0
	}
];
var wordMaps = [
];
var defaultSettings$1 = {
	inputMapper: inputMapper,
	wheels: wheels,
	wheelsPosition: wheelsPosition,
	reflector: reflector,
	wordMaps: wordMaps
};

var settings = /*#__PURE__*/Object.freeze({
    __proto__: null,
    inputMapper: inputMapper,
    wheels: wheels,
    wheelsPosition: wheelsPosition,
    reflector: reflector,
    wordMaps: wordMaps,
    'default': defaultSettings$1
});

/*
 * @Date: 2022-01-14 11:10:11
 * @LastEditors: 曾令宇
 * @FilePath: /project-enigma-core/src/Settings/index.ts
 */
const defaultSettings = settings;

/*
 * @Date: 2022-01-13 10:35:55
 * @LastEditors: 曾令宇
 * @FilePath: /project-enigma-core/src/Enigma/Enigma.ts
 */
/**
 * @description: 密码机
 */

class Enigma {
  /**
   * @description: 构造函数
   * @param {Settings} settings 设置对象
   */
  constructor(settings) {
    this.wordMapper = new WordMapper(defaultSettings.wordMaps);
    const {
      addEventListener,
      removeEventListener,
      emitEvent
    } = createEventHandler();
    this.addEventListener = addEventListener;
    this.removeEventListener = removeEventListener;
    this.emitEvent = emitEvent;
    const {
      inputMapper,
      wheels,
      wheelsPosition,
      reflector,
      wordMaps
    } = settings ?? defaultSettings;
    this.setInputMapper(inputMapper ?? defaultSettings.inputMapper);
    this.setWheelsSetting(wheels ?? defaultSettings.wheels);
    this.setWheelsPosition(wheelsPosition ?? defaultSettings.wheelsPosition);
    this.setReflectorSetting(reflector ?? defaultSettings.reflector);
    this.setWordMapperSetting(wordMaps ?? defaultSettings.wordMaps);
  }
  /**
   * @description: 转轮组
   */


  get wheels() {
    return this._wheels;
  }
  /**
   * @description: 反射器
   */


  get reflector() {
    return this._reflector;
  }
  /**
   * @description: 转轮组设置
   */


  get wheelsSetting() {
    return this._wheelsSetting;
  }
  /**
   * @description: 反射器设置
   */


  get reflectorSetting() {
    return this._reflectorSetting;
  }
  /**
   * @description: 输入映射，将字母映射为数字
   */


  get inputMapper() {
    return this._inputMapper;
  }
  /**
   * @description: 设置反射器配置
   * @param {ReflectorSetting} setting 配置对象
   * @return {*} 当前实例
   */


  setReflectorSetting(setting) {
    this._reflectorSetting = setting;
    this._reflector = new Reflector(setting);
    this.emitEvent('reflectorSettingChange', setting);
    return this;
  }
  /**
   * @description: 设置转轮对象，设置转轮对象将重置转轮位置
   * @param {number[][]} setting 设置对象
   * @return {*} 当前实例
   */


  setWheelsSetting(setting) {
    this._wheelsSetting = setting;
    this._wheels = [];
    this.wheelsSetting.forEach(e => {
      this._wheels.push(new Wheel(e));
    });

    this._wheels.reverse();

    this.emitEvent('wheelSettingChange', setting);
    this.emitEvent('wheelPositionChange', this.wheels.map(e => e.position).reverse());
    return this;
  }
  /**
   * @description: 设置输入映射
   * @param {string[]} setting 设置对象，数组的索引将会是字符映射后的数字
   * @return {*} 当前实例
   */


  setInputMapper(setting) {
    this._inputMapper = setting.map(e => e.toUpperCase());
    this.emitEvent('inputMapperChange', setting);
    return this;
  }
  /**
   * @description: 设置转轮位置
   * @param {number[]} setting 设置对象，有几个转轮就传几个元素，多余的会被忽略，缺失的会补0，范围是0-25，超过将会被取模
   * @return {*} 当前实例
   */


  setWheelsPosition(setting) {
    this.wheelsPosition = setting;
    this.wheelsPosition.reverse();
    this.wheels.forEach((w, index) => {
      w.setWheelPosition(this.wheelsPosition[index] ?? 0);
    });
    this.emitEvent('wheelPositionChange', this.wheels.map(e => e.position).reverse());
    return this;
  }
  /**
   * @description: 设置字符转换，例如将A转为B
   * @param {WordMap} map 设置对象
   * @return {*} 当前实例
   */


  setWordMapperSetting(map) {
    this.wordMapper.setWordMaps(map);
    this.emitEvent('wordMapsChange', map);
    return this;
  }
  /**
   * @description: 输入方法，输入原文返回密文或输入密文返回原文，左右字符将被转为大写
   * @param {string} input 输入值
   * @return {*} 加密/解密结果
   */


  input(input) {
    const words = input.split('').map(e => e.toUpperCase());
    const reg = /^[A-Z]$/;
    const result = [];
    words.forEach(w => {
      if (reg.test(w)) {
        const afterMapper = this.wordMapper.getValue(w);
        const initIndex = this.inputMapper.indexOf(afterMapper);

        if (initIndex === -1) {
          throw new Error('非法输入');
        }

        const beforeReflector = this.wheelProcess(initIndex, 'left');
        const afterReflector = this.reflector.getValue(beforeReflector);
        const afterWheel = this.wheelProcess(afterReflector, 'right');
        const beforeOutput = this.inputMapper[afterWheel];
        const outputChar = this.wordMapper.getValue(beforeOutput);
        result.push(outputChar);
      } else {
        result.push(w);
      }
    });
    const resultStr = result.join('');
    this.emitEvent('input', resultStr);
    return resultStr;
  }

  wheelProcess(input, direction) {
    let result = input;

    switch (direction) {
      case 'left':
        {
          this.increaseWheel();
          this.wheels.forEach(wheel => {
            result = wheel.toLeft(result);
          });
          break;
        }

      case 'right':
        {
          const temp = [...this.wheels].reverse();
          temp.forEach(wheel => {
            result = wheel.toRight(result);
          });
          break;
        }
    }

    return result;
  }

  increaseWheel() {
    this.wheels.some(wheel => {
      wheel.setWheelPosition();
      return wheel.position !== 0;
    });
    this.emitEvent('wheelPositionChange', this.wheels.map(e => e.position).reverse());
  }

}

export { Enigma, Reflector, defaultSettings as SettingTemplate, Wheel, WordMapper, createEventHandler };

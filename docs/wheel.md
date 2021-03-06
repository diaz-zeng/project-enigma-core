# Wheel

**转子组件**

不建议直接创建组件实例，建议通过向[Enigma](enigma)传入配置来配置转子组。

## constructor

- **参数：**
  - `{Array<number>} setting` 转子设置
  - `{number} initPosition` 初始位置（可选）
- **说明：**
  - 接受一个数字数组作为配置，数组的索引作为转子左侧的索引，数组的值作为转子右侧的索引，例如传入`[5,22]`则将转子左侧0与右侧的5相连、左侧1与右侧22相连。

## 成员属性

### position

- **类型：**
  - `{number}`
- **说明**：
  - 只读属性，获取当前的转子位置。

## 方法

### setWheelPosition

- **参数：**
  - `{number} position` 新的位置（可选）
- **说明：**
  - 设置转轮位置，如果没有传入参数则将当前的转轮位置+1。
- **返回值：**
  - `{Wheel}` 当前实例


### toLeft

- **参数：**
  - `{number} input` 输入值
- **返回值：**
  - `{number}`
- **说明：**
  - 向左转换，将一个右侧的索引转换为对应的左侧索引。

### toRight

- **参数：**
  - `{number} input` 输入值
- **返回值：**
  - `{number}`
- **说明：**
  - 向右转换，将一个左侧的索引转换为对应的右侧索引。

# Reflector

**反射器组件**

不建议直接创建组件实例，建议通过向[Enigma](/enigma)传入配置来初始化反射器。

## constructor

- **参数：**
  - `{Array<{value1:number,value2:number}>} setting`
- **说明：**
  - 可选接受一个配置对象，用于初始化反射器的设置

## 方法

### getValue

- **参数：**
  - `{number} input`
- **返回值：**
  - `{number} value`
- **说明：**
  - 传入一个值，获取反射后的值，返回值永远不会与输入值相同

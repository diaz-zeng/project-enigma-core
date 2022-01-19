# WordMapper

**字符映射，也就是插线板组件**

不建议直接创建组件实例，建议通过向[Enigma](enigma)传入配置来配置字符映射。

## constructor

- **参数：**
  - `{Array<{value1: string, value2: string}>} setting` 字符映射设置（可选）
- **说明**：
  - 字符映射并非必须，可以不配置，如果没有配置，映射将会返回原始字符


## 方法

### setWordMaps

- **参数**
  - `{Array<{value1: string, value2: string}>} setting`
- **说明**：
  - 设置字符映射，设置新的字符映射会使原有的映射失效，即使与原有映射不冲突。
- **返回值**：
  - `{WordMapper} 当前实例`

### getValue

- **参数：**
  - `{string} input`
- **返回值：**
  - `{string} value`
- **说明：**
  - 传入一个值，获取转换后的值，没有对应的映射条目时返回原始值

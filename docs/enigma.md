# Enigma

密码机的对象实体，所有的加解密操作均通过该对象访问

## constructor

- **参数：**
  - `{Settings} settings`
- **说明：**
  - 可选接受一个配置对象，用于初始化密码机的配置值，缺失的配置字段将会被默认配置替代

## 成员属性

### wheels

- **类型：**
  - `{Array<Wheel>}`
- **说明**：
  - 只读属性，获取当前实例所有生效的转子对象

### reflector

- **类型：**
  - `{Reflector}`
- **说明**：
  - 只读属性，获取当前实例生效的反射器对象

### inputMapper

- **类型：**
  - `{Array<string>}`
- **说明**：
  - 只读属性，获取当前实例生效的输入映射

### wheelsSetting

- **类型：**
  - `{Array<Array<number>>}`
- **说明**：
  - 只读属性，当前实例所有的转子配置

### reflectorSetting

- **类型：**
  - `{Array<{value1:number,value2:number}>}`
- **说明**：
  - 只读属性，当前实例反射器的配置

## 方法

### setReflectorSetting

- **参数**
  - `{Array<{value1:number,value2:number}>} setting`
- **说明**：
  - 设置新的反射器配置
- **返回值**：
  - `{Enigma} 当前实例`

### setWheelsSetting

- **参数**
  - `{Array<Array<number>>} setting`
- **说明**：
  - 设置新的转子配置。注意，这将重置所有的转子位置到0，你可能需要重新设置每个转子的位置。当传入多个转子时，数组的第一个元素为最左侧的转子，最后一个元素为最右侧转子
- **返回值**：
  - `{Enigma} 当前实例`

### setInputMapper

- **参数**
- `{Array<string>} setting`
- **说明**：
  - 设置新的设置输入映射，字符所对应的索引将会是映射后的数值。
- **返回值**：
  - `{Enigma} 当前实例`

### setWheelsPosition

- **参数**
  - `{Array<number>} setting`
- **说明**：
  - 为所有转子设置位置，建议在初始化转子后配置。
- **返回值**：
  - `{Enigma} 当前实例`

### setWordMapperSetting

- **参数**
  - `{Array<{value1: string, value2: string}>} setting`
- **说明**：
  - 设置字符映射，设置新的字符映射会使原有的映射失效，即使与原有映射不冲突。
- **返回值**：
  - `{Enigma} 当前实例`

### input

- **参数** `{string} value` 输入值
- **说明**：
  - 输入方法，输入原始信息进行加密或输入密文进行解密，每解析一个字符就回时转子的位置发生变化（类似于计数器的变化方式，从右至左一次递增），所以加解密同一条信息时需要使用设置转子到相同的起始位置。
- **返回值**：
  - `{Enigma} 当前实例`
- **示例**：

```typescript
    const instance = new Enigma();
    instance.setWheelsPosition([0, 25, 20]);
    const encode = instance.input('HEllO WORlD!!!');
    // encode: TCMCT IHCKX!!!
    instance.setWheelsPosition([0, 25, 20]);
    const decode = instance.input(encode)
    // decode: HEllO WORlD!!!
```

### addEventListener

- **参数**
  - `{String} eventType` 事件类型
  - `{(value:unknown)=>void} callback` 事件回调
- **说明**：
  - 注册事件监听
- **返回值**：
  - `{number} 事件的注册ID`
- **示例**：

```typescript
    const instance = new Enigma();
    instance.addEventListener('input',(value:string)=>{
        console.log(value);
    });
```

### removeEventListener

- **参数**
  - `{String} eventType` 事件类型
  - `{number} eventId` 事件注册ID
- **说明**：
  - 移除事件监听
- **示例**：

```typescript
    const instance = new Enigma();
    const eventId = instance.addEventListener('input',(value:string)=>{
        console.log(value);
    });

    instance.removeEventListener('input',eventId);

```

## 事件

### input

- **说明**：
  - 输入事件
- **参数**
  - `{String} value` 经过加/解密后的值

### wheelPositionChange

- **说明**：
  - 转子位置改变事件
- **参数**
  - `{Array<number>} positions` 改变后的转子位置

### wheelSettingChange

- **说明**：
  - 转子配置改变事件
- **参数**
  - `{Array<Array<number>>} settings` 改变后的转子配置

### reflectorSettingChange

- **说明**：
  - 反射器配置改变事件
- **参数**
  - `{Array<{value1:number,value2:number}>} settings` 改变后的反射器配置

### inputMapperChange

- **说明**：
  - 输入映射配置改变事件
- **参数**
  - `{Array<string>} inputMapper` 改变后的输入映射配置

### wordMapsChange

- **说明**：
  - 字符映射配置改变事件
- **参数**
  - `{Array<{value1:string,value2:string}>} wordMaps` 改变后的字符映射配置

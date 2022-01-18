# Settings

## inputMapper
- **类型：** `{Array<string>}`
- **说明：** 输入映射，将字母映射为对应的索引

## wheels
- **类型：** `{Array<Array<number>>}`
- **说明：** 转轮设置，每个数组代表一个转轮，数量没有限制，范围是0-25且每个转轮的中不得出现重复值

## wheelsPosition
- **类型：** `{Array<number>}`
- **说明：** 转轮初始位置，有多少个转轮就设置多少个，如果缺少将会补0，多余的值将会被忽略，范围是0-25

## reflector
- **类型：** `{Array<{value1:number,value2:number}>}`
- **说明：** 反射器设置，共13组设置，范围是0-25，每个数字在配置中只能出现一次

## wordMaps
- **类型：** `{Array<{value1:string,value2:string}>}`
- **说明：** 固定词组映射，将一个字母转换为另一个字母，可选配置，字母不得重复


## 获取配置模版
```typescript
import { SettingTemplate } from 'project-enigma-core' // 获取配置模版对象
```

## 配置示例
```json
{
    "inputMapper": ["a","b","c","d","e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z" ],
    "wheels": [
        [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25 ],
        [ 13, 1, 22, 6, 0, 18, 2, 5, 7, 3, 8, 4, 9, 25, 10, 12, 14, 17, 16, 19, 21, 20, 23, 15, 11, 24 ],
        [ 7, 4, 0, 1, 12, 21, 16, 3, 24, 5, 6, 9, 14, 10, 13, 8, 11, 15, 17, 2, 23, 18, 20, 22, 25, 19 ]
    ],
    "wheelsPosition": [
        0, 0, 0
    ],
    "reflector": [
        { "value1": 1, "value2": 2 },
        { "value1": 3, "value2": 4 }, 
        { "value1": 5, "value2": 6 }, 
        { "value1": 7, "value2": 8 }, 
        { "value1": 9, "value2": 10 }, 
        { "value1": 11, "value2": 12 }, 
        { "value1": 13, "value2": 14 }, 
        { "value1": 15, "value2": 16 }, 
        { "value1": 17, "value2": 18 }, 
        { "value1": 19, "value2": 20 }, 
        { "value1": 21, "value2": 22 }, 
        { "value1": 23, "value2": 24 }, 
        { "value1": 25, "value2": 0 }
    ],
    "wordMaps": []
}
```

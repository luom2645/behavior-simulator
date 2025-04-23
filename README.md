# 行为模拟器

这是一个行为模拟器脚本，主要功能包括：
- 模拟用户行为（鼠标移动、点击、滚动等）
- 伪装浏览器属性（如 `navigator`、`window` 等）
- 内存管理和性能优化

## 配置参数
以下是脚本的主要配置参数：
- `minInterval`: 最小行为间隔（毫秒）
- `maxInterval`: 最大行为间隔（毫秒）
- `clickProbability`: 点击行为的概率
- `readingProbability`: 阅读行为的概率
- `enableLowMemoryMode`: 是否启用低内存模式

## 使用方法
1. 将 `behavior-simulator.js` 文件引入到你的 HTML 文件中：
   ```html
   <script src="behavior-simulator.js"></script>
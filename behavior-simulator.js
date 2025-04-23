(function() {
    // 确保 random 函数定义在文件顶部
    function random(min, max) {
        if (typeof min !== 'number' || typeof max !== 'number' || min > max) {
            throw new Error("无效的随机数范围: min=" + min + ", max=" + max);
        }
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // 改进 clickRandomAd 函数，增加点击延迟和随机性
    async function clickRandomAd() {
        console.log("模拟点击广告行为");
        const ads = document.querySelectorAll('a[href*="ad"], a[href*="sponsored"], a[href*="promotion"]');
        if (ads.length > 0) {
            const randomAd = ads[Math.floor(Math.random() * ads.length)];
            const delay = random(1000, 3000); // 随机延迟
            await new Promise(resolve => setTimeout(resolve, delay));
            randomAd.click();
            console.log("点击了广告: " + (randomAd.textContent || randomAd.href));
        } else {
            console.log("未找到广告链接");
        }
    }

    // 增加随机点击非广告链接行为
    async function clickRandomNonAdLink() {
        console.log("模拟点击非广告链接行为");
        const links = document.querySelectorAll('a:not([href*="ad"]):not([href*="sponsored"]):not([href*="promotion"])');
        if (links.length > 0) {
            const randomLink = links[Math.floor(Math.random() * links.length)];
            const delay = random(1000, 3000); // 随机延迟
            await new Promise(resolve => setTimeout(resolve, delay));
            randomLink.click();
            console.log("点击了非广告链接: " + (randomLink.textContent || randomLink.href));
        } else {
            console.log("未找到非广告链接");
        }
    }

    // 确保 userActivityDetector 定义在文件顶部
    const userActivityDetector = {
        lastActivityTime: Date.now(),
        activityTimeout: 30000, // 30秒无操作视为非活跃

        init: function() {
            const activityEvents = ['mousemove', 'keydown', 'scroll', 'click'];
            activityEvents.forEach(event => {
                window.addEventListener(event, () => {
                    this.lastActivityTime = Date.now();
                });
            });
        },

        isUserActive: function() {
            return Date.now() - this.lastActivityTime < this.activityTimeout;
        }
    };

    // 动态调整行为概率
    function adjustBehaviorProbabilities() {
        const activeProbability = userActivityDetector.isUserActive() ? 0.3 : 0.7;
        behaviorProbabilities.forEach(behavior => {
            if (behavior.action === 'read') {
                behavior.probability = activeProbability;
            } else if (behavior.action === 'click') {
                behavior.probability = 0.1;
            } else if (behavior.action === 'scroll') {
                behavior.probability = 0.2;
            } else if (behavior.action === 'hover') {
                behavior.probability = 0.1;
            }
        });
        normalizeBehaviorProbabilities();
    }

    // 改进 simulateScrollPause 函数，模拟自然滚动行为
    function simulateScrollPause() {
        console.log("模拟滚动暂停行为");
        const scrollDistance = random(50, 300); // 随机滚动距离
        const scrollDuration = random(500, 1500); // 随机滚动持续时间
        const steps = random(5, 15); // 随机步数
        const stepSize = scrollDistance / steps;

        let currentStep = 0;
        const interval = setInterval(() => {
            if (currentStep >= steps) {
                clearInterval(interval);
                return;
            }
            window.scrollBy(0, stepSize);
            currentStep++;
        }, scrollDuration / steps);
    }

    // 增加鼠标悬停行为
    function simulateHover(targetElement) {
        if (!targetElement || !(targetElement instanceof HTMLElement)) {
            console.error("目标元素无效");
            return;
        }
        const hoverEvent = new MouseEvent('mouseover', {
            bubbles: true,
            cancelable: true,
            view: window
        });
        targetElement.dispatchEvent(hoverEvent);
        console.log("模拟悬停: " + (targetElement.textContent || targetElement.className || '未知元素'));
    }

    // 改进 simulateMouseMovement 函数，模拟更自然的鼠标移动
    function simulateMouseMovement(targetElement) {
        if (!targetElement || !(targetElement instanceof HTMLElement)) {
            console.error("目标元素无效");
            return;
        }
        const rect = targetElement.getBoundingClientRect();
        const startX = random(0, window.innerWidth);
        const startY = random(0, window.innerHeight);
        const endX = rect.left + rect.width / 2;
        const endY = rect.top + rect.height / 2;
        const steps = random(10, 30); // 随机步数
        const stepX = (endX - startX) / steps;
        const stepY = (endY - startY) / steps;

        let currentStep = 0;
        const interval = setInterval(() => {
            if (currentStep >= steps) {
                clearInterval(interval);
                return;
            }
            const x = startX + stepX * currentStep;
            const y = startY + stepY * currentStep;
            const mouseMoveEvent = new MouseEvent('mousemove', {
                clientX: x,
                clientY: y,
                bubbles: true,
                cancelable: true
            });
            document.dispatchEvent(mouseMoveEvent);
            currentStep++;
        }, random(50, 100)); // 随机间隔
    }

    // 改进鼠标移动轨迹，添加人性化曲线
    function simulateHumanMousePath(targetElement) {
        if (!targetElement) return;
        
        const rect = targetElement.getBoundingClientRect();
        const startX = random(100, window.innerWidth - 100);
        const startY = random(100, window.innerHeight - 100);
        const endX = rect.left + rect.width / 2;
        const endY = rect.top + rect.height / 2;
        
        // 生成贝塞尔曲线控制点
        const cp1x = startX + random(-100, 100);
        const cp1y = startY + random(-100, 100);
        const cp2x = endX + random(-100, 100);
        const cp2y = endY + random(-100, 100);
        
        let step = 0;
        const steps = random(25, 45);  // 更自然的步数
        const interval = setInterval(() => {
            if (step >= steps) {
                clearInterval(interval);
                return;
            }
            
            const t = step / steps;
            const x = Math.pow(1-t, 3) * startX + 
                     3 * Math.pow(1-t, 2) * t * cp1x +
                     3 * (1-t) * Math.pow(t, 2) * cp2x +
                     Math.pow(t, 3) * endX;
                     
            const y = Math.pow(1-t, 3) * startY +
                     3 * Math.pow(1-t, 2) * t * cp1y +
                     3 * (1-t) * Math.pow(t, 2) * cp2y +
                     Math.pow(t, 3) * endY;
            
            // 添加微小抖动
            const jitterX = x + random(-2, 2);
            const jitterY = y + random(-2, 2);
            
            const event = new MouseEvent('mousemove', {
                bubbles: true,
                cancelable: true,
                clientX: jitterX,
                clientY: jitterY,
                view: window
            });
            document.dispatchEvent(event);
            step++;
        }, random(10, 20));  // 更自然的移动速度
    }

    // 改进点击行为
    async function improvedClickBehavior(element) {
        if (!element) return;
        
        // 先移动鼠标
        await simulateHumanMousePath(element);
        
        // 随机短暂停顿，模拟人类决策时间
        await new Promise(r => setTimeout(r, random(300, 1200)));
        
        // 有小概率取消点击
        if (Math.random() < 0.1) {
            console.log("模拟用户改变主意，取消点击");
            return;
        }
        
        // 点击前的微小停顿
        await new Promise(r => setTimeout(r, random(50, 150)));
        
        // 执行点击
        element.click();
        
        // 点击后的随机行为
        const postClickDelay = random(500, 2000);
        await new Promise(r => setTimeout(r, postClickDelay));
    }

    // 改进的随机行为调度器
    function improvedBehaviorScheduler() {
        // 每个行为之间的间隔时间要更自然
        const minInterval = random(30000, 60000); // 30-60秒
        const maxInterval = random(120000, 180000); // 2-3分钟
        
        let lastActionTime = Date.now();
        
        return {
            scheduleNext: function() {
                const now = Date.now();
                const timeSinceLastAction = now - lastActionTime;
                
                // 如果间隔太短，增加延迟
                if (timeSinceLastAction < minInterval) {
                    return random(minInterval - timeSinceLastAction, maxInterval);
                }
                
                // 加入工作时间判断
                const hour = new Date().getHours();
                if (hour < 7 || hour > 23) {
                    return random(300000, 600000); // 夜间降低活动频率
                }
                
                lastActionTime = now;
                return random(minInterval, maxInterval);
            }
        };
    }

    // 替换原有的随机延迟函数
    function randomDelay(min, max) {
        const baseDelay = random(min, max);
        // 添加高斯噪声
        const noise = Math.floor(random(-200, 200) * Math.random());
        return Math.max(min, baseDelay + noise);
    }

    // 修改行为模拟器的 start 方法
    behaviorSimulator.start = function() {
        if (this.isRunning) return;
        this.isRunning = true;
        
        timeController.start();
        
        // 立即开始第一次行为
        this.performTimedBehavior();
    };

    // 修改时间配置
    const timeConfig = {
        totalVisitTime: random(18000, 24000),  // 总访问时间 18-24 秒
        readingTime: 12000,                    // 阅读时间 12 秒
        scrollTime: 4000,                      // 滚动时间 4 秒
        interactionTime: 2000,                 // 交互时间 2 秒
        minStayTime: 18000,                    // 最小停留时间 18 秒
    };

    // 修改行为执行方法
    behaviorSimulator.performTimedBehavior = async function() {
        if (!this.isRunning || !timeController.shouldContinue()) {
            return;
        }

        const elapsedTime = timeController.getElapsedTime();
        const totalTime = timeConfig.totalVisitTime;
        
        // 根据已过时间比例选择合适的行为
        if (elapsedTime < totalTime * 0.7) {  // 前70%时间主要阅读
            await blogReader.simulateReading();
        } else if (elapsedTime < totalTime * 0.9) {  // 接下来20%时间主要滚动
            await simulateNaturalScrolling().scroll();
        } else {  // 最后10%时间可能进行交互
            await performRandomizedBehavior();
        }

        // 根据剩余时间动态调整下一个行为的延迟
        const remainingTime = totalTime - elapsedTime;
        const delay = Math.min(random(1000, 2000), remainingTime / 2);
        if (remainingTime > 0) {
            setTimeout(() => this.performTimedBehavior(), delay);
        }
    };

    // 添加定时行为执行方法
    behaviorSimulator.performTimedBehavior = async function() {
        if (!this.isRunning || !timeController.shouldContinue()) {
            return;
        }

        const elapsedTime = timeController.getElapsedTime();
        
        // 根据已过时间选择合适的行为
        if (elapsedTime < timeConfig.readingTime) {
            // 前12秒主要阅读
            await blogReader.simulateReading();
        } else if (elapsedTime < timeConfig.readingTime + timeConfig.scrollTime) {
            // 接下来5秒主要滚动
            await simulateNaturalScrolling().scroll();
        } else {
            // 最后3秒可能进行交互
            await performRandomizedBehavior();
        }

        // 安排下一个行为
        const delay = random(1000, 2000);
        setTimeout(() => this.performTimedBehavior(), delay);
    };

    // 修改随机行为执行方法
    randomBehavior.perform = async function() {
        try {
            if (!timeController.shouldContinue()) {
                return;
            }

            await simulateUserPause();
            await performRandomizedBehavior();
        } catch (e) {
            handleError(e, "随机行为执行");
        }
    };

    // 增强伪装，增加更多属性
    function spoofAdditionalProperties() {
        try {
            Object.defineProperty(navigator, 'doNotTrack', { get: () => '1', configurable: true });
            Object.defineProperty(navigator, 'maxTouchPoints', { get: () => random(1, 5), configurable: true });
            Object.defineProperty(navigator, 'vendor', { get: () => 'Google Inc.', configurable: true });
        } catch (e) {
            console.warn("无法伪装额外属性: ", e.message);
        }
    }

    // 模拟用户停顿
    async function simulateUserPause() {
        const pauseDuration = random(2000, 5000); // 随机停顿 2-5 秒
        console.log(`模拟用户停顿 ${pauseDuration} 毫秒`);
        await new Promise(resolve => setTimeout(resolve, pauseDuration));
    }

    // 模拟窗口切换
    function simulateWindowSwitch() {
        console.log("模拟窗口切换行为");
        document.dispatchEvent(new Event('visibilitychange'));
        Object.defineProperty(document, 'visibilityState', { value: 'hidden', configurable: true });
        setTimeout(() => {
            Object.defineProperty(document, 'visibilityState', { value: 'visible', configurable: true });
            document.dispatchEvent(new Event('visibilitychange'));
        }, random(2000, 5000)); // 随机切换时间
    }

    // 动态调整行为模式
    function adjustBehaviorMode() {
        const currentHour = new Date().getHours();
        if (currentHour >= 22 || currentHour < 6) {
            console.log("夜间模式：减少点击行为");
            behaviorProbabilities.forEach(behavior => {
                if (behavior.action === 'click' || behavior.action === 'clickNonAd') {
                    behavior.probability = 0.05;
                }
            });
        } else {
            console.log("白天模式：恢复正常行为概率");
            behaviorProbabilities.forEach(behavior => {
                if (behavior.action === 'click' || behavior.action === 'clickNonAd') {
                    behavior.probability = 0.1;
                }
            });
        }
        normalizeBehaviorProbabilities();
    }

    // 增强伪装，伪装更多属性
    function spoofMoreProperties() {
        try {
            Object.defineProperty(navigator, 'hardwareConcurrency', { get: () => random(4, 12), configurable: true });
            Object.defineProperty(navigator, 'deviceMemory', { get: () => random(2, 8), configurable: true });
            Object.defineProperty(navigator, 'platform', { get: () => 'Win32', configurable: true });
            Object.defineProperty(window, 'outerWidth', { get: () => random(1366, 1920), configurable: true });
            Object.defineProperty(window, 'outerHeight', { get: () => random(768, 1080), configurable: true });
        } catch (e) {
            console.warn("无法伪装更多属性: ", e.message);
        }
    }

    // 随机化行为顺序
    async function performRandomizedBehavior() {
        const behaviors = [...behaviorProbabilities];
        behaviors.sort(() => Math.random() - 0.5); // 随机排序
        for (const behavior of behaviors) {
            if (Math.random() < behavior.probability) {
                await randomBehavior[behavior.action]();
                await simulateUserPause(); // 在行为之间增加停顿
            }
        }
    }

    // 模拟用户长时间停顿
    async function simulateLongPause() {
        const longPauseDuration = random(10000, 30000); // 随机停顿 10-30 秒
        console.log(`模拟用户长时间停顿 ${longPauseDuration} 毫秒`);
        await new Promise(resolve => setTimeout(resolve, longPauseDuration));
    }

    // 动态调整行为间隔
    function adjustBehaviorInterval() {
        behaviorProbabilities.forEach(behavior => {
            if (behavior.action === 'click') {
                behavior.interval = random(15000, 30000); // 点击行为间隔 15-30 秒
            } else if (behavior.action === 'scroll') {
                behavior.interval = random(5000, 15000); // 滚动行为间隔 5-15 秒
            } else {
                behavior.interval = random(10000, 20000); // 其他行为间隔 10-20 秒
            }
        });
    }

    // 模拟鼠标轨迹
    function simulateMousePath(targetElement) {
        if (!targetElement || !(targetElement instanceof HTMLElement)) {
            console.error("目标元素无效");
            return;
        }
        const rect = targetElement.getBoundingClientRect();
        const startX = random(0, window.innerWidth);
        const startY = random(0, window.innerHeight);
        const endX = rect.left + rect.width / 2;
        const endY = rect.top + rect.height / 2;
        const steps = random(20, 50); // 增加步数，模拟更平滑的轨迹
        const stepX = (endX - startX) / steps;
        const stepY = (endY - startY) / steps;

        let currentStep = 0;
        const interval = setInterval(() => {
            if (currentStep >= steps) {
                clearInterval(interval);
                return;
            }
            const x = startX + stepX * currentStep + random(-2, 2); // 增加微小随机偏移
            const y = startY + stepY * currentStep + random(-2, 2);
            const mouseMoveEvent = new MouseEvent('mousemove', {
                clientX: x,
                clientY: y,
                bubbles: true,
                cancelable: true
            });
            document.dispatchEvent(mouseMoveEvent);
            currentStep++;
        }, random(30, 50)); // 更短的间隔，模拟平滑移动
    }

    // 伪装更多细节属性
    function spoofDetailedProperties() {
        try {
            Object.defineProperty(navigator, 'connection', {
                get: () => ({ effectiveType: '4g', rtt: random(50, 150), downlink: random(1, 10) }),
                configurable: true
            });
            Object.defineProperty(navigator, 'permissions', {
                get: () => ({
                    query: async () => ({ state: 'granted' })
                }),
                configurable: true
            });
        } catch (e) {
            console.warn("无法伪装更多细节属性: ", e.message);
        }
    }

    // 调用伪装更多细节属性
    spoofDetailedProperties();

    // 模拟用户行为中断
    async function simulateBehaviorInterruption() {
        if (Math.random() < 0.3) { // 30% 概率中断行为
            const interruptionDuration = random(5000, 15000); // 随机中断 5-15 秒
            console.log(`模拟用户行为中断 ${interruptionDuration} 毫秒`);
            await new Promise(resolve => setTimeout(resolve, interruptionDuration));
        }
    }

    // 动态调整行为触发概率
    function dynamicallyAdjustBehaviorProbabilities() {
        const currentHour = new Date().getHours();
        behaviorProbabilities.forEach(behavior => {
            if (currentHour >= 22 || currentHour < 6) { // 夜间模式
                if (behavior.action === 'click' || behavior.action === 'clickNonAd') {
                    behavior.probability = 0.05; // 降低点击行为概率
                } else if (behavior.action === 'read') {
                    behavior.probability = 0.7; // 增加阅读行为概率
                }
            } else { // 白天模式
                if (behavior.action === 'click' || behavior.action === 'clickNonAd') {
                    behavior.probability = 0.1;
                } else if (behavior.action === 'read') {
                    behavior.probability = 0.6;
                }
            }
        });
        normalizeBehaviorProbabilities();
    }

    // 模拟更复杂的鼠标轨迹
    function simulateComplexMousePath(targetElement) {
        if (!targetElement || !(targetElement instanceof HTMLElement)) {
            console.error("目标元素无效");
            return;
        }
        const rect = targetElement.getBoundingClientRect();
        const startX = random(0, window.innerWidth);
        const startY = random(0, window.innerHeight);
        const endX = rect.left + rect.width / 2;
        const endY = rect.top + rect.height / 2;
        const steps = random(30, 60); // 增加步数，模拟更复杂的轨迹
        const controlX = (startX + endX) / 2 + random(-100, 100); // 贝塞尔曲线控制点
        const controlY = (startY + endY) / 2 + random(-100, 100);

        let currentStep = 0;
        const interval = setInterval(() => {
            if (currentStep >= steps) {
                clearInterval(interval);
                return;
            }
            const t = currentStep / steps;
            const x = (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * controlX + t * t * endX;
            const y = (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * controlY + t * t * endY;
            const mouseMoveEvent = new MouseEvent('mousemove', {
                clientX: x,
                clientY: y,
                bubbles: true,
                cancelable: true
            });
            document.dispatchEvent(mouseMoveEvent);
            currentStep++;
        }, random(30, 50)); // 更短的间隔，模拟平滑移动
    }

    // 伪装更多复杂属性
    function spoofComplexProperties() {
        try {
            Object.defineProperty(navigator, 'mediaDevices', {
                get: () => ({
                    getUserMedia: async () => ({ video: true, audio: true }),
                    enumerateDevices: async () => [{ kind: 'videoinput' }, { kind: 'audioinput' }]
                }),
                configurable: true
            });
            Object.defineProperty(navigator, 'credentials', {
                get: () => ({
                    get: async () => null,
                    store: async () => null
                }),
                configurable: true
            });
        } catch (e) {
            console.warn("无法伪装复杂属性: ", e.message);
        }
    }

    // 调用伪装复杂属性
    spoofComplexProperties();

    // 修改行为模拟器的 perform 方法，增加行为中断和动态概率调整
    randomBehavior.perform = async function() {
        try {
            console.log("开始随机化行为执行");
            await performRandomizedBehavior();
            await simulateBehaviorInterruption(); // 在行为之间插入中断
        } catch (e) {
            handleError(e, "随机行为执行");
        }
    };

    // 定期动态调整行为概率
    setInterval(dynamicallyAdjustBehaviorProbabilities, 60000); // 每分钟调整一次

    // 修改行为模拟器的 perform 方法，增加长时间停顿和动态间隔
    randomBehavior.perform = async function() {
        try {
            console.log("开始随机化行为执行");
            await performRandomizedBehavior();
            if (Math.random() < 0.2) { // 20% 概率触发长时间停顿
                await simulateLongPause();
            }
        } catch (e) {
            handleError(e, "随机行为执行");
        }
    };

    // 定期调整行为间隔
    setInterval(adjustBehaviorInterval, 60000); // 每分钟调整一次

    document.addEventListener('DOMContentLoaded', function() {
        var indicator = document.createElement('div');
        indicator.style.cssText = 'display: none; position: fixed; top: 10px; right: 10px; background: red; padding: 10px; color: white; z-index: 9999;';
        indicator.textContent = '脚本正在运行';

        // 等待 document.body 存在
        var checkBodyInterval = setInterval(function() {
            if (document.body) {
                document.body.appendChild(indicator);
                clearInterval(checkBodyInterval);
            }
        }, 100);

        setInterval(function() {
            console.log('脚本运行中...', new Date().toLocaleTimeString());
            indicator.textContent = '脚本运行中: ' + new Date().toLocaleTimeString();
        }, 1000);

        // 配置参数 - 轻量化设置
        var config = {
            minInterval: 10000,
            maxInterval: 20000,
            mouseMoveSteps: 15,
            scrollStepSize: 80,
            scrollStepInterval: 80,
            clickProbability: 0.08,
            readingProbability: 0.6,
            externalLinkProbability: 0.15,
            enableLowMemoryMode: true,
            memoryCleanInterval: 86400000,
            mobileOptimization: true,
            contentFocused: true,
            debug: false
        };

        const timeController = {
            startTime: 0,
            timeoutId: null,

            start: function() {
                this.startTime = Date.now();
                this.schedulePageExit();
            },

            schedulePageExit: function() {
                if (this.timeoutId) {
                    clearTimeout(this.timeoutId);
                }
                
                // 在20秒后结束访问
                this.timeoutId = setTimeout(() => {
                    behaviorSimulator.stop();
                    window.location.href = document.referrer || '/';
                }, timeConfig.totalVisitTime);
            },

            getElapsedTime: function() {
                return Date.now() - this.startTime;
            },

            shouldContinue: function() {
                return this.getElapsedTime() < timeConfig.totalVisitTime;
            }
        };

        if (!config.debug) {
            console.log = function() {};
            console.info = function() {};
            console.warn = function() {};
            console.error = function() {};
        }

        function randomDelay(min, max) {
            try {
                return new Promise(resolve => setTimeout(resolve, random(min, max)));
            } catch (e) {
                handleError(e, "随机延迟函数");
            }
        }

        function checkBrowserCompatibility() {
            const requiredFeatures = [
                () => typeof Proxy !== 'undefined',
                () => typeof Object.defineProperty !== 'undefined',
                () => typeof MouseEvent !== 'undefined',
                () => typeof KeyboardEvent !== 'undefined',
                () => typeof requestAnimationFrame !== 'undefined'
            ];

            for (const check of requiredFeatures) {
                if (!check()) {
                    console.warn("当前浏览器不支持某些必要功能，部分功能将被禁用");
                    return false;
                }
            }
            return true;
        }

        function applyFallbacks() {
            console.warn("启用降级模式，禁用部分功能");

            const noopProxy = new Proxy({}, { get: () => () => {} });
            Object.defineProperty(window, 'navigator', { value: noopProxy });

            randomBehavior.perform = function() {
                console.warn("行为模拟被禁用");
            };

            simulateMouseMovement = function() {
                console.warn("鼠标移动模拟被禁用");
            };
            simulateScrollPause = function() {
                console.warn("滚动模拟被禁用");
            };
        }

        if (!checkBrowserCompatibility()) {
            applyFallbacks();
        }

        const spoofedNavigator = new Proxy(navigator, {
            get: (target, prop) => {
                if (prop === 'webdriver') return false;
                if (prop === 'languages') return ['zh-CN', 'en-US'];
                return target[prop];
            }
        });

        function spoofWindowProperties() {
            Object.defineProperty(window, 'outerWidth', { get: () => window.innerWidth });
            Object.defineProperty(window, 'outerHeight', { get: () => window.innerHeight });
        }

        // 增强伪装属性，增加更多随机性
        function spoofHardwareProperties() {
            try {
                if (Object.getOwnPropertyDescriptor(navigator, 'hardwareConcurrency')?.configurable) {
                    Object.defineProperty(navigator, 'hardwareConcurrency', {
                        get: () => random(4, 16), // 更高的随机范围
                        configurable: true
                    });
                }
            } catch (e) {
                console.warn("无法伪装 navigator.hardwareConcurrency: ", e.message);
            }

            try {
                if (Object.getOwnPropertyDescriptor(navigator, 'deviceMemory')?.configurable) {
                    Object.defineProperty(navigator, 'deviceMemory', {
                        get: () => random(2, 8), // 更高的随机范围
                        configurable: true
                    });
                }
            } catch (e) {
                console.warn("无法伪装 navigator.deviceMemory: ", e.message);
            }
        }

        function spoofNavigatorPlugins() {
            try {
                if (Object.getOwnPropertyDescriptor(navigator, 'plugins')?.configurable) {
                    Object.defineProperty(navigator, 'plugins', {
                        get: () => [{ name: 'Chrome PDF Viewer' }, { name: 'Native Client' }]
                    });
                } else {
                    console.warn("navigator.plugins 属性不可配置，跳过伪装");
                }

                if (Object.getOwnPropertyDescriptor(navigator, 'mimeTypes')?.configurable) {
                    Object.defineProperty(navigator, 'mimeTypes', {
                        get: () => [{ type: 'application/pdf' }, { type: 'application/x-nacl' }]
                    });
                } else {
                    console.warn("navigator.mimeTypes 属性不可配置，跳过伪装");
                }
            } catch (e) {
                console.warn("无法伪装 navigator.plugins 或 navigator.mimeTypes: ", e.message);
            }
        }

        function spoofScreenProperties() {
            try {
                const screenProperties = ['width', 'height', 'availWidth', 'availHeight', 'colorDepth', 'pixelDepth'];
                const spoofValues = {
                    width: () => random(1366, 1920),
                    height: () => random(768, 1080),
                    availWidth: () => random(1366, 1920),
                    availHeight: () => random(768, 1080),
                    colorDepth: () => 24,
                    pixelDepth: () => 24
                };

                screenProperties.forEach(prop => {
                    const descriptor = Object.getOwnPropertyDescriptor(window.screen, prop);
                    if (descriptor && descriptor.configurable) {
                        Object.defineProperty(window.screen, prop, { get: spoofValues[prop] });
                    } else {
                        console.warn(`window.screen.${prop} 属性不可配置，跳过伪装`);
                    }
                });
            } catch (e) {
                console.warn("无法伪装 screen 属性: ", e.message);
            }
        }

        function spoofWebGL() {
            const getParameter = WebGLRenderingContext.prototype.getParameter;
            WebGLRenderingContext.prototype.getParameter = function(parameter) {
                if (parameter === this.RENDERER) {
                    return 'Intel(R) HD Graphics 620';
                }
                if (parameter === this.VENDOR) {
                    return 'Intel Inc.';
                }
                return getParameter.call(this, parameter);
            };
        }

        function spoofCanvas() {
            const originalToDataURL = HTMLCanvasElement.prototype.toDataURL;
            HTMLCanvasElement.prototype.toDataURL = function(...args) {
                const context = this.getContext('2d');
                const shift = random(-5, 5);
                if (context) {
                    const { width, height } = this;
                    const imageData = context.getImageData(0, 0, width, height);
                    for (let i = 0; i < imageData.data.length; i += 4) {
                        imageData.data[i] += shift;
                        imageData.data[i + 1] += shift;
                        imageData.data[i + 2] += shift;
                    }
                    context.putImageData(imageData, 0, 0);
                }
                return originalToDataURL.apply(this, args);
            };
        }

        function interceptDialogs() {
            window.alert = function() {
                console.log('拦截到 alert 调用');
            };
            window.confirm = function() {
                console.log('拦截到 confirm 调用');
                return true;
            };
            window.prompt = function() {
                console.log('拦截到 prompt 调用');
                return null;
            };
        }

        function enhanceStealth() {
            document.addEventListener('contextmenu', event => event.preventDefault());
            document.addEventListener('keydown', event => {
                if (event.key === 'F12' || (event.ctrlKey && event.shiftKey && ['I', 'J', 'C'].includes(event.key))) {
                    event.preventDefault();
                }
            });

            const originalConsoleDebug = console.debug;
            Object.defineProperty(console, 'debug', {
                get: () => function() {
                    if (arguments.length && typeof arguments[0] === 'string' && arguments[0].includes('debugger')) {
                        return;
                    }
                    return originalConsoleDebug.apply(console, arguments);
                }
            });

            const spoofedNavigator = new Proxy(navigator, {
                get: (target, prop) => {
                    if (prop === 'webdriver') return false;
                    if (prop === 'languages') return ['zh-CN', 'en-US'];
                    if (prop === 'platform') return 'Win32';
                    if (prop === 'userAgent') return target.userAgent.replace(/HeadlessChrome|PhantomJS/i, 'Chrome');
                    return target[prop];
                }
            });
            Object.defineProperty(window, 'navigator', { value: spoofedNavigator });

            const indicator = document.querySelector('div[style*="z-index: 9999"]');
            if (indicator) {
                indicator.style.display = 'none';
            }

            const originalLog = console.log;
            console.log = function(...args) {
                if (args.length && typeof args[0] === 'string' && args[0].includes('[检测]')) {
                    return;
                }
                originalLog.apply(console, args);
            };

            Object.defineProperty(window, 'outerWidth', { get: () => window.innerWidth });
            Object.defineProperty(window, 'outerHeight', { get: () => window.innerHeight });
        }

        // 定义 simulateScrollPause
        const randomBehavior = {
            perform: async function() {
                try {
                    console.log("开始随机化行为执行");
                    await performRandomizedBehavior();
                    if (Math.random() < 0.2) { // 20% 概率触发长时间停顿
                        await simulateLongPause();
                    }
                } catch (e) {
                    handleError(e, "随机行为执行");
                }
            },
            read: function() {
                console.log("模拟阅读行为");
                simulateScrollPause();
            },
            click: function() {
                console.log("模拟点击行为");
                clickRandomAd();
            },
            type: function() {
                console.log("模拟键盘输入行为");
                const input = document.querySelector('input, textarea');
                if (input) simulateTyping(input, "测试输入");
            },
            scroll: function() {
                console.log("模拟滚动行为");
                simulateScrollPause();
            },
            hover: function() {
                console.log("模拟悬停行为");
                const elements = document.querySelectorAll('a, button, div');
                if (elements.length > 0) {
                    const randomElement = elements[Math.floor(Math.random() * elements.length)];
                    simulateHover(randomElement);
                }
            },
            clickNonAd: function() {
                clickRandomNonAdLink();
            }
        };

        enhanceStealth();
        spoofAdditionalProperties();
        spoofMoreProperties();

        function enhanceSimulation() {
            function simulateMouseClick(targetElement) {
                if (!targetElement || !(targetElement instanceof HTMLElement)) {
                    console.error("目标元素无效");
                    return;
                }
                const rect = targetElement.getBoundingClientRect();
                const x = rect.left + rect.width / 2;
                const y = rect.top + rect.height / 2;

                const clickEvent = new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                    view: window,
                    clientX: x,
                    clientY: y
                });
                targetElement.dispatchEvent(clickEvent);
                console.log("模拟点击: " + (targetElement.textContent || targetElement.className || '未知元素'));
            }

            function simulateKeyboardInput(targetElement, text) {
                if (!targetElement || !(targetElement instanceof HTMLElement)) {
                    console.error("目标元素无效");
                    return;
                }
                let index = 0;
                const interval = setInterval(() => {
                    if (index >= text.length) {
                        clearInterval(interval);
                        return;
                    }
                    const char = text[index];
                    const keyEvent = new KeyboardEvent('keydown', {
                        key: char,
                        code: `Key${char.toUpperCase()}`,
                        bubbles: true,
                        cancelable: true
                    });
                    targetElement.dispatchEvent(keyEvent);
                    targetElement.value += char;
                    index++;
                }, random(100, 300));
            }

            randomBehavior.click = function() {
                const links = document.querySelectorAll('a');
                if (links.length > 0) {
                    const randomLink = links[Math.floor(Math.random() * links.length)];
                    simulateMouseClick(randomLink);
                }
            };

            randomBehavior.type = function() {
                const inputs = document.querySelectorAll('input, textarea');
                if (inputs.length > 0) {
                    const randomInput = inputs[Math.floor(Math.random() * inputs.length)];
                    simulateKeyboardInput(randomInput, "测试输入");
                }
            };
        }

        enhanceSimulation();

        setInterval(() => {
            if (!userActivityDetector.isUserActive()) {
                console.log("未检测到用户行为，开始仿用户行为");
                randomBehavior.perform();
            }
        }, 5000);

        setInterval(adjustBehaviorProbabilities, 10000);

        setInterval(adjustBehaviorMode, 3600000); // 每小时调整一次

        setInterval(simulateWindowSwitch, random(300000, 600000)); // 每 5-10 分钟切换一次

        window.onerror = function(msg, url, lineNo, columnNo, error) {
            if (config.debug) {
                console.error('[博客行为] 错误:', msg, 'at', url, ':', lineNo);
            }
            return false;
        };

        const logger = {
            log: function(message, level = 'info') {
                if (config.debug) {
                    console[level](`[日志] ${message}`);
                }
            }
        };

        function handleError(e, context) {
            console.error(`[错误] ${context}: ${e.message}`);
            if (config.debug) {
                console.error(e.stack);
            }
        }

        var deviceDetector = {
            isMobile: function() {
                return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            },
            
            adjustForDevice: function() {
                if (this.isMobile()) {
                    config.mouseMoveSteps = 10;
                    config.scrollStepSize = 70;
                    config.minInterval = 12000;
                    config.maxInterval = 22000;
                    logger.log("检测到移动设备，已优化配置");
                }
            }
        };

        var browserAdapter = {
            detectBrowser: function() {
                var userAgent = navigator.userAgent.toLowerCase();
                if (userAgent.indexOf('chrome') > -1) {
                    return 'Chrome';
                } else if (userAgent.indexOf('firefox') > -1) {
                    return 'Firefox';
                } else if (userAgent.indexOf('safari') > -1 && userAgent.indexOf('chrome') === -1) {
                    return 'Safari';
                } else if (userAgent.indexOf('edge') > -1) {
                    return 'Edge';
                } else if (userAgent.indexOf('trident') > -1 || userAgent.indexOf('msie') > -1) {
                    return 'IE';
                } else {
                    return 'Other';
                }
            },

            optimizeForBrowser: function() {
                var browser = this.detectBrowser();
                switch (browser) {
                    case 'Chrome':
                        logger.log("检测到 Chrome 浏览器，应用特定优化");
                        break;
                    case 'Firefox':
                        logger.log("检测到 Firefox 浏览器，应用特定优化");
                        break;
                    case 'Safari':
                        logger.log("检测到 Safari 浏览器，应用特定优化");
                        break;
                    case 'Edge':
                        logger.log("检测到 Edge 浏览器，应用特定优化");
                        break;
                    case 'IE':
                        logger.log("检测到 IE 浏览器，应用降级处理");
                        config.enableLowMemoryMode = true;
                        break;
                    default:
                        logger.log("检测到未知浏览器，使用默认设置");
                }
            },

            detectPlatform: function() {
                var platform = navigator.platform.toLowerCase();
                if (platform.indexOf('win') > -1) {
                    return 'Windows';
                } else if (platform.indexOf('mac') > -1) {
                    return 'MacOS';
                } else if (platform.indexOf('linux') > -1) {
                    return 'Linux';
                } else if (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(platform)) {
                    return 'Mobile';
                } else {
                    return 'Other';
                }
            },

            optimizeForPlatform: function() {
                var platform = this.detectPlatform();
                switch (platform) {
                    case 'Windows':
                        logger.log("检测到 Windows 平台，应用特定优化");
                        break;
                    case 'MacOS':
                        logger.log("检测到 MacOS 平台，应用特定优化");
                        break;
                    case 'Linux':
                        logger.log("检测到 Linux 平台，应用特定优化");
                        break;
                    case 'Mobile':
                        logger.log("检测到移动平台，应用移动端优化");
                        deviceDetector.adjustForDevice();
                        break;
                    default:
                        logger.log("检测到未知平台，使用默认设置");
                }
            }
        };

        browserAdapter.optimizeForBrowser();
        browserAdapter.optimizeForPlatform();

        var memoryManager = {
            lastCleanTime: Date.now(),
            
            cleanMemory: function() {
                try {
                    if (selectorCache) {
                        selectorCache.clear();
                    }
                    
                    if (behaviorSimulator) {
                        behaviorSimulator.resetTempData();
                    }
                    
                    this.cleanEventListeners();
                    
                    if (performance && performance.memory && 
                        performance.memory.usedJSHeapSize > 100000000) {
                        this.aggressiveClean();
                    }
                    
                    if (typeof window.gc === 'function') {
                        try {
                            window.gc();
                        } catch (e) {
                            console.warn("垃圾回收失败: ", e.message);
                        }
                    }
                    
                    logger.log("执行内存清理操作");
                    this.lastCleanTime = Date.now();
                } catch (e) {
                    logger.log("内存清理时发生错误: " + e.message);
                }
            },
            
            aggressiveClean: function() {
                selectorCache.clear();
                behaviorSimulator.resetTempData();
                
                this.cleanDOMReferences();
                
                logger.log("执行激进清理");
            },
            
            cleanEventListeners: function() {
                if (behaviorSimulator && behaviorSimulator.tempListeners) {
                    behaviorSimulator.tempListeners.forEach(function(item) {
                        if (item.element && item.type && item.handler) {
                            item.element.removeEventListener(item.type, item.handler);
                        }
                    });
                    behaviorSimulator.tempListeners = [];
                }
            },
            
            cleanDOMReferences: function() {
                if (behaviorSimulator) {
                    behaviorSimulator.currentElement = null;
                }
            },
            
            checkAndClean: function() {
                var now = Date.now();
                if (now - this.lastCleanTime > config.memoryCleanInterval) {
                    this.cleanMemory();
                    return true;
                }
                return false;
            },
            
            setupScheduledCleaning: function() {
                setInterval(this.cleanMemory.bind(this), config.memoryCleanInterval);
                
                document.addEventListener('visibilitychange', function() {
                    if (document.hidden) {
                        memoryManager.cleanMemory();
                    }
                });
                
                if ('memory' in performance) {
                    setInterval(function() {
                        if (performance.memory.usedJSHeapSize > 50000000) {
                            memoryManager.cleanMemory();
                        }
                    }, 60000);
                } else {
                    logger.log("当前浏览器不支持内存监控功能，禁用相关功能");
                    config.enableLowMemoryMode = false;
                }
            }
        };

        var selectorCache = {
            data: {},
            maxItems: 20,
            
            get: function(selector) {
                if (this.data[selector]) {
                    var cachedResult = this.data[selector];
                    if (cachedResult.length > 0 && document.body.contains(cachedResult[0])) {
                        return cachedResult;
                    }
                }
                var result = document.querySelectorAll(selector);
                this.data[selector] = result;
                return result;
            },
            
            clear: function() {
                this.data = {};
            }
        };

        var blogAnalyzer = {
            analyzeContent: function() {
                var contentSelectors = [
                    'article', '.post-content', '.entry-content', 
                    '.blog-post', '#content', '.content', 'main'
                ];
                
                var content = null;
                for (var i = 0; i < contentSelectors.length; i++) {
                    var elements = document.querySelectorAll(contentSelectors[i]);
                    if (elements.length > 0) {
                        content = elements[0];
                        break;
                    }
                }
                
                if (!content) return { wordCount: 500, readTime: 2 };
                
                var text = content.textContent || content.innerText;
                var wordCount = text.split(/\s+/).length;
                var readTimeMinutes = Math.max(1, Math.round(wordCount / 250));
                
                return {
                    wordCount: wordCount,
                    readTime: readTimeMinutes
                };
            },
            
            findReadingArea: function() {
                var contentInfo = this.analyzeContent();
                
                if (contentInfo.wordCount > 1000) {
                    config.scrollStepSize = 60;
                    config.readingProbability = 0.7;
                } else {
                    config.scrollStepSize = 100;
                }
                
                return contentInfo;
            },
            
            findLinks: function() {
                var container = document.querySelector('main') || document.body;
                var allLinks = container.querySelectorAll('a[href]');
                var internalLinks = [];
                var externalLinks = [];

                var currentDomain = window.location.hostname;

                allLinks.forEach(function(link) {
                    var href = link.href.toLowerCase();
                    if (!href || href.startsWith('#') || href.startsWith('javascript:')) {
                        return;
                    }

                    if (href.includes(currentDomain)) {
                        internalLinks.push(link);
                    } else {
                        externalLinks.push(link);
                    }
                });

                return {
                    internal: internalLinks,
                    external: externalLinks
                };
            }
        };

        var behaviorSimulator = {
            isRunning: false,
            currentTimer: null,
            lastAction: 0,
            tempListeners: [],
            
            resetTempData: function() {
                this.tempListeners = [];
            },
            
            start: function() {
                try {
                    if (this.isRunning) return;
                    this.isRunning = true;

                    this.setupUserActivityDetection();
                    this.setupDeviceAdjustments();
                    this.setupMemoryManagement();
                } catch (e) {
                    handleError(e, "行为模拟器启动");
                    this.isRunning = false;
                }
            },

            setupUserActivityDetection: function() {
                userActivityDetector.init();
                setInterval(() => {
                    if (userActivityDetector.isUserActive()) {
                        logger.log("检测到用户行为，随机点击广告");
                        clickRandomAd();
                    } else {
                        logger.log("未检测到用户行为，开始仿用户行为");
                        randomBehavior.perform();
                    }
                }, 5000);
            },

            setupDeviceAdjustments: function() {
                deviceDetector.adjustForDevice();
            },

            setupMemoryManagement: function() {
                memoryManager.setupScheduledCleaning();
            },
            
            stop: function() {
                try {
                    this.isRunning = false;
                    if (this.currentTimer) {
                        clearTimeout(this.currentTimer);
                        this.currentTimer = null;
                    }

                    this.tempListeners.forEach(function(listener) {
                        if (listener.type === 'interval') {
                            clearInterval(listener.handler);
                        } else if (listener.type === 'event') {
                            listener.element.removeEventListener(listener.event, listener.handler);
                        }
                    });
                    this.tempListeners = [];
                } catch (e) {
                    handleError(e, "行为模拟器停止");
                }
            },
            
            scheduleNextAction: function() {
                if (!this.isRunning) return;
                
                var interval = random(config.minInterval, config.maxInterval);
                this.currentTimer = setTimeout(randomBehavior.perform.bind(randomBehavior), interval);
            }
        };

        const behaviorProbabilities = [
            { action: 'read', probability: 0.6 },      // 主要是阅读
            { action: 'scroll', probability: 0.25 },   // 适度滚动
            { action: 'hover', probability: 0.1 },     // 少量悬停
            { action: 'click', probability: 0.03 },    // 极少点击广告
            { action: 'clickNonAd', probability: 0.02 }// 极少点击普通链接
        ];

        function normalizeBehaviorProbabilities() {
            const totalProbability = behaviorProbabilities.reduce((sum, behavior) => sum + behavior.probability, 0);
            if (Math.abs(totalProbability - 1) > 0.001) {
                console.warn("行为概率总和不为 1，正在进行归一化处理");
                behaviorProbabilities.forEach(behavior => {
                    behavior.probability /= totalProbability;
                });
            }
        }

        normalizeBehaviorProbabilities();

        // 添加博客阅读行为分析器
        const blogReader = {
            readingSpeed: random(200, 400),  // 每分钟阅读字数
            lastScrollPosition: 0,
            isReading: false,
            
            // 分析文章内容
            analyzeArticle: function() {
                const article = document.querySelector('article, .post-content, .entry-content, .article');
                if (!article) return null;
                
                const text = article.textContent;
                const wordCount = text.split(/\s+/).length;
                const readingTime = Math.ceil(wordCount / this.readingSpeed);
                
                return {
                    wordCount,
                    readingTime,
                    article
                };
            },
            
            // 模拟真实阅读行为
            simulateReading: async function() {
                const articleInfo = this.analyzeArticle();
                if (!articleInfo) return;
                
                this.isReading = true;
                const { article, readingTime } = articleInfo;
                
                // 先滚动到文章开头
                article.scrollIntoView({ behavior: 'smooth', block: 'start' });
                await new Promise(r => setTimeout(r, 1000));
                
                // 计算阅读速度相关的滚动
                const totalHeight = article.offsetHeight;
                const scrollSteps = Math.ceil(readingTime * 60 / 2); // 每2秒滚动一次
                const scrollDistance = totalHeight / scrollSteps;
                
                for (let i = 0; i < scrollSteps; i++) {
                    if (!this.isReading) break;
                    
                    // 随机停顿，模拟仔细阅读
                    if (Math.random() < 0.2) {
                        await new Promise(r => setTimeout(r, random(2000, 5000)));
                    }
                    
                    // 缓慢滚动
                    window.scrollBy({
                        top: scrollDistance,
                        behavior: 'smooth'
                    });
                    
                    // 有30%概率返回上一处重新阅读
                    if (Math.random() < 0.3) {
                        await new Promise(r => setTimeout(r, 1000));
                        window.scrollBy({
                            top: -scrollDistance * random(0.3, 0.7),
                            behavior: 'smooth'
                        });
                    }
                    
                    await new Promise(r => setTimeout(r, random(1500, 3000)));
                }
                
                this.isReading = false;
            }
        };

        // 改进滚动行为
        function simulateNaturalScrolling() {
            const scrollHeight = document.documentElement.scrollHeight;
            const viewportHeight = window.innerHeight;
            let currentPosition = window.pageYOffset;
            
            // 寻找兴趣点（标题、图片等）
            const interestPoints = document.querySelectorAll('h1, h2, h3, img, blockquote');
            const points = Array.from(interestPoints).map(el => el.getBoundingClientRect().top + window.pageYOffset);
            
            return {
                scroll: async function() {
                    // 找到下一个兴趣点
                    const nextPoint = points.find(p => p > currentPosition + 100) || scrollHeight;
                    const distance = nextPoint - currentPosition;
                    
                    // 分段平滑滚动
                    const steps = Math.floor(random(10, 20));
                    const stepSize = distance / steps;
                    
                    for (let i = 0; i < steps; i++) {
                        if (Math.random() < 0.1) { // 10%概率停顿
                            await new Promise(r => setTimeout(r, random(500, 2000)));
                        }
                        
                        window.scrollBy({
                            top: stepSize,
                            behavior: 'smooth'
                        });
                        
                        await new Promise(r => setTimeout(r, random(100, 300)));
                    }
                    
                    currentPosition = window.pageYOffset;
                }
            };
        }

        // 修改行为模拟器的执行方法
        randomBehavior.perform = async function() {
            try {
                // 优先执行阅读行为
                if (Math.random() < 0.7) {
                    await blogReader.simulateReading();
                } else {
                    await performRandomizedBehavior();
                }
                
                // 长时间阅读后的休息
                if (Math.random() < 0.3) {
                    await simulateLongPause();
                }
            } catch (e) {
                handleError(e, "博客阅读行为执行");
            }
        };

        function update() {
            console.log('Update frame');
            requestAnimationFrame(update);
        }

        let userInteracted = false;
        const interactionEvents = ['mousemove', 'keydown', 'scroll', 'click'];

        function stopAllAndHide() {
            behaviorSimulator.stop();
            memoryManager.cleanMemory();

            const indicator = document.querySelector('div[style*="z-index: 9999"]');
            if (indicator) {
                indicator.style.display = 'none';
            }
            console.log = console.info = console.warn = console.error = function() {};
        }

        interactionEvents.forEach(event => {
            window.addEventListener(event, function() {
                userInteracted = true;
                clearTimeout(startScriptTimeout); // 清除启动脚本的计时器
            });
        });

        let startScriptTimeout = setTimeout(function() {
            if (!userInteracted) {
                console.log("用户无操作 5 秒，开始运行脚本");
                behaviorSimulator.start();
            }
        }, 5000);

        function setupVisibilityChangeHandler() {
            document.addEventListener('visibilitychange', () => {
                if (document.visibilityState === 'hidden') {
                    console.log("页面不可见，暂停行为模拟");
                    behaviorSimulator.stop();
                } else if (document.visibilityState === 'visible') {
                    console.log("页面可见，恢复行为模拟");
                    behaviorSimulator.start();
                }
            });
        }

        function handleInactivityWhileReading() {
            const readingCheckInterval = 5000; // 将检测间隔减少到 5 秒
            setInterval(() => {
                if (!userInteracted && document.visibilityState === 'visible') {
                    console.log("用户长时间未操作，可能正在阅读内容");
                    randomBehavior.read();
                }
            }, readingCheckInterval);
        }

        setupVisibilityChangeHandler();
        handleInactivityWhileReading();

        setTimeout(function() {
            if (!userInteracted) {
                behaviorSimulator.start();
            }
        }, 5000);

        if (typeof MouseEvent === 'undefined' || typeof KeyboardEvent === 'undefined') {
            console.warn("当前浏览器不支持模拟事件");
            return;
        }

        if (document.readyState === 'complete') {
            behaviorSimulator.start();
        } else {
            window.addEventListener('load', function() {
                setTimeout(function() {
                    behaviorSimulator.start();
                }, 2000);
            });
        }
        
        window.addEventListener('beforeunload', function() {
            behaviorSimulator.stop();
            memoryManager.cleanMemory();
        });

        const simulator = {
            moveMouse: function(targetElement) {
            },
            typeText: function(targetElement, text) {
            }
        };

        requestAnimationFrame(update);

        // 浏览器和设备测试日志
        function logTestResults() {
            try {
                const browser = browserAdapter.detectBrowser();
                const platform = browserAdapter.detectPlatform();
                const isMobile = deviceDetector.isMobile();

                logger.log(`测试结果: 浏览器=${browser}, 平台=${platform}, 是否移动设备=${isMobile}`, 'info');

                logger.log(`navigator.webdriver: ${navigator.webdriver}`, 'info');
                logger.log(`navigator.languages: ${navigator.languages}`, 'info');
                logger.log(`navigator.platform: ${navigator.platform}`, 'info');
                logger.log(`navigator.userAgent: ${navigator.userAgent}`, 'info');
                logger.log(`navigator.hardwareConcurrency: ${navigator.hardwareConcurrency}`, 'info');
                logger.log(`navigator.deviceMemory: ${navigator.deviceMemory}`, 'info');

                const testElement = document.createElement('div');
                testElement.style.cssText = 'position: absolute; top: 0; left: 0; width: 100px; height: 100px; background: blue;';
                document.body.appendChild(testElement);

                simulateMouseMovement(testElement);
                simulateScrollPause();
                simulateHover(testElement);

                document.body.removeChild(testElement);
                logger.log("伪装和模拟功能测试完成", 'info');
            } catch (e) {
                handleError(e, "测试伪装和模拟功能");
            }
        }

        document.addEventListener('DOMContentLoaded', () => {
            logTestResults();
        });

        // 行为模式伪装模块
        const behaviorPattern = {
            actions: [],
            maxActions: 100,

            logAction: function(action) {
                if (this.actions.length >= this.maxActions) {
                    this.actions.shift(); // 移除最早的行为
                }
                this.actions.push({ action, timestamp: Date.now() });
            },

            simulateComplexBehavior: async function() {
                const randomDelay = random(5000, 15000); // 随机延迟 5-15 秒
                console.log(`模拟复杂行为，延迟 ${randomDelay} 毫秒`);
                await new Promise(resolve => setTimeout(resolve, randomDelay));
                this.logAction("complexBehavior");
            }
        };

        // JavaScript 响应伪装模块
        function spoofJavaScriptResponse() {
            try {
                const testElement = document.createElement('div');
                testElement.style.cssText = 'position: absolute; top: 0; left: 0; width: 1px; height: 1px;';
                document.body.appendChild(testElement);
                const computedStyle = window.getComputedStyle(testElement);
                if (computedStyle.position !== 'absolute') {
                    console.warn("JavaScript 响应伪装失败");
                } else {
                    console.log("JavaScript 响应伪装成功");
                }
                document.body.removeChild(testElement);
            } catch (e) {
                console.warn("JavaScript 响应伪装失败: ", e.message);
            }
        }

        // CAPTCHA 自动处理模块
        async function handleCAPTCHA() {
            console.warn("检测到 CAPTCHA 验证");
            try {
                // 尝试自动处理 CAPTCHA
                const captchaElement = document.querySelector('iframe[src*="captcha"], div[class*="captcha"]');
                if (captchaElement) {
                    console.log("尝试自动处理 CAPTCHA");
                    // 模拟点击或输入操作
                    captchaElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    await new Promise(resolve => setTimeout(resolve, random(2000, 5000))); // 模拟用户观察时间
                    const captchaButton = captchaElement.querySelector('button, input[type="submit"]');
                    if (captchaButton) {
                        captchaButton.click();
                        console.log("已尝试提交 CAPTCHA");
                    } else {
                        console.warn("未找到 CAPTCHA 提交按钮");
                    }
                } else {
                    console.warn("未检测到 CAPTCHA 元素");
                    alert("请手动完成 CAPTCHA 验证以继续操作");
                }
            } catch (e) {
                console.error("自动处理 CAPTCHA 失败: ", e.message);
                alert("请手动完成 CAPTCHA 验证以继续操作");
            }
        }

        // 集成 CAPTCHA 检测逻辑
        setInterval(() => {
            const captchaDetected = document.querySelector('iframe[src*="captcha"], div[class*="captcha"]');
            if (captchaDetected) {
                handleCAPTCHA();
            }
        }, 10000); // 每 10 秒检查一次 CAPTCHA

        // 初始化伪装模块
        document.addEventListener('DOMContentLoaded', () => {
            spoofJavaScriptResponse();
        });

        // 在行为检测中集成 CAPTCHA 验证
        setInterval(() => {
            if (behaviorPattern.actions.length > 50) { // 如果行为记录过多，触发 CAPTCHA
                handleCAPTCHA();
            }
        }, 60000); // 每分钟检查一次
    });
})();

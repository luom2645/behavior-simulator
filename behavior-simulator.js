(function() {
    document.addEventListener('DOMContentLoaded', function() {
        var indicator = document.createElement('div');
        indicator.style.cssText = 'position: fixed; top: 10px; right: 10px; background: red; padding: 10px; color: white; z-index: 9999;';
        indicator.textContent = '脚本正在运行';
        document.body.appendChild(indicator);

        setInterval(function() {
            console.log('脚本运行中...', new Date().toLocaleTimeString());
            indicator.textContent = '脚本运行中: ' + new Date().toLocaleTimeString();
        }, 1000);

        // 配置参数 - 轻量化设置
        var config = {
            // 基础设置
            minInterval: 10000,     // 最小行为间隔 (毫秒)
            maxInterval: 20000,     // 最大行为间隔 (毫秒)
            mouseMoveSteps: 15,     // 鼠标移动步数
            scrollStepSize: 80,     // 滚动步长
            scrollStepInterval: 80, // 滚动步骤间隔 (毫秒)
            clickProbability: 0.08, // 点击概率
            readingProbability: 0.6, // 阅读行为概率
            externalLinkProbability: 0.15, // 外部链接点击概率
            
            // 性能优化设置
            enableLowMemoryMode: true,  // 启用低内存模式
            memoryCleanInterval: 86400000, // 内存清理间隔 (24小时)
            mobileOptimization: true,   // 移动端优化
            
            // 博客特定设置
            contentFocused: true,       // 内容关注模式
            
            // 调试设置
            debug: false  // 调试模式
        };

        // 禁用 console.log（除非启用调试模式）
        if (!config.debug) {
            console.log = function() {};
            console.info = function() {};
            console.warn = function() {};
            console.error = function() {};
        }

        // 增加随机延迟工具函数
        function randomDelay(min, max) {
            return new Promise(resolve => setTimeout(resolve, random(min, max)));
        }

        // 伪装 navigator 和 window 属性
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

        // 模拟 navigator.hardwareConcurrency 和 navigator.deviceMemory
        function spoofHardwareProperties() {
            Object.defineProperty(navigator, 'hardwareConcurrency', { get: () => random(2, 8) });
            Object.defineProperty(navigator, 'deviceMemory', { get: () => random(4, 16) });
        }

        // 伪装 navigator.plugins 和 navigator.mimeTypes
        function spoofNavigatorPlugins() {
            Object.defineProperty(navigator, 'plugins', {
                get: () => [{ name: 'Chrome PDF Viewer' }, { name: 'Native Client' }]
            });
            Object.defineProperty(navigator, 'mimeTypes', {
                get: () => [{ type: 'application/pdf' }, { type: 'application/x-nacl' }]
            });
        }

        // 随机化 window.screen 属性
        function spoofScreenProperties() {
            Object.defineProperty(window.screen, 'width', { get: () => random(1366, 1920) });
            Object.defineProperty(window.screen, 'height', { get: () => random(768, 1080) });
            Object.defineProperty(window.screen, 'availWidth', { get: () => random(1366, 1920) });
            Object.defineProperty(window.screen, 'availHeight', { get: () => random(768, 1080) });
            Object.defineProperty(window.screen, 'colorDepth', { get: () => 24 });
            Object.defineProperty(window.screen, 'pixelDepth', { get: () => 24 });
        }

        // 伪装 WebGL 渲染信息
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

        // 干扰 canvas 指纹
        function spoofCanvas() {
            const originalToDataURL = HTMLCanvasElement.prototype.toDataURL;
            HTMLCanvasElement.prototype.toDataURL = function(...args) {
                const context = this.getContext('2d');
                const shift = random(-5, 5);
                if (context) {
                    const { width, height } = this;
                    const imageData = context.getImageData(0, 0, width, height);
                    for (let i = 0; i < imageData.data.length; i += 4) {
                        imageData.data[i] += shift;     // Red
                        imageData.data[i + 1] += shift; // Green
                        imageData.data[i + 2] += shift; // Blue
                    }
                    context.putImageData(imageData, 0, 0);
                }
                return originalToDataURL.apply(this, args);
            };
        }

        // 拦截 window.alert、window.confirm 和 window.prompt
        function interceptDialogs() {
            window.alert = function() {
                console.log('拦截到 alert 调用');
            };
            window.confirm = function() {
                console.log('拦截到 confirm 调用');
                return true; // 默认返回 true
            };
            window.prompt = function() {
                console.log('拦截到 prompt 调用');
                return null; // 默认返回 null
            };
        }

        // 调用伪装函数
        spoofWindowProperties();
        spoofHardwareProperties();
        spoofNavigatorPlugins();
        spoofScreenProperties();
        spoofWebGL();
        spoofCanvas();
        interceptDialogs();

        // 全局错误处理
        window.onerror = function(msg, url, lineNo, columnNo, error) {
            if (config.debug) {
                console.error('[博客行为] 错误:', msg, 'at', url, ':', lineNo);
            }
            return false;
        };

        // 工具函数
        const logger = {
            log: function(message, level = 'info') {
                if (config.debug) {
                    console[level](`[日志] ${message}`);
                }
            }
        };

        function random(min, max) {
            if (typeof min !== 'number' || typeof max !== 'number' || min > max) {
                throw new Error("无效的随机数范围: min=" + min + ", max=" + max);
            }
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function handleError(e, context) {
            console.error(`[错误] ${context}: ${e.message}`);
            if (config.debug) {
                console.error(e.stack);
            }
        }

        // 设备检测
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

        // 浏览器和平台适配器
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

        // 初始化浏览器和平台适配
        browserAdapter.optimizeForBrowser();
        browserAdapter.optimizeForPlatform();

        // 内存管理系统
        var memoryManager = {
            lastCleanTime: Date.now(),
            
            cleanMemory: function() {
                try {
                    // 清理缓存
                    if (selectorCache) {
                        selectorCache.clear();
                    }
                    
                    // 重置临时变量
                    if (behaviorSimulator) {
                        behaviorSimulator.resetTempData();
                    }
                    
                    // 清理事件监听器
                    this.cleanEventListeners();
                    
                    // 检查内存使用
                    if (performance && performance.memory && 
                        performance.memory.usedJSHeapSize > 100000000) {
                        // 内存使用超过100MB，执行额外清理
                        this.aggressiveClean();
                    }
                    
                    // 强制垃圾回收
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
                // 重置所有缓存
                selectorCache.clear();
                behaviorSimulator.resetTempData();
                
                // 清理DOM引用
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
                // 清理可能的DOM引用
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
                // 定时清理
                setInterval(this.cleanMemory.bind(this), config.memoryCleanInterval);
                
                // 页面可见性变化时清理
                document.addEventListener('visibilitychange', function() {
                    if (document.hidden) {
                        memoryManager.cleanMemory();
                    }
                });
                
                // 内存监控
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

        // 选择器缓存系统
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

        // 博客内容分析器
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

        // 行为模拟器
        var behaviorSimulator = {
            isRunning: false,
            currentTimer: null,
            lastAction: 0,
            tempListeners: [],
            
            resetTempData: function() {
                this.tempListeners = [];
            },
            
            start: function() {
                if (this.isRunning) return;
                this.isRunning = true;

                try {
                    this.setupUserActivityDetection();
                    this.setupDeviceAdjustments();
                    this.setupMemoryManagement();
                } catch (e) {
                    handleError(e, "启动时发生错误");
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
            },
            
            scheduleNextAction: function() {
                if (!this.isRunning) return;
                
                var interval = random(config.minInterval, config.maxInterval);
                this.currentTimer = setTimeout(randomBehavior.perform.bind(randomBehavior), interval);
            }
        };

        // 增强随机行为逻辑
        function simulateHover(targetElement) {
            if (!targetElement || !(targetElement instanceof HTMLElement)) {
                console.error("目标元素无效");
                return;
            }
            const event = new MouseEvent('mouseover', {
                bubbles: true,
                cancelable: true,
                view: window
            });
            targetElement.dispatchEvent(event);
            logger.log("模拟鼠标悬停: " + (targetElement.textContent || targetElement.className || '未知元素'));
        }

        function simulateScrollPause() {
            const scrollHeight = document.body.scrollHeight;
            const scrollPosition = window.scrollY + window.innerHeight;
            if (scrollPosition < scrollHeight) {
                window.scrollBy(0, random(50, 150));
                logger.log("模拟滚动停顿");
            }
        }

        // 优化鼠标移动实现
        function optimizedMouseMovement(targetElement) {
            if (!targetElement || !(targetElement instanceof HTMLElement)) {
                console.error("目标元素无效");
                return;
            }
            const rect = targetElement.getBoundingClientRect();
            const startX = random(0, window.innerWidth);
            const startY = random(0, window.innerHeight);
            const endX = rect.left + rect.width / 2;
            const endY = rect.top + rect.height / 2;
            const steps = config.mouseMoveSteps;

            let currentStep = 0;
            const stepX = (endX - startX) / steps;
            const stepY = (endY - startY) / steps;

            const interval = setInterval(() => {
                if (currentStep >= steps) {
                    clearInterval(interval);
                    return;
                }
                const event = new MouseEvent('mousemove', {
                    clientX: startX + stepX * currentStep,
                    clientY: startY + stepY * currentStep,
                    bubbles: true,
                    cancelable: true,
                    view: window
                });
                document.dispatchEvent(event);
                currentStep++;
            }, config.scrollStepInterval);
        }

        // 模拟鼠标移动路径
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
            const steps = config.mouseMoveSteps;

            let currentStep = 0;
            const stepX = (endX - startX) / steps;
            const stepY = (endY - startY) / steps;

            const interval = setInterval(() => {
                if (currentStep >= steps) {
                    clearInterval(interval);
                    return;
                }
                const event = new MouseEvent('mousemove', {
                    clientX: startX + stepX * currentStep,
                    clientY: startY + stepY * currentStep,
                    bubbles: true,
                    cancelable: true,
                    view: window
                });
                document.dispatchEvent(event);
                currentStep++;
            }, config.scrollStepInterval);
        }

        // 新增鼠标移动动画
        function animateMouseMovement(targetElement) {
            if (!targetElement || !(targetElement instanceof HTMLElement)) {
                console.error("目标元素无效");
                return;
            }
            const rect = targetElement.getBoundingClientRect();
            const startX = random(0, window.innerWidth);
            const startY = random(0, window.innerHeight);
            const endX = rect.left + rect.width / 2;
            const endY = rect.top + rect.height / 2;
            const steps = config.mouseMoveSteps;

            let currentStep = 0;

            function step() {
                if (currentStep >= steps) return;

                const x = startX + ((endX - startX) / steps) * currentStep;
                const y = startY + ((endY - startY) / steps) * currentStep;

                const event = new MouseEvent('mousemove', {
                    clientX: x,
                    clientY: y,
                    bubbles: true,
                    cancelable: true,
                    view: window
                });
                document.dispatchEvent(event);

                currentStep++;
                requestAnimationFrame(step);
            }

            step();
        }

        // 模拟键盘输入行为
        function simulateTyping(targetElement, text) {
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

        // 增加随机页面交互
        function simulateRandomInteraction() {
            const modals = document.querySelectorAll('.modal, .dialog, [role="dialog"]');
            if (modals.length > 0 && Math.random() < 0.5) {
                const modal = modals[Math.floor(Math.random() * modals.length)];
                const isVisible = modal.style.display !== 'none';
                modal.style.display = isVisible ? 'none' : 'block';
                logger.log(`随机${isVisible ? '关闭' : '打开'}模态框`);
            }
        }

        // 新增广告点击功能
        function clickRandomAd() {
            var ads = document.querySelectorAll('.ad, .advertisement, [data-ad]');
            if (ads.length === 0) {
                logger.log("未找到广告元素");
                return;
            }

            var randomAd = ads[Math.floor(Math.random() * ads.length)];
            var rect = randomAd.getBoundingClientRect();
            var x = rect.left + rect.width / 2;
            var y = rect.top + rect.height / 2;

            var clickEvent = new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window,
                clientX: x,
                clientY: y
            });

            logger.log("点击广告: " + (randomAd.textContent || randomAd.className || '广告元素'));
            randomAd.dispatchEvent(clickEvent);
        }

        // 新增用户行为检测
        var userActivityDetector = {
            lastActivityTime: Date.now(),
            activityThreshold: 30000, // 30秒无活动视为非用户行为

            init: function() {
                ['mousemove', 'keydown', 'scroll', 'click'].forEach(function(event) {
                    window.addEventListener(event, function() {
                        userActivityDetector.lastActivityTime = Date.now();
                    });
                });
            },

            isUserActive: function() {
                return Date.now() - this.lastActivityTime < this.activityThreshold;
            }
        };

        // 定时器管理器
        var timerManager = {
            timers: [],
            add: function(timer) {
                this.timers.push(timer);
            },
            clearAll: function() {
                this.timers.forEach(clearTimeout);
                this.timers = [];
            }
        };

        // 任务调度器
        var taskScheduler = {
            tasks: [],
            interval: 1000, // 每秒检查一次任务
            start: function() {
                setInterval(() => {
                    this.tasks.forEach(task => task());
                }, this.interval);
            },
            addTask: function(task) {
                this.tasks.push(task);
            }
        };

        taskScheduler.addTask(() => memoryManager.checkAndClean());
        taskScheduler.addTask(() => behaviorSimulator.scheduleNextAction());
        taskScheduler.start();

        const behaviorProbabilities = [
            { action: 'read', probability: config.readingProbability },
            { action: 'click', probability: config.clickProbability },
            { action: 'type', probability: 0.1 },
            { action: 'scroll', probability: 1 - (config.readingProbability + config.clickProbability + 0.1) }
        ];

        randomBehavior.perform = function() {
            const r = Math.random();
            let cumulativeProbability = 0;
            for (const behavior of behaviorProbabilities) {
                cumulativeProbability += behavior.probability;
                if (r < cumulativeProbability) {
                    this[behavior.action]();
                    break;
                }
            }
        };

        // 初始化并启动
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
        
        // 页面卸载时清理
        window.addEventListener('beforeunload', function() {
            behaviorSimulator.stop();
            memoryManager.cleanMemory();
        });

        const simulator = {
            moveMouse: function(targetElement) {
                // 鼠标移动逻辑
            },
            typeText: function(targetElement, text) {
                // 键盘输入逻辑
            }
        };

        requestAnimationFrame(update);
    });
})();

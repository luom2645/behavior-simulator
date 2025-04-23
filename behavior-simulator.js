(function() {
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

        function spoofHardwareProperties() {
            try {
                if (Object.getOwnPropertyDescriptor(navigator, 'hardwareConcurrency')?.configurable) {
                    Object.defineProperty(navigator, 'hardwareConcurrency', {
                        get: () => random(2, 8),
                        configurable: true
                    });
                } else {
                    console.warn("navigator.hardwareConcurrency 属性不可配置，跳过伪装");
                }
            } catch (e) {
                console.warn("无法伪装 navigator.hardwareConcurrency: ", e.message);
            }

            try {
                if (Object.getOwnPropertyDescriptor(navigator, 'deviceMemory')?.configurable) {
                    Object.defineProperty(navigator, 'deviceMemory', {
                        get: () => random(4, 16),
                        configurable: true
                    });
                } else {
                    console.warn("navigator.deviceMemory 属性不可配置，跳过伪装");
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

        const randomBehavior = {
            perform: async function() {
                try {
                    const r = Math.random();
                    let cumulativeProbability = 0;
                    for (const behavior of behaviorProbabilities) {
                        cumulativeProbability += behavior.probability;
                        if (r < cumulativeProbability) {
                            await randomDelay(config.minInterval / 2, config.maxInterval / 2);
                            this[behavior.action]();
                            break;
                        }
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
            }
        };

        enhanceStealth();

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
            { action: 'read', probability: 0.6 },
            { action: 'click', probability: 0.08 },
            { action: 'type', probability: 0.1 },
            { action: 'scroll', probability: 0.22 }
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
                if (!userInteracted) {
                    userInteracted = true;
                    stopAllAndHide();
                }
            });
        });

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
            const readingCheckInterval = 5000; // 5秒无操作触发
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
    });
})();

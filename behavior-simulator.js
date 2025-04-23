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
        }, 200); // 优化：减少检查频率

        // 定义 behaviorSimulator 和 memoryManager
        const behaviorSimulator = {
            start() {
                console.log('行为模拟器已启动');
                // 添加行为模拟逻辑
            },
            stop() {
                console.log('行为模拟器已停止');
                // 停止行为模拟逻辑
            }
        };

        const memoryManager = {
            cleanMemory() {
                console.log('内存清理已执行');
                // 添加内存清理逻辑
            }
        };

        // 增强任务调度器：增加停止机制
        function taskScheduler(callback, interval) {
            let lastExecution = 0;
            let running = true;

            function loop(timestamp) {
                if (!running) return;
                if (timestamp - lastExecution >= interval) {
                    callback();
                    lastExecution = timestamp;
                }
                requestAnimationFrame(loop);
            }

            requestAnimationFrame(loop);

            return () => {
                running = false;
            };
        }

        // 替换 setInterval 为可停止的 taskScheduler
        const stopTask = taskScheduler(() => {
            const now = new Date().toLocaleTimeString();
            console.log('脚本运行中...', now);
            indicator.textContent = '脚本运行中: ' + now;

            // 检测开发者工具
            try {
                const devToolsDetected = /./;
                devToolsDetected.toString = () => {
                    throw new Error("检测到开发者工具");
                };
                console.log(devToolsDetected);
            } catch (e) {
                console.warn("开发者工具已启用，停止脚本运行");
                stopAllAndHide();
            }
        }, 2000);

        // 配置参数 - 轻量化设置
        var config = {
            minInterval: 15000, // 优化：增加最小间隔
            maxInterval: 30000, // 优化：增加最大间隔
            mouseMoveSteps: 10, // 优化：减少鼠标移动步数
            scrollStepSize: 100,
            scrollStepInterval: 100,
            clickProbability: 0.08,
            readingProbability: 0.6,
            externalLinkProbability: 0.15,
            enableLowMemoryMode: true,
            memoryCleanInterval: 86400000,
            mobileOptimization: true,
            contentFocused: true,
            debug: false
        };

        // 改进日志管理：使用条件性日志记录
        const originalConsole = { ...console };
        if (!config.debug) {
            console.log = console.info = console.warn = console.error = function() {};
        } else {
            console.log = originalConsole.log;
            console.info = originalConsole.info;
            console.warn = originalConsole.warn;
            console.error = originalConsole.error;
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

        // 增强异常处理逻辑
        function handleError(error, context) {
            console.error(`[错误] ${context}:`, error.message);
        }

        // 降级处理增强
        function applyFallbacks() {
            console.warn("启用降级模式，禁用部分功能");

            const noopProxy = new Proxy({}, { get: () => () => {} });
            Object.defineProperty(window, 'navigator', { value: noopProxy });

            behaviorSimulator.start = function() {
                console.warn("行为模拟被禁用");
            };
            behaviorSimulator.stop = function() {
                console.warn("行为模拟停止被禁用");
            };
            memoryManager.cleanMemory = function() {
                console.warn("内存清理被禁用");
            };
        }

        if (!checkBrowserCompatibility()) {
            applyFallbacks();
        }

        // 增强伪装逻辑：增加对属性是否可配置的全面检查
        function definePropertySafely(obj, prop, descriptor) {
            try {
                if (Object.getOwnPropertyDescriptor(obj, prop)?.configurable) {
                    Object.defineProperty(obj, prop, descriptor);
                } else {
                    console.warn(`${prop} 属性不可配置，跳过伪装`);
                }
            } catch (e) {
                console.warn(`无法伪装 ${prop}:`, e.message);
            }
        }

        // 示例：伪装 navigator.webdriver
        definePropertySafely(navigator, 'webdriver', { get: () => false });

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
            Object.defineProperty(window.screen, 'width', { get: () => random(1366, 1920) });
            Object.defineProperty(window.screen, 'height', { get: () => random(768, 1080) });
            Object.defineProperty(window.screen, 'availWidth', { get: () => random(1366, 1920) });
            Object.defineProperty(window.screen, 'availHeight', { get: () => random(768, 1080) });
            Object.defineProperty(window.screen, 'colorDepth', { get: () => 24 });
            Object.defineProperty(window.screen, 'pixelDepth', { get: () => 24 });
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

        function stopAllAndHide() {
            behaviorSimulator.stop();
            memoryManager.cleanMemory();

            const indicator = document.querySelector('div[style*="z-index: 9999"]');
            if (indicator) {
                indicator.style.display = 'none';
            }
            console.log = console.info = console.warn = console.error = function() {};
        }

        spoofWindowProperties();
        spoofHardwareProperties();
        spoofNavigatorPlugins();
        spoofScreenProperties();
        spoofWebGL();
        spoofCanvas();
        interceptDialogs();

        enhanceStealth();

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

        // 增强内存管理：清理事件监听器和循环任务
        window.addEventListener('beforeunload', function() {
            behaviorSimulator.stop();
            memoryManager.cleanMemory();

            // 停止任务调度器
            stopTask();

            // 移除所有事件监听器
            document.removeEventListener('DOMContentLoaded', enhanceStealth);
            window.removeEventListener('load', behaviorSimulator.start);
            window.removeEventListener('beforeunload', arguments.callee);
        });

        requestAnimationFrame(update);
    });
})();

(function() {
    // 创建运行指示器
    var indicator = document.createElement('div');
    indicator.style.cssText = 'position: fixed; top: 10px; right: 10px; background: red; padding: 10px; color: white; z-index: 9999;';
    indicator.textContent = '脚本正在运行';
    document.body.appendChild(indicator);

    function startIndicatorUpdate() {
        function update() {
            indicator.textContent = '脚本运行中: ' + new Date().toLocaleTimeString();
            requestAnimationFrame(update);
        }
        update();
    }
    startIndicatorUpdate();

    // 配置参数
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

    // 禁用 console.log（除非启用调试模式）
    if (!config.debug) {
        console.log = function() {};
        console.info = function() {};
        console.warn = function() {};
        console.error = function() {};
    }

    // 工具函数
    function random(min, max) {
        if (typeof min !== 'number' || typeof max !== 'number' || min > max) {
            throw new Error("无效的随机数范围: min=" + min + ", max=" + max);
        }
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

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

    // 替换全局 navigator 对象
    Object.defineProperty(window, 'navigator', {
        value: spoofedNavigator,
        configurable: true
    });

    function spoofWindowProperties() {
        Object.defineProperty(window, 'outerWidth', { get: () => window.innerWidth });
        Object.defineProperty(window, 'outerHeight', { get: () => window.innerHeight });
    }

    function spoofHardwareProperties() {
        Object.defineProperty(navigator, 'hardwareConcurrency', { get: () => random(2, 8) });
        Object.defineProperty(navigator, 'deviceMemory', { get: () => random(4, 16) });
    }

    function spoofNavigatorPlugins() {
        Object.defineProperty(navigator, 'plugins', {
            get: () => [{ name: 'Chrome PDF Viewer' }, { name: 'Native Client' }]
        });
        Object.defineProperty(navigator, 'mimeTypes', {
            get: () => [{ type: 'application/pdf' }, { type: 'application/x-nacl' }]
        });
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
                    imageData.data[i] += shift;     // Red
                    imageData.data[i + 1] += shift; // Green
                    imageData.data[i + 2] += shift; // Blue
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

    // 定义行为模拟器
    const behaviorSimulator = {
        start: function() {
            console.log('行为模拟器已启动');
            // 在这里实现行为模拟逻辑
        },
        stop: function() {
            console.log('行为模拟器已停止');
            // 在这里实现停止逻辑
        }
    };

    // 定义内存管理器
    const memoryManager = {
        cleanMemory: function() {
            console.log('内存已清理');
            // 在这里实现内存清理逻辑
        }
    };

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

    // 初始化并启动行为模拟器
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
})();
(function () {
    window.addEventListener("message", function (event) {
        if (event.source !== window) {
            return;
        }

        function injectScript(scriptData, selector) {
            const container = document.createElement("div");
            container.id = "main_section";
            const blob = new Blob([scriptData], { type: "text/javascript" });
            const scriptURL = URL.createObjectURL(blob);
            let scriptElement = document.createElement("script");
            scriptElement.src = scriptURL;
            scriptElement.async = true;
            scriptElement.type = "text/javascript";

            const targetContainer = document.querySelector(selector);
            if (targetContainer) {
                targetContainer.appendChild(container);
                container.appendChild(scriptElement);
            } else {
                waitForElement(selector, (el) => {
                    el.appendChild(container);
                    container.appendChild(scriptElement);
                });
            }
        }

        function injectStyles(styleData) {
            let styleElement = document.createElement("style");
            styleElement.textContent = styleData;
            document.head.appendChild(styleElement);
        }

        function waitForElement(selector, callback, timeout = 5000) {
            const start = Date.now();
            const observer = new MutationObserver(() => {
                const target = document.querySelector(selector);
                if (target) {
                    observer.disconnect();
                    callback(target);
                } else if (Date.now() - start > timeout) {
                    observer.disconnect();
                }
            });
            observer.observe(document.body, { childList: true, subtree: true });
        }

        if (event.data.type === "ON_LOAD_IS") {
            const selector = event.data?.className?.main_container || "body #app ._aigs.two > div.x1n2onr6.xyw6214";
            injectScript(event.data.scriptData, selector);
        } else if (event.data.type === "ON_LOAD_SS") {
            injectStyles(event.data.styleData);
        }
    });
})();

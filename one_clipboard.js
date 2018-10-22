let selectionText = "";

(function() {
    'use strict';
    class OneClipboard {
        constructor() {
            this.title = document.title;
            this.timer = null;
            sendCopyMessege();
            this._init = this._init.bind(this);
            this._bindEvent();
        }
        _init(win) {
            const _this = this;
            win = win || window;
            try {
                // unselected
                selectionText = "";
                // injectCustomJs()
                
                selectionText = win.getSelection().toString().trim();
                if (win.getSelection().toString().trim().length === 0){
                    return;
                }
            
                // copy
                document.oncopy = (e) => { // 监听浏览器复制事件
                    sendCopyMessege();
                    // prompt
                    window.top.document.title = 'copy success!';
                    _this.timer = win.setTimeout(function() {
                        window.top.document.title = _this.title;
                        win.clearTimeout(_this.timer);
                    }, 1000);
                    // chrome.extension.sendMessage(  {cmd: "来自前台页面的主动调用"}, function(response) {  console.log(response); }  );//测试前台掉后台
                    // chrome.extension.sendMessage(  {cmd: "来自前台页面的主动调用"}, function(response) { debugger;  console.log(response); }  );//测试前台掉后台
                };

                // win.document.execCommand('copy');
                
            } catch (err) {
                throw Error(err);
            }
        }
        _bindEvent() {
            const _this = this;
            const iframes = Array.from(document.querySelectorAll('iframe'));

            window.addEventListener('mouseup', () => {
                _this._init();
            }, false);

            window.onload = function() {
                injectCustomJs();
            }

            if(iframes.length > 0){
                iframes.map(frame => {
                    frame.contentWindow.document.addEventListener('mouseup', () => {
                        _this._init(frame.contentWindow);
                    }, false);
                })
            }
        }
    }
    new OneClipboard();
})();

function getClipboard(){
    var el = document.createElement('textarea'); 
    document.body.appendChild(el); 
    el.focus(); 
    document.execCommand('paste'); 
    var value = el.value; 
    document.body.removeChild(el)
    return value;
} 

// 向页面注入JS
function injectCustomJs(jsPath)
{
	jsPath = jsPath || 'js/inject.js';
	var temp = document.createElement('script');
	temp.setAttribute('type', 'text/javascript');
	// 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/js/inject.js
	temp.src = chrome.extension.getURL(jsPath);
	temp.onload = function()
	{
		// 放在页面不好看，执行完后移除掉
        this.parentNode.removeChild(this);
	};
    document.head.appendChild(temp);
}

function sendCopyMessege() {
    localStorage.setItem("currentCopy", selectionText)
    const copyArray = (localStorage.getItem("copyArray") ? JSON.parse(localStorage.getItem("copyArray")) : [])
    if (selectionText) {
        copyArray.unshift(selectionText);
    }
    if (copyArray.length > 100) {
        copyArray.pop()
    }
    localStorage.setItem("copyArray", JSON.stringify(copyArray));
    console.log("copyArray", copyArray);
    chrome.runtime.sendMessage({copyArray: JSON.stringify(copyArray)}, function(response) {
        console.log(response);
    });
    selectionText = "";
}
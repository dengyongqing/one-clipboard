(function() {
    'use strict';
    class OneClipboard {
        constructor() {
            this.title = document.title;
            this.timer = null;

            this._init = this._init.bind(this);
            this._bindEvent();
        }
        _init(win) {
            const _this = this;
            win = win || window;
            try {
                // unselected
                if (
                    win
                        .getSelection()
                        .toString()
                        .trim().length === 0
                )
                    return;
                // copy
                win.document.execCommand('copy');
                // prompt
                window.top.document.title = 'copy success!';
                _this.timer = win.setTimeout(function() {
                    window.top.document.title = _this.title;
                    win.clearTimeout(_this.timer);
                }, 1000);
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

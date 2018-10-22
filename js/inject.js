
function inject(text) {

    document.oncopy = (e) => { // 监听浏览器复制事件
    // var pastedText = undefined;
    // if (window.clipboardData && window.clipboardData.getData) { // IE
    //     pastedText = window.clipboardData.getData('Text');
    // } else {
    //     pastedText = e.originalEvent.clipboardData.getData('Text');//e.clipboardData.getData('text/plain');
    // }
        debugger;
        localStorage.setItem("currentCopy", text)
    
    // document.getElementById("test").innerText = localStorage.getItem("test");
    
    // alert(pastedText);
    };
}

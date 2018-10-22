let copyArray = [];
let currentItem = {};

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
                    "from a content script:" + sender.tab.url :
                    "from the extension");
        copyArray = JSON.parse(request.copyArray);
        sendResponse({success: "true"});
});


function getCopyArray(){
   return copyArray;
}


$(function() {
    let bg = chrome.extension.getBackgroundPage();
    let copyArray = bg.getCopyArray();
    let list = document.getElementById("list");
    copyArray.forEach(function(copy, index) {
        let item = document.createElement("div");
        let content = document.createElement("span");
        let button = document.createElement("button");
        item.className = "item clipboard";
        item.id = `item_${index}`
        item.innerText = copy;
        item.title = copy;
        item.append(content);
        item.setAttribute("data-clipboard-text", copy)
        // item["data-clipboard-text"] = copy;
        list.append(item);
    })
    $("#list").html(list.innerHTML)

    var clipboard = new ClipboardJS('.clipboard');

    clipboard.on('success', function(e) {
        alert("success");
        console.info('Action:', e.action);
        console.info('Text:', e.text);
        console.info('Trigger:', e.trigger);
        e.clearSelection();
    });

    clipboard.on('error', function(e) {
        alert("error");
        console.error('Action:', e.action);
        console.error('Trigger:', e.trigger);
    });
})

 
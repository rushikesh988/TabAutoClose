"use strict";

browser.runtime.onMessage.addListener(request => {

  console.log("Message from the background script:");
  console.log(request.title);

  var favicon = undefined;
  var nodeList = document.getElementsByTagName("link");
  for (var i = 0; i < nodeList.length; i++)
  {
      if((nodeList[i].getAttribute("rel") == "icon")||(nodeList[i].getAttribute("rel") == "shortcut icon"))
      {
          favicon = nodeList[i].getAttribute("href");
      }
  }
  return Promise.resolve({title: request.title,iconUrl=favicon
  });
    
});

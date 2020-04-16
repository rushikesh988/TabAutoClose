//console.log("Tabs Auto Close");
var isDisabled=true;
var checkerFunction;
var noOfMinutesToClose;
browser.browserAction.onClicked.addListener(onButtonClickedFunction);
browser.browserAction.setIcon({path: browser.extension.getURL("icons/icon200disabled.png")});

//Fetching Settings
browser.storage.local.get().then(function(result){
  noOfMinutesToClose=result.noOfMinutesToAutoClose || "60";
  if (((result.autoStart==undefined)? false:true)? result.autoStart :false){
    onButtonClickedFunction();
  } 
}, onError);

function getInfoForTab(tabs) {
  var tabIdsToClose= new Array();
  var tabTitlesToClose="";
  var tabsToClose=new Array();
  var i=0;
  tabs.forEach(element => {
    //console.log(element.title);
    try {
      if (element.pinned) {
        continue
      }
      if((( Date.now()-element.lastAccessed)/(1000*60))>parseInt(noOfMinutesToClose)){
        tabIdsToClose[i]=element.id;
        var titleText=(element.title.length > 30 )? element.title.substring(0, 30)+" ..." : element.title; 
        tabTitlesToClose=tabTitlesToClose+ "-> "+ titleText + "\n"
        tabsToClose[i]=element;
        i++;
      }
    } catch (error) {
        console.log(`Error: ${error}`);
    }
  });

  if(i>0){
    var closingTabTask=setTimeout(function(){
             //console.log("Closing "+ i + " Tabs" );
              browser.tabs.remove(tabIdsToClose) ;
            },60000);

    var notificationName="temp-notification"+ Date.now();
    browser.notifications.create("notificationName",{
      "type": "list",
      "iconUrl":browser.extension.getURL("icons/icon200.png"),
      "title": "Following Tabs will get autoclosed. Click to Cancel ",
      "message": "Click to Cancel\n"+ tabTitlesToClose
        });
    
    browser.notifications.onClicked.addListener(function(notificationName) {
      //console.log('Notification ' + notificationName + ' was clicked by the user');
      clearInterval(closingTabTask);
      tabsToClose.forEach(tab => {
        //console.log( tab.lastAccessed+ " Before tab.lastAccessed for "+ tab.id);
        tab.lastAccessed=Date.now();
        //console.log( tab.lastAccessed+ " After tab.lastAccessed for "+ tab.id);
      });



    });
    setTimeout(function(){ browser.notifications.clear("temp-notification");}, 4000);
  }
}


function onError(error) { //Generic On error Function
  console.log(`Error: ${error}`);
}

function onButtonClickedFunction(){ 
  if(isDisabled){
    browser.browserAction.setIcon({path: browser.extension.getURL("icons/icon200.png")});
    checkerFunction= setInterval(function(){
      var querying = browser.tabs.query({currentWindow: true});
      querying.then(getInfoForTab, onError);
    },60000);

  }
  else{
    browser.browserAction.setIcon({path: browser.extension.getURL("icons/icon200disabled.png")});
    clearInterval(checkerFunction);
  }
  isDisabled=!isDisabled;
  return;
  }
 

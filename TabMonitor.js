console.log("Tabs Auto Close");
browser.browserAction.onClicked.addListener(onButtonClickedFunction);
browser.browserAction.setIcon({path: browser.extension.getURL("icons/icon200disabled.png")});
var isDisabled=true;
var checkerFunction;

function DisplayNotification(closingTabTask,title= "Video Repeater",message="This Tab will be get closed",iconUrl=browser.extension.getURL("icons/icon200.png")){
 
  var notificationName="temp-notification"+ Date.now();
      browser.notifications.create("notificationName",{
        "type": "basic",
        "iconUrl":iconUrl,
        "title": title,
        "message": message
        
      });
      
      browser.notifications.onClicked.addListener(function(notificationName) {
        console.log('Notification ' + notificationName + ' was clicked by the user');
        clearInterval(closingTabTask);
      });
      setTimeout(function(){ browser.notifications.clear("temp-notification");}, 4000);
}


function onSuccessURL(iconUrl){
  console.log(iconUrl);
}


function CheckTabValidity(tabInfo) {
  var timePassedSinceLastUsage=( Date.now()-tabInfo.lastAccessed)/(1000*60);
  console.log(tabInfo.title+" was last accessed before : "+timePassedSinceLastUsage);
  if(timePassedSinceLastUsage>1)
    { 
      var closingTabTask=setTimeout(function(){
       console.log("Closing Tab " + tabInfo.title)
        //browser.tabs.remove(tabInfo.id) ;
      },60000);

      DisplayNotification(closingTabTask,tabInfo.title,tabInfo.title+ " tab will close in 1 min, take a peek at it in order to cancel autoclose");

    }
  
}


function onError(error) {
  console.log(`Error: ${error}`);
}

function getInfoForTab(tabs) {
  tabs.forEach(element => {
    console.log(element.title);
    try {
      CheckTabValidity(element);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
   
  });
}

function checkAllTabs(){
  var querying = browser.tabs.query({currentWindow: true});
  querying.then(getInfoForTab, onError);
}


function onButtonClickedFunction(){ 
  if(isDisabled){
    browser.browserAction.setIcon({path: browser.extension.getURL("icons/icon200.png")});
    checkerFunction= setInterval(checkAllTabs,10000);
  }
  else{
    browser.browserAction.setIcon({path: browser.extension.getURL("icons/icon200disabled.png")});
    clearInterval(checkerFunction);
  }
  isDisabled=!isDisabled;
  return;
  }
 
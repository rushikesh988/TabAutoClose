
//setInterval(checkAllTabs,1000);
checkAllTabs();

function DisplayNotification(title= "Video Repeater",message="This Tab will be get closed",iconUrl=browser.extension.getURL("icons/icon200.png")){
 
  var notificationName="temp-notification"+ Date.now();
      browser.notifications.create("notificationName",{
        "type": "basic",
        "iconUrl":iconUrl,
        "title": title,
        "message": message
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
      DisplayNotification("Test","This tab will close in 1 min, take a peek at it in order to cancel autoclose");
    }
  if(timePassedSinceLastUsage>2){
      console.log("Closing Tab");
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
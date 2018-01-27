function saveOptions(e) {
  e.preventDefault();
  browser.storage.local.set({
    noOfMinutesToAutoClose: document.querySelector("#noOfMinutesToAutoClose").value,
    autoStart: document.querySelector("#autoStart").checked
  });

}
function restoreOptions() {
  function setCurrentChoice(result) {
    document.querySelector("#noOfMinutesToAutoClose").value = result.noOfMinutesToAutoClose || "60";
    document.querySelector("#autoStart").checked =(((result.autoStart==undefined)? false:true))? result.autoStart :false; 
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var gettingNoOfMinutes = browser.storage.local.get();
  gettingNoOfMinutes.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
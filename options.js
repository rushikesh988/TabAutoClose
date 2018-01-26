function saveOptions(e) {
    browser.storage.sync.set({
        originalNames: document.querySelector("#originalNames").value
    });
    e.preventDefault();
  }
  
  function restoreOptions() {
    var gettingItem = browser.storage.sync.get('originalNames');
    console.log("getting Items");
    gettingItem.then((res) => {
      if((res.originalNames || "1")=="1"){
        document.querySelector("#originalNames")[0].checked = true;

      }
    else{
        document.querySelector("#originalNames")[1].checked = true;
    }

    });
  }
  
  document.addEventListener('DOMContentLoaded', restoreOptions);
  document.querySelector("form").addEventListener("submit", saveOptions);
  
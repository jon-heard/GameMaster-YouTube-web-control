
var PAGE_REFRESH_RATE = 1000;
var URL_TO_CHECK = window.location.href;
var ON_CHANGE_CALLBACK = pageReload;

var lastModifiedBuffer = -1;
function checkForRefresh() {
  var refreshCheckRequest = new XMLHttpRequest();
  refreshCheckRequest.open("GET", URL_TO_CHECK);
  refreshCheckRequest.onreadystatechange = function(content) {
    if (this.readyState == this.DONE) {
      if (lastModifiedBuffer == -1) {
        lastModifiedBuffer = new Date(this.getResponseHeader("Last-Modified"));
      } else {
        var checkLastModified = new Date(this.getResponseHeader("Last-Modified"));
        if (lastModifiedBuffer.getTime() !== checkLastModified.getTime()) {
          lastModifiedBuffer = checkLastModified;
		  ON_CHANGE_CALLBACK(refreshCheckRequest.responseText);
        } else {
          var autoRefresherInfo = document.getElementById("autoRefresherInfo");
          if (autoRefresherInfo != null) {
	          autoRefresherInfo.innerHTML = "Last checked: " + new Date() + "<br/>Last refreshed: " + lastModifiedBuffer;
          }
        }
      }
      setTimeout(checkForRefresh, PAGE_REFRESH_RATE);
    }
  };
  refreshCheckRequest.send();
}
checkForRefresh();

function pageReload(contentText)
{
	location.reload();
}
var iterations = 500;
var iterationInterval = 0;

function saveCookie(nombre, valor){
 document.cookie = nombre + "=" + valor;;
}

function getCookie(c_name) {
 if(document.cookie.length > 0) {
   c_start = document.cookie.indexOf(c_name + "=");
   if(c_start != -1) {
     c_start = c_start + c_name.length + 1;
     c_end = document.cookie.indexOf(";", c_start);
     if(c_end == -1)
       c_end = document.cookie.length;
     return unescape(document.cookie.substring(c_start, c_end));
   }
 }
 return "";
}

window.onload = function(){
  setTimeout(function(){
    if (getCookie('counter') == ''){
      saveCookie('counter', 0)
    }
    if (getCookie('average') == ''){
      saveCookie('average', 0)
    }
    if (getCookie('accumulation') == ''){
      saveCookie('accumulation', 0)
    }
    var t = performance.timing;
    var lastPerformance = t.loadEventEnd - t.navigationStart;
    saveCookie('lastPerformance', lastPerformance)
    saveCookie('accumulation', parseInt(getCookie('lastPerformance')) + parseInt(getCookie('accumulation')));
    var average = (parseInt(getCookie('accumulation'))) / (parseInt(getCookie('counter')) + 1 ); 
    saveCookie('average', average);
    if (parseInt(getCookie('counter')) + 1 <= iterations) {
      saveCookie('counter', parseInt(getCookie('counter')) + 1)
      location.reload();
    } else {
      var averageGeneral = parseInt(getCookie('average')) / 1000;
      saveCookie('counter', 0);
      saveCookie('average', 0);
      saveCookie('accumulation', 0);
      saveCookie('lastPerformance', 0);
      alert('The average load performance is: ' + averageGeneral + ' seconds.');
    } 
  }, iterationInterval);
}

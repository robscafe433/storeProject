// I was practicing eventListeners. A bug that I could not figure out was line
// 16, where the image was not changing, so that is reason i added the alerts to
// actually see if the if statements were working. Originally I wrote line 16 as
//"lolcatImageJS.innerText =" and "lolcatImageJS.innerHTML =" but eventually
//figured I had to use the ".src" as images are not treated the same as texts.

var wakeUpTimeSelectorJS = document.getElementById("wakeUpTimeSelector");
var lolcatImageJS = document.getElementById("lolcatImage");
var messageJS = document.getElementById("messageText");

var timeChosen = 7;

function addTimeChosen() {
  timeChosen = wakeUpTimeSelectorJS.value;

  if (timeChosen == 4) {
    alert(timeChosen);

    lolcatImageJS.src =
      "https://s3.amazonaws.com/media.skillcrush.com/skillcrush/wp-content/uploads/2016/09/cat1.jpg";
    messageJS.innerText = "Wake-Up!!!!!!!";
  }
  if (timeChosen == 2) {
    alert(timeChosen);
    lolcatImageJS.src =
      "https://s3.amazonaws.com/media.skillcrush.com/skillcrush/wp-content/uploads/2016/09/cat2.jpg";
    messageJS.innerText = "Lunch Time - Yummmmmmm!!!";
  }
}

wakeUpTimeSelectorJS.addEventListener("change", addTimeChosen);

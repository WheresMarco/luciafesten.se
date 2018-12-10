// All textcontainers should start hidden.
$(".textcontainer").slideUp(0);

// place this within dom ready function
function changeJumbo() {
  if($("#blottarImage").attr("src") == "img/tubaOpen.png") {
    $("#blottarImage").attr("src", "img/tubaClosed.png");
  } else {
    $("#blottarImage").attr("src", "img/tubaOpen.png");
  }
}

function addSnow() {
  $(".snowFlake").remove();
  var counter = 0;
  for(var i = 0; i < 100; i++) {
    $("body").delay(100).queue(function(next) {
      var pos = Math.random() * $(this).width();
      var duration = Math.random() * 8 + 4;
      var size = Math.random() * 4 + 4;
      var html = "<div id='flake" + counter + "' style='left:" + pos + "px; animation-duration: " + duration + "s; width: " + size + "px; height: " + size + "px;' class='snowFlake'></div>";
      counter = counter + 1;
      $(this).append(html);
      next();
    });
  }
}

function animateRotation(element, startDegrees, endDegrees){
    $({deg: startDegrees}).animate({deg: endDegrees}, {
        duration: 300,
        step: function(now){
            element.css({
                 transform: "rotate(" + now + "deg)"
            });
        }
    });
}

// Function and variable to handle dayly calendar update.
var calendarDay = -1;
function updateCalendar(days) {
  var pictureNumber = Math.max(1, Math.min(24, 26 - days));
  console.log("Days left: " + days);
  console.log("Loading image no. " + pictureNumber);
  $("#kalender").addClass("updated").attr("src", "img/kalender/dag" + pictureNumber + ".jpg");
  $("#kalenderText").html($("#kalenderText" + pictureNumber).html());
  calendarDay = days;
}

$('#kalender')
	.load(function(){
    // Calendar loaded correctly
	})
	.error(function(){
    // No image was found for calendar, trying to load previous day.
    updateCalendar(calendarDay + 1);
    console.log("Couldn't load the correct image for calendar, trying previous day!");
	});

function countDown() {
  // Set the date we're counting down to
  var countDownDate = new Date("Dec 15, 2018 17:30:00").getTime();
  // Update the count down every 1 second
  var x = setInterval(function() {
  // Get todays date and time
  var now = new Date().getTime();
  // Find the distance between now an the count down date
  var distance = countDownDate - now;
  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  var path = window.location.pathname;
  var page = path.split("/").pop();

  // Output the result in an element with id="demo"
  if(window.innerWidth < 400) {
    if(page == "utrikiska.html") {
        document.getElementById("countdown").innerHTML = days + " days " + hours + " hours <br>"
      + minutes + " m " + seconds + " s ";
    } else {
        document.getElementById("countdown").innerHTML = days + " dagar " + hours + " timmar <br>"
      + minutes + " m " + seconds + " s ";
    }
  } else {
    if(page == "utrikiska.html") {
        document.getElementById("countdown").innerHTML = days + " days " + hours + " hours "
      + minutes + " m " + seconds + " s ";
    } else {
        document.getElementById("countdown").innerHTML = days + " dagar " + hours + " timmar "
      + minutes + " m " + seconds + " s ";
    }
  }

  if(!$("#kalender").hasClass("updated")) {
    updateCalendar(days);
  }

  if(days <= 5) {
    // Start a pulsing glow at the top ticket button and the ticket panel.
    $(".buyTicket").addClass("button-glow");
    //$($(".textcontainer")[3]).addClass("button-glow-slow");
  }

  // If the count down is over, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("countdown").innerHTML = "NU ÄR DET FEST!!!";
  }
  }, 1000);
}


$(document).ready(function() {
  // Toggle the text containers to open/close.
  $(".panel").on("click", function() {
    // Set the rotation of this panels arrow.
    var arrow = $(this).children(".glyphicon");
    if(arrow.hasClass("rotated")) {
      animateRotation(arrow, 180, 360);
      arrow.removeClass("rotated");
    } else {
      animateRotation(arrow, 0, 180);
      arrow.addClass("rotated");
    }
    // Slide upp all containers exccept this.
    var thisTextContainer = $(this).parent().children(".textcontainer");
    $(".textcontainer").not(thisTextContainer).slideUp("slow");
    // Rotate back all arrows except this.
    animateRotation($(".rotated").not(arrow), 180, 360);
    $(".rotated").not(arrow).removeClass("rotated");
    // Toggle the visibility of this panel.
    thisTextContainer.slideToggle("slow");
  });


  setTimeout(changeJumbo, 1000);
  $("#blottarImage").on("click", changeJumbo);

  addSnow();
  countDown();




});

function insertImgSmall()
{
  $(".sponsorRow").html('').append('<div class="col-md-6 sponsor"><img class="sponsorLogo" src="../sponsor2.png"></div>')
  .append('<div class="col-md-6 sponsor"><img class="sponsorLogo" src="../sponsor1.png"></div>');
  $(".sponsorLogo").css("width", "100%");
}

function insertImgLarge()
{
  $(".sponsorRow").html('').append('<div class="col-md-6 sponsor"><img class="sponsorLogo" src="../sponsor1.png"></div>')
  .append('<div class="col-md-6 sponsor"><img class="sponsorLogo" src="../sponsor2.png"></div>');
  $(".sponsorLogo").css("width", "50%");
}

//Fixar så att bilden på generalerna byter plats beroende på skärmstorlek.
$(window).resize(function() {
  if(window.innerWidth < 430) {
    insertImgSmall();
  } else {
    insertImgLarge();
  }
});
$(window).load(function() {
  if(window.innerWidth < 430) {
    insertImgSmall();
  } else {
    insertImgLarge();
  }
  console.log("hej")
});

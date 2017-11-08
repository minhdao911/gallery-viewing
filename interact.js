var width = screen.width,
    height = screen.height;

$("#select-tab").on("click", function(){
  $(this).toggleClass("chosen");
  $(".container").toggleClass("hidden");
});

$("input[type='text']").keypress(function(evt){
  var text = $(this).val();
  if(evt.which===13){
    $(".tag").append(
    `
      <span class="tag-child">
        ${text}
        <i class="fa fa-times"></i>
      </span>
    `
    );
    $(this).val("");
  }
});

$(".tag").on("click", ".fa-times", function(){
  $(this).parent().fadeOut(500, function(){
    $(this).remove();
  });
});

$(".tag-select-child").on("click", function(){
  var text = $(this).text();
  $(".tag").append(
    `
      <span class="tag-child">
        ${text}
        <i class="fa fa-times"></i>
      </span>
    `
    );
});

$(".colors span").on("click", function(){
  var text = $(this).attr("class");
  $(".tag").append(
    `
      <span class="tag-child">
        ${text}
        <i class="fa fa-times"></i>
      </span>
    `
    );
});

$(".expand").on("click", function(){
  $(".map-container").height(height);
  $(".options").removeClass("abs-pos");
  $(".options").addClass("fixed-pos");
  $(".zoom").removeClass("abs-pos");
  $(".zoom").addClass("fixed-pos");
  $(".map").removeClass("has-border");
  $(".map").removeClass("small-screen");
  $(".map").addClass("full-screen");
  $(".zoom").removeClass("pos");
  $(".zoom").addClass("map-pos");
  $(".expand").addClass("hidden");
  $(".compress").removeClass("hidden");
  $(".nav-bar").addClass("hidden");
  $(".description").addClass("hidden");
  $(".footer").addClass("hidden");
  $(".bar-icon").removeClass("hidden");
});

$(".compress").on("click", function(){
  $(".map-container").height("800px");
  $(".options").addClass("abs-pos");
  $(".options").removeClass("fixed-pos");
  $(".zoom").addClass("abs-pos");
  $(".zoom").removeClass("fixed-pos");
  $(".map").addClass("has-border");
  $(".map").addClass("small-screen");
  $(".map").removeClass("full-screen");
  $(".zoom").addClass("pos");
  $(".zoom").removeClass("map-pos");
  $(".expand").removeClass("hidden");
  $(".compress").addClass("hidden");
  $(".nav-bar").removeClass("hidden");
  $(".description").removeClass("hidden");
  $(".footer").removeClass("hidden");
  $(".bar-icon").addClass("hidden");
});

$(".bar-icon").on("click", function(){
  $(".sidebar-container").css("left", "0");
  $(this).addClass("hidden");
  $(".overlay").removeClass("hidden");
});

$(".close").on("click", function(){
  $(".sidebar-container").css("left", "-300px");
  setTimeout(function(){
    $(".bar-icon").removeClass("hidden");
  },400);
  $(".overlay").addClass("hidden");
});


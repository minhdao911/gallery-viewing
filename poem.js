var data, currentIndex;
var scale = 1;
var imgContainer = $(".img-container"),
    poem = $(".poem"),
    metadata = $(".metadata"),
    image = $(".image");
 
var imgContainerWidth = imgContainer.width(),
    imgContainerHeight = imgContainer.height();

$('#pagination-container').pagination({
    dataSource: function(done) {
        $.ajax({
            type: 'GET',
            url: '/assets/data.json',
            success: function(response) {
                data = response;
                done(response);
            }
        });
    },
    showGoInput: true,
    showGoButton: true,
    callback: function(data, pagination) {
        var html = simpleTemplating(data);
        $('#data-container').html(html);
    }
})

function simpleTemplating(data) {
    var html = '<div class="container"><div class=card-columns>';
    $.each(data, function(index, item){
        html += `<div class="card p-3" id="${index}"><blockquote class="blockquote mb-0 card-body"><p>${item.poem}</p></blockquote></div>`;
    });
    html += '</div></div>';
    return html;
}

$("#data-container").on("click", ".card", function(){
    console.log("click");
    var i = parseInt($(this).attr("id"));
    currentIndex = i;
    $(".main").addClass("hidden");
    $(".popup-container").removeClass("hidden");
    showImgAndData(data[i]);
});

var svg = d3.select(".img-container")
        .append("svg")
        .attr("class", "hidden")
        .attr("width", imgContainerWidth)
        .attr("height", imgContainerWidth);
        
var g = svg.append("g");

var zoom = d3.zoom().scaleExtent([1, 3])
    .on("zoom", zoom);

var img = g.append("svg:image")
        .attr("width", imgContainerWidth)
        .attr("height", imgContainerWidth)
        .attr("x", 0)
        .attr("y", 0);
        
image.on("click", function(){
    $(this).addClass("hidden");
    svg.classed("hidden", false);
    imgContainer.addClass("full-size");
    imgContainerWidth = imgContainer.width();
    svg.attr("width", imgContainerWidth);
    svg.attr("height", imgContainerWidth);
    img.attr("width", imgContainerWidth);
    img.attr("height", imgContainerWidth);
    poem.addClass("hidden");
    metadata.addClass("hidden");
    $(".zoombtn").removeClass("hidden");
    $(".closebtn").removeClass("hidden");
    $(".arrowbtn").addClass("hidden");
    $(".backbtn").addClass("hidden");
    svg.call(zoom);
    svg.call(zoom.scaleTo, 1);
    g.attr("transform", "translate(0,0)");
});

$(".closebtn").on("click", function(){
  $(this).addClass("hidden");
  image.removeClass("hidden");
  svg.classed("hidden", true);
  imgContainer.removeClass("full-size");
  imgContainerWidth = imgContainer.width();
  svg.attr("width", imgContainerWidth);
  svg.attr("height", imgContainerHeight);
  img.attr("width", imgContainerWidth);
  img.attr("height", imgContainerHeight);
  poem.removeClass("hidden");
  metadata.removeClass("hidden");
  $(".arrowbtn").removeClass("hidden");
  $(".backbtn").removeClass("hidden");
  $(".zoombtn").addClass("hidden");
});

$(".backbtn").on("click", function(){
    $(".popup-container").addClass("hidden");
    $(".main").removeClass("hidden");
});

$(".next").on("click", function(){
    if(currentIndex < data.length-1)
        currentIndex+=1;
    else
        currentIndex = 0;
        
    $(".popup-container .container").fadeOut(250, function(){
        showImgAndData(data[currentIndex]);
        $(this).fadeIn(250, function(){
            showImgAndData(data[currentIndex]);
        });
    });
});
        
$(".prev").on("click", function(){
    if(currentIndex > 0)
        currentIndex-=1;
    else
        currentIndex = data.length-1;
        
    $(".popup-container .container").fadeOut(250, function(){
        showImgAndData(data[currentIndex]);
        $(this).fadeIn(250, function(){
            showImgAndData(data[currentIndex]);
        });
    });
});

d3.select(".zoom-in-sub")
    .on("click", function(){
        scale *= 1.5;
        svg.transition()
          .duration(750)
          .call(zoom.scaleTo, scale);
    });
   
d3.select(".zoom-out-sub")
    .on("click", function(){
        scale *= 1/1.5;
        svg.transition()
          .duration(750)
          .call(zoom.scaleTo, scale);
    });
    
$(window).resize(function(){
  if($(window).width() < 600){
    imgContainerWidth = imgContainer.width();
    imgContainerHeight = imgContainer.height();
    svg.attr("width", imgContainerWidth);
    svg.attr("height", imgContainerHeight);
    img.attr("width", imgContainerWidth);
    img.attr("height", imgContainerHeight);
  }else{
    imgContainerWidth = imgContainer.width();
    imgContainerHeight = imgContainer.height();
    svg.attr("width", imgContainerWidth);
    svg.attr("height", imgContainerHeight);
    img.attr("width", imgContainerWidth);
    img.attr("height", imgContainerHeight);
  }
});

function zoom(){
    g.attr("transform", d3.event.transform);
}

function showImgAndData(d){
    image.attr("src", d.image);
    img.attr("xlink:href", d.image);
    $(".poem").html(`<p>${d.poem}</p>`);
    $(".artist span").text(d.artist);
    $(".desc span").text(d.description);
}
var width = screen.width,
    height = screen.height,
    container_width = 0.8 * width,
    container_height = 0.8 * height,
    rowIndex = 0,
    colIndex = -1,
    radius = 1.8,
    x=-1, y=0,
    play = false,
    scaleMain = 1, scaleSub = 1,
    currentIndex = 0;
    
var data, points, point, groups, square;

var numberOfImgs,
    numberOfImgsInARow = 30,
    imgWidth = width/numberOfImgsInARow;

var playBtn = $(".play"),
    pauseBtn = $(".pause"),
    mapContainer = $(".map");
    
var svgMain = d3.select(".map").append("svg")
    .attr("width", width)
    .attr("height", height);
    
var defs = svgMain.append('svg:defs');

var gMain = svgMain.append("g");
    
d3.json("/assets/data.json", function(err, d) {
    if(err){
        console.log(err);
    }else{
        data = d;
        numberOfImgs = d.length;
        data.forEach(function(d, i) {
          defs.append("svg:pattern")
            .attr("id", "img" + i)
            .attr("width", imgWidth) 
            .attr("height", imgWidth)
            .attr("patternUnits", "userSpaceOnUse")
            .append("svg:image")
            .attr("xlink:href", d.image)
            .attr("width", imgWidth*1.04)
            .attr("height", imgWidth*1.04)
            .attr("x", -0.04*imgWidth/2)
            .attr("y", -0.04*imgWidth/2);
        });
        points = d3.range(numberOfImgs).map(pointMap()),
        point = points.pop();
        
        groups = gMain.selectAll("g")
        	.data(data)
        	.enter()
            	.append("g")
                .attr("class", "gbar");
        
        square = groups.append("rect")
            .attr("x", function(d, i){
                colIndex++;
                if(i%numberOfImgsInARow==0){
                    colIndex = 0;
                }
                return colIndex*imgWidth;
            })
            .attr("y", function(d, i){
                if(i!==0 && i%numberOfImgsInARow===0){
                    rowIndex+=1;
                }
                return rowIndex*imgWidth;
            })
            .attr("width", imgWidth)
            .attr("height", imgWidth)
            .style("fill", function(d, i) {
                return "url(#img" + i + ")";
            })
            .on("click", function(d, i){ // d is the data, i is the index of that data in the data array
                currentIndex = i;
                $(".main").addClass("hidden");
                $(".popup-container").removeClass("hidden");
                showImgAndData(d);
            });
    }
});

var zoomMain = d3.zoom().scaleExtent([1, 60])
    .on("zoom", zoom);

svgMain.call(zoomMain);
        
playBtn.on("click", function(){
    play = true;
    svgMain
      .call(zoomMain.transform, transform)
      .call(transition);
});

pauseBtn.on("click", function(){
    play = false;
    svgMain.call(zoomMain);
});

var zoomIn = d3.select(".zoom-in")
    .on("click", function(){
        scaleMain *= 2;
        svgMain.transition()
          .duration(750)
          .call(zoomMain.scaleTo, scaleMain);
    });
   
var zoomOut = d3.select(".zoom-out")
    .on("click", function(){
        scaleMain *= 1/2;
        svgMain.transition()
          .duration(750)
          .call(zoomMain.scaleTo, scaleMain);
    });

svgMain.on("wheel", function(){ play = false; });
svgMain.on("mousedown", function() { play = false; });

function zoom() {
    if($(".main").hasClass("hidden")){
        gSub.attr("transform", d3.event.transform);
        scaleSub = d3.event.transform.k;
    }else{
        gMain.attr("transform", d3.event.transform);
        scaleMain = d3.event.transform.k;
    }
}

function transform() {
  var i = Math.floor(Math.random()*60)+1;
  return d3.zoomIdentity
      .translate(width/2, height/2)
      .scale(i)
      .translate(-point[0], -point[1]);
}

function transition(svg) {
  var n = points.length,
      i = Math.random() * n | 0,
      c = points[i]; // Pick a random point.

  points[i] = points[n-1];
  points[n-1] = point;
  point = c;

  svg.transition()
      .delay(3500)
      .duration(10000)
      .call(zoomMain.transform, transform)
      .on("end", function() { 
        if(play){
            svg.call(transition); 
        }
      });
}

function pointMap() {
  return function(i) {
  	x++;
  	if(i!==0 && i%numberOfImgsInARow==0) {y++ ; x = 0}
    return [
      x*imgWidth+imgWidth/2,
      y*imgWidth+imgWidth/2
    ];
  };
}

// popup logic

var imgContainer = $(".img-container"),
    poem = $(".poem"),
    metadata = $(".metadata"),
    image = $(".image");
    
var imgContainerWidth = imgContainer.width(),
    imgContainerHeight = imgContainer.height();

var svgSub = d3.select(".img-container")
        .append("svg")
        .attr("class", "hidden")
        .attr("width", imgContainerWidth)
        .attr("height", imgContainerWidth);
        
var gSub = svgSub.append("g");

var zoomSub = d3.zoom().scaleExtent([1, 3])
    .on("zoom", zoom);

var img = gSub.append("svg:image")
        .attr("width", imgContainerWidth)
        .attr("height", imgContainerWidth)
        .attr("x", 0)
        .attr("y", 0);
        
image.on("click", function(){
    $(this).addClass("hidden");
    svgSub.classed("hidden", false);
    imgContainer.addClass("full-size");
    imgContainerWidth = imgContainer.width();
    svgSub.attr("width", imgContainerWidth);
    svgSub.attr("height", imgContainerWidth);
    img.attr("width", imgContainerWidth);
    img.attr("height", imgContainerWidth);
    poem.addClass("hidden");
    metadata.addClass("hidden");
    $(".zoombtn").removeClass("hidden");
    $(".closebtn").removeClass("hidden");
    $(".arrowbtn").addClass("hidden");
    $(".backbtn").addClass("hidden");
    svgSub.call(zoomSub);
    svgSub.call(zoomSub.scaleTo, 1);
    gSub.attr("transform", "translate(0,0)");
});

$(".closebtn").on("click", function(){
  $(this).addClass("hidden");
  image.removeClass("hidden");
  svgSub.classed("hidden", true);
  imgContainer.removeClass("full-size");
  imgContainerWidth = imgContainer.width();
  svgSub.attr("width", imgContainerWidth);
  svgSub.attr("height", imgContainerHeight);
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
        scaleSub *= 1.5;
        svgSub.transition()
          .duration(750)
          .call(zoomSub.scaleTo, scaleSub);
    });
   
d3.select(".zoom-out-sub")
    .on("click", function(){
        scaleSub *= 1/1.5;
        svgSub.transition()
          .duration(750)
          .call(zoomSub.scaleTo, scaleSub);
    });
    
$(window).resize(function(){
  if($(window).width() < 600){
    imgContainerWidth = imgContainer.width();
    height = imgContainer.height();
    svgSub.attr("width", imgContainerWidth);
    svgSub.attr("height", imgContainerHeight);
    img.attr("width", imgContainerWidth);
    img.attr("height", imgContainerHeight);
  }else{
    imgContainerWidth = imgContainer.width();
    height = imgContainer.height();
    svgSub.attr("width", imgContainerWidth);
    svgSub.attr("height", imgContainerHeight);
    img.attr("width", imgContainerWidth);
    img.attr("height", imgContainerHeight);
  }
});

function showImgAndData(d){
    image.attr("src", d.image);
    img.attr("xlink:href", d.image);
    $(".poem").html("<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam, ipsum est sit tenetur fuga doloremque ducimus officia nostrum id vel.</p>");
    $(".artist span").text(d.artist);
    $(".desc span").text(d.description);
}
var width = screen.width,
    height = screen.height,
    rowIndex = 0,
    colIndex = -1,
    radius = 1.8,
    x=-1, y=0,
    play = false;
    
var data = [
    {
        image: "../image/Testikuva1.jpg",
        artist: "Lorem ipsum",
        description: "Sed orci odio, tempus non euismod id, venenatis vitae purus. Donec faucibus ex ac sapien dapibus tristique."
    },
    {
        image: "../image/Testikuva2.jpg",
        artist: "Pellentesque",
        description: "Quisque elementum porttitor nulla ut ultricies. Quisque at ante diam. Maecenas bibendum, lorem vel fringilla cursus, ex ligula sodales ipsum, eu imperdiet lacus lorem eget lorem."
    },
    {
        image: "../image/Testikuva1.jpg",
        artist: "Lorem ipsum",
        description: "Sed orci odio, tempus non euismod id, venenatis vitae purus. Donec faucibus ex ac sapien dapibus tristique."
    },
    {
        image: "../image/Testikuva2.jpg",
        artist: "Pellentesque",
        description: "Quisque elementum porttitor nulla ut ultricies. Quisque at ante diam. Maecenas bibendum, lorem vel fringilla cursus, ex ligula sodales ipsum, eu imperdiet lacus lorem eget lorem."
    },
    {
        image: "../image/Testikuva1.jpg",
        artist: "Lorem ipsum",
        description: "Sed orci odio, tempus non euismod id, venenatis vitae purus. Donec faucibus ex ac sapien dapibus tristique."
    },
    {
        image: "../image/Testikuva2.jpg",
        artist: "Pellentesque",
        description: "Quisque elementum porttitor nulla ut ultricies. Quisque at ante diam. Maecenas bibendum, lorem vel fringilla cursus, ex ligula sodales ipsum, eu imperdiet lacus lorem eget lorem."
    },
    {
        image: "../image/Testikuva1.jpg",
        artist: "Lorem ipsum",
        description: "Sed orci odio, tempus non euismod id, venenatis vitae purus. Donec faucibus ex ac sapien dapibus tristique."
    },
    {
        image: "../image/Testikuva2.jpg",
        artist: "Pellentesque",
        description: "Quisque elementum porttitor nulla ut ultricies. Quisque at ante diam. Maecenas bibendum, lorem vel fringilla cursus, ex ligula sodales ipsum, eu imperdiet lacus lorem eget lorem."
    },
    {
        image: "../image/Testikuva1.jpg",
        artist: "Lorem ipsum",
        description: "Sed orci odio, tempus non euismod id, venenatis vitae purus. Donec faucibus ex ac sapien dapibus tristique."
    },
    {
        image: "../image/Testikuva2.jpg",
        artist: "Pellentesque",
        description: "Quisque elementum porttitor nulla ut ultricies. Quisque at ante diam. Maecenas bibendum, lorem vel fringilla cursus, ex ligula sodales ipsum, eu imperdiet lacus lorem eget lorem."
    },
    {
        image: "../image/Testikuva1.jpg",
        artist: "Lorem ipsum",
        description: "Sed orci odio, tempus non euismod id, venenatis vitae purus. Donec faucibus ex ac sapien dapibus tristique."
    },
    {
        image: "../image/Testikuva2.jpg",
        artist: "Pellentesque",
        description: "Quisque elementum porttitor nulla ut ultricies. Quisque at ante diam. Maecenas bibendum, lorem vel fringilla cursus, ex ligula sodales ipsum, eu imperdiet lacus lorem eget lorem."
    }
];

var numberOfImgs = data.length,
    numberOfImgsInARow = 30,
    imgWidth = width/numberOfImgsInARow;

var points = d3.range(numberOfImgs).map(pointMap()),
    point = points.pop();

var btn = document.querySelector("button");

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);
    
var g = svg.append("g");

var groups = g.selectAll("g")
	.data(data)
	.enter()
    	.append("g")
        .attr("class", "gbar");

var image = groups.append("svg:image")
        .attr("xlink:href", function(d) {return d.image; })
        .attr("width", imgWidth)
        .attr("height", imgWidth)
        .attr("x", function(d, i) {
            colIndex++;
            if(i%numberOfImgsInARow==0){
                colIndex = 0;
            }
            return colIndex*imgWidth;
        })
        .attr("y", function(d, i) {
            if(i!==0 && i%numberOfImgsInARow===0){
                rowIndex+=1;
            }
            return rowIndex*imgWidth;
        });

var circles = groups.append("circle")
                .attr("cx", function(d,i) {
                    if(i===0){
                        colIndex = -1;
                    }
                    colIndex++;
                    if(i%numberOfImgsInARow===0)
                        colIndex = 0;
                    return colIndex*imgWidth+imgWidth-4;
                })
                .attr("cy", function(d,i){
                    if(i===0)
                        rowIndex = 0;
                    else if(i%numberOfImgsInARow===0)
                        rowIndex++;
                    return rowIndex*imgWidth + imgWidth-4;
                })
                .attr("r", radius)
                .attr("class", "hidden")
                .attr("fill", "rgba(0, 0, 0, 0.7)");

var up = groups.append("text")
                .attr("x", function(d,i) {
                    if(i===0){
                        colIndex = -1;
                    }
                    colIndex++;
                    if(i%numberOfImgsInARow===0)
                        colIndex = 0;
                    return colIndex*imgWidth+imgWidth-4;
                })
                .attr("y", function(d,i) {
                    if(i===0)
                        rowIndex = 0;
                    else if(i%numberOfImgsInARow===0)
                        rowIndex++;
                    return rowIndex*imgWidth + imgWidth-4;
                })
                .attr("dy", ".55em")
                .attr("text-anchor", "middle")
                .attr("fill", "white")
                .style("font-size", "1.5em")
                .attr("class", "hidden")
                .text("ˆ"); 

var foreignObjects = groups.append("foreignObject")
    .attr("x",function ( d , i ) { 
        if(i===0){
            colIndex = -1;
        }
        colIndex++;
        if(i%numberOfImgsInARow===0)
            colIndex = 0;
        return colIndex*imgWidth;
    })
    .attr("y",function (d, i) { 
        if(i===0)
            rowIndex = 0;
        else if(i%numberOfImgsInARow===0)
            rowIndex++;
        return rowIndex*imgWidth + imgWidth;
    })
    .attr("width",function ( d, i ) { return imgWidth } )
    .attr("height",function ( d, i ) { return 0 } )
    .attr("class", "unactive");

var htmlDOMs = foreignObjects.append("xhtml:body")
    .style("margin",0)
    .style("padding", 0)
    .style("height", "100%");

var htmlLabels = htmlDOMs.append("div")
    .attr("class","metadata");
    
var downs = htmlLabels.append("i")
    .attr("class", "fa fa-angle-down");

htmlLabels.append("p")
    .attr("class","artist")
    .text(function(d) { return d.artist });

htmlLabels.append("p")
    .attr("class","description")
    .html(function(d) { 
        return d.description; 
    });
    
circles.on("click", function(){
   var obj = d3.select(this.parentNode).select("foreignObject");
   var text = d3.select(this.parentNode).select("text");
    obj.attr("class","active")
        .transition()
        .duration(500)
        .ease(d3.easeLinear)
        .attr("y", obj.attr("y") - imgWidth/2)
        .attr("height", imgWidth/2);
    d3.select(this).attr("class", "hidden");
    text.attr("class", "hidden");
});

downs.on("click", function(){
    var obj = d3.select(this.parentNode.parentNode.parentNode);
    var grp = d3.select(this.parentNode.parentNode.parentNode.parentNode);
    var text = grp.select("text");
    var circle = grp.select("circle");
    console.log(obj);
    obj.attr("class","unactive")
        .transition()
        .duration(500)
        .ease(d3.easeLinear)
        .attr("y", imgWidth/2+parseInt(obj.attr("y")))
        .attr("height", 0);
    text.attr("class", "show");
    circle.attr("class", "show");
});

var zoom = d3.zoom().scaleExtent([1, 60])
    .on("zoom", zoom);

svg.call(zoom);
        
btn.addEventListener("click", function(){
  btn.classList.toggle("play")
  play = !play;
  if(play){
    svg
      .call(zoom.transform, transform)
      .call(transition);
  }else{
      svg.call(zoom);
  }
});

svg.on("wheel", function(){ play = false; });
svg.on("mousedown", function() { play = false; });
        
function zoom() {
  g.attr("transform", d3.event.transform);
  var transform = g.attr("transform");
  var indexStart = transform.indexOf("scale");
  var scale = transform.substring(indexStart+6, transform.length-1);
  if(!play){
      if(scale>=12 && scale <= 20){
          d3.selectAll("circle").attr("class", "show");
          d3.selectAll("text").attr("class", "show");
      }else{
          d3.selectAll("circle").attr("class", "hidden");
          d3.selectAll("text").attr("class", "hidden");
      }
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
      .delay(500)
      .duration(3000)
      .call(zoom.transform, transform)
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
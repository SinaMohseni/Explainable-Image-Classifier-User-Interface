var imgIndex = '';
var fill_checkbox = 0
var w_size = window,
    d_size = document,
    e_size = d_size.documentElement,
    g_size = d_size.getElementsByTagName('body')[0];
	
d3.select(window).on('resize.updatesvg', updateWindow);

//var colors = d3.scaleOrdinal(d3.schemeCategory10); 

//var svg = d3.select("#explanation_box").append("svg"),
    margin = {top: 5, right: 25, bottom: 5, left: 5};
//	
//	svg.attr("width", "600");
//	svg.attr("height", "400");
	// svg.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  fill_area = d3.selectAll("input[name=fillarea]")          // Check box for cutting the tails
      .style("margin", "0px 10px 0px " + margin.left + "px")
      .style("padding", "0px 0px")
      .attr("position", "relative")
      .on("change", function() {
                        if (this.checked) {
                          // highlighter.selectAll(".line").attr("fill", "red");   
                          fill_checkbox = 1;
                          // path.attr("fill", "red");  
                        }else{
                          fill_checkbox = 0;
                        // highlighter.selectAll(".line").attr("fill", "none");   
                          // path.attr("fill", "none");  
                        }
                    }
                       );

	
var width = 600 - margin.left - margin.right;  // +svg.attr("width")
var height = 400 - margin.top - margin.bottom;     // +svg.attr("height")
//var	chart_svg = svg.append("g").attr("class","svg_chart").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var clearance = margin.left + margin.right




	
//	var img = chart_svg.selectAll("image_exp").data([0]);  
//            
//            img.enter()
//                .append("svg:image")
//                .attr("class", "image_exp")
//                .attr("xlink:href", "./data/result1/input.png")
//                .attr("x", "60")
//                .attr("y", "60")
//                .attr("width", "400")
//                .attr("height", "400");

//    var test = d3.select("#explanation_box").append("svg"),
//    margin = {top: 5, right: 25, bottom: 5, left: 5};
//	
//	test.attr("width", "600");
//	test.attr("height", "400");
//    test.attr("fill","black")
    

//updateWindow()



// --------------------------------------------------------------------------------

var path;
var color = "lightblue"


var area = d3.svg.line()
  .x(function(d) { return d[0]; })
  .y(function(d) { return d[1]; })
  .tension(0)
  .interpolate("basis");

//var svg = d3.select("#canvas")
var highlighter = d3.select("#img_box") //var highlighter = d3.select(".chart_svg").selectAll("class","highlighter")
	.call(d3.behavior.drag()
		.on("dragstart", dragstarted)
    .on("drag", dragged)
    .on("dragend", dragended));

  var explanationBox = d3.select("#explanation_box")

    d3.selection.prototype.moveToBack = function() {
        return this.each(function() {
            var firstChild = this.parentNode.firstChild;
            if (firstChild) {
                this.parentNode.insertBefore(this, firstChild);
            }
        });
    };
  
  d3.selection.prototype.moveToFront = function() {
    return this.each(function(){
      this.parentNode.appendChild(this);
    });
  };

  // explanationBox.append("g").append('image')  //selectAll(".pattIcon") .data(makeData2).enter()
  //       // .attr("class", "exp")
  //       .attr('xlink:href',"./data/result1/input.png") 
  //       .attr('height', 100)
  //       .attr('width', 100)
  //       .attr("x", 100)
  //       .attr("y", 100);
  //     console.log("done")

// d3.xml("./data/result1/input.png").mimeType("image/svg+xml").get(function(error, xml) {
//        if (error) throw error;
//        // var svgElem = highlighter.xMarker.node().appendChild(xml.documentElement);
//        d3.select("#explanation_box")
//           .attr("height", 100)
//           .attr("width", 100)
//           .attr("preserveAspectRatio", "xMinYMid meet")
//           .attr("transformOrigin", "left")
//           .style("text-align", "left")
//           .style("margin", 0);
//     });


	var page_frame = explanationBox.append("g").append("rect").attr("class","page_frame")
					.attr("x", margin.left)
					.attr("y", margin.top)
					.attr("rx", 10)
					.attr("ry", 10)
					.attr("width", width )
					.attr("height", height)
					.attr("fill", "gray")
					.style("fill-opacity",0)
					.style("stroke","gray")
					.style("stroke-opacity",1);

//	explanationBox.append('text')
//			  .text("Instance Explanation:")
//			  .attr("class", "text_title")
//			  .attr('dy','0.35em')
//			  .attr('transform', 'translate(' + (width + margin.left) + ','+ (height/20 + margin.top)+')')


function dragstarted() {
  path = highlighter.append("path").datum([]).attr("class", "line")
  			.attr({

          "stroke": "red",
          "stroke-width": 15 + "px",
          "stroke-linejoin": "round"
        })
        .attr("fill", function(){if (fill_checkbox == 1) return "red"; else return "none"; }); 
}

function dragged() {
  path.datum().push(d3.mouse(this));
  path.attr("d", area);
  
}

function dragended() {
  path = null;
}
    
d3.select('#undo').on('click', function(){
  d3.select('path.line').remove();
});

d3.select('#clear').on('click', function(){
  d3.selectAll('path.line').remove();
});
    
var colorScale = d3.scale.category10(),
//    colorAr = [0,1,2,3,4,5,6,7,8,9,10];
    colorAr = [0,1]

d3.select('#palette')
    .select('g')
  .selectAll('rect')
    .data(colorAr)
  .enter().append('rect')
    .attr('width', 10)
    .attr('height',10)
    .attr('x', function(d,i){
      return 22 * i;
    })
    .attr('fill', function(d){
      return colorScale(d);
    })
    .style('cursor','pointer')
    .on('click',function(d){
      changeColor(colorScale(d));
    });

  function changeColor(c){
    color = c;
  }

//--------------------------------------------------------
readData();


function readData(){

}



function updateWindow(){
							 
		clientHeight = document.getElementById('explanation_box').clientHeight;
		clientWidth = document.getElementById('explanation_box').clientWidth;
		
		//console.log(clientHeight, clientWidth)

		width = clientWidth;
		height = clientHeight; 

		explanationBox.attr("width", clientWidth);
		explanationBox.attr("height", clientHeight);
		
		chart_svg.selectAll(".text_title").attr('transform', 'translate(' + (clientWidth/2) + ','+ (height/20)+')');

		chart_svg.selectAll(".page_frame").attr("width", clientWidth - clearance - margin.left - margin.right)
		.attr("height", clientHeight- clearance); 

		chart_svg.selectAll(".image_exp").attr("x", 9*clientWidth/16).attr("y", (2*clientHeight/20))
								.attr("width", (clientWidth/3))
								.attr("height", (9*clientHeight/12));		

	}
	
/* Scripts for the drag and drop logic */

function drag(evt)
{
  evt.dataTransfer.setData("text",evt.target.id);// to access DataTranfer interface
}


function enableDrop(evt)
{
  evt.preventDefault();// to allow elements to be dropped at destination
}


function drop(evt){
	var child = document.getElementById("holder");
	child.innerHTML = '';

	evt.preventDefault();
	var dragged_item=evt.dataTransfer.getData("text");
	imgIndex = dragged_item;
	child.appendChild(document.getElementById(dragged_item).cloneNode(true));// add dragged items

  new_exp = "./data/result"+imgIndex+ "/input.png"
  var this_img = new Image();  

  this_img.src = new_exp
  $(".img_exp").attr("xlink:href",new_exp);


  this_img.onload = function(){
            $(".img_box").attr("height",this.height+"px");
            $(".img_box").attr("width",this.width+"px");  
            }
  


  console.log("dragged image: ",imgIndex)

}  

/* end of drag and drop logic */
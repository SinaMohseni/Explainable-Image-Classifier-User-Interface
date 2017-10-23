var imgIndex = '';

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

	var page_frame = explanationBox.append("g").append("rect").attr("class","page_frame")
					.attr("x", margin.left)
					.attr("y", margin.top)
					.attr("rx", 10)
					.attr("ry", 10)
					.attr("width", width )
					.attr("height", height)
					.attr("fill", "gray")
					.style("fill-opacity",0.05)
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
        	"fill": "none",
          "stroke": "lightblue",
          "stroke-width": 25 + "px",
          "stroke-linejoin": "round"
        });
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
    .attr('width', 20)
    .attr('height',20)
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
//document.getElementById('image_exp').ondragstart = function() { return false; };
readData();


function readData(){

}



function updateWindow(){
							 
		clientHeight = document.getElementById('explanation_box').clientHeight;
		clientWidth = document.getElementById('explanation_box').clientWidth;
		
		//console.log(clientHeight, clientWidth)

		width = clientWidth;
		height = clientHeight; 

		svg.attr("width", clientWidth);
		svg.attr("height", clientHeight);
		
		chart_svg.selectAll(".text_title").attr('transform', 'translate(' + (clientWidth/2) + ','+ (height/20)+')');
		///.attr("width",).attr("hight",);

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


function drop(evt)
{
	var child = document.getElementById("holder");
	child.innerHTML = '';

	evt.preventDefault();
	var dragged_item=evt.dataTransfer.getData("text");
	imgIndex = dragged_item;
	child.appendChild(document.getElementById(dragged_item).cloneNode(true));// add dragged items
}  

/* end of drag and drop logic */
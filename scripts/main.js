
var w_size = window,
    d_size = document,
    e_size = d_size.documentElement,
    g_size = d_size.getElementsByTagName('body')[0];
	
d3.select(window).on('resize.updatesvg', updateWindow);

var colors = d3.scaleOrdinal(d3.schemeCategory10); 

var svg = d3.select("#explanation_box").append("svg"),
    margin = {top: 5, right: 25, bottom: 5, left: 5};
	
	svg.attr("width", "600");
	svg.attr("height", "400");
	// svg.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	
var width = 600 - margin.left - margin.right;  // +svg.attr("width")
var height = 400 - margin.top - margin.bottom;     // +svg.attr("height")
var	chart_svg = svg.append("g").attr("class","svg_chart").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var clearance = margin.left + margin.right

	var page_frame = chart_svg.append("g").append("rect").attr("class","page_frame")
					.attr("x", margin.left)
					.attr("y", margin.top)
					.attr("rx", 10)
					.attr("ry", 10)
					.attr("width", width - clearance)
					.attr("height", height - clearance)
					.attr("fill", "gray")
					.style("fill-opacity",0.05)
					.style("stroke","gray")
					.style("stroke-opacity",1);

	chart_svg.append('text')
			  .text("Instance Explanation:")
			  .attr("class", "text_title")
			  .attr('dy','0.35em')
			  .attr('transform', 'translate(' + (width + margin.left) + ','+ (height/20 + margin.top)+')')


	
	var img = chart_svg.selectAll("image_exp").data([0]);  
            
            img.enter()
                .append("svg:image")
                .attr("class", "image_exp")
                .attr("xlink:href", "./data/result1/input.png")
                .attr("x", "60")
                .attr("y", "60")
                .attr("width", "400")
                .attr("height", "400");

        

updateWindow()
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
	
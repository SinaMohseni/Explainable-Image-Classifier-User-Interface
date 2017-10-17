
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

	
var width = +svg.attr("width") - margin.left - margin.right ,
    height = +svg.attr("height") - margin.top - margin.bottom,    
	chart_svg = svg.append("g").attr("class","svg_chart")
					.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

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
			  .attr('dy','0.35em')
			  .attr('transform', 'translate(' + (width/20 + margin.left) + ','+ (height/20 + margin.top)+')')

updateWindow()
readData();

function readData(){

}



function updateWindow(){
							 
		clientHeight = document.getElementById('explanation_box').clientHeight;
		clientWidth = document.getElementById('explanation_box').clientWidth;
		

		width = clientWidth;
		height = clientHeight; 

		svg.attr("width", clientWidth);
		svg.attr("height", clientHeight);

		chart_svg.selectAll(".page_frame").attr("width", clientWidth - clearance - margin.left - margin.right);
		chart_svg.selectAll(".page_frame").attr("height", clientHeight- clearance);
	}
	
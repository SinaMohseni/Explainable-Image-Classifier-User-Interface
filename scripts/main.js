highligh_data = []
var inkColor = "#1f77b4"
var imgIndex = '';
var fill_checkbox = 1
var w_size = window,
    d_size = document,
    e_size = d_size.documentElement,
    g_size = d_size.getElementsByTagName('body')[0];
	
d3.select(window).on('resize.updatesvg', updateWindow);

    margin = {top: 5, right: 25, bottom: 5, left: 5};

  fill_area = d3.selectAll("input[name=fillarea]")          // Check box for cutting the tails
      .style("margin", "0px 10px 0px " + margin.left + "px")
      .style("padding", "0px 0px")
      .attr("position", "relative")
      .attr("checked", true)
      .on("change", function() {
                        if (this.checked) {
                          fill_checkbox = 1;
                        }else{
                          fill_checkbox = 0;
                        }
                    }
                       );

var width = 600 - margin.left - margin.right;
var height = 400 - margin.top - margin.bottom;

var clearance = margin.left + margin.right

// --------------------------------------------------------------------------------

var path;
var color = "lightblue"
x_old = 0
y_old = 0

var area = d3.svg.line()
  .x(function(d) {
      if ( (Math.abs(d[0] - x_old) > 1) | (Math.abs(d[1] - y_old) > 1) ){
        x_old = d[0];
        y_old = d[1];
        if (inkColor == "#1f77b4"){
          highligh_data.push([d[0],d[1],0,0]);
        } else{
          highligh_data.push([0,0,d[0],d[1]]);
        }
      }
      return d[0]; })
  .y(function(d) { return d[1];})
  .tension(0)
  .interpolate("basis");

var highlighter = d3.select("#img_box")
	.call(d3.behavior.drag()
		.on("dragstart", dragstarted)
    .on("drag", dragged)
    .on("dragend", dragended));

  var explanationBox = d3.select("#explanation_box").append("svg").attr("width", width).attr("height", height);

  updateWindow();  

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

var ct = 0;
var str = "line"
function dragstarted() {
  path = highlighter.append("path").datum([]).attr("id", str.concat(ct)).attr("class","line")
  			.attr({
          "stroke": inkColor,
          "opacity": 0.7,
          "stroke-width": 15 + "px",
          "stroke-linejoin": "round"
        })
        .attr("fill", function(){if (fill_checkbox == 1) return inkColor; else return "none"; }); 
        ct++;
}

function dragged() {
  path.datum().push(d3.mouse(this));
  path.attr("d", area); 
}

function dragended() {
  path = null;
}
    
d3.select('#undo').on('click', function(){
  ct--;
  d3.select('path#'+str.concat(ct)).remove();
});

d3.select('#clear').on('click', function(){
  d3.selectAll('path.line').remove();
  ct =0;
});
    
var colorScale = d3.scale.category10(),
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
    color = c.value;
    inkColor = color
  }

//--------------------------------------------------------
readData();


function readData(){

}

function saveIt(){  
    
    var csvContent = "data:text/csv;charset=utf-8,";
    highligh_data.forEach(function(infoArray, index){   
         dataString = infoArray.join(",");
         csvContent += index < highligh_data.length ? dataString+ "\n" : dataString;
    });
    
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Retraining_data.csv");
    document.body.appendChild(link);  

    link.click(); 
    highligh_data = []

}

function updateWindow(){
							 
		clientHeight = document.getElementById('explanation_box').clientHeight;  // explanation_box
		clientWidth = document.getElementById('explanation_box').clientWidth;
		
		width = clientWidth;
		height = clientHeight; 

		explanationBox.attr("width", clientWidth);
		explanationBox.attr("height", clientHeight);
		
	}

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

  d3.selectAll('.label').remove();
    d3.selectAll('path.line').remove();
  ct = 0;
  
  new_exp = "./data/result"+imgIndex+ "/output.jpg"
  var this_img = new Image();  

  this_img.src = new_exp
  $(".img_exp").attr("xlink:href",new_exp);
  d3.select("#holder").selectAll("img")
		.classed("img-circle", false);
  d3.select("#holder").selectAll("img")
		.classed("img-rounded", true)
		.style("height", "90%");
		

  this_img.onload = function(){
            $(".img_box").attr("height",(this.height*1.5)+"px");
            $(".img_box").attr("width",(this.width*1.5)+"px");  
            }
  img_label = ["Balloon","Zebra","Elephant","Scorpion","Kangaroo","Crab","Bird","Wild Cat","Panda","Cat"]

  explanationBox.append("text").attr("class", "label")
            .text("This is a "+img_label[imgIndex-1]+".")
            .attr("x", 0)
            .attr("y", 0)
            .style('fill', 'maroon')
            .style("font-size", "22px")
            .attr("transform", "translate(" + width/2 + "," + 100 + ")");

}

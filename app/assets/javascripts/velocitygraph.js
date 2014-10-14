$(function(){
  TweetCountArray = [];
  FirstOrderTCA = [0,0,0,0];
  SecondOrderTCA = [100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100];
  TweetBaseCount = 0

  function getMaxOfArray(numArray) {
      return Math.max.apply(null, numArray);
  }

  function getMinOfArray(numArray) {
      return Math.min.apply(null, numArray);
  }


  setInterval( "getData();", 2000 ); 
    $(function() { 

      getData = function(){

        queue()
            .defer(d3.json, "../tweetdata")
            .await(ready);

        function ready(error, tweetdata) {

          TweetCountArray.push(tweetdata.features.length); //LIVE_CHART
          
          if (TweetCountArray.length > 2) {
          FirstOrderTCA.push(TweetCountArray[(TweetCountArray.length - 1)] - TweetCountArray[(TweetCountArray.length - 2)]);
          }

          if ((FirstOrderTCA[(FirstOrderTCA.length - 1)] == 0) &&  (FirstOrderTCA[(FirstOrderTCA.length - 2)] == 0)) {
            SecondOrderTCA.push(0);
          }

          else if (FirstOrderTCA[(FirstOrderTCA.length - 2)] == 0) {
            SecondOrderTCA.push(100);

          } else {
            SecondOrderTCA.push((FirstOrderTCA[(FirstOrderTCA.length - 1)]/FirstOrderTCA[(FirstOrderTCA.length - 2)])*100)
          }



          // diff/(Math.abs.SecondOrderTCA[(SecondOrderTCA.length - 1)]

          






          
          console.log(TweetCountArray);
          console.log(FirstOrderTCA);
          console.log(SecondOrderTCA);
          // console.log(diff);
          // console.log(ThirdOrderTCA);
          console.log("==============");

          
        if (TweetCountArray.length == 6) {
          TweetCountArray.shift();
          }

          
        if (FirstOrderTCA.length == 4) {
          FirstOrderTCA.shift();
          }
          
        }
          
      } 
          
    }); 


  var n = 20,

      data = SecondOrderTCA;
   
  var margin = {top: 20, right: 20, bottom: 20, left: 40},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;
   
  var x = d3.scale.linear()
      .domain([0, n - 5])
      .range([0, width]);
   


  var y = d3.scale.linear()

      .domain([0, 350])
      .range([height, 0]);
   




  var line = d3.svg.line()
      .x(function(d, i) { return x(i); })
      .y(function(d, i) { return y(d); });
   
  var svg = d3.select("#streamingVelocity").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
   
  svg.append("defs").append("clipPath")
      .attr("id", "clip")
    .append("rect")
      .attr("width", width)
      .attr("height", height);
   
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + (327)  + ")")
      .call(d3.svg.axis().scale(x).orient("bottom"));
   
  svg.append("g")
      .attr("class", "y axis")
      .call(d3.svg.axis().scale(y).orient("left"));
   
  var path = svg.append("g")
      .attr("clip-path", "url(#clip)")
      .append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line);
   
  tick();
   
  function tick() {
    

    // push a new data point onto the back


    // redraw the line, and slide it to the left
    path
        .attr("d", line)
        .attr("transform", null)
        .transition()
        .duration(2000)
        .ease("linear")
        .attr("transform", "translate(" + x(-1) + ",0)")
        .each("end", tick);
   
    // pop the old data point off the front
    data.shift();
   
  }
});
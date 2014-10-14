$(function(){
	var width = 1280,
	    height = 700;

	var radius = d3.scale.sqrt()
	    .domain([0, 1e6])
	    .range([0, 10]);

	var projection = d3.geo.albers()
		.center([-10.2, 43])
		.scale(1400);

	var path = d3.geo.path().projection(projection);

	var svg = d3.select("#map").append("svg")
	    .attr("width", width)
	    .attr("height", height)
	    .attr("class", "mapObject");

	    // Initialize map with US map data and initial geographytweets
	queue()
	    .defer(d3.json, "../us")
	    .defer(d3.json, "../geographytweets")
	    .await(ready);

	function ready(error, us, geographytweets) {
		svg.append("path")
			.attr("class", "states")
			.datum(topojson.feature(us, us.objects.states))
			.attr("d", path);

		svg.selectAll(".symbol")
			.data(geographytweets.features)				
			.enter().append("path")
			.attr("class", "symbol")
			.attr("d", path.pointRadius(5));


		// svg.selectAll(".place-label")
	 //    	.data(topojson.feature(us, us.properties.text).features)
		// 	.enter().append("text")
		// 	.attr("class", "place-label")
		// 	.attr("transform", function(d) { return "translate(" + projection(d.geometry.coordinates) + ")"; })
		// 	.attr("dy", ".35em")
		// 	.text(function(d) { return d.properties.name; });

		// svg.selectAll(".text-label")
		// 	.data(geographytweets.features)
		// 	.enter().append("text")
		// 	.attr("class", "text-label")
		// 	.attr("transform", function(d) { return "translate(" + projection(d.geometry.coordinates) + ")"; })
		// 	.attr("dy", ".35em")
		// 	.text(function(d) { return d.properties.text; });

	}



	// Asynchronous calling of geographic tweet data from stream
	setInterval( "getMapData();", 8000 ); 
	$(function() { 

			getMapData = function(){
		   		console.log('Calling getMapData()')

				queue()
				    .defer(d3.json, "../geographytweets")
				    .await(ready);

				function ready(error, geographytweets) {
					console.log(geographytweets.features);
					svg.selectAll(".symbol")
						.data(geographytweets.features)				
						.enter().append("path")
						.attr("class", "symbol")
						.attr("d", path.pointRadius(5))
						.attr('data-text', function(d){
							return d.properties
						});

					// todo: add tweet text labels
					// svg.selectAll(".tweet-text")
					//     .data(geographytweets.features)
					//     .enter().append("text")
					//     .attr("class", "tweetMapText")
					//     .text(function(d){
					//     	return d.properties;
					//     })
					//     .attr("transform", function(d){
					//     	return "translate(" + d.geometry.coordinates + ")";
					//     });

				// todo: add tweet text labels
			 	//  svg.selectAll(".symbol")
				// .data(topojson.feature(us, us.objects.places).features)
				// .enter().append("text")
				// .attr("class", "symbol")
				// .attr("transform", function(d) { return "translate(" + projection(d.geometry.coordinates) + ")"; })
				// .attr("dy", ".35em")
				// .text(function(d) { return d.properties; });
		   		} // End ready
		   		setTimeout(
					function(){
							svg.selectAll(".symbol")
								.attr("class", "symbol tweet-location-dot");
							//Remove all elems that do not have a d property
							$('.symbol')
					}, 100);
			} // End get Map Data
	      
	}); 
});
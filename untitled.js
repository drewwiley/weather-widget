$(document).ready(function(){

var apiKey = '9c1dd7efa1b10e2f2c445c6145b33e2f';
var canvas = document.getElementById('current-temp');
var context = canvas.getContext('2d');
var currentTemp = 0;


    $('.weather-form').submit(function(){
    	//keep form from submitting
        event.preventDefault();
        //get user input
        var cityText = $('.city').val();

        //build url from user input and api key
        var url = "http://api.openweathermap.org/data/2.5/forecast/city?q="+cityText+",us&units=imperial&APPID=" + apiKey;
        //go get json from constructed url
        $.getJSON(url, function(weatherData){
            var currentCity = $('.current-city').html(weatherData.city.name);
        	//set up variable for user's city temp
           currentTemp = weatherData.list[0].main.temp;
           animate(0);
           console.log(currentCity);
          

        });
		function animate(current){

	


		

		// outer circle

			var tempColor = '#ff0000';
			context.strokeStyle = tempColor;
			context.lineWidth = 10;
		    context.clearRect(0, 0, 300, 300); // make sure the canvas is empty
		    context.beginPath(); // so I'm ready to draw
		    context.arc(155, 155, 70, Math.PI * 1.5, (current/ 100) * (Math.PI * 2) + (Math.PI * 1.5)); // starts and ends at pi*1.5 
		    context.stroke(); // draw the circle
		    current++;

		    //inner circle


			
		    context.beginPath(); // so I'm ready to draw
		    context.arc(155, 155, 65, Math.PI * 1.5, (current/ 100) * (Math.PI * 3); // starts and ends at pi*1.5 
		    context.fill(); // fill the circle
		    context.fillStyle = 'gray';

			
		   

		   		context.stroke()
				
				context.font = '34px Myriad Pro'; 
				context.textBaseline = 'top';
				context.strokeText(currentTemp, 80, 80)
		
				if (current < currentTemp){
		    	requestAnimationFrame(function(){
		    		animate(current);
					});
				};
			};
		    // context.fill(); // fill the circle
		    // context.fillStyle = 'gray';
		    if (current < currentTemp){
		    	requestAnimationFrame(function(){
		    		animate(current);
		    	});
		    };
		
    });
});


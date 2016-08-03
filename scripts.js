$(document).ready(function(){
$('.container').css("background-image", "url(back.jpg)"); 
var apiKey = '9c1dd7efa1b10e2f2c445c6145b33e2f';
var canvas = document.getElementById('current-temp');
var context = canvas.getContext('2d');
var currentTemp = 0;

    function getDayOfWeek(){
            var currentDay = new Date();
            var dayOfWeek = currentDay.getDay();
            return dayOfWeek;
        }

    function getDaysAsAString(day){
            var dayOfWeek = day;
            var dayWords;
                switch(dayOfWeek){
                    case 0:
                        dayWords = 'Sunday'
                        break;
                    case 1:
                        dayWords = 'Monday'
                        break;
                    case 2:
                        dayWords = 'Tuesday'
                        break;
                    case 3:
                        dayWords = 'Wednesday'
                        break;
                    case 4:
                        dayWords = 'Thursday'
                        break;
                    case 5:
                        dayWords = 'Friday'
                        break;
                    case 6:
                        dayWords = 'Saturday'
                        break;
                }
                return dayWords;    
            }
        function getForecast(){
			var currentDay = getDayOfWeek() + 1;
			var weeks = [];

			for(i=0;i<7;i++){
				weeks[i] = getDaysAsAString(currentDay)
				currentDay++;
				if(currentDay==7){
					currentDay = 0;
				}
			}
			return weeks;
		}
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
          

            var lineWidth = 5;
            var outterRadius = 70;
            var innerRadius = outterRadius - lineWidth;
            var currPercent = 0;
            var counterClockwise = false;
            var circ = Math.PI * 2;
            var quart = Math.PI / 2;
            var finalTemp = currentTemp + '\xB0F';

                function animate(current){
                    context.fillStyle = '#fdb813'
                    context.beginPath();
                    context.arc(100,75,innerRadius,0,circ,true);
                    context.closePath();
                    context.fill()
                    if(currentTemp<10){
                        shadeColor= "white";
                    }else if(currentTemp<32){
                        shadeColor = '#74BBFB';
                    }else if(currentTemp<60){
                        shadeColor = '#3af'
                    }else if(currentTemp<75){
                        shadeColor = '#6CA6CD'
                    }else if(currentTemp<90){
                        shadeColor = '#FFFF1A'
                    }else{
                        shadeColor = '#E3170D';
                    }
                    context.strokeStyle = shadeColor;
                    context.lineWidth= '10';
                    context.beginPath();
                    // If statement is to decide which direction the animation should proceed to
                    // depict the temperature
                    if(currentTemp<0){
                        context.arc(100,75,outterRadius,-(quart),2*Math.PI-quart-(current*(circ)),true)
                    }else{
                        context.arc(100,75,outterRadius,-(quart),(current*(circ)-quart),false);
                    }
                    context.stroke()
                    // 
                    context.font = '34px Myriad Pro';
                    context.fillStyle = "black";
                    context.textBaseline = 'top';
                    context.fillText(finalTemp,130-outterRadius, 92-outterRadius/2,80)
                    currPercent++;
                    if(currPercent < Math.abs(currentTemp)){
                        requestAnimationFrame(function(){
                            animate(currPercent/100);
                        });
                    };
                };
                animate()
                context.closePath();
                });
            $.getJSON(url, function(weatherData){
            var forecast = weatherData.list;
            var days = getForecast();
            days[0] = 'Tomorrow';
            for(i=0;i<days.length;i++){
                var forecastHTML = '<div class="days" id="day'+i+'"><span class="bold">'+days[i]+'</span>';
                    forecastHTML += '<div class="highs">High: '+Math.round(weatherData.list[i].main.temp_max)+'</div>'
                    forecastHTML += '<div class="lows">Low: '+Math.round(weatherData.list[i].main.temp_min)+'</div>'
                    forecastHTML += '<div class="rain">'
                    forecastHTML += '</div>'
                   
                $('.forecast').append(forecastHTML);
                
            }
        });
    });

});


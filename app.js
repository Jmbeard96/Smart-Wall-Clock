var main = function () {
    "use strict";

    var zip = 38340,
        appID = "0bfc92b7fd8751033e761c75409b16c3";

    function kelvinToDegF(kelvin) {
        return Math.round((kelvin - 273.15) * (9 / 5) + 32);
    }

    function getWeather() {
        $.getJSON("http://api.openweathermap.org/data/2.5/weather?zip=" + zip + ",us&APPID=" + appID, function weatherData(data) {
            var temp = kelvinToDegF(data.main.temp);
            var city = data.name;
            var high = kelvinToDegF(data.main.temp_max);
            var low = kelvinToDegF(data.main.temp_min);
            var current = data.weather[0].main;
            //console.log(temp);
            //console.log(city);
            $("#temp").text(temp + " °F");
            //$("#city").text(city + ", TN");
            $("#highLow").text("Hi: " + high + " ° Lo: " + low + " °");
            $("#current").text(current);
            
            /*if(current === "Clear"){
                document.body.style.backgroundColor = #00BFFF;
            }*/
        });
    }
        
    function getLionAlerts() {
        //get RSS feed
        
        var rssURL = "http://getrave.com/rss/FHU/channel1";
        
        $.ajax({
            type: "GET",
            url: rssURL,
            dataType: "xml",
            error: function () {
                console.log("ERROR: Unable to load the RSS feed. Check the URL and your connection status.");
            },
            success: function (xml) {
                
                var $items = $(xml).find("item");
                
                $items.each(function(){
                    //extract alert title
                    var lionAlertTitle = $(this).find("title").text();
                    console.log(lionAlertTitle);
                    //extract alert description
                    var lionAlertDescription = $(this).find("description").text();
                    console.log(lionAlertDescription);
                    
                    var lionAlertDateString = $(this).find("pubDate").text();
                    
                    var lionAlertDate = Date(lionAlertDateString);
                    console.log(lionAlertDate);
                    
                    //display title and description on page
                    $("#lATitle").text(lionAlertTitle);
                    $("#lADescription").text(lionAlertDescription);
                    
                    if (lionAlertTitle === "/0"){
                        document.getElementById('lionAlert').style.display('none');
                    }
                    else{
                        document.getElementById('lionAlert').style.display('block');
                    }
                })
            }
        });
        
    }


    setInterval(function () {
        var currentDateTime = new Date(),
            hour = currentDateTime.getHours(),
            min = currentDateTime.getMinutes(),
            day = currentDateTime.getDay(),
            month = currentDateTime.getMonth(),
            date = currentDateTime.getDate(),
            year = currentDateTime.getFullYear(),
            meridiem, daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            monthsArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        //adds am/pm to appropriate times
        if (hour >= 12) {
            meridiem = "pm";
        } else {
            meridiem = "am";
        }
        //Displays time in 12 hours instead of 24
        if (hour > 12) {
            hour = hour - 12;
        }
        else if (hour === 0) {
            hour = hour + 12;
        }
        //Fixing minutes from looking like "1:5" instead of "1:05"
        if (min < 10) {
            min = "0" + min;
        }
        $("#time").text(hour + ":" + min + " " + meridiem);
        $("#day").text(daysOfWeek[day]);
        $("#date").text(monthsArray[month] + " " + date + "th, " + year);

        getWeather();

    }, 2000);
    
    getLionAlerts();
}

$(document).ready(main);
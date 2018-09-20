
 
const url="http://api.openweathermap.org/data/2.5/group?id=3143244,2643743,625144&APPID=12cc04f0b185a80f366dba4548b294e7";


// Create a request variable and assign a new XMLHttpRequest object to it.
const request = new XMLHttpRequest();

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', url, true);    

request.send();

request.onload = function () {
  let data = JSON.parse(this.response);
  let cities = document.getElementsByClassName("city");
  for (let i = 0; i < cities.length; i++){
      updateCity( cities[i], data.list[i])
  }
  document.getElementById("update").innerHTML = "Last update @ "+ moment().format("LLLL");
}


function updateCity(cityDiv, cityData){    
    cityDiv.querySelector('#name').innerHTML=cityData.name;
    cityDiv.querySelector('#temp').innerHTML= Math.round(cityData.main.temp-273.15)+'&#8451;';
    cityDiv.querySelector('#description').innerHTML=capFirstLetter(cityData.weather[0].description) +  '<img src="assets/icons/'+cityData.weather[0].icon+ '.png">';
    cityDiv.querySelector('#wind').innerHTML=cityData.wind.speed+" m/s, ("+ cityData.wind.deg+"&ordm;)";
    cityDiv.querySelector('#humidity').innerHTML=cityData.main.humidity+" %";
    cityDiv.querySelector('#sunrise').innerHTML= moment(cityData.sys.sunrise*1000).format("hh:mm a");
    cityDiv.querySelector('#sunset').innerHTML= moment(cityData.sys.sunset*1000).format("hh:mm a");  
}



function capFirstLetter(string){
    return string.charAt(0).toUpperCase() + string.substr(1);

}


//Update every minute
setInterval(function(){  
    request.open('GET', url, true);    
    request.send();
    }, 60000);





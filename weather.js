const oslo = "3143244";
const london = "2643743"
const minsk = "625144"
const yourAPI=""; //your api here;
 
const url="http://api.openweathermap.org/data/2.5/group?id="+oslo+","+london+","+minsk+"&APPID="+yourAPI;




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
  document.querySelector(".update").innerHTML = "Last update @ "+ moment().format("LLLL");
}


function updateCity(cityDiv, cityData){ 
    setName(cityDiv,cityData);  
    setTemp(cityDiv, cityData);
    setDescription(cityDiv, cityData)
    setWind(cityDiv, cityData);
    setHumidity(cityDiv, cityData);
    setSunrise(cityDiv, cityData);
    setSunset(cityDiv, cityData);
}



function capFirstLetter(string){
    return string.charAt(0).toUpperCase() + string.substr(1);

}
function setName(cityDiv, cityData){
    cityDiv.querySelector('.name').innerHTML=cityData.name;

}
function setTemp(cityDiv, cityData){
    cityDiv.querySelector('.temp').innerHTML= Math.round(cityData.main.temp-273.15)+'&#8451;';
}
function setDescription(cityDiv, cityData){
    cityDiv.querySelector('.description').innerHTML=capFirstLetter(cityData.weather[0].description) +  '<img src="assets/icons/'+cityData.weather[0].icon+ '.png">';

}
function setWind(cityDiv, cityData){
    cityDiv.querySelector('.wind').innerHTML=cityData.wind.speed+" m/s, ("+ cityData.wind.deg+"&ordm;)";
}

function setHumidity(cityDiv, cityData){
    cityDiv.querySelector('.humidity').innerHTML=cityData.main.humidity+" %";

}
function setSunrise(cityDiv, cityData){
    cityDiv.querySelector('.sunrise').innerHTML= moment(cityData.sys.sunrise*1000).format("hh:mm a");


}
function setSunset(cityDiv, cityData){
    cityDiv.querySelector('.sunset').innerHTML= moment(cityData.sys.sunset*1000).format("hh:mm a");  

}




//Update every minute
setInterval(function(){  
    request.open('GET', url, true);    
    request.send();
    }, 60000);





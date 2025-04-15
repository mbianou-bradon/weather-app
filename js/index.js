const windState = document.getElementById('windState');
const humidity = document.getElementById('humidity');
const visibilitySpan = document.getElementById('visibility');
const airQuality = document.getElementById('airQuality');

const todayTemp = document.getElementById("todayTemp");
const todayInfo = document.getElementById("todayInfo")
const weatherDesc = document.getElementById("weatherDesc");
const weatherType = document.getElementById("weatherType")

const searchBarValue = document.getElementById("searchBar");


const apiKey ="77cb903ad2d2c68b2e569bd5712c0f69";



async function fetchWeatherData(event) {
  event.preventDefault();
  const value = searchBarValue.value.trim();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${apiKey}&units=metric`;

    console.log("Search Value:", value);

    try {

      if (value === ""){
        return alert("Please Enter a City/Town name")
      }
        const response = await fetch(url)

        if(!response.ok){
          switch (response.status) {
            case 404:
            alert("City Not Found");
            break;
            case 500:
              alert("An Error OCCURRED, It might be from Us, Please try again later");
              break;
              default:
                alert("An Error OCCURRED, Try again")
          }
        }

        const data = await response.json();
        const {main, visibility, wind, weather} = data;
        console.log("main:", main, "visibility:", visibility, "wind:", wind, "weather:", weather )

        windState.innerText = wind.speed;
        humidity.innerText = main.humidity;
        visibilitySpan.innerText = (visibility / 1000);

        todayTemp.innerText = main.temp;
        weatherType.innerText = weather[0].main;
        weatherDesc.innerText = weather[0].description;
        
    } catch (error) {
        -console.error(error.message)
    }
}
const WeatherData = (() => {
	const weatherKey = '254c1d4b130cabefbdbb57c00e71e30a'

	async function getCityWeather(city){
		const urlTest = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${weatherKey}&units=imperial`
		const response = await fetch(urlTest, {mode: 'cors'})
		const weatherData = await response.json();
		return weatherData
	}

	return {getCityWeather,
		}
})();

async function getGIF(searchKey){
	const gifKey = "V7NVsAwidQTvClgBD7RE5xcnHcn7ZENI"
	const url = `https://api.giphy.com/v1/gifs/translate?api_key=${gifKey}&s=${searchKey}`
	const response = await fetch(url, {mode: 'cors'})
	const gifData = await response.json();
	return gifData.data.images.original.url
}

async function generateCityWeatherGIF(city){
	const img = document.querySelector('img');
	weather = await WeatherData.getCityWeather(city)
	try{
		img.src = await getGIF(weather['weather'][0]['main'] + ' weather')
	}
	catch (TypeError){
		img.src = await getGIF('sad face')
	}
}

async function generateImg(term){
	const img = document.querySelector('img');
	img.src = await getGIF(term)
}

function generateSearch(city){
	WeatherData.getCityWeather(city).then((weatherData) => {
		const result = document.getElementById('result')
		let resultHTML = `Today's weather in ${city} is ...` + '<br></br>'
		data = weatherData
		console.log(data)
		if (weatherData.cod == 200){
			resultHTML += `<b> ${data['weather'][0]['description']} </b>` + '<br></br>'
			for (var key in data.main){
				resultHTML += `<b> ${key} </b> : ${data.main[key]}`  + '<br></br>'
			}
		}
		else{
			resultHTML = "That's not a city!"  + '<br></br>'
		}

		result.innerHTML = resultHTML
	})}


function submit(){
	const form = document.querySelector('#cityForm')
	form.addEventListener('submit', (event) => {
		event.preventDefault();
		const city = document.getElementById('city').value
		if (city == ""){
			return
		}
		else{
			generateSearch(city)
			generateCityWeatherGIF(city)
		}
	})
}

submit()
generateImg('weatherman')


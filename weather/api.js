key = "V7NVsAwidQTvClgBD7RE5xcnHcn7ZENI"

const img = document.querySelector('img');

async function getCats(){
	const url = "https://api.giphy.com/v1/gifs/translate?api_key=" + key + "&s=cats"
	console.log(url)
	const response = await fetch(url, {mode: 'cors'})
	const catData = await response.json();
	img.src = catData.data.images.original.url
}

getCats()
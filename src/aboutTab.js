function aboutTab(){
	const aboutDiv = document.createElement("div")

	const aboutText = document.createElement('h3')
	aboutText.innerHTML = "concept by gloria"

	aboutDiv.appendChild(aboutText)
	
	return aboutDiv
}

export default aboutTab;
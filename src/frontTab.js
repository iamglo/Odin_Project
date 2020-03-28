function frontTab(){
	const frontDiv = document.createElement("div")

	const frontText = document.createElement('h3')
	frontText.innerHTML = "we serve noodles"

	frontDiv.appendChild(frontText)
	return frontDiv
}

export default frontTab;
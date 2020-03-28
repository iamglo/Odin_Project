function contactTab(){
	const contactDiv = document.createElement("div")

	const contactText = document.createElement('h3')
	contactText.innerHTML = "11 noodle st, noodles, ny"

	contactDiv.appendChild(contactText)
	
	return contactDiv
}

export default contactTab;
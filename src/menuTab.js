function menuTab(){
	const menuDiv = document.createElement("div")
	const menuText = document.createElement('h3')
	menuText.innerHTML = "noodles - $10"
	const menuDescription = document.createElement('h4')
	menuDescription.innerHTML = "fresh and warm instant ramen. it's what you need."

	menuDiv.appendChild(menuText)
	menuDiv.appendChild(menuDescription)

	return menuDiv
}

export default menuTab;
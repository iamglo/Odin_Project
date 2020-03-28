import frontTab from "./frontTab";
import menuTab from "./menuTab";
import aboutTab from "./aboutTab";
import contactTab from "./contactTab";


const contentDiv = document.getElementById("content");

// (function(){
// 	)
// 	})();

contentDiv.appendChild(frontTab())
addListener()

function addListener(){
	let links = document.querySelector("nav")
	console.log(links);
	for (let link of links.children){
		link.addEventListener("click", (e) => {
			updateContent(e);
		})
	}
}

function updateContent(e){
	let pageContent = document.querySelector("#content");
	let currentId = e.target.id
	let idMap = {'menu':menuTab(), 'about':aboutTab(), 'contact':contactTab()}
	pageContent.innerHTML = ""
	pageContent.appendChild(idMap[currentId])
}

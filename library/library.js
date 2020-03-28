b1 = new Book("Great Expectations", "Charles Dickens", "Unread", "544")
b2 = new Book("Moby Dick", "Herman Melville", "Unread", "")
b3 = new Book("Dune", "Frank Herbert", "Unread", "412")

myLibrary = [b1, b2, b3]

function Book(name, author, status, pages){
	this.name = name
	this.author = author
	this.status = status
	this.pages = pages

	this.getInfo = function() {
		return [this.name, this.author, this.pages, this.status]
	}

	this.getStatus = function(){
			return this.status
	}

	this.flipStatus = function(){
		if (this.status == "Unread"){
			this.status = "Read"
		}
		else{
			this.status = "Unread"
		}
	}
}

function flipStatus(id){
	var position = parseInt(id)
	var book = myLibrary[position]
	book.flipStatus()
	reload(id, position)
}

function reload(id, position){
	document.getElementById(id).innerHTML = myLibrary[position].getStatus()
}

function openForm() {
	document.getElementById("myForm").style.display = "block";
}

function closeForm() {
	document.getElementById("myForm").style.display = "none";
}

function addBookToLibrary(){
	name = document.getElementById('name').value
	author = document.getElementById('author').value
	statusElement = document.getElementById('status')
	status = statusElement.options[statusElement.selectedIndex].text
	pages = document.getElementById('pagecount').value

	var newBook = new Book(name, author, status, pages)

	myLibrary.push(newBook)

	clearTable()
	render()
	closeForm()
}

function deleteBook(id){
	var position = parseInt(id)
	myLibrary.splice(position, 1)
	clearTable()
	render()
}

function clearTable(){
	var rows = document.getElementById("table").rows;
	let table = document.getElementById("table");
	let numRows = rows.length - 1

	for (i = 0; i < numRows; i++){
		table.deleteRow(1)
	}
}

function render(){
	for (i = 0; i < myLibrary.length; i++)
	{
		var tr = document.createElement("tr")
		// tr.className += "book-row"

		for (j = 0; j < myLibrary[i].getInfo().length; j++)
		{
			var td = document.createElement("td")
			td.className += 'table-data'

			var textNode = document.createTextNode(myLibrary[i].getInfo()[j])

			// for status button
			if (j == 3){
			var button = document.createElement("button")
			button.innerHTML = myLibrary[i].getInfo()[j]
			button.setAttribute('onclick', 'flipStatus(this.id)')
			button.id = i //Array position
			td.appendChild(button)
			}

			else{
			td.appendChild(textNode)
			}

			tr.appendChild(td)
		}

		var delButton = document.createElement("button")
		delButton.className += "delButton"
		delButton.innerHTML = "Delete"
		delButton.id = i + "d"
		delButton.setAttribute('onclick', 'deleteBook(this.id)')
		tr.appendChild(delButton)

		document.getElementById("table").appendChild(tr)
	}
}

render()

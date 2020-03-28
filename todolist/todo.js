function Project(name, tasks){
  this.name = name
  this.tasks = []
}

Project.prototype.addTask = function(task){
  return this.tasks.push(task)
}

function Task(name, description, priority){
  this.name = name
  this.description = description
  this.priority = priority
  this.done = false
}

let dft = new Project("Default", [])
var projectList = [dft]
var curProject = projectList[0]

const View = (() => {
  const openForm = function (id) {
  	document.getElementById(id).style.display = "block";
  }

  const closeForm = function (id) {
  	document.getElementById(id).style.display = "none";
  }

  const renderProject = function(){
    clearTable("projectTable")
    let projectTable = document.getElementById('projectTable')
    for (i = 0; i < projectList.length; i++){
      let row = projectTable.insertRow()
      row.id = i
      row.innerHTML += `<td> ${projectList[i].name}  </td>`
      if (row.id != 0){
        row.innerHTML += `<td> <button  class = "delete" id = ${i+"b"} onclick = "Control.deleteProject(this.id)"> Delete </button> </td>`
      }
      row.innerHTML += `<td> <button  class = "edit" id = ${i+"e"} onclick = "Control.editProject(this.id, 'Default')"> Edit </button> </td>`
      row.onclick = function(){Control.switchProject(this.id)}
    }
  }

  const renderTasks = function(){
    clearTable("taskTable")
    let taskTable = document.getElementById('taskTable')
    for (i = 0; i < curProject.tasks.length; i++){
      let curTask = curProject.tasks[i]
      let row = taskTable.insertRow()
      let elements = [curTask.name, curTask.priority, curTask.description]
      for (j = 0; j < elements.length; j++){
        row.innerHTML += "<td>" + elements[j] + "</td>"
      }

      if (curTask.done){
        row.innerHTML += '<td> <input type="checkbox" checked> </td>'
      }
      else{
        row.innerHTML += '<td> <input type="checkbox"> </td>'
      }

      row.innerHTML += `<td> <button class = "delete" id = ${i+"t"} onclick = "Control.deleteTask(this.id)"> Delete </button> </td>`
    }
  }

  const clearTable = function clearTable(tableID){
  	var rows = document.getElementById(tableID).rows;
  	let table = document.getElementById(tableID);
  	let numRows = rows.length - 1

  	for (i = 0; i < numRows; i++){
  		table.deleteRow(1)
  	}
  }

  const showProject = function(){
    let projectList = document.getElementById("curProject")
    projectList.innerHTML = "Current Project : " + curProject.name
    renderTasks()
  }


  return{
    clearTable,
    openForm,
    closeForm,
    renderProject,
    renderTasks,
    showProject
  }
})()

const Control = (() => {

  const isDuplicateProject = function(name){
    for (i = 0; i < projectList.length; i++){
      if (projectList[i].name == name){
        return true
      }
      }
    return false
    }

  const addProject = function(){
    let name = document.getElementById('projectn').value
    if (!this.isDuplicateProject(name)){
      let newProject = new Project(name, [])
      projectList.push(newProject)
    }
    else{
      console.log('That project already exists!')
    }
    View.renderProject()
  }

  const deleteProject = function(id){
    let index = parseInt(id)
    if (projectList.length == 1){
      console.log("You can't delete the only project!")
    }
    else{
    projectList.splice(index, 1)
    View.renderProject()
    }
  }

  const addTask = function(){
    let name = document.getElementById('name').value
    let description = document.getElementById('description').value
    let status = document.getElementById('priority').value
    let newTask = new Task(name, description, status)
    curProject.addTask(newTask)
    View.renderTasks()
  }

// catch typeError
  const deleteTask = function(taskID){
    let taskIndex = parseInt(taskID)
    curProject.tasks.splice(taskIndex, 1)
    View.renderTasks()
  }

  const switchProject = function(projectID){
    let projectIndex = parseInt(projectID)
    curProject = projectList[projectIndex]
    View.showProject()
  }

  const editProject = function(projectID, newName ){
    let projectIndex = parseInt(projectID)
    // projectList[projectIndex].name = newName
    View.renderProject()
    View.showProject()
  }

  return{
    isDuplicateProject,
    addProject,
    deleteProject,
    addTask,
    deleteTask,
    switchProject,
    editProject
  }
})()

View.renderProject()
View.showProject()

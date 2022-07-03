showNotes();
let index;
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {

  //addTxt points to text area
  let addTxt = document.getElementById("addTxt");
  let titleTxt=document.getElementById("titleTxt");

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    //notesObj is a array of object
    notesObj = [];
  }
  else {
    notesObj = JSON.parse(localStorage.getItem("notes"));
  }
  //push and store in localstorage by JSON>stringify()
  let myNote={  //creating a myNote Object
    myTitle:titleTxt.value,
    myText:addTxt.value,
    myTime:new Date().toUTCString()
  }
 
  if(/\S/.test(myNote.myTitle)&&/\S/.test(myNote.myText)){
    notesObj.push(myNote);

  }

  localStorage.setItem("notes", JSON.stringify(notesObj));
  //after click add note button make txt area blank
  addTxt.value = " ";
  titleTxt.value=" "; 

  showNotes();
  location.reload();
});


//function to show elements from local storage
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    //creates a array notesObj either in "if" or in "else"
    notesObj = [];
  }
  else {
    notesObj = JSON.parse(localStorage.getItem("notes"));
  }
  let html = "";
  notesObj.forEach(function (element,index) {
    html = html + `
      <div class=" card border border-info notecard my-2 mx-2" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">${element.myTitle}</h5>
        <p class="card-text">${element.myText}</p>
        <p class="card-text">${element.myTime}</p>
        <button type="button" id="e${index}" class="edit btn btn-outline-info btn-sm">Edit</button>
        <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-sm btn-outline-danger">Delete Note</button>
      </div>
    </div>
      `;
  });

  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0)
    notesElm.innerHTML = html;
  else {
    notesElm.innerHTML = `Nothing to Show! Use "Add a Note" to add Your Notes.`
  }
}

//function to delete note
function deleteNote(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  }
  else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}


//search function
let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  let inputval = search.value.toLowerCase();

  let noteCards = document.getElementsByClassName("notecard");
  //iterate the array
  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;

    if (cardTxt.includes(inputval)) {
      element.style.display = "block";
    }
    else {
      element.style.display = "none";
    }
  });
});

//edit function
edits = document.getElementsByClassName('edit');
Array.from(edits).forEach((element) => {
  element.addEventListener("click", (e) => {
     tr = e.target.parentNode;
     title = tr.getElementsByTagName("h5")[0].innerText;
     description = tr.getElementsByTagName("p")[0].innerText;
     console.log("Editing .......");
     
     titleEdit.value = title;
     descriptionEdit.value = description;
    snoEdit.value = e.target.id.substr(1);
    $('#editModal').modal('toggle');
  })
})

function onEdit(){
  let titleEdit=document.getElementById("titleEdit");
  
  let descEdit=document.getElementById("descriptionEdit");
  let snoEdit=document.getElementById("snoEdit");

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    //notesObj is a array of object
    notesObj = [];
  }
  else {
    notesObj = JSON.parse(localStorage.getItem("notes"));
  }
  console.log(typeof(snoEdit.value),snoEdit.value);
  index=parseInt(snoEdit.value);
  notesObj[index].myTitle=titleEdit.value;
  notesObj[index].myText=descEdit.value;
  notesObj[index].myTime=new Date().toUTCString();

  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
  location.reload();
}
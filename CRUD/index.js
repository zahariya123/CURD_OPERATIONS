var form = `<div>
<div><img src="note.jfif" alt="" width="100px" height="100px" /></div>
  <div class="form-group">
    <label for="title">title</label>
    <input type="text" class="form-control" id="title" placeholder="Title...">
  </div>
  <div class="form-group mt-3">
    <label for="note">Note</label>
    <input type="text" class="form-control" id="note" placeholder="Notes">
  </div>
  <button type="submit" class="btn btn-primary mt-3" onclick="save()">ADD NOTES</button>
</div>`;


function table() {
  
  let table = `<br><br><table class="table">
  <thead>
  
  <tr ><th style="text-align:center; background-color:#808080;">YOUR NOTES</th></tr>
 
  <tr>
      <th >NO</th>
      <th >TITLE</th>
      <th >NOTE</th>
      <th >Edit</th>
      <th >Delete</th>
      <th >Date</th>
    </tr>

      </thead>
  <tbody>`;
  if(notes.length == 0){
    table =
    table +
    `<tr>
    <td>Nothing to Show! Use 'ADD NOTES' section for creating your notes</td>
    
  </tr> `;
  }else{
  for (let i = 0; i < notes.length; i++) {
    var d = new Date();
    table =
      table +
      `<tr>
      <td>${i + 1}</td>
      <td>${notes[i].title}</td>
      <td>${notes[i].note}</td>
      <td><button type="button" class="btn btn-warning" onclick="edit(${i})">Edit</button></td>
      <td><button type="button" class="btn btn-danger" onclick="deleteData(${i})">Delete</button></td>
      <td>${notes[i].date}</td>
    </tr> `;
  }
  }

  table =
    table +
    `</tbody>
    </table>`;
    document.getElementById("table").innerHTML = table;
}

document.getElementById("form").innerHTML = form;
notes = [];
getData();
table();
function getData() {
  let Data = localStorage.getItem("notes");
  if (Data) {
    notes = JSON.parse(Data);
  } else {
    setData();
  }
}
function setData() {
  localStorage.setItem("notes", JSON.stringify(notes));
}
function save() {
  let d = new Date()
  let title = document.getElementById("title").value;
  let note = document.getElementById("note").value;

  if (title == 0) {
    alert("name is Empty");
    return;
  }
  let user_records = new Array();
  user_records = JSON.parse(localStorage.getItem("notes"))
    ? JSON.parse(localStorage.getItem("notes"))
    : [];
  if (
    user_records.some((v) => {
      return v.title == title;
    })
  ) {
    alert("duplicate data");
  } else {
    let data = {
      title: title,
      note: note,
      date:d
    };
    notes.push(data);
    setData();

    table();
    title = "";
    note = "";
  }
}
function deleteData(index) {
  notes.splice(index, 1);
  setData();
  table();
}

function edit(index) {
  let editForm = `<div>
  <div class="form-group">
    <label for="name">Update Name</label>
    <input type="text" value="${notes[index].title}" class="form-control" id="newTitle"  placeholder="Update title">
  </div>
  <div class="form-group mt-3">
    <label for="note">Email</label>
    <input type="text" value="${notes[index].note}" class="form-control" id="newNote" placeholder="Update notes">
  </div>
  <button type="submit" class="btn btn-primary mt-3" onclick="update(${index})">Update</button>
</div>`;
  document.getElementById("form").innerHTML = editForm;
}

function update(index) {
  let newTitle = document.getElementById("newTitle");
  let newNote = document.getElementById("newNote");

  notes[index] = {
    title: newTitle.value,
    note: newNote.value,
  };
  setData();
  table();
  document.getElementById("form").innerHTML = form;
}

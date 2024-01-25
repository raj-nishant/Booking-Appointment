document.addEventListener("DOMContentLoaded", loadData);
async function loadData() {
  const response = await axios.get("http://localhost:5000/getData");
  const data = await response.data;
  try {
    if (!data) {
      throw new Error("Error");
    }
    data.forEach((element) => createUser(element));
  } catch (error) {
    // alert(error.response.data)
  }
}
let mode = "newUser";
var ul = document.getElementById("addHere");

var submitBtn = document.getElementById("schedulebutton");
submitBtn.addEventListener("click", addData);

async function addData(e) {
  e.preventDefault();
  var username = document.getElementById("name").value;
  var mobile = document.getElementById("mobile").value;
  var email = document.getElementById("email").value;
  var time = document.getElementById("time").value;
  var details = {
    username: username,
    mobile: mobile,
    email: email,
    time: time,
  };
  if (mode === "newUser") {
    try {
      const response = await axios.post(
        "http://localhost:5000/postData",
        details
      );
      const data = await response.data;
      createUser(data);
    } catch (error) {
      alert(error.message);
    }
  } else {
    try {
      const response = await axios.put(
        `http://localhost:5000/postUpdateData/${mode}`,
        details
      );
      const data = await response.data;
      mode = "newUser";
      ul.removeChild(document.getElementById(data.id).parentElement);
      createUser(data);
    } catch (error) {
      alert(error.message);
    }
  }
}

function createUser(details) {
  var li = document.createElement("li");
  var text = document.createTextNode(
    `${details.username}--${details.email}--${details.mobile}--${details.time}`
  );
  li.appendChild(text);
  var updateBtn = document.createElement("button");
  updateBtn.appendChild(document.createTextNode("UPDATE"));
  updateBtn.id = details.id;
  var deleteBtn = document.createElement("button");
  deleteBtn.appendChild(document.createTextNode("DELETE"));
  deleteBtn.id = details.id;
  li.appendChild(deleteBtn);
  li.appendChild(updateBtn);
  ul.appendChild(li);
  updateBtn.addEventListener("click", updateUser);
  deleteBtn.addEventListener("click", deleteUser);
}

async function updateUser(e) {
  const response = await axios.get(
    `http://localhost:5000/getUpdateData/${e.target.id}`
  );
  const data = await response.data;
  try {
    document.getElementById("name").value = data.username;
    document.getElementById("mobile").value = data.mobile;
    document.getElementById("email").value = data.email;
    document.getElementById("time").value = data.time;
    mode = e.target.id;
  } catch (error) {}
}

async function deleteUser(e) {
  const response = await axios.delete(
    `http://localhost:5000/deleteData/${e.target.id}`
  );
  const data = await response.data;
  try {
    ul.removeChild(e.target.parentElement);
  } catch (error) {
    console.log(error);
  }
}


const checkboxes = document.querySelectorAll(".checkbox-button");
const edits = document.querySelectorAll(".edit");
const saves = document.querySelectorAll(".save");
const deletes = document.querySelectorAll(".delete");
const labels = document.querySelectorAll("textarea");
const news = document.querySelectorAll(".new");

console.log(edits.length);

for (const checkbox of checkboxes) {
  const done = checkbox.parentElement.parentElement.getAttribute('done');
  const mark = checkbox.querySelector(".bi-check-lg");

  // Properly set checkbox status
  if (done == 1) {
    mark.classList.remove("invisible");
  } else {
    mark.classList.add("invisible");
  }

  const list_id = checkbox.parentElement.parentElement.getAttribute("list-id");
  const task_id = checkbox.parentElement.parentElement.getAttribute("task-id");

  if (task_id == "") {
    continue;
  }
  
  // Set toggle-done behavior
  const currentAddress = window.location.href;
  checkbox.addEventListener('click', function(event) {
    if (mark.classList.contains("invisible")) {
      mark.classList.remove("invisible");
    } else {
      mark.classList.add("invisible");
    }
    const newAddress = currentAddress.substring(0, currentAddress.lastIndexOf('/')) + `/toggle-done/${list_id}/${task_id}`;
    window.location.assign(newAddress);
  });
}

for (const edit of edits) {
  edit.addEventListener('click', function(event) {
    event.target.classList.add("hidden");
    event.target.previousElementSibling.classList.remove("hidden");
    console.log(event.target.parentElement.parentElement.querySelector("textarea").style.pointerEvents);
    event.target.parentElement.parentElement.querySelector("textarea").disabled = false;
  });
}

for (const save of saves) {
  const list_id = save.parentElement.parentElement.getAttribute("list-id");
  const task_id = save.parentElement.parentElement.getAttribute("task-id");
  const currentAddress = window.location.href;

  save.addEventListener('click', function(event) {
    event.target.classList.add("hidden");
    event.target.nextElementSibling.classList.remove("hidden");
    event.target.parentElement.parentElement.querySelector("textarea").disabled = true;
    event.target.parentElement.parentElement.querySelector("textarea").style.backgroundColor = "var(--color-secondary)";

    const new_label = event.target.parentElement.parentElement.querySelector("textarea").value;
    let newAddress = currentAddress.substring(0, currentAddress.lastIndexOf('/'));
    if (task_id !== "") {
      newAddress = newAddress + `/set-label/${list_id}/${task_id}/${new_label}`;
    } else {
      newAddress = newAddress + `/set-label/${list_id}/${new_label}`;
    }
    window.location.assign(newAddress);
  });
}

for (const del of deletes) {
  const type = del.getAttribute("type");
  const currentAddress = window.location.href;
  const currentList = del.getAttribute("chosen-list");
  if (type == "list") {
    const list_id = del.parentElement.parentElement.getAttribute("list-id");
    const newAddress = currentAddress.substring(0, currentAddress.lastIndexOf('/') + 1) + `delete-list/${list_id}/${currentList}`;

    del.addEventListener('click', function(event) {
      console.log("delete me!", newAddress);
      window.location.assign(newAddress);
    });
  } else if (type == "task") {
    const list_id = del.parentElement.parentElement.getAttribute("list-id");
    const task_id = del.parentElement.parentElement.getAttribute("task-id");
    const newAddress = currentAddress.substring(0, currentAddress.lastIndexOf('/') + 1) + `delete-task/${task_id}/${currentList}`;

    del.addEventListener('click', function(event) {
      console.log("delete me!", newAddress);
      window.location.assign(newAddress);
    });
  }
}

for (const label of labels) {
  // Make text fields auto resizable
  label.style.height = "auto";
  label.style.height = label.scrollHeight + 'px';
  label.addEventListener('input', function(event) {
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + 'px';
    event.target.style.backgroundColor = "var(--color-red-alert)";
  });

  // Make text fields clickable
  const list_id = label.parentElement.parentElement.parentElement.getAttribute("list-id");
  const task_id = label.parentElement.parentElement.parentElement.getAttribute("task-id");

  if (task_id === "") {
    const currentAddress = window.location.href;

    label.parentElement.addEventListener('click', function(event) {
      console.log(list_id, task_id, label.disabled);
      if (label.disabled) {
        window.location.assign(currentAddress.substring(0, currentAddress.lastIndexOf('/')) + `/${list_id}`);
      }
    });
  }
}

for (const ne of news) {
  const listOrTask = ne.getAttribute("type");
  const currentList = ne.getAttribute("chosen-list");
  const currentAddress = window.location.href;
  ne.addEventListener('click', function(event) {

    let newAddress = currentAddress;
    if (listOrTask == "list") {
      newAddress = currentAddress.substring(0, currentAddress.lastIndexOf('/') + 1) + `new-list/${currentList}`;
    } else {
      newAddress = currentAddress.substring(0, currentAddress.lastIndexOf('/') + 1) + `new-task/${currentList}`;
    }

    window.location.assign(newAddress);
  });
}

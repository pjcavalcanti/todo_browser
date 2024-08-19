const checkboxes = document.querySelectorAll(".checkbox-button");
const edits = document.querySelectorAll(".edit");
const saves = document.querySelectorAll(".save");
const deletes = document.querySelectorAll(".delete");
const labels = document.querySelectorAll("textarea");
const news = document.querySelectorAll(".new");

console.log(edits.length);

for (const checkbox of checkboxes) {
  checkbox.addEventListener('click', function(event) {
    const mark = event.target.querySelector(".bi-check-lg");
    if (mark.classList.contains("invisible")) {
      mark.classList.remove("invisible");
    } else {
      mark.classList.add("invisible");
    }
  });
}

for (const edit of edits) {
  edit.addEventListener('click', function(event) {
    event.target.classList.add("hidden");
    event.target.previousElementSibling.classList.remove("hidden");
    console.log(event.target.parentElement.parentElement.querySelector("textarea"));
    event.target.parentElement.parentElement.querySelector("textarea").disabled = false;
  });
}

for (const save of saves) {
  save.addEventListener('click', function(event) {
    event.target.classList.add("hidden");
    event.target.nextElementSibling.classList.remove("hidden");
    event.target.parentElement.parentElement.querySelector("textarea").disabled = true;
    event.target.parentElement.parentElement.querySelector("textarea").style.backgroundColor = "var(--color-secondary)";
  });
}

for (const del of deletes) {
  del.addEventListener('click', function(event) {
    console.log("delete me!");
  });
}

for (const label of labels) {
  label.addEventListener('input', function(event) {
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + 'px';
    event.target.style.backgroundColor = "var(--color-red-alert)";
  });
}

for (const ne of news) {
  ne.addEventListener('click', function(event) {
    console.log("add new item!");
  });
}

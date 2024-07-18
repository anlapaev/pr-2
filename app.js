const inputElement = document.getElementById("title");
const createBtn = document.getElementById("create");
const listElement = document.getElementById("list");

const notes = [
    {
        title: "fgdfgsdfsfd",
        completed: false,
    },
    {
        title: "dfsdfsdffs",
        completed: true,
    },
];
function render() {
    listElement.innerHTML = "";
    if (notes.length === 0) {
        listElement.innerHTML = '<p>Нет элементов</p>'
    }
    for (let i = 0; i < notes.length; i++) {
        listElement.insertAdjacentHTML(
            "beforeend",
            getNoteTemplate(notes[i], i)
        );
    }
}

render();

function getNoteTemplate(note, index) {
    return `
    <li
          class="list-group-item d-flex justify-content-between align-items-center"
        >
          <span class="${
              note.completed ? "text-decoration-line-through" : ""
          }">${note.title}</span>
          <span>
            <span class="btn btn-small btn-${
                note.completed ? "warning" : "success"
            }" data-index="${index}" data-type="toggle">&check;</span>
            <span class="btn btn-small btn-danger" data-index="${index}" data-type="remove">&times;</span>
          </span>
        </li>
    `;
}

createBtn.onclick = function () {
    // listElement.innerHTML = ;
    if (inputElement.value.length === 0) {
        return;
    }

    const newNote = {
        title: inputElement.value,
        completed: false,
    };
    notes.push(newNote);
    render();
    inputElement.value = "";
};

listElement.onclick = function (event) {
    if (event.target.dataset.index) {
        const index = Number(event.target.dataset.index);
        const type = event.target.dataset.type;

        if (type === "toggle") {
            notes[index].completed = !notes[index].completed;
        } else if (type === "remove") {
            notes.splice(index, 1)
        }
        render();
    }
};

// Старая версия

// function render() {
//     // for (let i = 0; i < notes.length; i++) {
//     //     listElement.insertAdjacentHTML("beforeend", getNoteTemplate(notes[i]));
//     // }
//     for (let note of notes) {
//         listElement.insertAdjacentHTML("beforeend", getNoteTemplate(note));
//     }
// }

// render();

// createBtn.onclick = function () {
//     // listElement.innerHTML = ;
//     if (inputElement.value.length === 0) {
//         return;
//     }
//     listElement.insertAdjacentHTML(
//         "beforeend",
//         getNoteTemplate(inputElement.value)
//     );
//     inputElement.value = "";
// };

// function getNoteTemplate(title) {
//     return `
//     <li
//           class="list-group-item d-flex justify-content-between align-items-center"
//         >
//           <span>${title}</span>
//           <span>
//             <span class="btn btn-small btn-success">&check;</span>
//             <span class="btn btn-small btn-danger">&times;</span>
//           </span>
//         </li>
//     `;
// }

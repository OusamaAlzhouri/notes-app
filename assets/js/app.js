'use strict';

const notes = [];
const form = document.getElementById("noteForm");
const notesList = document.getElementById("notesList");
const count = document.getElementById("count");
const error = document.getElementById("error");

class Note {
    #title;
    #content;
    #date;

    constructor(title, content) {
        this.#title = title;
        this.#content = content;
        this.#date = new Date().toLocaleDateString();
    }
    get title() { return this.#title; }
    get content() { return this.#content; }
    get date() { return this.#date; }
}

form.addEventListener("submit", function(event) {
    event.preventDefault();
    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();

    if (!title || !content) {
        error.textContent = "Both fields are required!";
        return;
    }
    error.textContent = "";
    const note = new Note(title, content);
    notes.unshift(note);
    listEntries();
    form.reset();
});

function listEntries() {
    notesList.innerHTML = "";
    notes.forEach((note, index) => {
        const div = document.createElement("div");
        div.classList.add("note");
        div.innerHTML = `<strong>${note.title}</strong><br>
                         ${note.content}<br>
                         <small>${note.date}</small>
                         <span class="delete-btn" onclick="deleteEntry(${index})">&times;</span>`;
        notesList.appendChild(div);
    });
    count.textContent = notes.length;
}

function deleteEntry(index) {
    notes.splice(index, 1);
    listEntries();
}

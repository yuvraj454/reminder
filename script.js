// Select elements
const musicNoteBtn = document.getElementById("music-note-btn");
const noteInput = document.getElementById("note-input");
const timePicker = document.getElementById("time-picker");
const listenBtn = document.getElementById("listen-btn");
const remindBtn = document.getElementById("remind-btn");

// Array to store notes
let notes = JSON.parse(localStorage.getItem("notes")) || [];

// Handle Music Note Click (Show Input Box)
musicNoteBtn.addEventListener("click", function () {
    noteInput.style.display = "block";  // Show input box
    noteInput.focus();  // Focus on input
});

// Handle Enter Key (Save Note)
noteInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        let noteText = noteInput.value.trim();
        if (noteText) {
            notes.push(noteText);
            localStorage.setItem("notes", JSON.stringify(notes));  // Save notes
            alert("Note Saved!");
        }
        noteInput.value = "";  // Clear input
        noteInput.style.display = "none";  // Hide input
    }
});

// Handle Listen Button (Text-to-Speech)
listenBtn.addEventListener("click", function () {
    let allNotes = notes.join(". ");
    if (allNotes) {
        let speech = new SpeechSynthesisUtterance(allNotes);
        speechSynthesis.speak(speech);
    } else {
        alert("No notes to read!");
    }
});

// Handle Remind Me Button (Open Time Picker)
remindBtn.addEventListener("click", function () {
    timePicker.style.display = "block";
    timePicker.focus();
});

// Handle Time Picker Selection (Set Alarm)
timePicker.addEventListener("change", function () {
    let selectedTime = timePicker.value;
    if (!selectedTime) return;

    let now = new Date();
    let [hour, minute] = selectedTime.split(":").map(Number);
    let reminderTime = new Date();

    reminderTime.setHours(hour);
    reminderTime.setMinutes(minute);
    reminderTime.setSeconds(0);

    let timeDifference = reminderTime - now;

    if (timeDifference <= 0) {
        alert("Please select a future time!");
        return;
    }

    alert(`Reminder set for ${selectedTime}.`);

    setTimeout(() => {
        alert("Reminder: " + notes.join("\n"));
    }, timeDifference);
});

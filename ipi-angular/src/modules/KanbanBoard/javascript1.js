// Dodaj zadatak
const modal = document.getElementById("taskModal");
const taskInput = document.getElementById("taskInput");

document.getElementById("addTaskBtn").addEventListener("click", () => {
    modal.style.display = "block";
    taskInput.value = "";
    taskInput.focus();
});

// Handle modal buttons
document.getElementById("modalAdd").addEventListener("click", () => {
    let text = taskInput.value.trim();
    if (text === "") return;

    const task = createTask(text);
    document.querySelector('[data-status="todo"] .taskList').appendChild(task);

    modal.style.display = "none";
});

document.getElementById("modalCancel").addEventListener("click", () => {
    modal.style.display = "none";
});

// Kreiraj novi zadatak
function createTask(text) {
    const task = document.createElement("div");
    task.classList.add("task");
    task.textContent = text;

    task.draggable = true;

    task.addEventListener("dragstart", () => {
        task.classList.add("dragging");
    });

    task.addEventListener("dragend", () => {
        task.classList.remove("dragging");
    });

    return task;
}

// Handle Drag & Drop
document.querySelectorAll(".taskList").forEach(list => {
    list.addEventListener("dragover", e => {
        e.preventDefault();
        const dragging = document.querySelector(".dragging");
        list.appendChild(dragging);
    });
});

// Ocisti plocu
const clearModal = document.getElementById("clearModal");

document.getElementById("clearBoardBtn").addEventListener("click", () => {
    clearModal.style.display = "block";
});

// “DA - Ocisti plocu”
document.getElementById("clearYes").addEventListener("click", () => {
    document.querySelectorAll(".taskList").forEach(list => list.innerHTML = "");
    clearModal.style.display = "none";
});

// “NE – Cancel”
document.getElementById("clearNo").addEventListener("click", () => {
    clearModal.style.display = "none";
});

// Zatvori van modala
window.addEventListener("click", e => {
    if (e.target === clearModal) {
        clearModal.style.display = "none";
    }
});

// Snimi plocu kao PNG
document.getElementById("saveBoardBtn").addEventListener("click", () => {
    html2canvas(document.body).then(canvas => {
        const link = document.createElement("a");
        link.download = "kanban_board.png";
        link.href = canvas.toDataURL();
        link.click();
    });
});

// Ucitaj html2canvas dynamically
const script = document.createElement("script");
script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
document.body.appendChild(script);

window.addEventListener("click", e => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

/* ================================
   EMAIL MODAL + POŠALJI MAILOM
   ================================ */

const emailModal = document.getElementById("emailModal");
const openEmailBtn = document.getElementById("emailBtn");
const emailSendBtn = document.getElementById("emailSend");
const emailCancelBtn = document.getElementById("emailCancel");
const emailInput = document.getElementById("emailInput");

// Otvori email modal
openEmailBtn.addEventListener("click", () => {
    emailModal.style.display = "block";
    emailInput.value = "";
});

// Zatvori modal
emailCancelBtn.addEventListener("click", () => {
    emailModal.style.display = "none";
});

// Klik van modala zatvara
window.addEventListener("click", e => {
    if (e.target === emailModal) {
        emailModal.style.display = "none";
    }
});

// Pošalji mail
emailSendBtn.addEventListener("click", () => {
    let email = emailInput.value.trim();
    if (email === "") return;

    // Skupi sadržaj svih kolona
    let todo = [...document.querySelectorAll('[data-status="todo"] .task')]
        .map(t => "- " + t.textContent).join("\n");

    let doing = [...document.querySelectorAll('[data-status="doing"] .task')]
        .map(t => "- " + t.textContent).join("\n");

    let done = [...document.querySelectorAll('[data-status="done"] .task')]
        .map(t => "- " + t.textContent).join("\n");

    // Format za mail
    let body =
        "KANBAN BOARD\n\n" +
        "TO DO:\n" + (todo || "—") + "\n\n" +
        "DOING:\n" + (doing || "—") + "\n\n" +
        "DONE:\n" + (done || "—");

    // Mailto
    let mailto = `mailto:${email}?subject=Moja Kanban ploča&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;

    emailModal.style.display = "none";
});

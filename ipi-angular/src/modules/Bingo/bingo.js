// ---------------- GENERISANJE BINGO TABLE ----------------

let gameOver = false;
let markedCount = 0;

function generateBoard() {
    const table = document.getElementById("bingoBoard");
    table.innerHTML = "";
    gameOver = false;
    markedCount = 0;

    hideWinLose();
    clearConfetti();

    let numbers = [];
    while (numbers.length < 25) {
        let num = Math.floor(Math.random() * 75) + 1;
        if (!numbers.includes(num)) numbers.push(num);
    }

    let index = 0;

    for (let i = 0; i < 5; i++) {
        let row = document.createElement("tr");

        for (let j = 0; j < 5; j++) {
            let cell = document.createElement("td");
            cell.textContent = numbers[index];
            index++;

            cell.addEventListener("click", () => {
                if (gameOver) return;

                cell.classList.toggle("marked");

                markedCount = document.querySelectorAll(".marked").length;

                checkWin();
                checkLose();
            });

            row.appendChild(cell);
        }

        table.appendChild(row);
    }
}

// ---------------- PROVJERA POBJEDE ----------------

function checkWin() {
    const table = document.getElementById("bingoBoard");
    const rows = table.rows;

    for (let i = 0; i < 5; i++) {
        if ([...rows[i].cells].every(c => c.classList.contains("marked"))) return showWin();
    }

    for (let j = 0; j < 5; j++) {
        let col = true;
        for (let i = 0; i < 5; i++) {
            if (!rows[i].cells[j].classList.contains("marked")) col = false;
        }
        if (col) return showWin();
    }

    if ([0,1,2,3,4].every(i => rows[i].cells[i].classList.contains("marked"))) return showWin();
    if ([0,1,2,3,4].every(i => rows[i].cells[4-i].classList.contains("marked"))) return showWin();
}

// ---------------- PROVJERA PORAZA ----------------

function checkLose() {
    if (markedCount >= 15 && !gameOver) {
        showLose();
    }
}

// ---------------- WIN/LOSE ----------------

function showWin() {
    gameOver = true;
    document.getElementById("winMessage").style.display = "flex";
    launchConfetti();
}

function showLose() {
    gameOver = true;

    let loseMsg = document.getElementById("loseMessage");
    if (!loseMsg) {
        loseMsg = document.createElement("div");
        loseMsg.id = "loseMessage";
        loseMsg.className = "win-message";
        loseMsg.style.background = "#ff4444";
        loseMsg.textContent = "😞 IZGUBIO/LA SI!";
        document.body.appendChild(loseMsg);
    }

    loseMsg.style.display = "flex";
}

function hideWinLose() {
    document.getElementById("winMessage").style.display = "none";

    let loseMsg = document.getElementById("loseMessage");
    if (loseMsg) loseMsg.style.display = "none";
}

// ---------------- CONFETTI ----------------

function launchConfetti() {
    for (let i = 0; i < 40; i++) {
        let conf = document.createElement("div");
        conf.classList.add("confetti-piece");
        conf.style.position = "fixed";
        conf.style.top = "-20px";
        conf.style.left = Math.random() * window.innerWidth + "px";
        conf.style.width = "8px";
        conf.style.height = "14px";
        conf.style.background = randomColor();
        conf.style.opacity = "0.9";
        conf.style.zIndex = "99999";
        conf.style.animation = "fall 1.8s linear forwards";

        document.body.appendChild(conf);

        setTimeout(() => conf.remove(), 2000);
    }
}

function clearConfetti() {
    document.querySelectorAll(".confetti-piece").forEach(e => e.remove());
}

function randomColor() {
    const colors = ["#00e1ff", "#00c4dd", "#ffffff"];
    return colors[Math.floor(Math.random() * colors.length)];
}

// ---------------- EVENT ZA NOVU TABLU ----------------

document.getElementById("newBoardBtn").addEventListener("click", generateBoard);

// ---------------- PDF DOWNLOAD (SLIKA KAO NA DRUGOJ SLICI) ----------------

document.getElementById("downloadPdfBtn").addEventListener("click", function () {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF("p", "mm", "a4");

    const board = document.querySelector(".board-container");

    html2canvas(board, {
        scale: 3,
        backgroundColor: "#0c0e12" // da PDF zadrži tamnu pozadinu
    }).then(canvas => {

        const imgData = canvas.toDataURL("image/png");

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        const imgWidth = pdfWidth - 20;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        const x = 10;
        const y = (pdfHeight - imgHeight) / 2;

        pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);
        pdf.save("bingo_kartica.pdf");
    });
});

// ---------------- POPUP EMAIL ----------------

const popup = document.getElementById("emailPopup");
const cancelPopupBtn = document.getElementById("cancelPopupBtn");
const sendEmailPopupBtn = document.getElementById("confirmSendBtn");

document.getElementById("sendEmailBtn").addEventListener("click", () => {
    popup.style.display = "flex";
});

cancelPopupBtn.addEventListener("click", () => {
    popup.style.display = "none";
});

sendEmailPopupBtn.addEventListener("click", () => {
    const email = document.getElementById("emailInput").value.trim();
    if (email === "") {
        alert("Unesite email adresu!");
        return;
    }

    let table = document.getElementById("bingoBoard");
    let text = "Moja Bingo kartica:%0D%0A%0D%0A";

    for (let i = 0; i < table.rows.length; i++) {
        let rowData = "";
        for (let j = 0; j < table.rows[i].cells.length; j++) {
            rowData += table.rows[i].cells[j].textContent + " ";
        }
        text += rowData + "%0D%0A";
    }

    window.location.href = `mailto:${email}?subject=Bingo%20Kartica&body=${text}`;

    popup.style.display = "none";
});

// ---------------- START ----------------

generateBoard();

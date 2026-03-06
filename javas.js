/**
 * MODUL 3 - JAVASCRIPT FORM (VERSI TERPISAH)
 * File: javas.js
 */

// ==================== STATE ====================
let darkMode = false;

// ==================== DOM READY ====================
document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("contactForm");
    const namaInput = document.getElementById("nama");
    const emailInput = document.getElementById("email");
    const pesanInput = document.getElementById("pesan");
    const resultBox = document.getElementById("resultBox");

    /* ==================== COUNTER KARAKTER ==================== */
    const charCounter = document.createElement("small");
    charCounter.id = "charCounter";
    charCounter.style.display = "block";
    charCounter.style.textAlign = "right";
    charCounter.style.marginTop = "5px";
    charCounter.style.color = "#666";
    pesanInput.parentNode.appendChild(charCounter);

    /* ==================== TOGGLE MODE ==================== */
    const toggleBtn = document.createElement("button");
    toggleBtn.id = "darkModeToggle";
    toggleBtn.type = "button";
    toggleBtn.textContent = "🌙 Mode Gelap";
    toggleBtn.style.marginBottom = "15px";
    toggleBtn.style.backgroundColor = "#6c757d";
    toggleBtn.style.color = "#fff";
    toggleBtn.style.border = "none";
    toggleBtn.style.padding = "8px 12px";
    toggleBtn.style.borderRadius = "5px";

    form.parentNode.insertBefore(toggleBtn, form);

    /* ==================== EVENT SUBMIT ==================== */
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const nama = namaInput.value.trim();
        const email = emailInput.value.trim();
        const pesan = pesanInput.value.trim();

        if (!validasiInput(nama, email, pesan)) return;

        tampilkanHasil(nama, email, pesan);
        form.reset();
        updateCharCounter("");
    });

    /* ==================== EVENT LAIN ==================== */
    pesanInput.addEventListener("input", () => updateCharCounter(pesanInput.value));
    emailInput.addEventListener("blur", () => validasiEmail(emailInput));
    toggleBtn.addEventListener("click", toggleMode);

    updateCharCounter("");

    /* ==================== FUNGSI ==================== */

    function validasiInput(nama, email, pesan) {
        if (!nama || !email || !pesan) {
            alert("Semua field wajib diisi!");
            return false;
        }
        if (nama.length < 3) {
            alert("Nama minimal 3 karakter!");
            return false;
        }
        if (pesan.length < 10) {
            alert("Pesan minimal 10 karakter!");
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert("Email tidak valid!");
            return false;
        }
        return true;
    }

    function tampilkanHasil(nama, email, pesan) {
        resultBox.innerHTML = `
            <h3>✅ Data Terkirim</h3>
            <p><b>Nama:</b> ${escapeHTML(nama)}</p>
            <p><b>Email:</b> ${escapeHTML(email)}</p>
            <p><b>Pesan:</b> ${escapeHTML(pesan)}</p>
            <small>${new Date().toLocaleString("id-ID")}</small>
        `;

        resultBox.style.display = "block";
        resultBox.style.opacity = 0;
        resultBox.style.transition = "opacity .5s";
        resultBox.offsetHeight;
        resultBox.style.opacity = 1;
    }

    function updateCharCounter(text) {
        charCounter.textContent = `${text.length} / 200 karakter`;
        charCounter.style.color =
            text.length > 180 ? "#dc3545" :
            text.length > 150 ? "#ffc107" : "#666";
    }

    function validasiEmail(input) {
        if (input.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
            input.style.borderColor = "#dc3545";
        } else {
            input.style.borderColor = "#ccc";
        }
    }

    function escapeHTML(str) {
        return str.replace(/[&<>"']/g, m => ({
            "&": "&amp;", "<": "&lt;", ">": "&gt;",
            '"': "&quot;", "'": "&#039;"
        }[m]));
    }

    function toggleMode() {
        darkMode = !darkMode;
        const container = document.querySelector(".container");

        if (darkMode) {
            document.body.style.background = "#141414";
            container.style.background = "#2d2d2d";
            container.style.color = "#130606";
            toggleBtn.textContent = "☀️ Mode Terang";
        } else {
            document.body.style.background = "#ecf3fd";
            container.style.background = "#fff";
            container.style.color = "#333";
            toggleBtn.textContent = "🌙 Mode Gelap";
        }
    }
});
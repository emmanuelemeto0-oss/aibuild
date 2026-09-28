const themeToggle = document.querySelector(".theme-toggle");
const themeLabel = document.querySelector(".toggle-label");
const bagCount = document.querySelector(".bag-count");
const bagButton = document.querySelector(".bag-button");
const toast = document.querySelector(".toast");
let count = 0;
let toastTimer;

function applyTheme(theme) {
	document.body.dataset.theme = theme;
	const darkMode = theme === "dark";
	themeToggle.setAttribute("aria-pressed", String(darkMode));
	themeToggle.setAttribute("aria-label", `Switch to ${darkMode ? "light" : "dark"} mode`);
	themeLabel.textContent = darkMode ? "Light" : "Dark";
	document.querySelector('meta[name="theme-color"]').content = darkMode ? "#20241f" : "#f5f5f0";
}

const savedTheme = localStorage.getItem("form-field-theme");
applyTheme(savedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));

themeToggle.addEventListener("click", () => {
	const nextTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
	applyTheme(nextTheme);
	localStorage.setItem("form-field-theme", nextTheme);
});

function showToast(message) {
	toast.textContent = message;
	toast.classList.add("is-visible");
	window.clearTimeout(toastTimer);
	toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2400);
}

document.querySelectorAll(".add-button").forEach((button) => {
	button.addEventListener("click", () => {
		count += 1;
		bagCount.textContent = String(count);
		bagButton.setAttribute("aria-label", `Shopping bag, ${count} ${count === 1 ? "item" : "items"}`);
		bagCount.classList.remove("is-updated");
		requestAnimationFrame(() => bagCount.classList.add("is-updated"));
		showToast(`${button.dataset.product} added to your bag`);
	});
});

document.querySelectorAll(".quick-view").forEach((button) => {
	button.addEventListener("click", () => showToast(`${button.dataset.quickView} · A considered essential, made to last.`));
});

bagButton.addEventListener("click", () => {
	showToast(count ? `Your bag has ${count} ${count === 1 ? "item" : "items"}.` : "Your bag is ready for something considered.");
});

import { updateResultItems } from "./words.js";

// look up word from search bar
document.addEventListener("DOMContentLoaded", () => {
    const f = document.getElementById("searchForm");
    if (!f) return;
    f.addEventListener("submit", e => {
        e.preventDefault();
        const v = document.getElementById("searchInput").value.trim();
        if (v) document.getElementById("resultsSection").style.display = "block";

        updateResultItems(v);
    });
});

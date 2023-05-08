let tableBody = document.querySelector("tbody");
let prevButton = document.querySelector("#prev");
let nextButton = document.querySelector("#next");

let shownLevel = 0;
let shownSortBy = "timeMs";
let shownAscending = true;
let shownPage = 1;
let maxShownPage = 1;

parent.addEventListener("message", ({ data }) => {
    if (data.name === "leaderboard-created") {
        tableBody = document.querySelector("tbody");
        prevButton = document.querySelector("#prev");
        nextButton = document.querySelector("#next");
    } else if (data.name === "leaderboard-data") {
        showLeaderboard(data.value);
    }
});

function getLeaderboard(level, page, sortBy, ascending) {
    parent.c3_callFunction("GetLeaderboard", [level, page, sortBy, ascending]);
}

function showLeaderboard({ page, maxPage, items }) {
    tableBody.innerHTML = "";

    items.forEach((item, index) => {
        tableBody.innerHTML += `
				<tr>
					<th scope="row">${(page - 1) * 5 + index + 1}</th>
					<td>${escapeHtml(item.username)}</td>
					<td>${parent.c3_callFunction("FormatTime", [item.timeMs / 1000])}</td>
					<td>${item.actions}</td>
					<td>${item.codeBlocks}</td>
					<td>${new Date(item.createdAt).toLocaleString()}</td>
				</tr>
				`;
    });

    shownPage = page;
    maxShownPage = maxPage;

    if (shownPage <= 1) {
        prevButton.classList.add("disabled");
    } else {
        prevButton.classList.remove("disabled");
    }

    if (shownPage >= maxShownPage) {
        nextButton.classList.add("disabled");
    } else {
        nextButton.classList.remove("disabled");
    }
}

function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function changePage(goToNext) {
    if ((goToNext && shownPage >= maxShownPage) || (!goToNext && shownPage <= 1)) {
        return;
    }

    const newPage = shownPage + (goToNext ? 1 : -1);

    getLeaderboard(shownLevel, newPage, shownSortBy, shownAscending);
}

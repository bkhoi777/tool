// =====================
// ACCORDION
// =====================

const acc = document.getElementsByClassName("accordion");

for (let i = 0; i < acc.length; i++) {

    acc[i].addEventListener("click", function () {

        this.classList.toggle("active");

        const panel = this.nextElementSibling;

        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }

    });

}


// =====================
// COPY CODE BLOCK
// =====================

const codeBlocks = document.querySelectorAll("pre");

codeBlocks.forEach(function (block) {

    block.addEventListener("click", function () {

        const text = block.innerText;

        navigator.clipboard.writeText(text).then(function () {

            block.classList.add("copied");

            setTimeout(function () {

                block.classList.remove("copied");

            }, 1500);

        });

    });

});


// =====================
// SEARCH BOX
// =====================

const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");

const pages = {

    "Home": "index.html",
    "Windows / Office": "windows-office.html",
    "Active Windows / Office": "active.html",
    "Download Office": "office.html",
    "Adobe": "adobe.html",
    "Autodesk": "autodesk.html",
    "Optimizer Win": "optimizer.html"

};

if (searchInput && searchResults) {

    searchInput.addEventListener("input", function () {

        const query = this.value.toLowerCase().trim();

        searchResults.innerHTML = "";

        if (!query) {

            searchResults.style.display = "none";
            return;

        }

        Object.keys(pages).forEach((title) => {

            if (title.toLowerCase().includes(query)) {

                const li = document.createElement("li");

                li.innerHTML = title.replace(
                    new RegExp(query, "gi"),
                    (match) => `<mark>${match}</mark>`
                );

                li.addEventListener("click", () => {

                    window.location.href = pages[title];

                });

                searchResults.appendChild(li);

            }

        });

        searchResults.style.display =
            searchResults.children.length > 0 ? "block" : "none";

    });

    searchInput.addEventListener("keydown", (e) => {

        if (e.key === "Enter") {

            e.preventDefault();

            const firstResult = searchResults.querySelector("li");

            if (firstResult) {

                const title = firstResult.textContent.trim();

                if (pages[title]) {

                    window.location.href = pages[title];

                }

            }

        }

    });

    document.addEventListener("click", (e) => {

        if (
            !searchInput.contains(e.target) &&
            !searchResults.contains(e.target)
        ) {

            searchResults.style.display = "none";

        }

    });

}


// =====================
// SIDEBAR TOGGLE
// =====================

const sidebar = document.querySelector(".sidebar");
const main = document.querySelector(".main");
const toggle = document.getElementById("sidebar-toggle");

if (sidebar && main && toggle) {

    function setSidebar(closed) {

        sidebar.classList.toggle("closed", closed);
        main.classList.toggle("expand", closed);

        // Chỉ lưu trạng thái khi đang ở Desktop
        if (window.innerWidth > 768) {
            localStorage.setItem("sidebarClosed", closed);
        }

    }

    // Khôi phục trạng thái khi mở trang
    const saved = localStorage.getItem("sidebarClosed");

    if (window.innerWidth <= 768) {

        // Mobile mặc định luôn đóng
        setSidebar(true);

    } else {

        // Desktop dùng trạng thái đã lưu
        if (saved !== null) {
            setSidebar(saved === "true");
        }

    }

    toggle.addEventListener("click", () => {

        const closed = !sidebar.classList.contains("closed");

        setSidebar(closed);

    });

    // =====================
    // RESPONSIVE
    // =====================

    let isMobile = window.innerWidth <= 768;

    window.addEventListener("resize", () => {

        const mobile = window.innerWidth <= 768;

        // Chỉ chạy khi chuyển Desktop <-> Mobile
        if (mobile !== isMobile) {

            isMobile = mobile;

            if (mobile) {

                // Sang Mobile -> luôn đóng
                setSidebar(true);

            } else {

                // Quay lại Desktop -> khôi phục trạng thái cũ
                const saved = localStorage.getItem("sidebarClosed");

                if (saved !== null) {
                    setSidebar(saved === "true");
                } else {
                    setSidebar(false);
                }

            }

        }

    });

}
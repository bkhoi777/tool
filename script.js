
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}

var acc = document.getElementsByClassName("accordion1");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}




// ========== COPY CODE BLOCK ==========
var codeBlocks = document.querySelectorAll("pre");

codeBlocks.forEach(function (block) {
  block.addEventListener("click", function () {
    var text = block.innerText;

    navigator.clipboard.writeText(text).then(function () {
      block.classList.add("copied");

      setTimeout(function () {
        block.classList.remove("copied");
      }, 1500);
    });
  });
});


// ========= SEARCH BOX =========
const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");

// Đây là danh sách các trang bạn có trong sidebar/topbar
// Key: tên hiển thị, Value: link file html
const pages = {
  "Home": "index.html",
  "Windows / Office": "windows-office.html",
  "Active Windows / Office": "active.html",
  "Download Office": "office.html",
  "Adobe": "adobe.html",
  "Autodesk": "autodesk.html",
  "Optimizer Win": "optimizer.html"
};

// Hiển thị dropdown khi gõ
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
      // highlight từ khóa
      li.innerHTML = title.replace(
        new RegExp(query, "gi"),
        (match) => `<mark>${match}</mark>`
      );

      // click → chuyển trang
      li.addEventListener("click", () => {
        window.location.href = pages[title];
      });

      searchResults.appendChild(li);
    }
  });

  searchResults.style.display =
    searchResults.children.length > 0 ? "block" : "none";
});

// Nhấn Enter → chọn kết quả đầu tiên
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    const firstResult = searchResults.querySelector("li");
    if (firstResult) {
      const title = firstResult.textContent.trim();
      const link = pages[title];
      if (link) window.location.href = link;
    }
  }
});

// Ẩn dropdown khi click ra ngoài
document.addEventListener("click", (e) => {
  if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
    searchResults.style.display = "none";
  }
});

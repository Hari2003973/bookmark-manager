const API = "https://your-backend-url.onrender.com/bookmarks";

function loadBookmarks() {
  fetch(API)
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById("list");
      list.innerHTML = "";
      data.forEach(b => {
        list.innerHTML += `
          <li>
            <b>${b.title}</b> - 
            <a href="${b.url}" target="_blank">${b.url}</a>
            <button onclick="deleteBookmark(${b.id})">❌</button>
          </li>
        `;
      });
    });
}

function addBookmark() {
  const title = document.getElementById("title").value;
  const url = document.getElementById("url").value;

  fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, url })
  }).then(() => loadBookmarks());
}

function deleteBookmark(id) {
  fetch(`${API}/${id}`, { method: "DELETE" })
    .then(() => loadBookmarks());
}

loadBookmarks();
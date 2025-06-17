var bookmarkNameInput = document.getElementById("bookmarkNameInput");
var siteURLInput = document.getElementById("siteURLInput");

var websites = [];
if (localStorage.getItem("websites") !== null) {
  websites = JSON.parse(localStorage.getItem("websites"));
  displayWebsites();
}

function validatename(name) {
  var namePattern = /^[a-zA-Z0-9\s]+$/;
  return namePattern.test(name);
}

function validateURL(url) {
  var urlPattern = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(:\d+)?(\/.*)?$/;
  return urlPattern.test(url);
}

function addsite() {
  if (bookmarkNameInput.value === "" || siteURLInput.value === "") {
    alert("Please fill in all fields.");
    return;
  }
  if (!validatename(bookmarkNameInput.value)) {
    alert("Please enter a valid name (letters and numbers only).");
    return;
  }
  if (!validateURL(siteURLInput.value)) {
    alert("Please enter a valid URL (e.g., http://example.com).");
    return;
  }

  var site = {
    name: bookmarkNameInput.value,
    url: siteURLInput.value,
  };

  websites.push(site);
  console.log(websites);
  localStorage.setItem("websites", JSON.stringify(websites));
  displayWebsites();
  bookmarkNameInput.value = "";
  siteURLInput.value = "";
}

function displayWebsites() {
  var siteRecord = "";
  for (var i = 0; i < websites.length; i++) {
    siteRecord += `
          <tr>
            <td>${i + 1}</td>
            <td>${websites[i].name}</td>
            <td>
              <button type="button" class="btn btn-success" onclick='location.href="${
                websites[i].url
              }"'><i class="fa-solid fa-eye"></i> Visit</a></button>
              </td>
            <td>
              <button onclick="deleteSite(${i})" class="btn btn-danger"><i class="fa-solid fa-trash"></i> Delete</button>
            </td>
          </tr>`;
  }

  document.getElementById("tBody").innerHTML = siteRecord;
}

function deleteSite(index) {
  websites.splice(index, 1);
  localStorage.setItem("websites", JSON.stringify(websites));
  displayWebsites();
}

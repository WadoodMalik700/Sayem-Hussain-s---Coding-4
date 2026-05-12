function login() {
  window.location.href = "home.html";
}

function logout() {
  window.location.href = "index.html";
}


function toggleDarkMode() {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("darkMode", "enabled");
  } else {
    localStorage.setItem("darkMode", "disabled");
  }
}

if (localStorage.getItem("darkMode") === "enabled") {
  document.body.classList.add("dark");
}


function changeTextSize(size) {
  document.body.classList.remove(
    "small-text",
    "medium-text",
    "large-text"
  );

  document.body.classList.add(size + "-text");

  localStorage.setItem("textSize", size);
}

const savedSize = localStorage.getItem("textSize");

if (savedSize) {
  document.body.classList.add(savedSize + "-text");
} else {
  document.body.classList.add("medium-text");
}


let moodData = [3];
let chart;

function setMood(mood, value) {
  document.getElementById("result").innerText =
    "Current mood: " + mood;

  moodData.push(value);

  updateChart();
}

window.onload = function () {
  const ctx =
    document.getElementById("moodChart");

  if (ctx) {
    chart = new Chart(ctx, {
      type: "line",

      data: {
        labels: ["1"],

        datasets: [
          {
            label: "Mood Level",
            data: moodData,
            borderWidth: 3,
            tension: 0.3
          }
        ]
      },

      options: {
        responsive: true,

        scales: {
          y: {
            min: 1,
            max: 5
          }
        }
      }
    });
  }
};

function updateChart() {
  if (!chart) return;

  chart.data.labels.push(
    chart.data.labels.length + 1
  );

  chart.data.datasets[0].data = moodData;

  chart.update();
}


const registeredEvents = {};

function toggleRegister(id) {
  const element =
    document.getElementById(id);

  let currentSpaces = parseInt(
    element.innerText.replace(/\D/g, "")
  );

  if (!registeredEvents[id]) {
    currentSpaces--;
    registeredEvents[id] = true;

    alert("Registered successfully");
  } else {
    currentSpaces++;
    registeredEvents[id] = false;

    alert("Unregistered successfully");
  }

  element.innerText =
    "Spaces left: " + currentSpaces;
}

function addEvent() {
  const name =
    document.getElementById("eventName").value;

  const date =
    document.getElementById("eventDate").value;

  const time =
    document.getElementById("eventTime").value;

  const spaces =
    document.getElementById("eventSpaces").value;

  const list =
    document.getElementById("eventList");

  if (name !== "") {
    const eventId =
      "event" + Date.now();

    const card =
      document.createElement("div");

    card.classList.add("card", "blue");

    card.innerHTML = `
      <div class="card-title">${name}</div>

      <div class="card-text">
        ${date} • ${time}
      </div>

      <p id="${eventId}">
        Spaces left: ${spaces}
      </p>

      <button class="button small-btn"
      onclick="toggleRegister('${eventId}')">
        Register / Unregister
      </button>
    `;

    list.appendChild(card);

    document.getElementById("eventName").value = "";
    document.getElementById("eventDate").value = "";
    document.getElementById("eventTime").value = "";
    document.getElementById("eventSpaces").value = "";
  }
}


function callHelp() {
  alert("Emergency services contacted.");
}


function addTask() {
  const taskName =
    document.getElementById("taskInput").value;

  const taskDate =
    document.getElementById("taskDate").value;

  const taskPriority =
    document.getElementById("taskPriority").value;

  const list =
    document.getElementById("taskList");

  if (taskName !== "") {
    const task =
      document.createElement("div");

    task.classList.add("task");

    let priorityColor = "";

    if (taskPriority === "High") {
      priorityColor = "red";
    }

    if (taskPriority === "Medium") {
      priorityColor = "orange";
    }

    if (taskPriority === "Low") {
      priorityColor = "green";
    }

    task.innerHTML = `
      <strong>${taskName}</strong><br>
      Due: ${taskDate}<br>
      Priority:
      <span style="color:${priorityColor}; font-weight:bold;">
        ${taskPriority}
      </span>
    `;

    list.appendChild(task);

    document.getElementById("taskInput").value = "";
    document.getElementById("taskDate").value = "";
  }
}


function postMessage() {
  const input =
    document.getElementById("communityPost");

  if (input.value.trim() !== "") {
    const post =
      document.createElement("div");

    post.classList.add("post");

    const postId =
      "post" + Date.now();

    post.innerHTML = `
      <div class="post-top">
        <span class="post-title">You</span>
        <span>Now</span>
      </div>

      <p>${input.value}</p>

      <div class="reaction-bar">
        <button onclick="likePost('${postId}')">
          👍
        </button>

        <span id="${postId}">
          0
        </span>

        <button onclick="dislikePost('${postId}')">
          👎
        </button>
      </div>
    `;

    document
      .querySelector(".content")
      .insertBefore(post, input);

    input.value = "";
  }
}

function likePost(id) {
  const element =
    document.getElementById(id);

  let value =
    parseInt(element.innerText);

  value++;

  element.innerText = value;
}

function dislikePost(id) {
  const element =
    document.getElementById(id);

  let value =
    parseInt(element.innerText);

  value--;

  element.innerText = value;
}

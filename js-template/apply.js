"use strict";

document.addEventListener("DOMContentLoaded", async () => {
  const username = sessionStorage.username;
  if (!username) {
    window.alert("ログインしてください");
    location.href = "login.html";
  }
  document.querySelector("#user_name span").textContent = username;

  const res = await fetch("apply.json");
  const obj = await res.json();
  const data = obj.list;

  const eventsContainer = document.getElementById("events");

  data.forEach((event) => {
    const eventDiv = document.createElement("div");
    eventDiv.className = "event";
    eventDiv.innerHTML = `
      <div class="event-header">${event.title}</div>
      <div class="event-body">
        <p>内容: ${event.content}</p>
        <p>開催日時: ${event.date}</p>
        <p>会場: ${event.venue}</p>
        <p>定員: ${event.capacity}</p>
        <p>申込期限: ${event.deadline}</p>
        <p>取扱窓口: ${event.contact}</p>
      </div>
    `;
    eventsContainer.appendChild(eventDiv);
  });
});

function getFormData() {
  const form = document.getElementById("myForm");
  const formData = new FormData(form);
  const data = {};

  formData.forEach((value, key) => {
    data[key] = value;
  });

  document.getElementById("dateOutput").textContent = data.date;
  document.getElementById("schOutput").textContent = data.sch;
  document.getElementById("timeOutput").textContent = data.time;
  document.getElementById("placeOutput").textContent = data.place;
}

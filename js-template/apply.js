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
  let data = obj.list;

  const eventsContainer = document.getElementById("events");

  function renderEvents(events) {
    eventsContainer.innerHTML = "";
    events.forEach((event) => {
      const eventDiv = document.createElement("div");
      eventDiv.className = "event";
      eventDiv.innerHTML = `
        <div class="event-header">${event.title}</div>
        <div class="event-body">
          <p>内　　容　${event.content}</p>
          <p>開催日時　${event.date}</p>
          <p>種　　別　${event.venue}</p>
          <p>定　　員　${event.capacity}</p>
          <p>申込期間　${event.deadline}</p>
          <p>取扱部署　${event.contact}</p>
        </div>
      `;
      eventsContainer.appendChild(eventDiv);
    });
  }

  renderEvents(data);

  document.querySelectorAll("input[name='ap']").forEach((radio) => {
    radio.addEventListener("change", (e) => {
      if (e.target.checked) {
        if (e.target.parentElement.textContent.includes("開催日時")) {
          data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        } else if (e.target.parentElement.textContent.includes("申込受付期間")) {
          data.sort((a, b) => new Date(a.deadlineTimestamp) - new Date(b.deadlineTimestamp));
        }
        renderEvents(data);
      }
    });
  });
});



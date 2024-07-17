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
          <button class="apply-button">申し込む</button>
        </div>
      `;
      eventsContainer.appendChild(eventDiv);
    });

    document.querySelectorAll(".apply-button").forEach((button) => {
      button.addEventListener("click", () => {
        // Hide the content except the header and footer
        document
          .querySelectorAll(".caution, #situation, #events")
          .forEach((element) => (element.style.display = "none"));

        // Display completion message and return button
        const applySection = document.getElementById("apply");
        const completionMessage = document.createElement("div");
        completionMessage.className = "completion-message";
        completionMessage.innerHTML = `
          <h3>申し込み完了</h3>
          <button id="return-button">戻る</button>
        `;
        applySection.insertBefore(
          completionMessage,
          document.getElementById("apply_footer")
        );

        // Add event listener to the return button
        document
          .getElementById("return-button")
          .addEventListener("click", () => {
            location.reload();
          });
      });
    });
  }

  renderEvents(data);

  document.querySelectorAll("input[name='ap']").forEach((radio) => {
    radio.addEventListener("change", (e) => {
      if (e.target.checked) {
        if (e.target.parentElement.textContent.includes("開催日時")) {
          data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        } else if (
          e.target.parentElement.textContent.includes("申込受付期間")
        ) {
          data.sort(
            (a, b) =>
              new Date(a.deadlineTimestamp) - new Date(b.deadlineTimestamp)
          );
        }
        renderEvents(data);
      }
    });
  });
});

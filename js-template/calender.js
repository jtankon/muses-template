"use strict";

document.addEventListener("DOMContentLoaded", async () => {
  const username = sessionStorage.username;
  if (!username) {
    window.alert("ログインしてください");
    location.href = "login.html";
  }
  document.querySelector("#user_name span").textContent = username;

  const res = await fetch("data.json");
  const obj = await res.json();
  const data = obj.list;
  console.log(data);

  $("#calendar").fullCalendar({
    header: {
      left: "prev,next today",
      center: "title",
      right: "month,agendaWeek,agendaDay",
    },
    editable: true,
    events: data.map((item) => ({
      title: item.sch,
      start: item.date,
      description: `時間: ${item.time}, 場所: ${item.place}`,
    })),
    eventRender: function (event, element, view) {
      if (view.name === "month") {
        element.html('<div class="fc-event-dot"></div>');
      } else {
        element.html(
          '<div class="fc-event-dot"></div>' +
            event.title +
            "<br>" +
            event.description
        );
      }
    },
  });
});

function submitForm() {
  const form = document.getElementById("myForm");
  const formData = new FormData(form);
  const data = {};

  formData.forEach((value, key) => {
    data[key] = value;
  });

  // 新しいデータを追加する
  const dataContainer = document.getElementById("dataContainer");
  const newData = document.createElement("div");
  newData.innerHTML = `
    <p>日付: ${data.date}</p>
    <p>予定: ${data.sch}</p>
    <p>時間: ${data.time}</p>
    <p>場所: ${data.place}</p>
    <hr>
  `;
  dataContainer.appendChild(newData);

  // カレンダーに新しいイベントを追加する
  $("#calendar").fullCalendar(
    "renderEvent",
    {
      title: data.sch,
      start: data.date,
      description: `時間: ${data.time}, 場所: ${data.place}`,
    },
    true
  );

  // フォームをリセットする
  form.reset();
}

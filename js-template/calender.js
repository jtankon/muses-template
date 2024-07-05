"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const username = sessionStorage.username;
  if (!username) {
    window.alert("ログインしてください");
    location.href = "login.html";
  }
  document.querySelector("#user_name span").textContent = username;

  const savedData = localStorage.getItem("events");
  const data = savedData ? JSON.parse(savedData) : [];
  console.log(data);

  // データ表示部分を初期化
  const dataContainer = document.getElementById("dataContainer");
  data.forEach((item, index) => {
    const newData = document.createElement("div");
    newData.innerHTML = `
      <p>日付: ${item.date}</p>
      <p>予定: ${item.sch}</p>
      <p>開始時間: ${item.start_time}</p>
      <p>終了時間: ${item.finish_time}</p>
      <p>場所: ${item.place}</p>
      <button onclick="deleteEvent(${index})">削除</button>
      <hr>
    `;
    dataContainer.appendChild(newData);
  });

  $("#calendar").fullCalendar({
    header: {
      left: "prev,next today",
      center: "title",
      right: "month,agendaWeek,agendaDay",
    },
    editable: true,
    height: "auto", // Adjust the height to fit the container
    contentHeight: "auto", // Adjust the content height to fit the container
    allDaySlot: true,
    events: data.map((item) => ({
      title: item.sch,
      start: `${item.date}T${item.start_time}`, // Combine date and time for the event
      end: item.finish_time ? `${item.date}T${item.finish_time}` : undefined,
      allDay: !item.start_time, // If no time is specified, treat it as an all-day event
      description: `場所: ${item.place}`,
    })),
    eventRender: function (event, element, view) {
      if (view.name === "month") {
        element.html('<div class="fc-event-dot"></div>' + event.title);
      } else {
        element.html(
          '<div class="fc-event-dot"></div>' +
            event.title +
            "<br>" +
            event.description
        );
      }
    },
    dayClick: function (date, jsEvent, view) {
      if (view.name === "month") {
        $("#calendar").fullCalendar("changeView", "agendaDay"); // Change to day view
        $("#calendar").fullCalendar("gotoDate", date); // Go to the clicked date
      }
    },
    viewRender: function (view) {
      if (view.name === "agendaWeek") {
        $(".fc-time-grid").hide(); // Hide time slots for week view
        $(".fc-day-grid").show(); // Show all-day slot for week view
        $(".fc-day-grid").css("height", "auto"); // Adjust the all-day slot height

        // Move all events to all-day slot for week view
        $("#calendar").fullCalendar("removeEvents");
        $("#calendar").fullCalendar(
          "renderEvents",
          data.map((item) => ({
            title: item.sch,
            start: `${item.date}T${item.start_time}`, // Combine date and time for the event
            end: item.finish_time
              ? `${item.date}T${item.finish_time}`
              : undefined,
            allDay: true, // Force all events to be all-day in week view
            description: `場所: ${item.place}`,
          }))
        );
      } else {
        $(".fc-time-grid").show(); // Show time slots for day view
        $(".fc-day-grid").show(); // Show all-day slot for day view

        // Restore normal event display for other views
        $("#calendar").fullCalendar("removeEvents");
        $("#calendar").fullCalendar(
          "renderEvents",
          data.map((item) => ({
            title: item.sch,
            start: `${item.date}T${item.start_time}`, // Combine date and time for the event
            end: item.finish_time
              ? `${item.date}T${item.finish_time}`
              : undefined,
            allDay: !item.start_time, // If no time is specified, treat it as an all-day event
            description: `場所: ${item.place}`,
          }))
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

  // Save to local storage
  let savedData = localStorage.getItem("events");
  savedData = savedData ? JSON.parse(savedData) : [];
  savedData.push(data);
  localStorage.setItem("events", JSON.stringify(savedData));

  // 新しいデータを追加する
  const dataContainer = document.getElementById("dataContainer");
  const newData = document.createElement("div");
  const index = savedData.length - 1; // Index of the new data
  newData.innerHTML = `
    <p>日付: ${data.date}</p>
    <p>予定: ${data.sch}</p>
    <p>開始時間: ${data.start_time}</p>
    <p>終了時間: ${data.finish_time}</p>
    <p>場所: ${data.place}</p>
    <button onclick="deleteEvent(${index})">削除</button>
    <hr>
  `;
  dataContainer.appendChild(newData);

  // カレンダーに新しいイベントを追加する
  const event = {
    title: data.sch,
    start: `${data.date}T${data.start_time}`, // Combine date and time for the event
    end: data.finish_time ? `${data.date}T${data.finish_time}` : undefined,
    allDay: !data.start_time, // If no time is specified, treat it as an all-day event
    description: `場所: ${data.place}`,
  };

  $("#calendar").fullCalendar("renderEvent", event, true);

  // フォームをリセットする
  form.reset();
}

function deleteEvent(index) {
  let savedData = localStorage.getItem("events");
  savedData = savedData ? JSON.parse(savedData) : [];
  savedData.splice(index, 1); // Remove the event at the given index
  localStorage.setItem("events", JSON.stringify(savedData));

  // 再度ロードして表示を更新
  location.reload();
}

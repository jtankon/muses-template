"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const username = sessionStorage.username;
  if (!username) {
    window.alert("ログインしてください");
    location.href = "login.html";
  }
  document.querySelector("#user_name span").textContent = username;

  let data = []; // 初期化した配列を用意

  // JSONデータを読み込む関数
  async function loadJSON() {
    const response = await fetch('career.json');
    const jsonData = await response.json();
    jsonData.list.forEach(event => {
      data.push({
        date: formatDate(event.date),
        sch: event.title,
        start_time: event.time.split(" - ")[0] || "",
        finish_time: event.time.split(" - ")[1] || "",
        place: event.place
      });
    });
    localStorage.setItem("events", JSON.stringify(data));
    renderData();
    renderCalendarEvents();
  }

  // 日付フォーマット関数
  function formatDate(dateString) {
    const [date, day] = dateString.split('　');
    const [month, dayNum] = date.split('月');
    const year = new Date().getFullYear();
    return `${year}-${month.padStart(2, '0')}-${dayNum.padStart(2, '0')}`;
  }

  function renderData() {
    const dataContainer = document.getElementById("dataContainer");
    dataContainer.innerHTML = ""; // Clear previous data
    data.forEach((item, index) => {
      const newData = document.createElement("div");
      newData.classList.add("event-card");
      newData.innerHTML = `
        <div class="event-details">
          <div class="event-info">
            <p class="event-date">日付: ${item.date}</p>
            <p class="event-event">予定: ${item.sch}</p>
            <p class="event-time">開始時間: ${
              item.start_time || ""
            } 　 終了時間: ${item.finish_time || ""}</p>
            <p class="event-place">場所: ${item.place || ""}</p>
          </div>
        </div>
        <button class="event-delete" onclick="deleteEvent(${index})">削除</button>
      `;
      dataContainer.appendChild(newData);
    });
  }

  function renderCalendarEvents() {
    $("#calendar").fullCalendar("removeEvents");
    $("#calendar").fullCalendar(
      "renderEvents",
      data.map((item) => ({
        title: item.sch,
        start: item.start_time ? `${item.date}T${item.start_time}` : item.date,
        end: item.finish_time ? `${item.date}T${item.finish_time}` : undefined,
        allDay: !item.start_time,
        description: `場所: ${item.place || ""}`,
      })),
      true
    );
  }

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
      start: item.start_time ? `${item.date}T${item.start_time}` : item.date,
      end: item.finish_time ? `${item.date}T${item.finish_time}` : undefined,
      allDay: !item.start_time,
      description: `場所: ${item.place || ""}`,
    })),
    eventRender: function (event, element, view) {
      if (view.name === "month") {
        element.html('<div class="fc-event-dot"></div>' + event.title);
        element.css({
          "background-color": "#44617b",
          "border-color": "#44617b",
          "white-space": "nowrap" /* Prevent text from wrapping */,
          overflow: "visible",
        });
      } else {
        element.html(
          '<div class="fc-event-dot"></div>' +
            event.title +
            "<br>" +
            event.description
        );
        element.css({
          "background-color": "#44617b",
          "border-color": "#44617b",
        });
      }
      element.find(".fc-title").css({
        color: "#fff",
        "font-weight": "bold",
      });
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
            start: item.start_time
              ? `${item.date}T${item.start_time}`
              : item.date,
            end: item.finish_time
              ? `${item.date}T${item.finish_time}`
              : undefined,
            allDay: true, // Force all events to be all-day in week view
            description: `場所: ${item.place || ""}`,
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
            start: item.start_time
              ? `${item.date}T${item.start_time}`
              : item.date,
            end: item.finish_time
              ? `${item.date}T${item.finish_time}`
              : undefined,
            allDay: !item.start_time, // If no time is specified, treat it as an all-day event
            description: `場所: ${item.place || ""}`,
          }))
        );
      }
    },
  });

  loadJSON(); // JSONデータを読み込んで表示する

  function submitForm() {
    const form = document.getElementById("myForm");
    const formData = new FormData(form);
    const newData = {};

    formData.forEach((value, key) => {
      newData[key] = value;
    });

    // Save to local storage
    data.push(newData);
    localStorage.setItem("events", JSON.stringify(data));

    renderData();
    renderCalendarEvents();

    // フォームをリセットする
    form.reset();
  }

  function deleteEvent(index) {
    data.splice(index, 1); // Remove the event at the given index
    localStorage.setItem("events", JSON.stringify(data));

    renderData();
    renderCalendarEvents();
  }

  // Export functions to global scope
  window.submitForm = submitForm;
  window.deleteEvent = deleteEvent;
});


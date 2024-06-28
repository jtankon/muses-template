"use strict";

document.addEventListener("DOMContentLoaded", async () => {
  const username = sessionStorage.username;
  if (!username) {
    window.alert("ログインしてください");
    location.href = "login.html";
    return; // ログインしていない場合は処理を中断
  }

  document.querySelector("#user_name span").textContent = username;

  try {
    const res = await fetch("career.json");
    const obj = await res.json();
    const data = obj.list;

    document.querySelectorAll("span.unread").forEach((el) => {
      el.textContent = data.length;
    });

    const info_list = document.querySelector("div#info_list");

    for (const item of data) {
      const record = document.createElement("div");
      record.className = "record";
      
      const date = document.createElement("span");
      date.textContent = item.date;
      record.appendChild(date);

      const time = document.createElement("span");
      time.textContent = item.time;
      record.appendChild(time);

      const title = document.createElement("span");
      title.textContent = item.title;
      record.appendChild(title);

      const place = document.createElement("span");
      place.textContent = item.place;
      record.appendChild(place);

      info_list.appendChild(record);
    }
  } catch (error) {
    console.error("Error fetching or parsing data:", error);
  }
});

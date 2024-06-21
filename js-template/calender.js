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
});

function getFormData() {
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
}

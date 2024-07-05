"use strict";

document.addEventListener("DOMContentLoaded", async () => {
  const username = sessionStorage.username;
  if (!username) {
    window.alert("ログインしてください");
    location.href = "login.html";
  } //ユーザーネームを入力しなかったらアラートが出る
  document.querySelector("#user_name span").textContent = username; //ユーザーネームの挿入

  const res = await fetch("data.json"); //fetch関数を使ってdata.jsonを取得している
  const obj = await res.json(); //取得したレスポンスをJSON形式で解析し、resからobjにJSONデータを格納している
  const data = obj.list; //obj内のlistに含まれるデータをdataに格納している
  console.log(data);
  /*ウェブページがロードされたらサーバーから取得したJSON形式のデータを使って動的なコンテンツを生成するための処理を行う*/
});

function getFormData() {
  const form = document.getElementById("myForm");
  const formData = new FormData(form);
  const data = {};

  formData.forEach((value, key) => {
    data[key] = value;
  });

  // データを表示する
  document.getElementById("dateOutput").textContent = data.date;
  document.getElementById("schOutput").textContent = data.sch;
  document.getElementById("timeOutput").textContent = data.time;
  document.getElementById("placeOutput").textContent = data.place;
}

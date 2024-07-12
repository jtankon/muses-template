"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const username = sessionStorage.username;
  if (!username) {
    window.alert("ログインしてください");
    location.href = "login.html";
  }
  document.querySelector("#user_name span").textContent = username;

  // イベントリスナー内でボタンにイベントハンドラを設定する
  document.getElementById("submit").addEventListener("click", submitForm);
  document
    .getElementById("return_button")
    .addEventListener("click", returnToForm);

  function submitForm() {
    // フォームを非表示にして、完了メッセージを表示する
    document.getElementById("Form").style.display = "none";
    document.getElementById("confirmation_message").style.display = "block";
  }

  function returnToForm() {
    document.getElementById("area").value = "";
    // 完了メッセージを非表示にして、フォームを表示する
    document.getElementById("confirmation_message").style.display = "none";
    document.getElementById("Form").style.display = "block";
  }
});

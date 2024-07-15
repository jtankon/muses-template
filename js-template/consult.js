"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const username = sessionStorage.username;
  if (!username) {
    window.alert("ログインしてください");
    location.href = "login.html";
  }
  document.querySelector("#user_name span").textContent = username;

  const submitButton = document.getElementById("submit");
  const textArea = document.getElementById("area");

  textArea.addEventListener("input", checkTextArea);
  submitButton.addEventListener("click", submitForm);
  document.getElementById("return_button").addEventListener("click", returnToForm);

  function checkTextArea() {
    if (textArea.value.length >= 10) {
      submitButton.disabled = false;
    } else {
      submitButton.disabled = true;
    }
  }

  function submitForm() {
    // フォームを非表示にして、完了メッセージを表示する
    document.getElementById("Form").style.display = "none";
    document.getElementById("confirmation_message").style.display = "block";
    document.getElementById("info").style.height = "249px";
    document.getElementById("info_footer").style.top = "40px";
  }

  function returnToForm() {
    textArea.value = "";
    // 完了メッセージを非表示にして、フォームを表示する
    document.getElementById("confirmation_message").style.display = "none";
    document.getElementById("Form").style.display = "block";
    document.getElementById("info").style.height = "370px";
    document.getElementById("info_footer").style.top = "44px";
    submitButton.disabled = true;
  }

  // 初期状態で送信ボタンを無効にする
  submitButton.disabled = true;
});






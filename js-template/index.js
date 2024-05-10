'use strict';

document.addEventListener('DOMContentLoaded', async () => { //ドキュメントの読み込みが完了したときに、指定された関数を実行するイベントリスナーを追加
  const username = sessionStorage.username; //セッションストレージから"username"というキーで保存された値を取得し、usernameという定数に格納
  if (!username) { //もしusernameが未定義または空の場合は、以下のコードを実行
    window.alert('ログインしてください'); //アラートダイアログを表示
    location.href = 'login.html'; //ページのリダイレクトを行い、login.htmlに移動
  }
  document.querySelector('#user_name span').textContent = username; //IDがuser_nameである要素内のspan要素のテキストコンテンツをusernameに設定

  const res = await fetch('data.json'); //fetch関数を使って、指定されたURL（data.json）からデータを取得
  const obj = await res.json(); //fetchで取得したレスポンスをJSON形式に変換し、objに格納

  document.querySelectorAll('span.unread').forEach((el) => (el.textContent = obj.list.length)); //クラスがunreadであるすべてのspan要素に対して、それぞれの要素のテキストコンテンツを設定
});

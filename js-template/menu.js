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

  document
    .querySelectorAll("span.unread")
    .forEach((el) => (el.textContent = data.length)); //span要素がunreadの要素を選択し。その要素のテキストコンテンツをdata.lengthに設定
  /*未読の件数を表示するためにページ内のすべての未読要素に未読データの長さを設定している*/

  const info_list = document.querySelector("div#info_list");
  //ページ内のdiv要素を取得しinfo_listに代入しjs内で操作できるようにしている

  for (const item of data) {
    const record = document.createElement("div"); //div要素を生成し、record変数(各データ項目の表示を囲むコンテナ)に代入
    record.className = "record";
    for (const [prop, val] of Object.entries(item)) {
      const el = document.createElement("div"); //elは各データ項目を表示するための要素
      if (prop == "from") {
        el.innerHTML = val; //fromの場合HTML内容を設定
      } else {
        el.textContent = val; //要素のテキスト内容の設定
        el.className = prop; //要素にプロパティ名をクラス名として追加する。これは各データ項目を識別するためのクラス名
      }
      //取得したデータを元にして動的なHTML要素を生成し、ページに表示するための処理を行っている

      if (prop == "subject") {
        const tri = document.createElement("div"); //div要素triを生成
        tri.textContent = "&nbsp;"; //&nbsp(スペース)を設定
        tri.className = "tri"; //triクラスを追加
        record.appendChild(tri); //triをrecordに追加

        const mark = document.createElement("div");
        mark.className = "mark";
        const span = document.createElement("span");
        span.textContent = "!";
        span.className = "exmark";
        mark.appendChild(span);
        record.appendChild(mark);
      } //subjectプロパティが存在するデータ項目に対して特定の表示を追加
      record.appendChild(el); //el要素をrecord要素に追加
    }
  }
});

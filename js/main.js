'use strict';

{
  const textarea = document.getElementById('textarea');
  const counter = document.getElementById('counter');
  let input_url_num = document.getElementById('input_url_num');
  let url_value = 0;
  let text_length;
  
  // テキストの文字数を取得する関数
  function countText(n) {
    text_length = 0; 
    for( let i = 0; i < n.length; i++) {
      // 半角英数字記号と改行は0.5文字でカウント
      if(n[i].match(/[ -~]/)) {
        text_length += 0.5;
      } else if(n[i].match(/\r?\n/g)) {
        text_length += 0.5;
      } else {
        text_length += 1;
    }}
      return text_length;
  }
  
  // urlの数を取得
  input_url_num.addEventListener('input', () => {
    url_value = input_url_num.value;
    text_length = countText(textarea.value) + (url_value * 11.5);
    // カウントは99999文字までとする
    if (text_length > 99999) {
      text_length = 99999;
    }
    counter.textContent = text_length;
    if (text_length > 140) {
      counter.classList.add('overlength');
    } else {
      counter.classList.remove('overlength');   
    }
  })

  // 140文字を超える場合は赤字にするクラスを付与
  textarea.addEventListener('keyup', () => {
    text_length = countText(textarea.value) + (url_value * 11.5);
    // カウントは99999文字までとする
    if (text_length > 99999) {
      text_length = 99999;
    }
    counter.textContent = text_length;
    if (text_length > 140) {
      counter.classList.add('overlength');
    } else {
      counter.classList.remove('overlength');   
    }
  })
 

  // プレビューボタンを押したときの処理
  const mask = document.getElementById('mask');
  const btn_preview = document.getElementById('btn_preview');
  const close = document.getElementById('close');
  const preview_txt = document.getElementById('preview_txt');
  
  btn_preview.addEventListener('click', () => {
    preview_txt.innerText = textarea.value;
    preview.classList.remove('hidden');
    mask.classList.remove('hidden');
  })

  close.addEventListener('click', () => {
    // let preview_txt = document.getElementById('preview_txt');
    preview.classList.add('hidden');
    mask.classList.add('hidden');
    preview_txt.innerText = '';
    // preview_txt.remove();
  })
  
  mask.addEventListener('click', () => {
    close.click();
  })

  
  // コピーボタンを押したときの処理
  const btn_copy = document.getElementById('btn_copy');
  btn_copy.addEventListener('click', () => {
    textarea.select();
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
  })


  // リセットボタンを押したときの処理
  const reset_btn = document.getElementById('reset_btn');
  reset_btn.addEventListener('click', () => {
    textarea.value = '';
    counter.textContent = 0;
    input_url_num.value = 0;
    url_value = 0;
    text_length = 0;
    counter.classList.remove('overlength'); 
  })
} 
let foodd = [];
let ispressedb;
let ispressedl;
let ispressedd;
let itemlikes = [];
let lsb;
let lsl;
let lsd;

// 한국 시간 기준으로 하이픈 없이 8자리(YYYYMMDD)만 생성
const today = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
}).replace(/\. /g, '').replace(/\./g, '');

async function getTodayMenus() {
    allMenuEntries = [];

    // 2. 학교 정보 (님이 확인하신 N10으로 수정!)
    const API_KEY = 'c7944f3d532d494da1d6e65f5d94a198';
    const OFFICE_CODE = 'N10';      // 충청남도교육청 (님 지적이 맞음!)
    const SCHOOL_CODE = '8140070';   // 천안중앙고등학교

    const URL = `https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=${API_KEY}&Type=json&pIndex=1&pSize=10&ATPT_OFCDC_SC_CODE=${OFFICE_CODE}&SD_SCHUL_CODE=${SCHOOL_CODE}&MLSV_FROM_YMD=${today}&MLSV_TO_YMD=${today}`;

    try {
        const response = await fetch(URL);
        const data = await response.json();

        if (data.mealServiceDietInfo) {
            const rows = data.mealServiceDietInfo[1].row;

            // 조식(1), 중식(2), 석식(3) 순서 정렬
            rows.sort((a, b) => a.MMEAL_SC_CODE - b.MMEAL_SC_CODE);

            allMenuEntries = rows.map(item => item.DDISH_NM);

            console.log(`✅ 드디어! ${today} 식단 리스트:`, allMenuEntries);
            
            // 만약 3개가 다 나왔다면 콘솔에 예쁘게 출력
            allMenuEntries.forEach((menu, index) => {
                const label = index === 0 ? "아침" : index === 1 ? "점심" : "저녁";
                console.log(`[${label}] ${menu.replace(/<br\/>/g, ' ')}`);
            });
        } else {
            console.log("❌ 응답 오류:", data.RESULT.MESSAGE);
        }
    } catch (error) {
        console.error("연결 에러:", error);
    }
}

getTodayMenus();
// 또는 더 직관적인 방식
const now = new Date();
const y = now.getFullYear();
const m = String(now.getMonth() + 1).padStart(2, '0');
const d = String(now.getDate()).padStart(2, '0');
const today_final = `${y}${m}${d}`; 

console.log("오늘 날짜 변수:", today_final); // 결과: 20260317

async function updateC17Value(newValue) {
  // 주소 뒤에 /컬럼명/찾을값 을 붙입니다. 
  // 예: id가 1인 행을 찾음
  const url = 'https://sheetdb.io/api/v1/0fp773r3pxzya/id/1';

  const updateData = {
    data: {
      "likes": new Date().getDate() // C열(count)의 값을 newValue로 변경
    }
  };

  try {
    const response = await fetch(url, {
      method: 'PATCH', // PATCH는 바꿀 부분만 수정할 때 씁니다.
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateData)
    });

    const result = await response.json();
    
    if (result.updated === 1) {
      console.log("C17 위치의 값이 성공적으로 변경되었습니다!");
    } else {
      console.log("행을 찾지 못했습니다. ID를 확인하세요.");
    }
  } catch (error) {
    console.error("오류 발생:", error);
  }
}

async function getGoogleSheet() {
  const sheetId = '1EucqpW8a3MlCrBgyQEiz_zQQy-x-GPXAwuK6tgPcukI';
  const sheetName = '시트1'; // 예: Sheet1
  const url = `https://opensheet.elk.sh/${sheetId}/${sheetName}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    data.forEach(item => {
        console.log(item.food); // 각 줄(item)을 돌면서 food를 출력
        foodd.push(item.food);
        itemlikes.push(item.likes);
    });
    if(itemlikes[15] != new Date().getDate()){
      updateC17Value();
      fetch('https://api.counterapi.dev/v2/1account1s-team-3232/likes-3232/reset');
      fetch('https://api.counterapi.dev/v2/1account1s-team-3232/likesl-3232/reset');
      fetch('https://api.counterapi.dev/v2/1account1s-team-3232/likesd-3232/reset');
      document.getElementById('likeb').innerText = 0;
      document.getElementById('likel').innerText = 0;
      document.getElementById('liked').innerText = 0;
      localStorage.setItem("likeb", false);
      localStorage.setItem("likel", false);
      localStorage.setItem("liked", false);
      if(localStorage.getItem("likeb") == "false"){
        ispressedb = false;
      }else{
        ispressedb = true;
      }
      if(localStorage.getItem("likel") == "false"){
        ispressedl = false;
      }else{
        ispressedl = true;
      }
      if(localStorage.getItem("liked") == "false"){
        ispressedd = false;
      }else{
        ispressedd = true;
      }
      if (ispressedb == true){
        document.getElementById('lb').classList.toggle('fa-solid');
        document.getElementById('lb').classList.toggle('fa-regular');
      }
      if (ispressedl == true){
        document.getElementById('ll').classList.toggle('fa-solid');
        document.getElementById('ll').classList.toggle('fa-regular');
      }
      if (ispressedd == true){
        document.getElementById('ld').classList.toggle('fa-solid');
        document.getElementById('ll').classList.toggle('fa-regular');
      }
    }
    console.log(foodd);
    const dayy = new Date().getDay();
    console.log(dayy);
    document.getElementById('breakfast').innerHTML = allMenuEntries[0];
    document.getElementById('lunch').innerHTML = allMenuEntries[1];
    document.getElementById('dinner').innerHTML = allMenuEntries[2];
    if(dayy == 0){
      document.getElementById('brim').innerText = "주말";
      document.getElementById('lnim').innerText = "주말";
      document.getElementById('dnim').innerText = "주말";
    }
    if(dayy == 1){
      document.getElementById('brim').innerText = "월요일 조식";
      document.getElementById('lnim').innerText = "월요일 중식";
      document.getElementById('dnim').innerText = "월요일 석식";
    }
    if(dayy == 2){
      document.getElementById('brim').innerText = "화요일 조식";
      document.getElementById('lnim').innerText = "화요일 중식";
      document.getElementById('dnim').innerText = "화요일 석식";
    }
    if(dayy == 3){
      document.getElementById('brim').innerText = "수요일 조식";
      document.getElementById('lnim').innerText = "수요일 중식";
      document.getElementById('dnim').innerText = "수요일 석식";
    }
    if(dayy == 4){
      document.getElementById('brim').innerText = "목요일 조식";
      document.getElementById('lnim').innerText = "목요일 중식";
      document.getElementById('dnim').innerText = "목요일 석식";
    }
    if(dayy == 5){
      document.getElementById('brim').innerText = "금요일 조식";
      document.getElementById('lnim').innerText = "금요일 중식";
      document.getElementById('dnim').innerText = "금요일 석식";
    }
    if(dayy == 6){
      document.getElementById('brim').innerText = "주말";
      document.getElementById('lnim').innerText = "주말";
      document.getElementById('dnim').innerText = "주말";
    }
    document.getElementsByClassName('post-time')[0].innerText = (new Date().getMonth() + 1) + "월 " + new Date().getDate() + "일";
    document.getElementsByClassName('post-time')[1].innerText = (new Date().getMonth() + 1) + "월 " + new Date().getDate() + "일";
    document.getElementsByClassName('post-time')[2].innerText = (new Date().getMonth() + 1) + "월 " + new Date().getDate() + "일";
  } catch (error) {
    console.error("데이터 로드 실패:", error);
  }
}

document.addEventListener('DOMContentLoaded',function(){
  fetch('https://api.counterapi.dev/v2/1account1s-team-3232/likes-3232')
    .then(response => response.json())
    .then(result => {
      lsb = result.data.up_count - result.data.down_count;
      document.getElementById('likeb').innerText = result.data.up_count - result.data.down_count;
      console.log(result);
    })
  fetch('https://api.counterapi.dev/v2/1account1s-team-3232/likesl-3232')
    .then(response => response.json())
    .then(result => {
      lsl = result.data.up_count - result.data.down_count;
      document.getElementById('likel').innerText = result.data.up_count - result.data.down_count;
    })
  fetch('https://api.counterapi.dev/v2/1account1s-team-3232/likesd-3232')
    .then(response => response.json())
    .then(result => {
      lsd = result.data.up_count - result.data.down_count;
      document.getElementById('liked').innerText = result.data.up_count - result.data.down_count;
    })
    if(localStorage.getItem("date") != new Date().getDate()){
      localStorage.setItem("likeb", false);
      localStorage.setItem("likel", false);
      localStorage.setItem("liked", false);
    }
    localStorage.setItem("date", new Date().getDate());
    if(localStorage.getItem("likeb") == "false"){
      ispressedb = false;
    }else{
      ispressedb = true;
    }
    if(localStorage.getItem("likel") == "false"){
      ispressedl = false;
    }else{
      ispressedl = true;
    }
    if(localStorage.getItem("liked") == "false"){
      ispressedd = false;
    }else{
      ispressedd = true;
    }
    if (ispressedb == true){
      document.getElementById('lb').classList.toggle('fa-solid');
      document.getElementById('lb').classList.toggle('fa-regular');
    }
    if (ispressedl == true){
      document.getElementById('ll').classList.toggle('fa-solid');
      document.getElementById('ll').classList.toggle('fa-regular');
    }
    if (ispressedd == true){
      document.getElementById('ld').classList.toggle('fa-solid');
      document.getElementById('ll').classList.toggle('fa-regular');
    }
})


async function likupb(){
  document.getElementById('lb').classList.toggle('fa-regular');
  document.getElementById('lb').classList.toggle('fa-solid');
  console.log(ispressedb);
  ispressedb = !ispressedb;
  localStorage.setItem("likeb", ispressedb);
  console.log(ispressedb);
  if(ispressedb){
    document.getElementById('likeb').innerText = lsb + 1;
    fetch('https://api.counterapi.dev/v2/1account1s-team-3232/likes-3232/up');
  }else{
    document.getElementById('likeb').innerText = lsb - 1;
    fetch('https://api.counterapi.dev/v2/1account1s-team-3232/likes-3232/down',);
  }
}
async function likupl(){
  document.getElementById('ll').classList.toggle('fa-regular');
  document.getElementById('ll').classList.toggle('fa-solid');
  ispressedl = !ispressedl;
  localStorage.setItem("likel", ispressedl);
  if(ispressedl){
    document.getElementById('likel').innerText = lsl + 1;
    fetch('https://api.counterapi.dev/v2/1account1s-team-3232/likesl-3232/up');
  }else{
    document.getElementById('likel').innerText = lsl - 1;
    fetch('https://api.counterapi.dev/v2/1account1s-team-3232/likesl-3232/down',);
  }
}
async function likupd(){
  document.getElementById('ld').classList.toggle('fa-regular');
  document.getElementById('ld').classList.toggle('fa-solid');
  ispressedd = !ispressedd;
  localStorage.setItem("liked", ispressedd);
  if(ispressedd){
    document.getElementById('liked').innerText = lsd + 1;
    fetch('https://api.counterapi.dev/v2/1account1s-team-3232/likesd-3232/up');
  }else{
    document.getElementById('liked').innerText = lsd - 1;
    fetch('https://api.counterapi.dev/v2/1account1s-team-3232/likesd-3232/down',);
  }
}

getGoogleSheet();
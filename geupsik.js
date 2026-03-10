let foodd = [];

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
    });
    console.log(foodd);
    const dayy = new Date().getDay();
    console.log(dayy);
    document.getElementById('breakfast').innerText = foodd[3*(dayy - 1)];
    document.getElementById('lunch').innerText = foodd[3*(dayy - 1) + 1];
    document.getElementById('dinner').innerText = foodd[3*(dayy - 1) + 2];
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
async function likupb(){
}
async function likupl(){
}
async function likupd(){
}


getGoogleSheet();
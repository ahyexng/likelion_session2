const formEl = document.querySelector('#signupForm');
const idEl = document.querySelector('#signupId');
const passwordEl = document.querySelector('#signupPassword');

/*유저가 있는지 검증*/
const isUserExist = (newUserId) => {
    const users = localStorage.getItem('userList'); //Local Storage 에서 가져올거임

    //예외처리
    if (!users) return false;

    //로컬스토리지는 항상 string형태로 저장한다. (객체로 저장하던 배열로 저장하던 ... 무조건 다 string으로 저장)
    //string 을 json형태로 바꿀꺼임)
    const convertedUsers = JSON.parse(users); //로컬스토리지에서 받아온걸 json형태로 변환
    const getExistUsers = convertedUsers.find(user =>user.id === newUserId) //user의 아이디가 새로운 유저의 아이디와 같은지?  있으면 userid없으면 undefined
    //convertedUser 객체는 id 와 pass로 이루어져있음
    return getExistUsers ? true : false;
}

//등록을 하는 logic
const registerUsers = (userInfo) => {
    const currentUsers = JSON.parse(localStorage.getItem('userList')); //가져온걸 바로 json형태로 변환
    
    if(!currentUsers) {
        const newUserList = [];
        newUserList.push(
            {
                id: userInfo.id,
                password: userInfo.password,
            });
        localStorage.setItem('userList', JSON.stringify(newUserList));  //배열을 string으로 바꿔줌
    } else {
        const updatedUsers = currentUsers.concat({  //concat => 한번 push를 하고나면 원본객체가 반환되지 않고 새로운 객체가 반환된다. 새로운 업데이트 객체를 업데이트유저에 넣겠다
                id: userInfo.id,
                password: userInfo.password,
        });
    localStorage.setItem('userList', JSON.stringify(updatedUsers));
    };
}

const init = () => {
    formEl.addEventListener('submit', (e) => {
        e.preventDefault();  //새로고침 이벤트를 막음 (초기화방지)

        const idValue = idEl.value;
        const passwordValue = passwordEl.value;

        if (isUserExist(idValue)) {
            alert(`${idValue} 유저는 이미 존재합니다!`);
            idEl.value = '';
            passwordEl.value = '';
            return;
        }
        //회원가입이 가능하다면 이후 코드
        registerUsers({id: idValue, password: passwordValue});
        alert('회원가입 완료!');
        //로그인 화면으로 가기
        location.href = './signin.html';
    });      //parameter에 함수를 넣음
};

document.addEventListener('DOMContentLoaded', init);
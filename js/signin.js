const formEl = document.querySelector('#loginForm');
const idEl = document.querySelector('#idInput');
const passwordEl = document.querySelector('#passwordInput');

const checkLogin = (id, password) => {
    const userList = localStorage.getItem('userList');

    if (!userList) return false;

    const convertToJson = JSON.parse(userList);

    const coinciedUser = convertToJson.find((user) => user.id === id && user.password == password);

    return coinciedUser ? true : false; //일치하는 유저가 있으면 true,
};

const isLogined = () => {
    return localStorage.getItem('login') ? true : false;
};

const init = () => {
    if (isLogined()) {
        alert('이미 로그인이 되어있습니다.');
        location.href = './index.html';
        return ;
    }

    formEl.addEventListener('submit', (e) => {
        e.preventDefault();
        const isSuccess = checkLogin(idEl.value, passwordEl.value);                 //login check

        if (isSuccess) {
            alert('성공!');
            localStorage.setItem('login', JSON.stringify(idEl.value));              //로컬스토리지에 저장을 하겠다 key =  'login'  로컬스토리지는 항상 string형태로 저장해야되기때문에 stringify! (하지만 idvalue 는 string type)
            location.href = './index.html';
        } else {
            alert('실패!');
            idEl.value = '';
            passwordEl.value = '';              //다시 입력하라고 다 없앨거야 .
        }
    })   
};

document.addEventListener('DOMContentLoaded', init);
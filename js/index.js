const todoContainerEl = document.querySelector('#todoContainer');
const todoInputEl = document.querySelector('#todoInput');
const todoButtonEl = document.querySelector('#todoButton');
const logooutButtonEl = document.querySelector('#logoutButton');

const isLogin = () => {
    const loginedUser = localStorage.getItem('login');

    //만약 로그인된 유저가 없다면? 로그인페이지로
    if(!loginedUser) {
        alert('로그인이 필요합니다.');
        location.href = './signin.html';
    }
};

//로컬스토리지에 read하게 되면 모든 todo를 다 읽어오고 createtodo를 하면 모든 todo를 concat을 통해 새로운 곳에 저장하고 원본 날리고 다시 로컬스토리에 올리기
//read할때 모든것을 불러와야하고 모든것을 날려야하기 때문에 html도 다 날리게 된다. 

const readTodo = () => {
    todoContainerEl.innerHTML = '';  //처음부터 다 날리기 (html을)

    //로컬 스토리지에 있는걸 다 불러오기
    const todos = JSON.parse(localStorage.getItem('todos')).reverse();   
    //가장 최근 todo를 처음에 보여주기 위해 배열을 불러오면서 뒤집어 준다. (reverse)
    // 1. css에서 reverse , 2. push할때 unshift , 3. 가져올 때 뒤집어서 가져오기 지금 경우는 3번을 이용한거임

    //todo를 보여줄 DOM을 그린다.
    //rendering

    todos.forEach((todo) => {
        const divEl = document.createElement('div');
        const completeEl = document.createElement('input');
        const contentEl = document.createElement('label');
        const userEl = document.createElement('p');
        const deleteEl = document.createElement('button');

        divEl.className = 'todoItem';   //css적용 . 클래스이름으로
        
        //completeEl 꾸미기
        completeEl.type = 'checkbox';
        completeEl.className = 'checkbox';
        completeEl.addEventListener('click', () => {
        updateComplete(todo.id, completeEl.checked)
        });
        completeEl.checked = todo.complete;     //complete = true : check 상태 false : check안된 상태        
        //delete
        deleteEl.type='button';
        deleteEl.textContent = 'X';
        deleteEl.className = 'deleteButton';
        deleteEl.addEventListener('click', () => deleteTodo(todo.id));

        contentEl.textContent = todo.content;  //todo의 내용
        contentEl.htmlFor = todo.id;   //htmlFor : label tag에 label for 속성이 있음. 체크박스에 있는 아이디와 맞추게되면 체크박스 자동으로 선택됨
        
        userEl.textContent = todo.user;  //어떤 user가 썻는지?

        divEl.append(completeEl, contentEl, userEl, deleteEl); //box에 지금까지 만들었던 것들을 추가  (순서대로)
        todoContainerEl.append(divEl);
    });
};

const createTodo = () => {
    const todoText = todoInputEl.value;
    //로컬스토리지에 가있는 todos를 가져올꺼임
    const todos = JSON.parse(localStorage.getItem('todos'));
    const newId = todos.length > 0 ? todos[todos.length -1].id + 1 : 1;    //id 는 항상 유니크 해야된다. (중복되면안돼) 생성법 -> 맨 마지막에 있는거에서 + 1을 하겠다. 를 이용
                                                                                //-1은 인덱스가 0부터 시작하기 때문에~ 
    const newTodo  = {
        id: newId,
        complete: false,
        content: todoText,
        user: JSON.parse(localStorage.getItem('login')),        //login정보 파싱
    };
    todos.push(newTodo); //push해 방금만든 newTodo를 
    //새로운 배열을 덮어씌울꺼임
    localStorage.setItem('todos', JSON.stringify(todos));
    todoInputEl.value = '';  //투두 값을 초기화 (다음것을입력해야하니)

    //todo를 다 날리고 처음부터 다시 그린다
    readTodo();
};
const deleteTodo = (deleteId) => {
    const todos = JSON.parse(localStorage.getItem('todos'));
    const filterdTodos = todos.filter((todo) => todo.id !== deleteId);  //배열 하나하나 돌면서 deleteid랑 맞지 않는 것을 필터링할것이다.
    //필터링 = 일치하는 값만 가져오겠다 .  이 같은 경우는 일치하지 않는 값만 가져오겠다는 뜻이다. (!== 때문)

    localStorage.setItem('todos', JSON.stringify(filterdTodos));   //삭제하고 다시 나머지 todo를 로컬스토리지에 저장
    //다시 todo를 그리기
    readTodo(); //한번 삭제하고 다시 읽고 다시 처음부터 그려주는 ~ readTodo
};

const updateComplete = (updateId, Check)  => {
    const todos = JSON.parse(localStorage.getItem('todos'));
    const updateTodos = todos.map((todo) => {
        todo.id === updateId ? (todo.complete = Check) : (todo.complete = todo.complete);
        return todo;
    });
    localStorage.setItem('todos', JSON.stringify(updateTodos));
    readTodo();
}

const logout = () => {
    alert('logout');
    localStorage.removeItem('login');
    location.href = './signin.html';
};

const init = () => {
    isLogin();  //login이 되어있는지 판단
    
    if (!localStorage.getItem('todos')) {       //만약 로컬스토리지에 아이템이 없다면? 빈 배열을 추가해준다.
            localStorage.setItem('todos', JSON.stringify([]));    
    }

        readTodo();

        todoButtonEl.addEventListener('click', createTodo);
        logooutButtonEl.addEventListener('click', logout);
};

document.addEventListener('DOMContentLoaded', init);
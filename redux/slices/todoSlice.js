import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name:'todo',
    initialState:{
        currentId:4,
        todos:[]
    },
    reducers:{
        addTodo:(state, action) => {
            // 1. Payload가 문자열이 아닐 경우(이벤트 객체 등) 안전하게 처리하여 trim 에러 방지
            const newText = (typeof action.payload === 'string' ? action.payload : '').trim();
            
            // 2. 텍스트가 있는 경우에만 할 일 추가 (InputForm에서 체크하지만, 리듀서에서 이중 체크)
            if (newText.length > 0) {
                state.todos.push({
                    id: state.currentId++,
                    text: newText, // 'Text' 대신 소문자 'text' 사용
                    state: 'todo'
                });
            }
        },
        updateTodo: (state, action) => {
            const index = state.todos.findIndex((item) => item.id === action.payload);

            if (index !== -1) {
                const currentItem = state.todos[index];
                
                // 3. 상태(state)를 'todo' <-> 'done'으로 올바르게 토글
                currentItem.state = currentItem.state === 'todo' ? 'done' : 'todo';
                
                // 4. 항목을 배열에서 제거하고 끝으로 이동 (재정렬)
                const [movedItem] = state.todos.splice(index, 1);
                state.todos.push(movedItem);
            }
        },
        deleteTodo: (state, action) => {
            // 5. filter를 사용해 더 간결하게 항목 삭제
            state.todos = state.todos.filter((item) => item.id !== action.payload);
        }

    }
})

export default todoSlice.reducer;
export const { addTodo, updateTodo, deleteTodo } = todoSlice.actions;
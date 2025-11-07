// import { Pressable, StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import Check from '../assets/check.svg';
// import Uncheck from '../assets/uncheck.svg';
// import Del from '../assets/delete.svg';

// const TodoItem = () => {
//   return (
//     <View style={styles.itemContainer}>
//       <Pressable
//       hitSlop={10}
//       style={styles.itemTextChecked}
//       >
//         <Uncheck/>
//         <Check style={styles.itemCheckboxCheckedIcon}/>
//       </Pressable>
//       <Text style={[styles.itemText, styles.itemTextChecked]}>
//         코딩하기
//       </Text>
//       <Pressable style={[
//         styles.deleteButton,
//         styles.deleteButtonDone
//       ]}
//       hitSlop={10}>
//         <Del/>
//       </Pressable>
//     </View>
//   )
// }

// export default TodoItem

// const styles = StyleSheet.create({
//     itemContainer:{
//         flexDirection: 'row',
//         alignItems: 'center',
//         paddingTop: 10,
//         paddingBottom: 15,
//         paddingHorizontal: 15,
//         backgroundColor: '#f7f8fa',
//     },
//     itemCheckbox:{
//         justifyContent: 'center',
//         alignItems: 'center',
//         width: 20,
//         height: 20,
//         marginRight: 13,
//         borderRadius: 6
//     },
//     itemCheckboxCheckedIcon:{
//         shadowColor: '#000000',
//         shadowOpacity: 0.14,
//         shadowRadius: 8,
//         shadowOffset: {
//             width: 0,
//             height: 4
//         }
//     },
//     itemText:{
//         marginRight:'auto',
//         paddingRight: 25,
//         fontSize: 15,
//         lineHeight: 20,
//         color: '#737373'
//     },
//     itemTextChecked:{
//         opacity: 0.3,
//         textDecorationLine: 'line-through'
//     },
//     deleteButton:{
//         opacity: 0.8
//     },
//     deleteButtonDone:{
//         opacity: 0.3
//     }
// })


import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Check from '../assets/check.svg';
import Uncheck from '../assets/uncheck.svg';
import Del from '../assets/delete.svg';

// 💡 Redux 액션을 사용하기 위해 useDispatch 임포트
import { useDispatch } from 'react-redux';
import { updateTodo, deleteTodo } from '../redux/slices/todoSlice';

// 💡 Props로 'item'을 받아야 합니다. (MainScreen에서 전달해 줌)
const TodoItem = ({ item }) => { 
    const dispatch = useDispatch();
    const isDone = item.state === 'done'; // 완료 상태를 쉽게 확인하기 위한 변수

    // 할 일 상태 토글 핸들러
    const handleToggle = () => {
        dispatch(updateTodo(item.id));
    }

    // 할 일 삭제 핸들러
    const handleDelete = () => {
        dispatch(deleteTodo(item.id));
    }

    return (
        <View style={styles.itemContainer}>
            {/* 1. 상태 토글 버튼 */}
            <Pressable
                hitSlop={10}
                style={styles.itemCheckbox} // Checkbox 스타일 적용
                onPress={handleToggle} // 💡 클릭 시 상태 토글
            >
                {/* 💡 isDone 상태에 따라 아이콘을 동적으로 표시 */}
                {isDone ? <Check style={styles.itemCheckboxCheckedIcon}/> : <Uncheck/>} 
            </Pressable>
            
            {/* 2. 할 일 텍스트 */}
            <Text style={[
                styles.itemText, 
                // 💡 isDone 상태에 따라 완료 스타일 적용
                isDone && styles.itemTextChecked
            ]}>
                {/* 💡 item.text를 표시합니다. */}
                {item.text} 
            </Text>
            
            {/* 3. 삭제 버튼 */}
            <Pressable 
                style={[
                    styles.deleteButton,
                    // 💡 isDone 상태에 따라 삭제 버튼 스타일 변경 (선택 사항)
                    isDone && styles.deleteButtonDone
                ]}
                hitSlop={10}
                onPress={handleDelete} // 💡 클릭 시 삭제 액션 디스패치
            >
                <Del/>
            </Pressable>
        </View>
    )
}

export default TodoItem

const styles = StyleSheet.create({
    itemContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 15,
        paddingHorizontal: 15,
        backgroundColor: '#f7f8fa',
    },
    // 💡 itemTextChecked 스타일을 ItemCheckbox에는 적용할 필요가 없습니다.
    itemCheckbox:{
        justifyContent: 'center',
        alignItems: 'center',
        width: 20,
        height: 20,
        marginRight: 13,
        borderRadius: 6
    },
    itemCheckboxCheckedIcon:{
        shadowColor: '#000000',
        shadowOpacity: 0.14,
        shadowRadius: 8,
        shadowOffset: {
            width: 0,
            height: 4
        }
    },
    itemText:{
        marginRight:'auto',
        paddingRight: 25,
        fontSize: 15,
        lineHeight: 20,
        color: '#737373'
    },
    // 💡 완료 시 텍스트 스타일
    itemTextChecked:{ 
        opacity: 0.3,
        textDecorationLine: 'line-through'
    },
    deleteButton:{
        opacity: 0.8
    },
    deleteButtonDone:{
        opacity: 0.3
    }
})


import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addTodo } from '../redux/slices/todoSlice';

const InputForm = () => {
    const[currentValue, setCurrentValue] = useState("");
    const dispatch = useDispatch();

    const handledSubmit = () => {
        // 입력 값 체크는 유지
        if(currentValue !== ''){
            // 현재 입력 값을 payload로 전달합니다.
            dispatch(addTodo(currentValue))
            setCurrentValue('');
        }
    }
     return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding':'height'}
            style={styles.addFormContainer}>
            <TextInput
            style={styles.inputField}
            placeholder='할 일을 작성해주세요.'
            value={currentValue}
            // 💡 수정! 텍스트를 받기 위해 'onChangeText' 사용
            onChangeText={(text) => setCurrentValue(text)}
            onSubmitEditing={handledSubmit}
            />
            {/* 💡 수정! Pressable의 이벤트 객체가 디스패치되는 것을 막기 위해 래핑 */}
            <Pressable style={styles.addButton} onPress={() => handledSubmit()}>
                <Text style={styles.addButtonText}>+</Text>
            </Pressable>
        </KeyboardAvoidingView>
    )

}

export default InputForm

const styles = StyleSheet.create({
    addFormContainer:{
        flexDirection:'row',
        marginTop: 'auto', // 바닥에 붙게 함
        marginBottom: 30,
        paddingHorizontal:20,
        backgroundColor:'#f7f8fa'
    },
    inputField:{
        flex:1,
        height: 42,
        padding: 5,
        marginRight: 25,
        borderRadius: 4,
        borderColor: 'rgba(0,0,0,0.2)',
        borderWidth: 1,
        color: '#000000',
        fontSize: 15,
        textAlignVertical: 'center'
    },
    addButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 42,
        height: 42,
        borderRadius: 4,
        backgroundColor: 'rgba(0,0,0,0.7)',
        shadowColor: '#000000',
        shadowOpacity: 0.14,
        shadowRadius: 8,
        shadowOffset: {
            width: 0,
            height: 4
        }
    },
    addButtonText:{
        color: 'white',
        fontSize: 25
    }
})
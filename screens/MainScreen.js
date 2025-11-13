import { Platform, SafeAreaView, StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import InputForm from '../components/InputForm'
import TodoItem from '../components/TodoItem'
import { useSelector } from 'react-redux'; 

const MainScreen = () => {
  // Redux Store에서 todos를 가져옵니다.
  const todos = useSelector(state => state.todo.todos);
  
  // 할 일 (todo)과 완료된 일 (done)을 분류합니다.
  const todoList = todos.filter(item => item.state === 'todo');
  const doneList = todos.filter(item => item.state === 'done');

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.pageTitle}>ToDo App</Text>
        
        {/* 💡 새로운 컨테이너: InputForm 공간을 제외한 모든 곳을 차지 */}
        <View style={styles.contentWrapper}> 
            
            {/* 할 일 목록 */}
            <Text style={[styles.listTitle, {marginTop: 0}]} >할 일</Text>
            {todoList.length !== 0 ? (
                <FlatList
                data={todoList}
                renderItem={({ item }) => <TodoItem item={item} />}
                keyExtractor={item => item.id.toString()}
                style={styles.emptyListText}
            />
            ):
            (<Text>할 일이 없습니다.</Text>)}
        
            <View style={styles.separator} />
            
            {/* 완료된 일 목록 */}
            <Text style={styles.listTitle}>완료된 일</Text>
            {doneList.length !== 0 ? (
                <FlatList
                data={doneList}
                renderItem={({ item }) => <TodoItem item={item} />}
                keyExtractor={item => item.id.toString()}
                style={styles.emptyListText}
            />
            ) :
            (<Text>완료된 일이 없습니다.</Text>)
            }
        </View>
        
        {/* 입력 폼은 하단에 고정됩니다. */}
        <InputForm/>
    </SafeAreaView>
  )
}

export default MainScreen;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 20 : 0,
        backgroundColor: '#f7f8fa'
    },
    // 💡 새로운 스타일: 목록 영역이 InputForm 공간을 제외한 모든 곳을 차지
    contentWrapper: { 
        flex: 1,
        paddingHorizontal: 15,
    },
    pageTitle:{
        marginBottom:35,
        paddingHorizontal: 15,
        fontSize: 54,
        fontWeight: '600'
    },
    separator:{
        marginHorizontal:10,
        marginTop:25,
        marginBottom:10,
        borderBottomWidth:1,
        borderBottomColor:'rgba(0,0,0,0.2)'
    },
    listTitle:{
        marginBottom:15,
        fontSize: 41,
        fontWeight: '500',
    },
    emptyListText: {
        paddingTop: 10,
        paddingBottom: 15,
        fontSize: 15,
        lineHeight: 20,
        color: '#737373',
    }
})
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import MainScreen from './screens/MainScreen';

// 1. Redux Provider와 Store 임포트 (경로를 확인하세요!)
import { Provider } from 'react-redux';
import { store } from './redux/store';

export default function App() {
  return (
    // 2. Provider로 앱을 감싸고 store 전달
    <Provider store={store}> 
      <View style={styles.container}>
        <MainScreen></MainScreen>
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1
  }
});
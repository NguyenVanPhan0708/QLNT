import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import database from '@react-native-firebase/database';
import Login from './components/Login';
import Home from './components/Home';
import Signup from './components/Signup';
import QLCauHinh from './components/QLCauHinh';
import QLDichVu from './components/QLDichVu';
import QLKhachThue from './components/QLKhachThue';
import QLPhong from './components/QLPhong';
import QLTaiKhoan from './components/QLTaiKhoan';
import QLThuTien from './components/QLThuTien';
import CTPhong from './components/CTPhong';
import CTThuTien from './components/CTThuTien';
import CTKhachThue from './components/CTKhachThue';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ title: 'Đăng Nhập' }} />
        <Stack.Screen name="Home" component={Home} options={{ title: 'Home' }} />
        <Stack.Screen name="Signup" component={Signup} options={{ title: 'Tạo Tài Khoản' }} />
        <Stack.Screen name="QLCauHinh" component={QLCauHinh} options={{ title: 'Cấu Hình' }} />
        <Stack.Screen name="QLDichVu" component={QLDichVu} options={{ title: 'Dịch Vụ' }} />
        <Stack.Screen name="QLKhachThue" component={QLKhachThue} options={{ title: 'Khách Thuê' }} />
        <Stack.Screen name="QLPhong" component={QLPhong} options={{ title: 'Phòng' }} />
        <Stack.Screen name="QLTaiKhoa" component={QLTaiKhoan} options={{ title: 'Tài Khoản' }} />
        <Stack.Screen name="QLThuTien" component={QLThuTien} options={{ title: 'Thu Tiền' }} />
        <Stack.Screen name="CTPhong" component={CTPhong} options={{ title: 'Chi Tiết Phòng' }} />
        <Stack.Screen name="CTThuTien" component={CTThuTien} options={{ title: 'Chi Tiết Thu Tiền' }} />
        <Stack.Screen name="CTKhachThue" component={CTKhachThue} options={{ title: 'Chi Tiết Khách Thuê' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
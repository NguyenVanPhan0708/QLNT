import React from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native'

const Home = ({ navigation, route }) => {
    const USER = route.params.user
    const nhatro = require('../img/logo.png')
    const phongtro = require('../img/iconlogo.png')
    const dichvu = require('../img/logodichvu.png')
    var today = new Date()
    var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
    const Thoat = () => {
        Alert.alert(
            "Xác nhận đăng xuất ứng dụng?",
            "Bạn có nuốm đăng xuất ?",
            [
                {
                    text: "Cancel"
                },
                { text: "OK", onPress: () => navigation.replace('Login') }
            ]
        );

    }
    return (
        <View style={styles.tong}>
            <Image source={nhatro} style={styles.nhatro} />
            <View style={{ marginTop: 25 }}>
                <View style={styles.row}>
                    <View style={styles.muc}>
                        <TouchableOpacity onPress={() => { navigation.navigate("QLPhong") }} style={styles.muc}>
                            <Image source={phongtro} style={styles.hinhmuc} />
                            <Text style={styles.txtmuc}>Phòng</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.muc}>

                        <TouchableOpacity onPress={() => { navigation.navigate('QLDichVu') }} style={styles.muc}>
                            <Image source={dichvu} style={styles.hinhmuc} />
                            <Text style={styles.txtmuc}>Dịch Vụ</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{ height: 150 }}></View>
            <TouchableOpacity style={styles.btnThoat} onPress={Thoat}>
                <Text>THOÁT</Text>
            </TouchableOpacity>
            <Text>Thông tin: </Text>
            <Text>User Name: {USER.hoten}</Text>
            <Text>SDT: {USER.sdt}</Text>
            <Text>{date}</Text>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    tong: {
        flex: 1,
        backgroundColor: '#003f5c',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    nhatro: {
        width: 350,
        height: 250,
        resizeMode: 'stretch'

    },
    row: {
        flexDirection: 'row'
    },
    muc: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    hinhmuc: {
        width: 75,
        height: 75
    },
    txtmuc: {
        color: '#fff'
    },
    btnThoat: {
        backgroundColor: '#8C8C8C',
        width: 350,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        padding: 10,
        borderRadius: 25,
    }
})


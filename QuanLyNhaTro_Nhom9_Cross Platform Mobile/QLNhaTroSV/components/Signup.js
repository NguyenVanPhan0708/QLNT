import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native'
import database from '@react-native-firebase/database'

const Signup = ({ navigation, route }) => {
    const data = route.params.data
    const [hoten, setHoten] = useState('')
    const [sdt, setSdt] = useState('')
    const [name, setName] = useState('')
    const [matkhau, setMatkhau] = useState('')
    const [nhaplaimatkhau, setNhaplaimatkhau] = useState('')
    const dangky = async () => {
        if (hoten === '') {
            Alert.alert("Thông Báo","Họ tên không được để trống.")
            return
        }
        if (sdt === '') {
            Alert.alert("Thông Báo","Số điện thoại không được để trống.")
            return
        }
        if (name === '') {
            Alert.alert("Thông Báo","Tên đăng nhập không được trống.")
            return
        }
        if (matkhau === '') {
            Alert.alert("Thông Báo","Mật khẩu không được để trống.")
            return
        }
        if (nhaplaimatkhau === '') {
            Alert.alert("Thông Báo","Nhập lại mật khẩu không được để trống.")
            return
        }
        if (matkhau != nhaplaimatkhau) {
            Alert.alert("Thông Báo","Nhập lại mật khẩu không khớp.")
            return
        }
        let tk = data.find(value => {
            if (value.name === name) {
                return value;
            }
        })
        if (tk != null) {
            Alert.alert("Thông Báo","Tài khoản đã tồn tại.")
            return
        }
        let user = {
            hoten: hoten,
            sdt: sdt,
            name: name,
            password: matkhau
        }
        try {
            await database().ref("/users").push(user);
            Alert.alert("Thông Báo","Đăng ký thành công.")
            navigation.navigate('Login')

        }
        catch (e) {
            Alert.alert('Loi',e)
        }
    }

    return (
        <View style={styles.tong1}>
            <View style={styles.vtieude}>
                <Text style={styles.tieude}>REGISTER</Text>
            </View>

            <View style={styles.tong2}>
                <Text style={styles.txtTieuDe}>Họ tên: </Text>
                <TextInput style={styles.txtInput} placeholder={"Nhập họ tên..."} onChangeText={(text) => { setHoten(text) }} />
            </View>
            <View style={styles.tong2}>
                <Text style={styles.txtTieuDe}>SDT: </Text>
                <TextInput style={styles.txtInput} placeholder={"Nhập số điện thoại..."} onChangeText={(text) => { setSdt(text) }} />
            </View>
            <View style={styles.tong2}>
                <Text style={styles.txtTieuDe}>Username: </Text>
                <TextInput style={styles.txtInput} placeholder={"Nhập Username..."} onChangeText={(text) => { setName(text) }} />
            </View>
            <View style={styles.tong2}>
                <Text style={styles.txtTieuDe}>Mật khẩu: </Text>
                <TextInput style={styles.txtInput} placeholder={"Nhập mật khẩu..."} secureTextEntry={true} onChangeText={(text) => { setMatkhau(text) }} />
            </View>
            <View style={styles.tong2}>
                <Text style={styles.txtTieuDe}>Nhập lại: </Text>
                <TextInput style={styles.txtInput} placeholder={"Nhập lại ..."} secureTextEntry={true} onChangeText={(text) => { setNhaplaimatkhau(text) }} />
            </View>
            <View style={styles.vbtn}>
                <TouchableOpacity style={styles.btn} onPress={dangky}>
                    <Text style={styles.txtbtn}>REGISTER</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Signup

const styles = StyleSheet.create({
    tong1: {
        flex: 1,
        backgroundColor: '#003f5c'
    },
    vtieude: {
        margin: 15,
        alignItems: 'center'
    },
    tong2: {
        flexDirection: 'row'
    },
    tieude: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#F2D43D'
    },
    txtTieuDe: {
        fontSize: 20,
        padding: 10,
        margin: 10,
        textAlign: 'center',
        width: 120,
        color: '#A68524'
    },
    txtInput: {
        backgroundColor: '#F2CA52',
        justifyContent: 'flex-end',
        width: 250,
        fontSize: 20,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 25,
        paddingRight: 25,
        margin: 10,
        borderRadius: 25
    },
    txt: {
        fontSize: 16,
        color: '#F2F2F2'
    },
    vbtn: {
        marginTop: 50,
        flex: 1,
        alignItems: 'center'
    },
    btn: {
        backgroundColor: '#8C8C8C',
        width: 200,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 2.5,
        margin: 5,
        padding: 10,
        borderRadius: 25,
    }

})




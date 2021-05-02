import React, { useEffect, useState } from 'react'
import { View, Image, Text, ImageBackground, StyleSheet, TextInput, TouchableOpacity, Alert }from 'react-native'
import database from '@react-native-firebase/database'

const Login = ({ navigation }) => {
    const [data, setdata] = useState([])
    const [name, setname] = useState('')
    const [password, setpassword] = useState('')
    useEffect(() => {
        const getData = async () => {
            try {
                await database().ref("/users")
                    .on('value', snapshot => {
                        let arr = [];
                        snapshot.forEach(element => {
                            let temp = {
                                id: element.key,
                                hoten: element.val().hoten,
                                sdt: element.val().sdt,
                                name: element.val().name,
                                password: element.val().password
                            }
                            arr.push(temp)
                        })
                        setdata(arr)
                    });
            }
            catch (e) {
                Alert.alert("Lỗi: ", e);
            }
        }
        getData();

    }, [])
    const nen = require('../img/nen.png');
    const logo = require('../img/logo.png');
    const dangnhap = () => {
        if (name === '') {
            Alert.alert("Thông Báo","Vui lòng nhập tên tài khoản.")
            return
        }
        if (password === '') {
            Alert.alert("Thông Báo","Vui lòng nhập mật khẩu.")
            return
        }
        let user = data.find(value => {
            if (value.name === name && value.password === password) {
                return value;
            }
        })
        if (user != null) {
            navigation.replace('Home', { user: user })
        }
        else {
            Alert.alert("Thông Báo","Bạn sai tên đăng nhập hoặc mật khẩu")
        }

    }
    const dangky = () => {
        navigation.navigate('Signup', { data: data })
    }
    return (
        <ImageBackground source={nen} style={styles.nen}>
            <View>
                <Image source={logo} style={styles.logo} />
                <TextInput style={styles.input}
                    placeholder='User name...'
                    placeholderTextColor='#003f5c'
                    onChangeText={text => setname(text)}
                />
                <TextInput style={styles.input}
                    placeholder='Password...'
                    placeholderTextColor='#003f5c'
                    secureTextEntry={true}
                    onChangeText={text => setpassword(text)}
                />

                <TouchableOpacity style={{ alignItems: 'center' }}>
                    <Text style={styles.forgot}>Forgot Password?</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={dangnhap} style={styles.loginBtn}>
                    <Text style={styles.loginText}>LOGIN</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ alignItems: 'center' }} onPress={dangky}>
                    <Text style={styles.loginText}>Signup</Text>
                </TouchableOpacity>
            </View>

        </ImageBackground>
    )
}

export default Login

const styles = StyleSheet.create({
    nen: {
        flex: 1,
        resizeMode: 'contain',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        resizeMode: 'contain',
        width: 200,
        height: 200
    },
    input: {
        backgroundColor: "#465881",
        borderRadius: 25,
        height: 55,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },
    forgot: {
        color: "red",
        fontSize: 11
    },
    loginBtn: {
        backgroundColor: "#fb5b5a",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10
    },
    hinhmuc: {
        width: 75,
        height: 75
    },
})

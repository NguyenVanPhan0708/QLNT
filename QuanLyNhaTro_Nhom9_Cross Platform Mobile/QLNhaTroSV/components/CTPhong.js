import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native'
import database from '@react-native-firebase/database'
import CheckBox from '@react-native-community/checkbox'


const CTPhong = ({ navigation, route }) => {
    const { tt, value } = route.params;
    const [id, setid] = useState('')
    const [ten, setten] = useState('');
    const [gia, setgia] = useState('');
    const [trangthai, settrangthai] = useState(false);
    useEffect(() => {
        if (tt === '1') {
            setid(value.id)
            setten(value.ten)
            setgia(value.gia)
            settrangthai(value.trangthai)
        }
    }, [])
    const fSave = async () => {
        if (ten === '') {
            Alert.alert("Cảnh Báo", "Tên phòng không được để trống.")
            return
        }
        if (gia === '') {
            Alert.alert("Cảnh Báo", "Giá phòng không được để trống.")
            return
        }
        let itemphong = {
            ten: ten,
            gia: Number(gia),
            trangthai: trangthai
        }
        try {
            if (tt === '0') {
                await database().ref("/Phong").push(itemphong);
            }
            else {
                await database().ref(`/Phong/${id}`).set(itemphong);
            }
            navigation.navigate('QLPhong')

        }
        catch (e) {
            Alert.alert('Loi',e)
        }
    }
    return (
        <View style={styles.tong1} >
            <View style={styles.vtieude}>
                <Text style={styles.tieude}>Chi Tiết Phòng</Text>
            </View>
            <View style={styles.tong2}>
                <Text style={styles.txtTieuDe}>Tên phòng: </Text>
                <TextInput style={styles.txtInput} placeholder={"Nhập tên phòng..."} value={ten} onChangeText={(text) => { setten(text) }}
                />
            </View>
            <View style={styles.tong2}>
                <Text style={styles.txtTieuDe}>Giá: </Text>
                <TextInput style={styles.txtInput} placeholder={"Nhập giá phòng..."} value={String(gia)} onChangeText={(number) => { setgia(number) }}
                />
            </View>
            <View style={styles.tong2}>
                <Text style={styles.txtTieuDe}>Trạng Thái: </Text>
                <View style={{ flexDirection: 'row' }}>
                    <CheckBox style={styles.checkbox}
                        disabled={false}
                        value={trangthai}
                        onValueChange={(newValue) => settrangthai(newValue)}
                    />
                    <Text style={styles.txtcheckbox}>Đã cho thuê</Text>
                </View>

            </View>
            <View style={styles.vbtn}>
                <TouchableOpacity style={styles.btn} onPress={fSave}>
                    <Text style={styles.txt}>Lưu</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CTPhong

const styles = StyleSheet.create({
    tong1: {
        flex: 1,
        backgroundColor: '#003f5c'
    },
    tong2: {
        flexDirection: 'row'
    },
    tieude: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#F2D43D'
    },
    vtieude: {
        margin: 15,
        alignItems: 'center'
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
        margin: 5,
        padding: 10,
        borderRadius: 25,
    },
    checkbox: {
        alignSelf: "center",
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 25,
        paddingRight: 25,
        margin: 10,
    },
    txtcheckbox: {
        alignSelf: "center",
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 25,
        margin: 10,
        color: '#A68524'
    }
})

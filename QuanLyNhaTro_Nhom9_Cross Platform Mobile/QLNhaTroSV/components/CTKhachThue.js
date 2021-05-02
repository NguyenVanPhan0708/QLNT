import React, { useState, useEffect } from 'react'
import { Alert, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import CheckBox from '@react-native-community/checkbox'
import { TouchableOpacity } from 'react-native-gesture-handler'
import DateTimePicker from '@react-native-community/datetimepicker'
import database from '@react-native-firebase/database'

const CTKhachThue = ({ navigation, route }) => {
    const phong = route.params.phong
    const khachthue = route.params.value
    const tt = route.params.tt
    const [id, setid] = useState('')
    const [idphong, setIdphong] = useState('')
    const [hoten, setHoten] = useState('')
    const [sdt, setSdt] = useState('')
    const [cmnd, setCmnd] = useState('')
    const [diachi, setDiachi] = useState('')

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [trangthai, setTrangthai] = useState(true)

    var today = new Date()
    var ngay = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
    const [ngaythue, setNgaythue] = useState(ngay)
    useEffect(() => {
        if (tt === '1') {
            setid(khachthue.id)
            setHoten(khachthue.hoten)
            setSdt(khachthue.sdt)
            setCmnd(khachthue.cmnd)
            setDiachi(khachthue.diachi)
            setTrangthai(khachthue.gioitinh)
            setNgaythue(khachthue.ngaythue)
            setIdphong(khachthue.id)
        }
    }, [])
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
        setNgaythue(currentDate.getDate() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear())
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const Save = async () => {
        if (hoten == '') {
            Alert.alert("Cảnh Báo", "Họ tên khách thuê không được để trống.")
            return
        }
        if (sdt == '') {
            Alert.alert("Cảnh Báo", "Số điện thoại khách thuê không được để trống.")
            return
        }
        if (cmnd == '') {
            Alert.alert("Cảnh Báo", "Chứng minh nhân dân khách thuê không được để trống.")
            return
        }
        if (diachi == '') {
            Alert.alert("Cảnh Báo", "Địa chỉ khách thuê không được để trống.")
            return
        }
        if (ngaythue == '') {
            Alert.alert("Cảnh Báo", "Ngày thuê không được để trống.")
            return
        }
        let itemhd = {
            hoten: hoten,
            sdt: sdt,
            cmnd: cmnd,
            gioitinh: trangthai,
            diachi: diachi,
            ngaythue: ngaythue,
            idphong: phong.id
        }
        try {
            console.log(tt)
            if (tt === '0') {
                await database().ref("/KhachThue").push(itemhd);
            }
            else {
                await database().ref(`/KhachThue/${id}`).set(itemhd);
            }
            navigation.navigate('QLKhachThue')
        }
        catch (e) {
            Alert.alert('Err:', e)
        }

    }

    return (
        <ScrollView style={styles.tong1}>
            <View style={styles.vtieude}>
                <Text style={styles.tieude}>Chi Tiết Khách Thuê</Text>
            </View>
            <View style={styles.tong2}>
                <Text style={styles.txtTieuDe} >Tên KH: </Text>
                <TextInput style={styles.txtInput} placeholder={"Nhập tên khách hàng"} value={hoten} onChangeText={(value) => setHoten(value)} />
            </View>
            <View style={styles.tong2}>
                <Text style={styles.txtTieuDe} >SDT:  </Text>
                <TextInput style={styles.txtInput} placeholder={"Nhập số điện thoại..."} value={sdt} onChangeText={(value) => setSdt(value)} />
            </View>
            <View style={styles.tong2}>
                <Text style={styles.txtTieuDe} >CMND: </Text>
                <TextInput style={styles.txtInput} placeholder={"Nhập CMND ..."} value={cmnd} onChangeText={(value) => setCmnd(value)} />
            </View>
            <View style={styles.tong2}>
                <Text style={styles.txtTieuDe}>Giới Tính: </Text>
                <CheckBox style={styles.checkbox}
                    disabled={false}
                    value={trangthai}
                    onValueChange={(newValue) => setTrangthai(newValue)}
                />
                <Text style={styles.txtTieuDeC} >Nam</Text>
            </View>
            <View style={styles.tong2}>
                <Text style={styles.txtTieuDe}>Địa Chỉ: </Text>
                <TextInput style={styles.txtInput} placeholder={"Nhập địa chỉ..."} value={diachi} onChangeText={(value) => setDiachi(value)} />
            </View>
            <View style={styles.tong2}>
                <Text style={styles.txtTieuDe}>Ngày thuê: </Text>
                <TextInput style={styles.txtInput} value={ngaythue} onChangeText={(value) => { setNgaythue(value) }} />
            </View>
            <View style={styles.tong2}>
                <Text style={styles.txtTieuDe}></Text>
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    />
                )}
                <TouchableOpacity style={styles.btnDate} onPress={showDatepicker}>
                    <Text style={styles.txt}>Date</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.vbtn}>
                <TouchableOpacity style={styles.btn} onPress={Save}>
                    <Text style={styles.txt}>LƯU</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default CTKhachThue

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
    txtTieuDeC: {
        fontSize: 18,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 10,
        marginTop: 10,
        marginRight: 10,
        marginBottom: 10,
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
    btnDate: {
        backgroundColor: '#8C8C8C',
        width: 100,
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
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 10,
        margin: 10,
    },
    txtcheckbox: {
        alignSelf: "center",
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 25,
        margin: 10,
    }
})

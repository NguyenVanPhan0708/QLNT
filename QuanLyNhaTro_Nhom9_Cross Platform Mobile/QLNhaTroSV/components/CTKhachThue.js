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
            Alert.alert("C???nh B??o", "H??? t??n kh??ch thu?? kh??ng ???????c ????? tr???ng.")
            return
        }
        if (sdt == '') {
            Alert.alert("C???nh B??o", "S??? ??i???n tho???i kh??ch thu?? kh??ng ???????c ????? tr???ng.")
            return
        }
        if (cmnd == '') {
            Alert.alert("C???nh B??o", "Ch???ng minh nh??n d??n kh??ch thu?? kh??ng ???????c ????? tr???ng.")
            return
        }
        if (diachi == '') {
            Alert.alert("C???nh B??o", "?????a ch??? kh??ch thu?? kh??ng ???????c ????? tr???ng.")
            return
        }
        if (ngaythue == '') {
            Alert.alert("C???nh B??o", "Ng??y thu?? kh??ng ???????c ????? tr???ng.")
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
                <Text style={styles.tieude}>Chi Ti???t Kh??ch Thu??</Text>
            </View>
            <View style={styles.tong2}>
                <Text style={styles.txtTieuDe} >T??n KH: </Text>
                <TextInput style={styles.txtInput} placeholder={"Nh???p t??n kh??ch h??ng"} value={hoten} onChangeText={(value) => setHoten(value)} />
            </View>
            <View style={styles.tong2}>
                <Text style={styles.txtTieuDe} >SDT:  </Text>
                <TextInput style={styles.txtInput} placeholder={"Nh???p s??? ??i???n tho???i..."} value={sdt} onChangeText={(value) => setSdt(value)} />
            </View>
            <View style={styles.tong2}>
                <Text style={styles.txtTieuDe} >CMND: </Text>
                <TextInput style={styles.txtInput} placeholder={"Nh???p CMND ..."} value={cmnd} onChangeText={(value) => setCmnd(value)} />
            </View>
            <View style={styles.tong2}>
                <Text style={styles.txtTieuDe}>Gi???i T??nh: </Text>
                <CheckBox style={styles.checkbox}
                    disabled={false}
                    value={trangthai}
                    onValueChange={(newValue) => setTrangthai(newValue)}
                />
                <Text style={styles.txtTieuDeC} >Nam</Text>
            </View>
            <View style={styles.tong2}>
                <Text style={styles.txtTieuDe}>?????a Ch???: </Text>
                <TextInput style={styles.txtInput} placeholder={"Nh???p ?????a ch???..."} value={diachi} onChangeText={(value) => setDiachi(value)} />
            </View>
            <View style={styles.tong2}>
                <Text style={styles.txtTieuDe}>Ng??y thu??: </Text>
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
                    <Text style={styles.txt}>L??U</Text>
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

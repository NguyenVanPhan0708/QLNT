import React, { useState, useEffect } from 'react'
import { Alert, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import CheckBox from '@react-native-community/checkbox'
import database from '@react-native-firebase/database'
import DateTimePicker from '@react-native-community/datetimepicker'

const CTThuTien = ({ navigation, route }) => {
    const phong = route.params.phong
    const csdiencu = route.params.d
    const csnuoccu = route.params.n
    const tt = route.params.tt
    const hoadon = route.params.value
    const [id, setId] = useState(0)
    const [csdienmoi, setcsdienmoi] = useState('')
    const [csnuocmoi, setcsnuocmoi] = useState('')
    const [trangthai, settrangthai] = useState(false)
    const [giadien, setGiadien] = useState('')
    const [gianuoc, setGianuoc] = useState('')

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    var today = new Date()
    var ngay = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
    const [ngaytao, setngaytao] = useState(ngay)

    useEffect(() => {
        const getData = async () => {
            try {
                await database().ref("/DichVu")
                    .once('value', snapshot => {
                        setGiadien(snapshot.val().Dien)
                        setGianuoc(snapshot.val().Nuoc)
                    })
            }
            catch (e) {
                Alert.alert("Err:", e)
            }
            if (tt === '1') {
                setId(hoadon.id)
                setcsdienmoi(hoadon.csdienmoi)
                setcsnuocmoi(hoadon.csnuocmoi)
                settrangthai(hoadon.trangthai)
                setngaytao(hoadon.ngaytao)
            }
        }
        getData()
    }, [])

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
        setngaytao(currentDate.getDate() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear())
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const save = async () => {
        if (csdienmoi === '') {
            Alert.alert("Cảnh Báo", "Vui lòng nhập chỉ số điện mới.")
            return
        }
        if (csnuocmoi === '') {
            Alert.alert("Cảnh Báo", "Vui lòng nhập chỉ số nước mới.")
            return
        }
        if (Number(csdienmoi) < csdiencu) {
            Alert.alert("Cảnh Báo", "Chỉ số điện mới không hợp lệ.")
            return
        }
        if (Number(csnuocmoi) < csnuoccu) {
            Alert.alert("Cảnh Báo", "Chỉ số nước mới không hợp lệ.")
            return
        }
        let hd = {
            ngaytao: ngaytao,
            csdienmoi: Number(csdienmoi),
            csnuocmoi: Number(csnuocmoi),
            tienphong: phong.gia,
            tiendien: (Number(csdienmoi) - csdiencu) * giadien,
            tiennuoc: (Number(csnuocmoi) - csnuoccu) * gianuoc,
            tongtien: phong.gia + (Number(csdienmoi) - csdiencu) * giadien + (Number(csnuocmoi) - csnuoccu) * gianuoc,
            trangthai: trangthai,
            idphong: phong.id
        }
        try {
            if (tt === '0') {
                await database().ref("/HoaDon").push(hd);
            }
            else {
                await database().ref(`/HoaDon/${id}`).set(hd);
            }
            navigation.navigate('QLThuTien')
        }
        catch (e) {
            Alert.alert('Err:', e)
        }


    }

    return (
        <ScrollView style={styles.tong1}>
            <View style={styles.vtieude}>
                <Text style={styles.tieude}>Chi Tiết Hóa Đơn</Text>
            </View>
            <View style={styles.tong2}>
                <Text style={styles.txtTieuDe}>Hoá đơn: </Text>
                <TextInput style={styles.txtInput1} value={ngaytao} onChangeText={(value) => { setngaytao(value) }} />
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
            <View style={styles.tong2}>
                <Text style={styles.txtTieuDe}>Điện Cũ: </Text>
                <Text style={styles.csInput}>{csdiencu}</Text>
                <Text style={styles.txtCS}>Mới:</Text>
                <TextInput style={styles.csInput} placeholder={'New...'} value={csdienmoi + ''} onChangeText={(value) => { setcsdienmoi(value) }} />
            </View>
            <View style={styles.tong2}>
                <Text style={styles.txtTieuDe}>Nước Cũ: </Text>
                <Text style={styles.csInput}>{csnuoccu}</Text>
                <Text style={styles.txtCS}>Mới</Text>
                <TextInput style={styles.csInput} placeholder={'New...'} value={csnuocmoi + ''} onChangeText={(value) => { setcsnuocmoi(value) }} />
            </View>
            <View style={styles.tong2}>
                <Text style={styles.txtTieuDe}>Giá Phòng: </Text>
                <Text style={styles.txtInput}>{phong.gia}</Text>
            </View>
            <View style={styles.tong2}>
                <Text style={styles.txtTieuDe}>Tiền Điện: </Text>
                <Text style={styles.txtInput}>{csdienmoi === '' ? 0 : (csdienmoi - csdiencu) * giadien}</Text>
            </View>
            <View style={styles.tong2}>
                <Text style={styles.txtTieuDe}>Tiền Nước: </Text>
                <Text style={styles.txtInput}>{csnuocmoi === '' ? 0 : (csnuocmoi - csnuoccu) * gianuoc}</Text>
            </View>
            <View style={styles.tong2}>
                <Text style={styles.txtTieuDe}>Tổng Tiền: </Text>
                <Text style={styles.txtInput}>{(csdienmoi === '' ? Number(0) : (csdiencu - csdiencu)) * giadien + (csnuocmoi === '' ? Number(0) : (csnuoccu - csnuoccu)) * gianuoc + phong.gia}</Text>
            </View>
            <View style={styles.tong2}>
                <Text style={styles.txtTieuDe}>Trạng thái:</Text>
                <CheckBox style={styles.checkbox}
                    disabled={false}
                    value={trangthai}
                    onValueChange={(newValue) => settrangthai(newValue)}
                />
                <Text style={styles.txtcheckbox}>Đã thanh toán</Text>
            </View>
            <View style={styles.vbtn}>
                <TouchableOpacity style={styles.btn} onPress={save}>
                    <Text style={styles.txt}>LƯU</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default CTThuTien

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
    txtInput1: {
        backgroundColor: '#F2CA52',
        justifyContent: 'flex-end',
        width: 150,
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
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
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
        color: '#A68524',
        alignSelf: "center",
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 25,
        margin: 10,
    },
    csInput: {
        backgroundColor: '#F2CA52',
        justifyContent: 'flex-end',
        width: 75,
        fontSize: 20,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        margin: 10,
        borderRadius: 15
    },
    txtCS: {
        fontSize: 20,
        padding: 10,
        margin: 10,
        textAlign: 'center',
        width: 60,
        color: '#A68524'
    }


})

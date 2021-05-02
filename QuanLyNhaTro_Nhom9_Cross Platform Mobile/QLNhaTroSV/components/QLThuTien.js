import React, { useState, useEffect } from 'react'
import { FlatList, StyleSheet, Text, View, Alert } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import database from '@react-native-firebase/database'


const QLThuTien = ({ navigation, route }) => {
    const phong = route.params.value
    const [data, setdata] = useState([])
    useEffect(() => {
        const getData = async () => {
            try {
                await database().ref("/HoaDon")
                    .on('value', snapshot => {
                        let arr = []
                        snapshot.forEach(element => {
                            let temp = {
                                id: element.key,
                                ngaytao: element.val().ngaytao,
                                csdienmoi: element.val().csdienmoi,
                                csnuocmoi: element.val().csnuocmoi,
                                tienphong: element.val().tienphong,
                                tiendien: element.val().tiendien,
                                tiennuoc: element.val().tiennuoc,
                                tongtien: element.val().tongtien,
                                trangthai: element.val().trangthai,
                                idphong: element.val().idphong
                            }
                            arr.push(temp)
                        })
                        let arrphong = arr.filter((value) => {
                            return value.idphong == phong.id
                        })
                        setdata(arrphong.reverse())
                    });

            }
            catch (e) {
                Alert.alert("Lỗi", e);
            }
        }
        getData()
    }, [])
    const them = (tt) => {
        if (data.length == 0) {
            navigation.navigate('CTThuTien', { tt: tt, phong: phong, d: 0, n: 0 })
        }
        else {
            navigation.navigate('CTThuTien', { tt: tt, phong: phong, d: data[0].csdienmoi, n: data[0].csnuocmoi })
        }
    }
    const capnhat = (tt, value) => {
        let vt = data.findIndex((item) => {
            return item.id === value.id
        })
        if (vt == data.length - 1) {
            navigation.navigate('CTThuTien', { tt: tt, value: value, phong: phong, d: 0, n: 0 })
        }
        else {
            navigation.navigate('CTThuTien', { tt: tt, phong: phong, value: value, d: data[vt + 1].csdienmoi, n: data[vt + 1].csnuocmoi })
        }
    }
    const xoa = (id) => {
        try {
            Alert.alert(
                "Xóa",
                "Bạn có muốn xóa hay không ?",
                [
                    {
                        text: "Cancel"
                    },
                    { text: "OK", onPress: () => XoaHD(id) }
                ]
            );
        }
        catch (e) {
            Alert.alert('Err: ', e)
        }
    }
    const XoaHD = async (id) => {
        await database().ref(`/HoaDon/${id}`).remove()
    }
    const renderItem = (item) => {
        if (item.trangthai) {
            return (
                <TouchableOpacity style={styles.item} onPress={() => { capnhat('1', item) }}>
                    <Text style={styles.txtCS}>HD: {item.ngaytao}</Text>
                    <View>
                        <Text style={styles.txtCS}>Tổng tiền: {item.tongtien}</Text>
                        <Text style={styles.txtCS}>Trạng thái:{item.trangthai ? "Đã thanh toán" : "Chưa thanh toán"}</Text>
                    </View>
                    <TouchableOpacity style={styles.btnitem} onPress={() => { xoa(item.id) }}>
                        <Text style={styles.txtitem}>X</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            )
        }
        else {
            return (
                <TouchableOpacity style={styles.item1} onPress={() => { capnhat('1', item) }}>
                    <Text style={styles.txtCS}>HD: {item.ngaytao}</Text>
                    <View>
                        <Text style={styles.txtCS}>Tổng tiền: {item.tongtien}</Text>
                        <Text style={styles.txtCS}>Trạng thái:{item.trangthai ? "Đã thanh toán" : "Chưa thanh toán"}</Text>
                    </View>
                    <TouchableOpacity style={styles.btnitem} onPress={() => { xoa(item.id) }}>
                        <Text style={styles.txtitem}>X</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            )
        }
    }
    return (
        <View style={styles.tong1}>
            <Text style={styles.tieude}>Danh Sách Hóa Đơn</Text>
            <FlatList style={styles.list}
                data={data}
                renderItem={({ item }) => renderItem(item)}
                keyExtractor={item => item.id}
            />
            <TouchableOpacity style={styles.btn} onPress={() => them('0')}>
                <Text style={styles.txtitem}>THÊM</Text>
            </TouchableOpacity>
        </View>
    )
}

export default QLThuTien

const styles = StyleSheet.create({
    tong1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#003f5c'
    },
    tieude: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#F2D43D'
    },

    list: {

    },
    listCN: {
        flexDirection: 'row'
    },
    listHT: {
        alignItems: 'flex-start'

    },
    item: {
        flexDirection: 'row',
        backgroundColor: '#F2CA52',
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 25
    },
    item1: {
        flexDirection: 'row',
        backgroundColor: '#F2F2F2',
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 25
    },
    tenitem: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#8C8C8C'
    },
    btnitem: {
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#A68524',
        margin: 2.5,
        padding: 3.5,
        borderRadius: 25
    },
    txtitem: {
        fontSize: 16,
        color: '#F2F2F2'
    },
    txtitem1: {
        fontSize: 16,
        color: '#8C8C8C'
    },
    btn: {
        backgroundColor: '#8C8C8C',
        width: 200,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 2.5,
        margin: 5,
        padding: 10,
        borderRadius: 25
    },
    txtCS: {
        fontSize: 16,
        padding: 2.5,
        margin: 2.5,
        fontWeight: 'bold',
        color: '#2C31AB',
    },
    btnitem: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#A68524',
        margin: 2.5,
        padding: 3.5,
        borderRadius: 50
    },

})

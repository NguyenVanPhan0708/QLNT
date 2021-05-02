import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native'
import database from '@react-native-firebase/database'

const QLPhong = ({ navigation }) => {
    const [data, setdata] = useState([])
    useEffect(() => {
        const getData = async () => {
            try {
                await database().ref("/Phong")
                    .on('value', snapshot => {
                        let arr = [];
                        snapshot.forEach(element => {
                            let temp = {
                                id: element.key,
                                ten: element.val().ten,
                                gia: element.val().gia,
                                trangthai: element.val().trangthai
                            }
                            arr.push(temp)
                        })
                        setdata(arr)
                    });
            }
            catch (e) {
                Alert.alert("Lỗi:", e);
            }
        }
        getData();
    }, []);

    const them = (tt) => {
        navigation.navigate('CTPhong', { tt: tt })
    }
    const capnhat = (tt, value) => {
        navigation.navigate('CTPhong', { tt: tt, value: value })
    }
    const XoaKT=async(idXoa)=>{
        try {
            await database().ref("/KhachThue")
            .once('value', snapshot => {
                let arr = []
                snapshot.forEach(element => {
                    let temp = {
                        id: element.key,
                        idphong: element.val().idphong
                    }
                    arr.push(temp)
                })

                let arrphong = arr.filter((value) => {
                    return value.idphong === idXoa
                })
                arrphong.forEach(async(value) => {
                    await database().ref(`/KhachThue/${value.id}`).remove()
                })
            });
        } catch (error) {
            
        }
    }
    const XoaHD =async(idXoa)=>{
        try {
        await database().ref("/HoaDon")
            .once('value', snapshot => {
                let arr = []
                snapshot.forEach(element => {
                    let temp = {
                        id: element.key,
                        idphong: element.val().idphong
                    }
                    arr.push(temp)
                })
                let arrphong = arr.filter((value) => {
                    return value.idphong == idXoa
                })
                arrphong.forEach(async(value) => {
                    await database().ref(`/HoaDon/${value.id}`).remove()
                })
            });
        } catch (error) {
            
        }
    }
    const XoaPhong = async (id) => {
        try {
        XoaHD(id)
        XoaKT(id)
        await database().ref(`/Phong/${id}`).remove()
        } catch (error) {
            Alert.alert('Err:', error)
        }
    }
    const xemHD = (value) => {
        navigation.navigate("QLThuTien", { value: value })
    }
    const xemKT = (value) => {
        navigation.navigate("QLKhachThue", { value: value })
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
                    { text: "OK", onPress: () => XoaPhong(id) }
                ]
            );
        }
        catch (e) {
            Alert.alert('Err:', e)
        }
    }
    const ChuaChoThue = () => {
        Alert.alert("Cảnh báo", "Phòng này chưa được thuê.")
    }
    const renderItem = (item) => {
        if (item.trangthai) {
            return (
                <TouchableOpacity style={styles.item} onPress={() => capnhat('1', item)}>
                    <Text style={styles.tenitem}>{item.ten}</Text>
                    <View style={styles.listH}>
                        <Text style={styles.txtitem1}>Giá Phòng: {item.gia}</Text>
                        <Text style={styles.txtitem1}>Trạng Thái: {item.trangthai ? 'Đã Cho thuê' : 'Trống'}</Text>
                    </View>
                    <View style={styles.listCN}>
                        <TouchableOpacity style={styles.btnitem} onPress={() => xemHD(item)}>
                            <Text style={styles.txtitem}>Hóa Đơn</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnitem} onPress={() => xemKT(item)}>
                            <Text style={styles.txtitem}>Khách Trọ</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnitem} onPress={() => xoa(item.id)}>
                            <Text style={styles.txtitem}>Xóa </Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            )
        }
        else {
            return (
                <TouchableOpacity style={styles.item1} onPress={() => capnhat('1', item)}>
                    <Text style={styles.tenitem}>{item.ten}</Text>
                    <View style={styles.listH}>
                        <Text style={styles.txtitem1}>Giá Phòng: {item.gia}</Text>
                        <Text style={styles.txtitem1}>Trạng Thái: {item.trangthai ? 'Đã Cho thuê' : 'Trống'}</Text>
                    </View>
                    <View style={styles.listCN}>
                        <TouchableOpacity style={styles.btnitem} onPress={() => ChuaChoThue()}>
                            <Text style={styles.txtitem}>Hóa Đơn</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnitem} onPress={() => ChuaChoThue()}>
                            <Text style={styles.txtitem}>Khách Trọ</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnitem} onPress={() => xoa(item.id)}>
                            <Text style={styles.txtitem}>Xóa </Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            )
        }

    }
    return (
        <View style={styles.tong1}>
            <Text style={styles.tieude}>Danh Sách Phòng</Text>
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

export default QLPhong

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

})


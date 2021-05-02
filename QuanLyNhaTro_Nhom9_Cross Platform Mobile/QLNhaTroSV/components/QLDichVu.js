import React, { useState, useEffect } from 'react'
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import database from '@react-native-firebase/database'

const QLDichVu = ({ navigation }) => {
    const [giadien, setGiadien] = useState(0)
    const [gianuoc, setGianuoc] = useState(0)
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
                Alert.alert("Err: " ,e)
            }
        }
        getData()
    }, [])
    const luu = async () => {
        try {
            await database().ref("/DichVu/").set({ Dien: Number(giadien), Nuoc: Number(gianuoc) })
            navigation.goBack()
        }
        catch (e) {
            Alert.alert("Err: ",e)
        }
    }
    return (
        <View style={styles.tong1}>
            <View style={styles.vtieude}>
                <Text style={styles.tieude}>QUẢN LÝ GIÁ ĐIỆN NƯỚC</Text>
            </View>
            <View style={styles.tong2}>
                <Text style={styles.txtTieuDe}>Giá Điện: </Text>
                <TextInput style={styles.txtInput} placeholder={"Nhập giá điện..."} value={String(giadien)} onChangeText={(value) => { setGiadien(value) }} />
            </View>
            <View style={styles.tong2}>
                <Text style={styles.txtTieuDe}>Giá Nước: </Text>
                <TextInput style={styles.txtInput} placeholder={"Nhập giá nước..."} value={String(gianuoc)} onChangeText={(value) => { setGianuoc(value) }} />
            </View>
            <View style={styles.vbtn}>
                <TouchableOpacity style={styles.btn} onPress={luu}>
                    <Text style={styles.txt}>LƯU</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default QLDichVu

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

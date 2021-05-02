import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const QLTaiKhoan = () => {
    return (
        <View style={styles.tong1}>
            <Text style={styles.tieude}>Tính năng này Sẽ được cập nhật sớm nhất</Text>
        </View>
    )
}

export default QLTaiKhoan

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
})

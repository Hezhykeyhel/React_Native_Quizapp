import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import welcomeImg from '../images/welcomeScreenImg.png'
import Title from '../components/Title'

const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Title textTitle='MyQuiz'/>
      <View style={styles.imgContainer}>
        <Image source={welcomeImg}
        style={styles.imgUrl}
        resizeMode='contain'
        />
        
      </View>
      <TouchableOpacity onPress={()=>navigation.navigate("Quiz")} style={styles.button}>
          <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    imgUrl:{
        height: 400,
        width:400,
    },
    imgContainer:{
        justifyContent:'center',
        alignItems:'center',
        flex: 1
    },
    container:{
      paddingTop:40,
      paddingHorizontal:20, 
      height: '100%'
    },
    button:{
      backgroundColor:'#184E77',
      width:'100%',
      borderRadius:20,
      padding:18,
      marginBottom: 30
    },
    buttonText:{
      fontSize: 24,
      fontWeight:'600',
      textAlign: 'center',
      color:'white',
    }
})
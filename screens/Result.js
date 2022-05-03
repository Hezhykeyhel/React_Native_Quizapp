import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import Title from '../components/Title'

const Result = ({navigation, route}) => {
  const {scores} = route.params;
  const resultBanner = scores > 40 ? 
    "https://cdn1.vectorstock.com/i/1000x1000/67/85/success-people-cartoon-design-vector-6376785.jpg" 
  : "https://miro.medium.com/max/640/1*qb-15aHvG55A51pi06vX0w.png"  
  const information = scores < 50 ? <View><Text style={{textAlign:'center', fontSize: 15, fontWeight:'600'}}>You need to buckle up, You can do better</Text></View> 
  : <View><Text style={{textAlign:'center', fontSize: 30, fontWeight:'600'}}>Yippie!!!, You did it</Text></View>
  return (
    <View style={styles.container}>
      <Title textTitle='RESULTS'/>
      <Text style={{textAlign:'center', fontWeight:'900', fontSize:40}}>{scores}%</Text>
      <View style={styles.imgContainer}>
        <Image source={{
          uri:resultBanner,
        }}
        style={styles.imgUrl}
        resizeMode='contain'
        />
      <View>
        <Text>{information}</Text>
      </View>
      </View>
      <TouchableOpacity onPress={()=>navigation.navigate("Home")} style={styles.button}>
          <Text style={{color: 'white', textAlign:'center', fontSize:18, fontWeight:'bold'}}>GO TO HOME</Text>
        </TouchableOpacity>
      </View>
  )
}

export default Result

const styles = StyleSheet.create({
  imgUrl:{
    height: 300,
    width:300,
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
  color:'white'
}
})
import { View, Text,StyleSheet } from 'react-native'
import React from 'react'

const Welcome = () => {
  return (
    <View style={styles.container}>
      
        <Text style={styles.firstText}>click<Text style={styles.secondText}>a</Text><Text style={styles.thirdText}>day</Text></Text>

    </View>
  )
}

const styles = StyleSheet.create({
  container:{flex:0.15,backgroundColor:'white',alignItems:'center',justifyContent:'center'},
  firstText:{fontWeight:'bold',color:'grey',fontSize:35},
  secondText:{color:'grey',fontSize:35,fontWeight:'300'},
  thirdText:{color:'#36A2F1',fontSize:35,fontWeight:'bold'}
})

export default Welcome
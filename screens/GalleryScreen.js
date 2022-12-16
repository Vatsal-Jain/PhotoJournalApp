import { View, Text ,FlatList,StyleSheet,ImageBackground,useWindowDimensions,ScrollView, Pressable} from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


const GalleryScreen = () => {
  const navigation = useNavigation();
    const [imageList,setImageList] = useState([]); 

    const getPhotos = () => {
     AsyncStorage.getAllKeys()
     .then((keys)=>{
           AsyncStorage.multiGet(keys)
           .then((data) => {
            setImageList(data)
            
            
           })
          
     })
    }

    useEffect(()=> {
      getPhotos();
  
    })

    const wid = useWindowDimensions().width;

  return (
    <View style={styles.container}>

      <FlatList 
      data={imageList}
    
      showsVerticalScrollIndicator={false}
      renderItem={(data) => {
        const pp = JSON.parse(data.item[1]) ;
        return(
         <Pressable
        onPress={()=>navigation.navigate('dayview',{pp})}
        >
            <ImageBackground
      source={{ uri: pp.src }}
       style={{ width:wid,alignSelf:'center',height:200}}
        >
          <View style={styles.listContainer}>
      <Text style={styles.month}>{pp.mon}</Text>
    <Text style={styles.date}>{pp.dt}</Text> 
   
   
   </View>
   <Text  style={styles.location}>{pp.text}</Text>
    <Text  style={styles.temp}>{pp.temperature}{String.fromCodePoint(8451)}</Text> 
   </ImageBackground>
   </Pressable>

            
        )
      }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    alignItems:'center',justifyContent:'center',flex:0.85,backgroundColor:'black'
  },

  listContainer:{
    position:'absolute',padding:15
  },
  month:{color:'white',fontSize:18,marginVertical:5},
  date:{color:'white',fontSize:26},
  location:{color:'white',fontSize:14,bottom:5,padding:15,position:'absolute'},
  temp:{color:'white',fontSize:14,bottom:5,right:0,padding:15,position:'absolute'}
})

export default GalleryScreen
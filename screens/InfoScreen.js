import { View, Text,Button ,StyleSheet} from 'react-native'
import React , {useState,useEffect} from 'react'
import Welcome from './Welcome'
import BottomNav from '../components/BottomTabNav'
import AsyncStorage from '@react-native-async-storage/async-storage'

const InfoScreen = () => {

 

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


    useEffect(() => {
      maxCheck();
      
    }, [imageList.length]);
  
    
    const [maxTemp,setMaxTemp] = useState(0);
    const [minTemp,setMinTemp] = useState(100);


    const maxCheck = () => {
      imageList.forEach((ket) => {
        const pp = JSON.parse(ket[1]);
  
       
        const t = pp.temperature;
        if(t < minTemp ){
          setMinTemp(t)
        }
      
        if(t > maxTemp ){
          setMaxTemp(t)
        }
       

      
      });
     // console.log('maxmimum temperatrue is'+ maxTemp)
    //  console.log('minimum temperatrue is'+ minTemp)
    
    
    };

  
   
  //  const take = () => {
  //   const dataiv = imageList[3]
  //   const mrp = dataiv
  //   const hui = mrp[1][0]
  //   console.log(hui['src'])
  //  }


   
  




    
    
  return (
    <View style={styles.container}
    
    >
     
      <Welcome />
      <View style={styles.innerContainer}>
    
  <View style={styles.rowItem}>
      <Text style={styles.heading}>Days</Text>
<Text style={styles.title}>{imageList.length}/19</Text>
<Text style={styles.content}>You Have Recored {imageList.length} Days Since the first Day</Text>
      </View>



      <View style={styles.rowItem}>
      <Text style={styles.heading}>Hottest Day</Text>
<Text style={styles.title}>{maxTemp}{String.fromCodePoint(8451)}</Text>
<Text style={styles.content}>Thu Dec 15 2022</Text>
      </View>


      <View style={styles.rowItem}>
      <Text style={styles.heading}>Coldest Day</Text>
<Text style={styles.title}>{minTemp}{String.fromCodePoint(8451)}</Text>
<Text style={styles.content}>Wed Dec 14 2022</Text>
      </View>
      
      <View>
        
        </View>
        <View>
        
        </View>
        </View>
{/* <Button
title='Update Current Stats'
onPress={take}
/> */}

      <BottomNav />
      </View>
  )
}

const styles =StyleSheet.create({
  container:{
    flex:1
  },
innerContainer:{
  flex:0.9,alignItems:'center',flexDirection:'column'
},
rowItem:{
  alignItems:'center',flexDirection:'column',borderBottomColor:'grey',borderBottomWidth:0.5,padding:10,width:'95%'
},
heading:{
  fontWeight:'bold',color:'grey',fontSize:20
},
title:{fontWeight:'bold',color:'#2f3832',fontSize:50,marginVertical:10},
content:{fontWeight:'normal',color:'grey',fontSize:15}
})

export default InfoScreen
import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../constants/Colors'
import { collection, getDocs, limit, query } from 'firebase/firestore/lite';
import { db } from '../../config/FirebaseConfig';
import PopularBusinessCard from './PopularBusinessCard';
export default function PopularBusiness() {

    const [businessList,setBusinessList]=useState([]);
  useEffect(()=>{
    GetBusinessList();
  },[])
  const GetBusinessList=async()=>{
    setBusinessList([]);
    const q=query(collection (db,'BusinessList'),limit(10));
    const querySnapshot=await getDocs(q);

    querySnapshot.forEach((doc)=>{
        console.log(doc.data());
        setBusinessList(prev=>[...prev,doc.data()])
    })
  }
    return (
    <View style={{
      marginBottom:10,
            marginTop:20
    }}>
      <View style={{
            padding:20,
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between',
            marginTop:10,
            }}>
      <Text style={{
        fontSize:20,
        fontFamily:'montserrat-bold'
      }}>Popular Business
      </Text>
      <Text style={{color:Colors.PRIMARY,fontFamily:'montserrat-medium'}}>View All</Text>
      </View>
      <FlatList
      data={businessList}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({item,index})=>(
        <View>
          <PopularBusinessCard
          key={index}
          business={item}
          
          />
        </View>
      )}
      />
    </View>
  )
}
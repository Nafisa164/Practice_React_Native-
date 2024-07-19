import { View, Text, ActivityIndicator, ScrollView} from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { doc, getDoc } from 'firebase/firestore/lite';
import { useState } from 'react';
import { Colors } from '../../constants/Colors';
import ActionButton from '../../components/BusinessDetail/ActionButton';
import {db} from '../../config/FirebaseConfig';
import Aintro from '../../components/BusinessDetail/Aintro';
import About from '../../components/BusinessDetail/About';
import Reviews from '../../components/BusinessDetail/Reviews';



export default function BusinessDetail() {
  
  const {businessid}=useLocalSearchParams();
  const [business,setBusiness]=useState();
  const [loading,setLoading]=useState(false);
  useEffect(()=>{
    GetBusinessDetailById();
  },[])
  /**
   * used to get businessDetail by
   */
  const GetBusinessDetailById=async()=>{
    setLoading(true);
    const docRef=doc(db,'BusinessList',businessid);
    const docSnap=await getDoc(docRef);
    if(docSnap.exists()){
      setBusiness(docSnap.data());
      setLoading(false)
    }else{
      console.log("No such document!");
      setLoading(false)
    }
  }
  return (
    <ScrollView>
      {loading?
      <ActivityIndicator
      style={{
        marginTop:'70%'
      }}
      size={'large'}
      color={Colors.PRIMARY}
      />:
      <View>
        {/* Intro */}
        <Aintro business={business}/>
         {/* Action Button */}
          <ActionButton business={business}/>
          {/* About Section */}
          <About business={business}/>
          {/* Review section */}
          <Reviews business={business}/>
      </View>
    }
    </ScrollView>
  )
} 
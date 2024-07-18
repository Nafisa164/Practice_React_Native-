import { View, Text, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { Colors } from './../../constants/Colors'
import { collection, getDocs, query } from 'firebase/firestore/lite';
import CategoryItem from './CategoryItem';
import { useState } from 'react';
import { db } from '../../config/FirebaseConfig';
import { useRouter } from 'expo-router';

export default function Category() {
  const [categoryList,setCategoryList]=useState([]);
  const router=useRouter();
  useEffect(()=>{
    GetCategoryList()
  },[])
  const GetCategoryList=async()=>{
    setCategoryList([]);
    const q=query(collection(db,'Category'));
    const querySnapshot=await getDocs(q);

        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          setCategoryList(prev=>[...prev,doc.data()])
        })
      }
  return (
    <View>
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
      }}>Category
      </Text>
      <Text style={{color:Colors.PRIMARY,fontFamily:'montserrat-medium'}}>View All</Text>
      </View>
      <FlatList
      data={categoryList}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{marginLeft:29}}
      renderItem={({item,index})=>(
        <View>
          <CategoryItem category={item} 
          key={index}
          onCategoryPress={(category)=>router.push('/businesslist/'+item.name)}
          />
        </View>
      )}
      />
    </View>
  )
}
//shopping,daily product,plumber,salon,grocery,medical,hospital,resturent,
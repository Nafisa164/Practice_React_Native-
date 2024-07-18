import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../constants/Colors';
import { Rating } from 'react-native-ratings';

export default function Reviews() {
    const [rating,setRating]=useState(4);
    const [userInput,setUserInput]=useState();
  return (
    <View style={{
        padding:20,
        backgroundColor:'#fff'
    }}>
      <Text style={{
        fontFamily:'montserrat-bold',
        fontSize:20
      }}>Reviews</Text>
      <View>
      <Rating
        showRating={false}
        imageSize={20}
        onFinishRating={(rating)=>setRating(rating)}
        style={{ paddingVertical: 10 }}
        />
        <TextInput
        placeholder='write your comment'
        numberOfLines={4}
        onChangeText={(value)=>setUserInput(value)}
        style={{
            borderWidth:1,
            padding:10,
            borderRadius:10,
            borderColor:Colors.GREY,
            textAlignVertical:'top'
        }}
        />
        <TouchableOpacity
        disabled={!userInput}
        onPress={()=>console.log(userInput,rating)}
        style={{
                padding:10,
                borderRadius:6,
                backgroundColor:Colors.PRIMARY,
                marginTop:10
            }}>
            <Text style={{
                fontFamily:'montserrat',
                fontSize:20,
                color:'#fff',
                textAlign:'center'
            }}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
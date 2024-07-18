import { View, Text, TouchableNativeFeedback, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Colors } from './../../constants/Colors'
export default function CategoryItem({category,onCategoryPress}) {
  return (
    <TouchableOpacity onPress={()=>onCategoryPress(category)}>
      <View style={{
        padding:10,
        backgroundColor:Colors.ICON_BG,
        borderRadius:99,
        marginLeft:15
      }}>
      <Image source={{uri:category.icon}}
      style={{width:40,
        height:40
      }}
      />
      </View>
      <Text style={{
        fontSize:12,
        fontFamily:'montserrat-medium',
        textAlign:'center',
        marginTop:5
      }}
      >{category.name}</Text>
    </TouchableOpacity>
  )
}

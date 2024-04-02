import { View, Text, Dimensions, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image } from 'react-native'
import React from 'react'
import { styles } from '../theme'
import { useNavigation } from '@react-navigation/native';


var { width, height } = Dimensions.get("window");

export default function MovieList({ title, data }) {
    const movieName = "Ant-man and the wasp: Quantimania";
    const navigation = useNavigation();
  return (
    <View className="mb-8 space-y-4">
        <View className="mx-4 flex-row justify-between items-center">
            <Text className="text-white text-xl">{title}</Text>
            <TouchableOpacity>
                <Text style={styles.text} className="text-lg">See All</Text>
            </TouchableOpacity>
        </View>
        {/* movie row */}
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: 15}}
        >
            {
                data.map((item, index) => {
                    return (
                        <TouchableWithoutFeedback
                            key={index}
                            onPress={() => navigation.navigate("Movie", item)}
                        >
                            <View className="space-y-1 mr-4">
                                <Image 
                                    source={require("../assets/hang.jpg")}
                                    className="rounded-3xl"
                                    width={width*0.33}
                                    style={{
                                        width: width*0.33,
                                        height: height*0.22
                                    }}
                                />
                                <Text className="text-neutral-300 ml-1">
                                    {movieName.length > 14 ? movieName.slice(0,14)+"...": movieName}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    )
                })
            }
        </ScrollView>
    </View>
  )
}
import { View, Text, Dimensions, Image, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import Carousel from 'react-native-snap-carousel'
import { useNavigation } from '@react-navigation/native';
import { image500 } from '../api/moivedb';


var { width, height } = Dimensions.get("window");


export default function TrendingMovies({ data }) {
    const navigation = useNavigation()
    const handleClick = (item) => {
        navigation.navigate("Movie", item)
    }
    
  return (
    <View className="mb-8">
      <Text className="text-white mx-4 text-xl mb-5">Trending</Text>
      <Carousel 
        data={data}
        renderItem={({item}) => <MovieCard item={item} handleClick={handleClick} />}
        firstItem={1}
        inactiveSlideOpacity={0.60}
        sliderWidth={width}
        itemWidth={width*0.62}
        slideStyle={{display: "flex", alignItems: "center"}}
      />
    </View>
  )
}

const MovieCard = ({ item, handleClick }) => {
    return (
        <TouchableWithoutFeedback onPress={() => handleClick(item)}>
            <View>
                {/* <Text className="text-white">Movie</Text> */}
                <Image 
                    // source={require("../assets/hanging.jpg")}
                    source={{uri: image500(item.poster_path)}}
                    style={{
                        width: width * 0.6,
                        height: height * 0.4
                    }}
                    className="rounded-3xl"
                />
            </View>
        </TouchableWithoutFeedback>
    )
}
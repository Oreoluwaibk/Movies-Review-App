import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, Dimensions, Platform, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { styles, theme } from '../theme';
import { LinearGradient } from "expo-linear-gradient";
import Cast from '../components/cast';



var { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const topMargin = ios ? "" : "mt-3";

export default function MovieScreen() {
    const { params: item } = useRoute();
    const natigation = useNavigation();
    const [ isFavourite, setIsFavourite ] = useState(false);
    const [ cast, setCast ] = useState([1,2,3,4,5])

    const movieName = "Ant-man and the wasp: Quantimania";
    useEffect(() => {

    }, [item]);


  return (
    <ScrollView
        contentContainerStyle={{paddingBottom: 20}}
        className="flex-1 bg-neutral-900" 
    >
        {/* back button and movie poster */}
        <View className="w-full relative">
            <SafeAreaView 
                className={"absolute top-12 z-20 w-full flex-row items-center justify-between px-6 "+ topMargin}
            >
                <TouchableOpacity className="rounded-xl p-1" style={styles.background} onPress={() => natigation.goBack()} >
                    <ChevronLeftIcon size="28" strokeWidth={2.5} color="white"/>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)}>
                    <HeartIcon size="35" color={isFavourite ? theme.background : "white"} />
                </TouchableOpacity>
            </SafeAreaView>
            <View>
                <Image 
                    source={require("../assets/Mobile-login.jpg")}
                    style={{
                        width: width,
                        height: height * 0.55
                    }}
                />
                <LinearGradient 
                    colors={["transparent", "rgba(23,23,23,0.8)", "rgba(23,23,23,1)"]}
                    style={{width: width, height: height*0.40}}
                    start={{x: 0.5, y:0}}
                    end={{x:0.5, y:1}}
                    className="absolute bottom-0"
                />
            </View>
        </View>

        {/* movie details view */}
        <View style={{marginTop: -(height*0.09)}} className="space-y-3">
            <Text className="text-white text-center text-3xl font-bold tracking-wider">
                {movieName}
            </Text>

            {/*  */}
            <Text className="text-neutral-400 font-semibold text-base text-center">
                Released . 2020 . 170min
            </Text>

            <View className="flex-row justify-center mx-4 space-x-2">
                <Text className="text-neutral-400 font-semibold text-center text-base">
                    Action .
                </Text>
                <Text className="text-neutral-400 font-semibold text-center text-base">
                    Thrill .
                </Text>
                <Text className="text-neutral-400 font-semibold text-center text-base">
                    Comedy
                </Text>
            </View>

            <Text className="text-neutral-400 mx-4 tracking-wide">
            Ex-UFC fighter Dalton takes a job as a bouncer at a Florida Keys roadhouse, only to discover that this paradise is not all it seems. Ex-UFC fighter Dalton takes a job as a bouncer at a Florida Keys roadhouse, only to discover that this paradise is not all it seems.
            </Text>
        </View>
       
       <Cast cast={cast} navigation={natigation}/>
    </ScrollView>
  )
}
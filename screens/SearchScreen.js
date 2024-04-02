import { 
    View, 
    Text, 
    Dimensions, 
    Platform, 
    ScrollView, 
    SafeAreaView,
    TouchableOpacity, 
    Image,
    TextInput,
    TouchableWithoutFeedback
} from 'react-native'
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { XMarkIcon } from 'react-native-heroicons/outline';
import Loading from '../components/loading';

var { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";

export default function SearchScreen() {
    const navigation = useNavigation();
    const [ results, setResults ] = useState([1,2,3,4]);
    const movieName = "Ant-man and the wasp: Quantimania";
    const [ loading, setLoading ] = useState(false);

  return (
    <SafeAreaView
        className="bg-neutral-800 flex-1 pt-14"
    >
        <View className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full">
            <TextInput 
                placeholder="Search Movie"
                placeholderTextColor={"lightgray"}
                className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
            />

            <TouchableOpacity
                onPress={() => navigation.navigate("Home")}
                className="rounded-full p-3 m-1 bg-neutral-500"
            >
                <XMarkIcon color="white" size="25" />
            </TouchableOpacity>
        </View>
        {
            loading ? <Loading /> :
            (
                results.length>0 ?
                (<ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingHorizontal:15}}
                    className="space-y-3"
                >
                    <Text className="text-white font-semibold ml-1">Results ({results.length})</Text>
                    <View className="flex-row justify-between flex-wrap">
                        {
                            results.map((item, index) => {
                                return (
                                    <TouchableWithoutFeedback 
                                        key={index}
                                        onPress={() => navigation.push("Movie", item)}
                                    >
                                        <View className="space-y-2 mb-4">
                                            <Image 
                                                source={require("../assets/Mobilelogin.jpg")}
                                                style={{
                                                    width: width*0.44,
                                                    height: height*0.3
                                                }}
                                                className="rounded-3xl"
                                            />
                                            <Text className="text-neutral-300 nl-1">
                                                {movieName.length > 22 ? movieName.slice(0,22)+"...": movieName}
                                            </Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                )
                            })
                        }
                    </View>
                </ScrollView>)
                :                
                (<View className="flex-row justify-center">
                    <Image 
                        source={require("../assets/hang.jpg")}
                        className="h-96 w-96"
                    />
                </View>)
            )
        }
        

        
    </SafeAreaView>
  )
}
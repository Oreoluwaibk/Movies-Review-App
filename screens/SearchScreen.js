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
import React, { useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { XMarkIcon } from 'react-native-heroicons/outline';
import Loading from '../components/loading';
import { getMovieSearch, image500 } from '../api/moivedb';
import { debounce } from 'lodash';

var { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";

export default function SearchScreen() {
    const navigation = useNavigation();
    const [ results, setResults ] = useState([]);
    const movieName = "Ant-man and the wasp: Quantimania";
    const [ loading, setLoading ] = useState(false);

    const handleOnChangeText = (value) => {
        if(value && value.length > 2){
            setLoading(true);
            getMovieSearch(value)
            .then((res) => {
                setResults(res.results)
                setLoading(false);
            })
            .catch((err) => {
                console.log("err", "unable to get movie");
                setLoading(false);
            })
        }else{
            setLoading(false);
            setResults([]);
        }
        
    }

    const handleTextDebounce = useCallback(debounce(handleOnChangeText, 400), [])

  return (
    <SafeAreaView
        className="bg-neutral-800 flex-1 pt-14"
    >
        <View className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full">
            <TextInput 
                placeholder="Search Movie"
                placeholderTextColor={"lightgray"}
                className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
                onChangeText={handleTextDebounce}
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
                                                source={{uri: image500(item.poster_path)}}
                                                style={{
                                                    width: width*0.44,
                                                    height: height*0.3
                                                }}
                                                className="rounded-3xl"
                                            />
                                            <Text className="text-neutral-300 nl-1">
                                                {item.title.length > 22 ? item.title.slice(0,22)+"...": item.title}
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
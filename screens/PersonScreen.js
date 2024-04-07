import { 
    View, 
    Text, 
    Dimensions, 
    Platform, 
    ScrollView, 
    SafeAreaView,
    TouchableOpacity, 
    Image
} from 'react-native'
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { styles } from '../theme';
import MovieList from '../components/movieList';
import Loading from '../components/loading';
import { getPerson, getPersonMovieCredits, image342 } from '../api/moivedb';

var { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const verticalMargin = ios ? "" : "my-3";

export default function PersonScreen() {
    const { params: item } = useRoute()
    const natigation = useNavigation();
    const [ isFavourite, setIsFavourite ] = useState(false);
    const [ personMovie, setPersonMovie ] = useState([]);
    const [ personDetails, setPersonDetails ] = useState(null);
    const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        setLoading(true);

        const payload = [
            getPerson(item.id),
            getPersonMovieCredits(item.id)
        ]

        Promise.all(payload)
        .then(([person, movieCredit]) => {
            setPersonDetails(person);
            setPersonMovie(movieCredit.cast)
            setLoading(false);
        })
        .catch((err) => {
            console.error("unable to get person", err);
            setLoading(false);
        })
    }, [item]);

    const setGender = (value) => {
        return value === 0 ? "Not set / not specified" : value === 1 ? "Female" : value === 2 ? "Male" : "Non-binary";
    }

  return (
    loading ? <Loading /> : <ScrollView
        className="flex-1 bg-neutral-900 pt-14"
        contentContainerStyle={{paddingHorizontal: 20}}
    >
        <SafeAreaView 
        className={"z-20 w-full flex-row items-center justify-between px-1 "+ verticalMargin}
        >
            <TouchableOpacity 
                className="rounded-xl p-1" 
                style={styles.background} 
                onPress={() => natigation.goBack()} 
            >
                <ChevronLeftIcon 
                    size="28" 
                    strokeWidth={2.5} 
                    color="white"
                />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)}>
                <HeartIcon  
                    size="35" 
                    color={isFavourite ? "red" : "white"} 
                />
            </TouchableOpacity>
        </SafeAreaView>

       
        <View className="pb-12">
            <View 
                className="flex-row justify-center"
                style={{
                    shadowColor: "gray",
                    shadowRadius: 40,
                    shadowOffset: { width: 0, height: 5},
                    shadowOpacity: 1
                }}
            >
                <View className="items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-500">
                    <Image 
                        source={{uri: image342(personDetails && personDetails.profile_path)}}
                        style={{
                            width: width*0.74,
                            height: height*0.43
                        }}
                    />
                </View>
            </View>

            <View className="mt-6">
                <Text className="text-3xl text-white font-bold text-center">
                    {personDetails && personDetails.name}
                </Text>
                <Text className="text-base text-neutral-500 text-center">
                    {personDetails && personDetails.place_of_birth}
                </Text>
            </View>

            <View
                className="mx-1 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full"
            >
                <View
                    className="border-r-2 border-r-neutral-400 px-2 items-center"
                >
                    <Text className="text-white font-semibold">Gender</Text>
                    <Text className="text-neutral-300 text-sm font-semibold">{personDetails && setGender(personDetails.gender)}</Text>
                </View>
                <View
                    className="border-r-2 border-r-neutral-400 px-2 items-center"
                >
                    <Text className="text-white font-semibold">Birthday</Text>
                    <Text className="text-neutral-300 text-sm font-semibold">{personDetails && personDetails.birthday}</Text>
                </View>
                <View
                    className="border-r-2 border-r-neutral-400 px-2 items-center"
                >
                    <Text className="text-white font-semibold">Known for</Text>
                    <Text className="text-neutral-300 text-sm font-semibold">{personDetails && personDetails.known_for_department}</Text>
                </View>
                <View
                    className="px-2 items-center pr-4"
                >
                    <Text className="text-white font-semibold">Popularity</Text>
                    <Text className="text-neutral-300 text-sm font-semibold">{personDetails && personDetails.popularity} %</Text>
                </View>
            </View>

            <View
                className="my-6 mx-1 space-y-2"
            >
                <Text className="text-white text-lg">Biography</Text>
                <Text className="text-neutral-400 tracking-wide ">
                    {personDetails && personDetails.biography}
                </Text>
            </View>

            {/* movielist */}
            <MovieList title="Movies" hideSeeAll={true} data={personMovie} />
        </View>

    </ScrollView>
  )
}
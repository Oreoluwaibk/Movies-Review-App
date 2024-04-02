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
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { styles } from '../theme';
import MovieList from '../components/movieList';
import Loading from '../components/loading';

var { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const verticalMargin = ios ? "" : "my-3";

export default function PersonScreen() {
    const natigation = useNavigation();
    const [ isFavourite, setIsFavourite ] = useState(false);
    const [ personMovie, setPersonMovie ] = useState([1,2,3,4,5]);
    const [ loading, setLoading ] = useState(false);

  return (
    <ScrollView
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

        { loading ? <Loading /> :
            (<View className="pb-12">
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
                            source={require("../assets/Mobilelogin.jpg")}
                            style={{
                                width: width*0.74,
                                height: height*0.43
                            }}
                        />
                    </View>
                </View>

                <View className="mt-6">
                    <Text className="text-3xl text-white font-bold text-center">
                        Keanu Reevs
                    </Text>
                    <Text className="text-base text-neutral-500 text-center">
                        London, United Kingdom
                    </Text>
                </View>

                <View
                    className="mx-1 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full"
                >
                    <View
                        className="border-r-2 border-r-neutral-400 px-2 items-center"
                    >
                        <Text className="text-white font-semibold">Gender</Text>
                        <Text className="text-neutral-300 text-sm font-semibold">Male</Text>
                    </View>
                    <View
                        className="border-r-2 border-r-neutral-400 px-2 items-center"
                    >
                        <Text className="text-white font-semibold">Birthday</Text>
                        <Text className="text-neutral-300 text-sm font-semibold">1964-09-02</Text>
                    </View>
                    <View
                        className="border-r-2 border-r-neutral-400 px-2 items-center"
                    >
                        <Text className="text-white font-semibold">Known for</Text>
                        <Text className="text-neutral-300 text-sm font-semibold">Acting</Text>
                    </View>
                    <View
                        className="px-2 items-center pr-4"
                    >
                        <Text className="text-white font-semibold">Popularity</Text>
                        <Text className="text-neutral-300 text-sm font-semibold">64.23</Text>
                    </View>
                </View>

                <View
                    className="my-6 mx-1 space-y-2"
                >
                    <Text className="text-white text-lg">Biography</Text>
                    <Text className="text-neutral-400 tracking-wide ">
                        Keanu Charles Reeves (/kiˈɑːnuː/ kee-AH-noo;[4][5][6] born September 2, 1964) is a Canadian[c] actor, musician, and comic book writer. Regarded as one of the most influential and acclaimed actors in modern history,[9][10][11] he is known for his versatile performances in numerous genres throughout his career, and is considered a sex symbol in the media.[12][13][14][15] Reeves's treatment of others, his relationship with his fans, and personal conduct have been a subject of widespread attention.

                        Born in Beirut and raised in Toronto, he made his acting debut in the Canadian television series Hangin' In (1984), before making his feature film debut in Youngblood (1986). Reeves had his breakthrough role in the science fiction comedy Bill & Ted's Excellent Adventure (1989), and he reprised his role in its sequels. He gained praise for playing a hustler in the independent drama My Own Private Idaho (1991) and established himself as an action hero with leading roles in Point Break (1991) and Speed (1994).

                        Following several box office disappointments, Reeves's performance in the horror film The Devil's Advocate (1997) was well received. Greater stardom came for playing Neo in The Matrix (1999), with Reeves becoming the highest paid actor for a single production for reprising the role in the sequels Reloaded and Revolutions.[16] He played John Constantine in Constantine (2005) and starred in the romantic drama The Lake House (2006), the science fiction thriller The Day the Earth Stood Still (2008), and the crime thriller Street Kings (2008). Following another commercially down period, Reeves started a successful comeback by playing the titular assassin in the film John Wick (2014). Reprising his role in subsequent instalments, the series has been considered to have revitalized the action film genre, and has been regarded as one of the greatest action film franchises of all time.[17][18][19] Time named him one of the 100 most influential people in the world in 2022.[20]
                    </Text>
                </View>

                {/* movielist */}
                <MovieList title="Movies" hideSeeAll={true} data={personMovie} />
            </View>)
        }

    </ScrollView>
  )
}
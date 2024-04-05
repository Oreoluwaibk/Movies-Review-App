import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, Dimensions, Platform, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { styles, theme } from '../theme';
import { LinearGradient } from "expo-linear-gradient";
import Cast from '../components/cast';
import MovieList from '../components/movieList';
import Loading from '../components/loading';
import { getMovieCredits, getMovieDetails, getTrendingMovie, image500 } from '../api/moivedb';



var { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const topMargin = ios ? "" : "mt-3";

export default function MovieScreen() {
    const { params: item } = useRoute();
    const natigation = useNavigation();
    const [ movieDetails, setMovieDetails ] = useState(null);
    const [ movieCredits, setMovieCredits ] = useState(null);
    const [ isFavourite, setIsFavourite ] = useState(false);
    const [ cast, setCast ] = useState([]);
    const [ similarMovies, setSimilarMovies ] = useState([]);
    const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        const payload = [
            getMovieDetails(item.id),
            getMovieCredits(item.id)
        ]
        setLoading(true);

        Promise.all(payload)
        .then(([details, credits]) => {
            setMovieDetails(details);  
            setMovieCredits(credits);
            setCast(credits.cast);
            setLoading(false);
        })
        // getMovieDetails(item.id)
        // .then((res) => {
        //     console.log("allres", res.genres.length);
        //     setLoading(false);
        //     setMovieDetails(res)
        // })
        .catch((err) => {
            console.log("err", err);
            setLoading(false);
        })
        // setMovieDetails(item);
    }, [item]);


  return (
    <ScrollView
        contentContainerStyle={{paddingBottom: 20}}
        className="flex-1 bg-neutral-900" 
    >
        {/* back button and movie poster */}
        <View className="w-full relative">
            <SafeAreaView 
                className={"absolute top-12 z-20 w-full flex-row items-center justify-between px-5 "+ topMargin}
            >
                <TouchableOpacity className="rounded-xl p-1" style={styles.background} onPress={() => natigation.goBack()} >
                    <ChevronLeftIcon size="28" strokeWidth={2.5} color="white"/>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)}>
                    <HeartIcon size="35" color={isFavourite ? theme.background : "white"} />
                </TouchableOpacity>
            </SafeAreaView>
            
            {
                loading ? <Loading />:
                <View>
                    <Image 
                        // source={require("../assets/Mobile-login.jpg")}
                        source={{uri: movieDetails && image500(movieDetails.poster_path)}}
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
                
            }
        </View>

        {/* movie details view */}
        {loading ? <Loading /> :<>
            <View style={{marginTop: -(height*0.09)}} className="space-y-3">
                <Text className="text-white text-center text-3xl font-bold tracking-wider">
                    {movieDetails && movieDetails.title}
                </Text>

                {/*  */}
                <Text className="text-neutral-400 font-semibold text-base text-center">
                    {movieDetails && movieDetails.status} . {movieDetails && movieDetails.release_date} . {movieDetails && movieDetails.runtime}min
                </Text>

                <View className="flex-row justify-center mx-4 space-x-2">
                    {movieDetails && movieDetails.genres.length > 0 &&movieDetails.genres.map((gen) => {
                        return(
                            <Text className="text-neutral-400 font-semibold text-center text-base" key={gen.id}>
                            {gen.name} .
                        </Text>
                        )
                    })}
                </View>

                <Text className="text-neutral-400 mx-4 tracking-wide">
                {movieDetails && movieDetails.overview}
                </Text>
            </View>
        
            <Cast cast={cast} navigation={natigation}/>

       {/* similar movies */}
            {similarMovies.length > 0 && <MovieList title="Similar movies" data={similarMovies} hideSeeAll={true} />}
        </>}
        
    </ScrollView>
  )
}
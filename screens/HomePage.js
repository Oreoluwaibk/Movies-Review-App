import { View, Text, StatusBar, Platform, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { StatusBar as BarStatus } from "expo-status-bar";
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline"
import { styles } from '../theme';
import TrendingMovies from '../components/trendingMovies';
import MovieList from '../components/movieList';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/loading';
import { getTrendingMovie, getTopRatedMovies, getUpcomingMovies } from '../api/moivedb';


const ios = Platform.OS == "ios";
const andriod = Platform.OS = "android";
export default function HomePage() {
    const navigation = useNavigation();
    const [ trendingMovies, setTrendingMovies ] = useState([]);
    const [ upcomingMovies, setUpcomingMovies ] = useState([]);
    const [ topRatedMovies, setTopRatedMovies ] = useState([]);
    const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        const payload = [
            getTopRatedMovies(),
            getTrendingMovie(),
            getUpcomingMovies()
        ]

        setLoading(true);
        // getTopRatedMovies()
        Promise.all(payload)
        .then(([top, trending, upcoming]) => {
            // console.log("data", upcoming.results);
            console.log("ata", top.results);
            setTopRatedMovies(top.results);
            setTrendingMovies(trending.results);
            setUpcomingMovies(upcoming.results);
            setLoading(false);
        })
        .catch((err) => {
            console.log("err",err);
            setLoading(false);
        })

    }, [])

  return (

    <View className="flex-1 bg-neutral-800 pt-14">
        <StatusBar />
        <SafeAreaView className={ios ? "-mb-2" : "mb-8"}>
            <BarStatus style="light" />
            <View className="flex-row justify-between items-center mx-4">
                <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white"/>
                <Text className="text-white text-3xl font-bold">
                    <Text style={styles.text}>M</Text>ovies
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Search")}>
                    <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>

        {loading ?
            <Loading />
        :
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 10}}
            >
                {/* Trending Movies carousel */}
                {trendingMovies.length > 0 && <TrendingMovies data={trendingMovies} />}
                {/* upcoming Movies carousel */}
                {upcomingMovies.length > 0 && <MovieList title="Upcoming" data={upcomingMovies} />}

                {/* top rated Movies carousel */}
                {topRatedMovies.length > 0 && <MovieList title="Top Rated" data={topRatedMovies} />}
            </ScrollView>
        }
    </View>
  )
}
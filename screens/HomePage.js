import { View, Text, StatusBar, Platform, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { StatusBar as BarStatus } from "expo-status-bar";
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline"
import { styles } from '../theme';
import TrendingMovies from '../components/trendingMovies';
import MovieList from '../components/movieList';

const ios = Platform.OS == "ios";
const andriod = Platform.OS = "android";
export default function HomePage() {
    const [ trendingMovies, setTrendingMovies ] = useState([1,2,3]);
    const [ upcomingMovies, setUpcomingMovies ] = useState([1,2,3]);
    const [ topRatedMovies, setTopRatedMovies ] = useState([1,2,3]);
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
                <TouchableOpacity>
                    <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 10}}
        >
            {/* Trending Movies carousel */}
            <TrendingMovies data={trendingMovies} />
            {/* upcoming Movies carousel */}
            <MovieList title="Upcoming" data={upcomingMovies} />

            {/* top rated Movies carousel */}
            <MovieList title="Top Rated" data={topRatedMovies} />
        </ScrollView>
    </View>
  )
}
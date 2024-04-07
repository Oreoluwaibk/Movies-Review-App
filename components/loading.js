import { View, Text, Dimensions } from 'react-native'
import React from 'react';
import * as Progress from "react-native-progress";
import { theme } from '../theme';


var { width, height } = Dimensions.get("window");
export default function Loading() {
  return (
    <View style={{width, height: height}} className="absolute flex-row justify-center items-center bg-neutral-900 flex-1">
      <Progress.CircleSnail
        thickness={12}
        size={160}
        color={theme.background}
      />
    </View>
  )
}
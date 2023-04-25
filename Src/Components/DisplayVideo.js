import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  useColorScheme,
  View,
  FlatList
 
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';



const DisplayVideo = ({navigation, route}) => {
    const {item} = route.params;
    const videoPath = item.path;
    const videoRef = useRef(null);
    const [paused, setPaused] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    
    const togglePlayBack = () => {
      // console.log("is", paused);

      setPaused(!paused);  
      };

  

    const handleSeek = (time) => {
      console.log("time", currentTime)
      videoRef.current.seek(time);
      setCurrentTime(time);
    };
  
    const handleBackward = () => {
      const newTime = Math.max(currentTime - 5, 0);
      handleSeek(newTime);
    };
  
    const handleForward = () => {
      const newTime = Math.min(currentTime + 5, duration);
      handleSeek(newTime);
    };
  
    const handleProgress = (progress) => {
      // console.log("progress", progress.currentTime)
      setCurrentTime(progress.currentTime);
    };
  
  

    const formatTime = (time) => {
      
      const minutes = Math.floor(time/ 60);
      const seconds = Math.floor(time%60);
      // console.log("format", )
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return(
    <View style={styles.container}>
    <Video
    ref = {videoRef}
    source={{ uri: 'file://' + videoPath }}
    style={styles.video}
    // resizeMode="center"
    onProgress={handleProgress}
    onLoad={(data) => {
      setDuration(data.duration);
    }}
    paused={paused}
    // onEnd={() => setIsPlaying(false)}
    />
    <View
      style={{
        position: 'absolute',
        bottom: 24,
        flexDirection: 'row',
      }}
      >
    <TouchableOpacity onPress = {handleBackward} style={{ marginLeft: 50, alignSelf: 'center'}}>
      <Icon name={'fast-backward'} size={30} color="black" />
    </TouchableOpacity>
    <TouchableOpacity onPress={togglePlayBack} style={{ marginLeft: 70, alignSelf: 'center'}}>
    <Icon name={!paused ? 'pause' : 'play'} size={30} color="black" />   
    </TouchableOpacity>
    <TouchableOpacity onPress = {handleForward} style={{ marginLeft: 60, alignSelf: 'center'}}>
      <Icon name={'fast-forward'} size={30} color="black" />
    </TouchableOpacity>
    <Text style = {styles.time}> {formatTime(currentTime)}</Text>
    </View>
    </View>
    )
}

export default DisplayVideo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  video: {
    alignSelf: 'center',
    height:300,
    width: 350
    
  },
  forwardButton: {
    // position: 'absolute',
    right: 20,
    bottom: 20,
    // backgroundColor: 'rgba(0,0,0,0.6)',
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  time: {
    color: 'black',
    fontSize: 16,
    marginLeft: 15,
    alignSelf: 'center'
  },
});
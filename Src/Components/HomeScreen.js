import React , {useRef, useState, useEffect, useCallback} from 'react';
import {View, Text, StyleSheet, TouchableHighlight, Animated, TouchableNativeFeedback, ToastAndroid, PermissionsAndroid, TouchableOpacity, platform} from 'react-native';
import { Camera, CameraRecordingQuality, CameraRecordingPreset, useCameraDevices } from 'react-native-vision-camera';
import { RNFS, DocumentDirectoryPath, moveFile } from 'react-native-fs';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';

import { v4 as uuidv4 } from 'uuid';


// import { useCameraRecording } from 'react-native-vision-camera';

function HomeScreen({navigation, route}) {
const [isRecording, setIsRecording] = useState(false);
const [recordedVideo, setRecordedVideo] = useState(null);
const isRecordingVideo = useRef(false);
const [pressed, isPressed] = useState(false);
const [startTime, setStartTime] = useState(null);
const [elapsedTime, setElapsedTime] = useState(0);

const [isPlaying, setIsPlaying] = useState(false);

const [videoUri, setVideoUri] = useState(null);
const[path,  setPath] = useState(null);
const [devicePosition, setDevicePosition] = useState('back');
var devices = useCameraDevices();
const device = devices ?.back;
const camera = useRef(null);
// console.log("device2", device)



useEffect(() => {
  let timerInterval;
    if (isRecording && !isPlaying) {
      timerInterval = setInterval(() => {
      setElapsedTime(Date.now() - startTime);
      }, 1000);

    } 
    else {
      clearInterval(timerInterval);
    }
    return () => {
      clearInterval(timerInterval);
    };
  }, [isRecording, isPlaying, startTime]);


useEffect(() => {
  const requestPermissions = async () => {
    try {
      const cameraPermission = PermissionsAndroid.PERMISSIONS.CAMERA;
      const microphonePermission = PermissionsAndroid.PERMISSIONS.RECORD_AUDIO;
  
      const cameraPermissionStatus = await PermissionsAndroid.request(cameraPermission);
      const microphonePermissionStatus = await PermissionsAndroid.request(microphonePermission);
  
      if (
        cameraPermissionStatus === PermissionsAndroid.RESULTS.GRANTED &&
        microphonePermissionStatus === PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('Camera and microphone permissions granted');
      } else {
        console.log('Camera and/or microphone permissions denied');
      }
    } catch (error) {
      console.log('Error requesting camera and microphone permissions: ', error);
    }
  };
  requestPermissions();
}, []);

const switchCamera = () => {

  if (device.position == 'back') {
    console.log(device.position)
    device[position] = 'front'
    console.log(device.position)

  } else {
    device[position] = 'back'

  }
};

const startRecording = async() => {
  try{
  ToastAndroid.show("Recording started", ToastAndroid.SHORT)
  if (camera.current == null) 
  throw new Error('Camera ref is null!');
  setIsRecording(true);
  setStartTime(Date.now());

  const recordVideoPromise = await camera.current.startRecording({
    flash: 'off',
    onRecordingError: (error) => {
      console.error('Recording failed!', error);
    },
    onRecordingFinished: (video) => {
      console.log(`Recording successfully finished! ${video.path}`);
      setPath(video.path);
      
    },
  });
  const videoRecordData = await recordVideoPromise;
  // console.log("vide", videoRecordData)
  setRecordedVideo(videoRecordData);
 
} catch (e) {
  console.error('failed to start recording!', e, 'camera');
}
// finally {
//   setIsRecording(false);
// }
}
const stopRecording = async () => {
  if (!camera.current) {
    return;
  }
  try {
    const videoStopPromise = camera.current.stopRecording();
    await videoStopPromise;
    setIsRecording(false);
    setIsPlaying(false);
    setStartTime(Date.now());
    setElapsedTime(0)
    console.log("Successfully stopped", videoStopPromise.uri)
    setVideoUri(videoStopPromise.uri);

  } catch (error) {
    console.log('failed to stop recording!', error);
  }
};
const pauseVideo = async() => {
  try {
    await camera.current.pauseRecording();
    setIsPlaying(true);
    setElapsedTime(Date.now() - startTime);
    console.log("pause", formatTime(elapsedTime))
  } catch (error) {
    console.log('failed to pause recording!', error);
  }
};

const playVideo = async() => {
  try {
    await camera.current.resumeRecording();
    setIsPlaying(false);
    setStartTime(Date.now() - elapsedTime);
    console.log("Play", formatTime(elapsedTime), formatTime(startTime))
  } catch (error) {
    console.log('failed to resume recording!', error);
  }
};

const retakeVideo = () => {
  console.log("Retake");
  setRecordedVideo(null);
};

const uploadVideo = async () => {
  try {
      var RNFS = require('react-native-fs');
      const uniqueId = uuidv4();
      const destPath = RNFS.ExternalDirectoryPath + '/video_' + uniqueId + '.mp4';
      console.log("upload", path, destPath);
      moveFile(path, destPath);
      ToastAndroid.show("Uploaded file successfully", ToastAndroid.SHORT);
      setTimeout(() => {
        navigation.navigate('Register');
      }, 1000)
  } catch (error) {
    console.log('failed to upload video!', error);
  }
}

const formatTime = (time) => {
  const minutes = Math.floor(time / 1000 / 60);
  const seconds = Math.floor(time / 1000) % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};


return(
  <View style={{ flex: 1 }}>
  { device && <Camera
    ref={camera}
    device={device}
    isActive={true}
    video = {true}
    audio = {true}
    cameraFlipHorizontal={true}
    enableZoomGesture={true}
    style={StyleSheet.absoluteFill}
  /> 
  }


  <View>
  <Text style={styles.timerText}>
  {formatTime(elapsedTime)} seconds
  </Text>
  </View>
   {/* {videoUri && ( */}
        <View
          style={{
            position: 'absolute',
            bottom: 24,
            flexDirection: 'row',
          }}
        >
       <TouchableOpacity>

       </TouchableOpacity>
            <TouchableOpacity onPress={!isPlaying ? pauseVideo : playVideo} style={{ marginLeft: 80, alignSelf: 'center'}}>
              <Icon name={!isPlaying ? 'pause' : 'play'} size={30} color="white" />
            </TouchableOpacity>
        <TouchableOpacity onPress={isRecording ? stopRecording : startRecording}>
        <View style = {{width: 68,
            height: 68,
            borderRadius: 68 / 2,
            borderWidth: 5,
            borderColor: 'black',
            marginLeft: 20,
            backgroundColor: !isRecording ? 'white' : 'red'}}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={retakeVideo} style={{ marginLeft: 15, alignSelf: 'center' }}>
            {/* <Text style={{ fontSize: 18 }}>Retake</Text> */}
            <Icon1 name={'camera-retake'} size={30} color="white" />

          </TouchableOpacity>
        <TouchableOpacity onPress={uploadVideo} style = {{alignSelf: 'center', marginLeft: 30}}>
          {/* <Text style={{ fontSize: 15, color: 'white', }}>
          UPLOAD
          </Text> */}
          <Icon1 name={ 'upload'} size={30} color="white" />
        </TouchableOpacity>

        {/* <TouchableOpacity
        onPress={switchCamera}
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
          // backgroundColor: 'white',
          borderRadius: 20,
          padding: 10,
        }}
      >
        <Text>front</Text>
      </TouchableOpacity> */}
          
          

         </View>
{/* )} */}
</View>
)}

export default HomeScreen;

const styles = StyleSheet.create({
 
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  cameraButton: {
    width: 78,
    height: 78,
    borderRadius: 78 / 2,
    borderWidth: 5,
    borderColor: 'red',
  },
  cameraButtonInner: {
    width: 68,
    height: 68,
    borderRadius: 68 / 2,
    borderWidth: 5,
    borderColor: 'red',
    // backgroundColor: isRecording ? 'blue' : 'red',
  },
  preview: {
  flex: 1,
  justifyContent: 'flex-end',
  alignItems: 'center',
  width: '100%',
  height: '100%'
}, 
timerText: {
  fontSize: 20, 
  color: 'white', 
  textAlign: 'center',
  // top: '15'
  // justifyContent: 'center'
}
})

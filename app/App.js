import React, { useState } from 'react';
import { Camera, CameraType } from 'expo-camera';
import { Button, Text, TouchableOpacity, View, Image, StatusBar } from 'react-native';
import { MaterialIcons,  MaterialCommunityIcons , AntDesign  }  from "@expo/vector-icons"
export default function App() {
  const [type, setType] = useState(CameraType.back);
  const [cameraRef, setCameraRef] = useState(null);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [capturedImage, setCapturedImage] = useState(null);
  const [ blur , setBlur] = useState(0);


  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View className="flex-1 justify-center items-center">
        <Text >We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    setCapturedImage(null)
    setBlur(0)
  }

  const takePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      setCapturedImage(photo.uri);
      setBlur(1)
    }
  };

  function resetCamera(){
    setCapturedImage(null)
    setBlur(0)
  }

  function blurImage(){
    if(blur==10){
      setBlur(0)
    }else{
      setBlur(10)
    }

   }

  return (
    <View className="flex-1 justify-center items-center relative">
      
      <Camera 
        className={`w-[100%] h-[100%] ${capturedImage? 'hidden':''}`}
        type={type}
        ref={(ref) => setCameraRef(ref)}
      >
      
        <View><Text></Text></View>
      </Camera>
      {capturedImage && (
        <View className=" h-full w-full border z-5 ">
          <Image source={{ uri: capturedImage }} className="h-full  w-full z-10 blur-lg" blurRadius={blur}  />
          {/* <Image
          filter={{ name: 'Grayscale' }}
          source={image} className="h-1/2  w-full z-10  "  /> */}
        </View>
      )}
      <View className="absolute flex flex-col justify-center items-center top-10 right-0">
        <TouchableOpacity 
          className={`w-[3em] h-[3em] p-2 rounded-full right-5 ${capturedImage? 'none': ''}`}
          onPress={toggleCameraType}
        >
          <MaterialIcons name="flip-camera-android" size={36} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
        className="w-[3em] h-[3em] p-2 rounded-full right-5"
        onPress={resetCamera}
        >
          <AntDesign name="reload1" size={36} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
        className={`w-[3em] h-[3em] p-2 rounded-full right-5 `}
        onPress={blurImage}
        >
            <MaterialCommunityIcons name="blur" size={36} color="white" />
        </TouchableOpacity>
      
      </View>
      <TouchableOpacity 
        className="w-[5em] h-[2em] p-2rounded-md absolute bottom-5"
        onPress={takePicture}
      >
        <MaterialIcons name="camera" size={64} color="white" />
      </TouchableOpacity>
      
      <StatusBar />
    </View>
  );
}

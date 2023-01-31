import { Ionicons } from "@expo/vector-icons";
import { Camera, CameraType } from "expo-camera";
import { useRef, useState } from "react";
import {
  Button,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import * as ImageManipulator from "expo-image-manipulator";

export const CameraComponent = () => {
  const [type, setType] = useState(CameraType.back);
  const SCREEN_DIMENSIONS = useWindowDimensions();
  const cameraRef = useRef<Camera>(null);

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  return (
    <View style={styles.container}>
      <Camera
        type={type}
        style={{ flex: 2, width: SCREEN_DIMENSIONS.width, paddingBottom: 10 }}
        ref={cameraRef}
      >
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={toggleCameraType}
            style={{ paddingLeft: 10, paddingTop: 10 }}
          >
            <Ionicons
              name={"camera-reverse-outline"}
              size={24}
              color={"white"}
            />
          </TouchableOpacity>
        </View>
      </Camera>
      <View style={{ paddingVertical: 10, borderRadius: 5 }}>
        <Button
          color="#cc987a"
          title={"Take a fucking picture"}
          onPress={async () => {
            if (cameraRef.current) {
              const pictureMetadata =
                await cameraRef.current.takePictureAsync();
              console.log("pictureMetadata", pictureMetadata);
              console.log(
                await ImageManipulator.manipulateAsync(pictureMetadata.uri, [
                  { resize: { width: 800 } },
                ])
              );
            } else {
              console.log("Error while taking picture");
            }
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0EBE3",
    justifyContent: "center",
    alignItems: "center",
  },
  //   camera: {
  //     flex: 1,
  //     justifyContent: "center",
  //   },
  //   noWay: {
  //     flex: 1,
  //     backgroundColor: "yellow",
  //     justifyContent: "flex-end",
  //   },
  //   buttonContainer: {},
  //   button: {},
  //   text: {},
});

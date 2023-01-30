import { Camera } from "expo-camera";
import React from "react";
import { Button, Text, View } from "react-native";
import { CameraComponent } from "../components/Camera";

export const CameraScreen = () => {
  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (!permission) {
    return (
      <View>
        <Text>No Fucking permission</Text>
      </View>
    );
  } else if (!permission.granted) {
    return (
      <Button
        color="#cc987a"
        title={"get fucking permission"}
        onPress={requestPermission}
      />
    );
  } else {
    return <CameraComponent />;
  }
};

import { Ionicons } from "@expo/vector-icons";
import { Camera, CameraType } from "expo-camera";
import { useContext, useRef, useState } from "react";
import {
  Button,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { userContext } from "../contexts/UserContext";
import { gql, useMutation } from "@apollo/client";

const API_URL = "https://api.cloudinary.com/v1_1/dvsg7r2hx/image/upload";

export const ADD_IMAGE = gql`
  mutation AddImage($imageUrl: String!, $email: String!) {
    addImage(imageUrl: $imageUrl, email: $email) {
      url
      id
    }
  }
`;

export const CameraComponent = () => {
  const [cameraType, setCameraType] = useState(CameraType.back);
  const cameraRef = useRef<Camera>(null);
  const { width } = useWindowDimensions();
  const currentUser = useContext(userContext).user;
  const currentuserEmail = currentUser.email;
  const [imageUrl, setImageUrl] = useState<string>("");
  const [addImage] = useMutation(ADD_IMAGE, {
    variables: { email: currentuserEmail, imageUrl: imageUrl },
  });
  console.log("USERRRRRRRRRRRRRR", currentUser);

  const toggleCameraType = () => {
    setCameraType(
      cameraType === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const takePicture = async () => {
    console.log("test");

    if (!cameraRef.current) {
      console.log("no current");
    } else {
      const options = { quality: 0.7, base64: true };
      const photo = await cameraRef.current?.takePictureAsync(options);

      if (!photo) {
        console.log("no photo");
      }
      const base64Img = `data:image/jpg;base64,${photo.base64}`;
      const data = { file: base64Img, upload_preset: "yeahbuddy" };

      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(data),
        });
        const result = await response.json();

        if (result.secure_url) {
          const newImage: string = result.public_id;
          setImageUrl(newImage);
          console.log("userrrrrrr", currentUser);

          console.log("resultttttttttttttttt", result.public_id);

          addImage();
          alert("good");
        }
      } catch (error) {
        alert("Cannot upload");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Camera
        type={cameraType}
        style={{ flex: 2, width, paddingBottom: 10 }}
        ref={cameraRef}
      >
        <TouchableOpacity
          onPress={toggleCameraType}
          style={{ paddingLeft: 10, paddingTop: 10 }}
        >
          <Ionicons name="camera-reverse-outline" size={24} color="white" />
        </TouchableOpacity>
      </Camera>
      <View style={{ paddingVertical: 10, borderRadius: 5 }}>
        <Button color="#cc987a" title="Take a Picture" onPress={takePicture} />
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
});

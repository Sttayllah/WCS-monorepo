import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  useWindowDimensions,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import * as FileSystem from "expo-file-system";
import singleFileUploader from "single-file-uploader";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";

const token = Constants?.manifest?.extra?.TOKEN;
export const ImageScreen = () => {
  const [imagesURI, setImagesURI] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const SCREEN_DIMENSIONS = useWindowDimensions();
  useEffect(() => {
    (async () => {
      const images = await FileSystem.readDirectoryAsync(
        FileSystem.cacheDirectory + "ImageManipulator"
      );
      setImagesURI(images);
    })();
  }, []);

  const renderitem = (image: any) => {
    return (
      <View
        style={{
          paddingHorizontal: 5,
          paddingVertical: 5,
          // borderColor: "grey",
          // borderWidth: 3,
          // marginRight: 10,
          width: 100,
        }}
      >
        <TouchableOpacity
          style={{ position: "relative" }}
          onPress={async () => {
            try {
              singleFileUploader({
                distantUrl: "https://wildstagram.nausicaa.wilders.dev/upload",
                expectedStatusCode: 201,
                filename: image.item,
                filetype: "image/jpeg",
                formDataName: "fileData",
                localUri:
                  FileSystem.cacheDirectory + "ImageManipulator/" + image.item,
                token: token,
              });
              alert("woot GG well play quest down");
            } catch (e) {
              alert("ou pas " + e);
            }
          }}
        >
          <Image
            source={{
              uri: FileSystem.cacheDirectory + "ImageManipulator/" + image.item,
            }}
            style={{ width: 100, height: 100, paddingHorizontal: 5 }}
            resizeMode="cover"
          />
          <Ionicons
            name={"cloud-upload-outline"}
            size={24}
            color={"white"}
            style={{ position: "absolute", top: 5, right: 5 }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return imagesURI.length > 0 ? (
    <View
      style={{
        height: SCREEN_DIMENSIONS.height - 130,
        backgroundColor: "#F0EBE3",
        flexDirection: "row",
        flexWrap: "wrap",
        borderWidth: 4,
        borderColor: "#cc987a",
      }}
    >
      <FlatList
        refreshing
        refreshControl={
          <RefreshControl
            refreshing
            onRefresh={async () => {
              const images = await FileSystem.readDirectoryAsync(
                FileSystem.cacheDirectory + "ImageManipulator"
              );
              setImagesURI(images);
            }}
          />
        }
        contentContainerStyle={{
          justifyContent: "center",
          flexDirection: "column",
        }}
        numColumns={6}
        data={imagesURI}
        keyExtractor={(image) => image.item}
        renderItem={renderitem}
      />
    </View>
  ) : null;
};
const styles = StyleSheet.create({
  image: {
    resizeMode: "cover",
    height: "50%",
  },
});

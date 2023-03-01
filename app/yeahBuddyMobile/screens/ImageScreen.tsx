import React, { useContext, useEffect, useState } from "react";
import * as Crypto from "expo-crypto";
import {
  REACT_APP_CLOUDINARY_CLOUD_NAME,
  REACT_APP_CLOUDINARY_API_SECRET,
  REACT_APP_CLOUDINARY_API_KEY,
} from "@env";
import {
  View,
  Image,
  useWindowDimensions,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Button,
  Text,
} from "react-native";

import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import { userContext } from "../contexts/UserContext";
import { gql, useLazyQuery, useMutation } from "@apollo/client";

const token = Constants?.manifest?.extra?.TOKEN;

export const GET_IMAGES = gql`
  query Query($email: String!) {
    getOne(email: $email) {
      images {
        url
        id
      }
    }
  }
`;

export const DELETE_IMAGE = gql`
  mutation Mutation($deleteImageId: Float!) {
    deleteImage(id: $deleteImageId)
  }
`;

const apiKey = REACT_APP_CLOUDINARY_API_KEY || "";
const apiSecret = REACT_APP_CLOUDINARY_API_SECRET || "";
const cloudName = REACT_APP_CLOUDINARY_CLOUD_NAME || "";

const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;

export const ImageScreen = () => {
  const currentUser = useContext(userContext).user;
  const [imagesURI, setImagesURI] = useState<any[]>([]);
  const [idToDelete, setIdToDelete] = useState<number | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const SCREEN_DIMENSIONS = useWindowDimensions();
  const [getImages] = useLazyQuery(GET_IMAGES, {
    variables: {
      email: currentUser.email,
    },
    fetchPolicy: "network-only",
    onCompleted(data) {
      console.log(data.getOne.images);
      const res = data.getOne.images;
      setImagesURI(res);
      console.log("res", res);
    },

    onError(error) {
      console.log(error);
    },
  });
  const [deleteImage] = useMutation(DELETE_IMAGE, {
    variables: { deleteImageId: idToDelete },
  });

  useEffect(() => {
    getImages();
  }, []);

  return (
    <View
      style={{
        height: SCREEN_DIMENSIONS.height - 130,
        backgroundColor: "#F0EBE3",
        borderWidth: 4,
        borderColor: "#cc987a",
      }}
    >
      <TouchableOpacity style={{ justifyContent: "flex-end" }}>
        {imagesURI.length > 0 ? (
          <FlatList
            refreshing
            // horizontal
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => {
                  getImages();
                  setRefreshing(false);
                }}
              />
            }
            contentContainerStyle={{
              justifyContent: "center",
            }}
            numColumns={3}
            data={imagesURI}
            keyExtractor={(image) => image.url}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  // borderWidth: 3,
                  flex: 1,
                  padding: 3,
                }}
                onPress={async () => {
                  const timestamp = new Date().getTime();
                  const publicId = item.url;
                  const stringToSign = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
                  const signature = await Crypto.digestStringAsync(
                    Crypto.CryptoDigestAlgorithm.SHA1,
                    stringToSign
                  );
                  setIdToDelete(item.id);
                  deleteImage();
                  getImages();
                  const formData = new FormData();
                  formData.append("public_id", publicId);
                  formData.append("signature", signature);
                  formData.append("api_key", apiKey);
                  formData.append("timestamp", timestamp.toString());
                  console.log(item.id);
                  console.log(signature);

                  fetch(url, {
                    method: "POST",
                    body: formData,
                  })
                    .then((response) => response.text())
                    .then((result) => console.log(result))
                    .catch((error) => console.log("error", error));
                }}
              >
                <View
                  style={{
                    position: "relative",
                    padding: 2,
                    margin: 2,
                  }}
                >
                  <Image
                    source={{
                      uri: `https://res.cloudinary.com/dvsg7r2hx/image/upload/v1675262750/${item.url}.jpg`,
                    }}
                    resizeMode="cover"
                    style={{ width: 150, height: 150 }}
                  />
                  <Ionicons
                    name={"trash-outline"}
                    size={24}
                    color={"red"}
                    style={{ position: "absolute", bottom: 1, left: 1 }}
                  />
                </View>
              </TouchableOpacity>
            )}
          />
        ) : (
          <View>
            <Text>Aucune photo à afficher</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  image: {
    resizeMode: "cover",
    height: "50%",
  },
});

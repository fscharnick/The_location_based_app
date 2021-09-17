import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";

const CameraFeature = (props) => {
  const [pickedImage, setPickedImage] = useState();

  const takeImageHandler = async () => {
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1.91, 1],
      quality: 0.5,
    });

    setPickedImage(image.uri);
    props.onImageTaken(image.uri);
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!pickedImage ? (
          <Text>No image picked yet</Text>
        ) : (
          <Image style={styles.image} source={{ uri: pickedImage }} />
        )}
      </View>
      <Button title="Take Image" onPress={takeImageHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: "center",
    marginBottom: 15,
  },

  imagePreview: {
    width: "100%",
    height: 350,
    marginBottom: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    alignItems: "center",
  },

  image: {
    width: "100%",
    height: "100%",
  },
});

export default CameraFeature;

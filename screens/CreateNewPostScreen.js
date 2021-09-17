import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  Image,
  TextInput,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

import * as Location from "expo-location";
import MapPreview from "../components/MapPreview";

import { useDispatch } from "react-redux";
import * as postActions from "../store/post-actions";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import { Ionicons } from "@expo/vector-icons";

import CameraFeature from "../components/CameraFeature";

const CreateNewPostScreen = (props) => {
  const [isFetching, setIsFetching] = useState(false);
  const [captionValue, setCaptionValue] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const [pickedLocation, setPickedLocation] = useState();

  const dispatch = useDispatch();

  const captionChangeHandler = (text) => {
    setCaptionValue(text);
  };

  const imageTakenHandler = (imagePath) => {
    setSelectedImage(imagePath);
  };

  const getLocationHandler = async () => {
    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000,
      });
      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } catch (err) {
      Alert.alert(
        "Could not fetch location",
        "Please try again later or pick a location on the map",
        [{ text: "Okay" }]
      );
    }
    setIsFetching(false);
  };

  const savePostHandler = useCallback(() => {
    dispatch(postActions.addPost(captionValue, selectedImage, pickedLocation));
    props.navigation.goBack();
  }, [dispatch, captionValue, selectedImage, pickedLocation]);

  useEffect(() => {
    props.navigation.setParams({ submit: savePostHandler });
  }, [savePostHandler]);

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.screenContainer}>
        <View style={styles.imageCaptionContainer}>
          <Image style={styles.profilePicture} />
          <TextInput
            placeholder="What are you up to?"
            onChangeText={captionChangeHandler}
            value={captionValue}
          />
        </View>
      </View>
      <View style={styles.locationInputContainer}>
        <Ionicons
          title="location"
          name="location-outline"
          size={20}
          color="black"
        />
        <TouchableOpacity onPress={getLocationHandler}>
          <View style={{ marginLeft: 8, marginRight: 120 }}>
            <Text
              style={{ fontSize: 15, fontWeight: "bold", color: "#0880D8" }}
            >
              Select your location
            </Text>
          </View>
        </TouchableOpacity>
        <Text style={{ color: "#ccc" }}>required</Text>
      </View>
      <CameraFeature onImageTaken={imageTakenHandler} />
      <View style={styles.locationPicker}>
        <View style={styles.mapPreviewText}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Map Preview</Text>
        </View>
        <MapPreview style={styles.mapPreview} location={pickedLocation}>
          {isFetching ? (
            <ActivityIndicator size="large" />
          ) : (
            <Text>No location chosen yet</Text>
          )}
        </MapPreview>
      </View>
    </ScrollView>
  );
};

CreateNewPostScreen.navigationOptions = (navData) => {
  const submitFn = navData.navigation.getParam("submit");
  return {
    headerTitle: "New Post",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="Post" color="#20A7FF" onPress={submitFn} />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },

  profilePicture: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: "#ccc",
    marginRight: 16,
  },

  imageCaptionContainer: {
    flexDirection: "row",
    marginBottom: 8,
  },

  screenContainer: {
    margin: 16,
  },

  locationPicker: {
    marginTop: 24,
    marginHorizontal: 16,
  },

  mapPreview: {
    marginBottom: 10,
    width: "100%",
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1,
  },

  locationInputContainer: {
    marginHorizontal: 16,
    flexDirection: "row",
    marginBottom: 24,
  },

  mapPreviewText: {
    marginBottom: 8,
  },
});

export default CreateNewPostScreen;

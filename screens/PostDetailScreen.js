import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Button,
  StyleSheet,
} from "react-native";

import { useSelector } from "react-redux";
import MapPreview from "../components/MapPreview";

const PostDetailScreen = (props) => {
  const postId = props.navigation.getParam("postId");

  const selectedPost = useSelector((state) =>
    state.posts.posts.find((post) => post.id === postId)
  );

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.mainImageContainer}>
        <Image
          source={{ uri: selectedPost.imageUri }}
          style={styles.mainImage}
        />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.addressContainer}>
          <Text style={{ color: "#888", fontSize: 12 }}>
            {selectedPost.address}
          </Text>
          <Button color="#20A7FF" title="Save" onPress={() => {}} />
        </View>
        <View style={styles.usernameContainer}>
          <Image style={styles.profileImage} />
          <View style={styles.username}>
            <Text style={{ fontWeight: "bold", fontSize: 15 }}>username</Text>
          </View>
        </View>
        <View style={styles.captionContainer}>
          <View style={styles.caption}>
            <Text>{selectedPost.caption}</Text>
          </View>
          <View style={styles.date}>
            <Text style={{ fontSize: 12, color: "#888" }}>10 min ago</Text>
          </View>
        </View>
      </View>
      <View style={styles.mapContainer}>
        <Text style={styles.mapViewText}>Map View</Text>
        <View style={styles.mapPreviewContainer}>
          <MapPreview
            style={styles.mapPreview}
            location={{ lat: selectedPost.lat, lng: selectedPost.lng }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },

  mainImageContainer: {
    width: "100%",
    height: 475,
  },

  mainImage: {
    width: "100%",
    height: "100%",
  },

  profileImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#ccc",
  },

  addressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  contentContainer: {
    marginVertical: 8,
    marginHorizontal: 16,
    justifyContent: "center",
  },

  usernameContainer: {
    flexDirection: "row",
    marginBottom: 4,
    alignItems: "center",
  },

  username: {
    marginLeft: 8,
  },

  caption: {
    marginBottom: 4,
    fontSize: 16,
  },

  date: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },

  captionContainer: {
    marginBottom: 8,
  },

  mapViewText: {
    fontSize: 18,
    fontWeight: "bold",
  },

  mapContainer: {
    marginHorizontal: 16,
  },

  mapPreview: {
    width: "100%",
    height: 250,
    marginTop: 16,
  },

  mapPreviewContainer: {
    borderRadius: 10,
    overflow: "hidden",
  },
});

export default PostDetailScreen;

import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  Button,
} from "react-native";

import { useSelector, useDispatch } from "react-redux";
import * as postActions from "../store/post-actions";

const EditUserPostScreen = (props) => {
  const postId = props.navigation.getParam("postId");
  const editSelectedPost = useSelector((state) =>
    state.posts.userPosts.find((post) => post.id === postId)
  );

  const [caption, setCaption] = useState(editSelectedPost.caption);

  const dispatch = useDispatch();

  const saveEditHandler = useCallback(() => {
    if (editSelectedPost) {
      dispatch(postActions.updatePost(postId, caption));
    }
  }, [dispatch, postId, caption]);

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.mainImageContainer}>
        <Image
          source={{ uri: editSelectedPost.imageUri }}
          style={styles.mainImage}
        />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.usernameContainer}>
          <Image style={styles.profileImage} />
          <View style={styles.username}>
            <Text style={{ fontWeight: "bold" }}>username</Text>
          </View>
        </View>
        <View style={styles.captionContainer}>
          <View style={styles.caption}>
            <TextInput
              value={caption}
              onChangeText={(text) => setCaption(text)}
              autoFocus
            />
          </View>
        </View>
        <View>
          <Button title="Save Edited Post" onPress={saveEditHandler} color='#20A7FF' />
        </View>
      </View>
    </ScrollView>
  );
};

EditUserPostScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Edit Post",
  };
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

  captionContainer: {
    width: "90%",
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

  profileImage: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#ccc",
  },

  username: {
    marginLeft: 8,
  },

  caption: {
    marginBottom: 4,
  },

  captionContainer: {
    marginBottom: 8,
  },
});

export default EditUserPostScreen;

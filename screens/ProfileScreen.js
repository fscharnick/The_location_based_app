import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Alert } from "react-native";
import ProfileGridItem from "../components/ProfilePostGridItem";

import { useSelector, useDispatch } from "react-redux";
import * as postActions from "../store/post-actions";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import { Ionicons } from "@expo/vector-icons";

const ProfileScreen = (props) => {
  const [showModal, setShowModal] = useState(false);
  const userPosts = useSelector((state) => state.posts.userPosts);

  const dispatch = useDispatch();

  const deleteHandler = (id) => {
    Alert.alert("Are you sure?", "Do you really want to delete this item?", [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          dispatch(postActions.deletePost(id));
        },
      },
    ]);
  };

  const editUserPostHandler = (id) => {
    props.navigation.navigate("EditUserPost", { postId: id });
  };

  if (userPosts.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <View style={{ alignItems: "center", marginHorizontal: 32 }}>
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 18 }}>No Posts Available.</Text>
          </View>
          <Text style={{ textAlign: "center", fontSize: 18, color: "#888" }}>
            Start capturing your favorite locations
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        data={userPosts}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <ProfileGridItem
            onViewDetail={() => {
              props.navigation.navigate("ProfilePostDetail", {
                postId: itemData.item.id,
              });
            }}
            image={itemData.item.imageUri}
            caption={itemData.item.caption}
            showModal={() => {
              setShowModal(true);
            }}
            visible={showModal}
            onHideModal={() => {
              setShowModal(false);
            }}
            onEditProfileCaption={() => {
              editUserPostHandler(itemData.item.id);
            }}
            onDeleteProfilePost={deleteHandler.bind(this, itemData.item.id)}
          />
        )}
      />
    </View>
  );
};

ProfileScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "username",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Settings"
          iconName="ellipsis-vertical-sharp"
          iconSize={24}
          color="black"
          onPress={() => {
            navData.navigation.navigate("Settings");
          }}
        />
      </HeaderButtons>
    ),
  };
};
const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },
});

export default ProfileScreen;

import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Button,
} from "react-native";

import { FAB } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import * as postActions from "../store/post-actions";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import { Ionicons } from "@expo/vector-icons";

import PostGridItem from "../components/PostGridItem";

const HomeFeedScreen = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const posts = useSelector((state) => state.posts.posts);

  const dispatch = useDispatch();

  const loadPosts = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(postActions.fetchPosts());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener("willFocus", loadPosts);

    return () => {
      willFocusSub.remove();
    };
  }, [loadPosts]);

  useEffect(() => {
    setIsLoading(true);
    loadPosts().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadPosts]);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An Error occurred!</Text>
        <Button title="Try Again" onPress={loadPosts} color="#20A7FF" />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#20A7FF" />
      </View>
    );
  }

  if (!isLoading && posts.length === 0) {
    return (
      <View style={styles.centered}>
        <View style={{ alignItems: "center", marginHorizontal: 24 }}>
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 18 }}>No Posts Available.</Text>
          </View>
          <Text style={{ textAlign: "center", fontSize: 18, color: "#888" }}>
            Start sharing your favorite locations with friends
          </Text>
        </View>

        <FAB
          style={styles.fab}
          big
          icon="plus"
          color="white"
          onPress={() => {
            props.navigation.navigate("CreateNewPost");
          }}
        />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        onRefresh={loadPosts}
        refreshing={isRefreshing}
        numColumns={2}
        keyExtractor={(item) => item.id}
        data={posts}
        renderItem={(itemData) => (
          <PostGridItem
            caption={itemData.item.caption}
            image={itemData.item.imageUri}
            onShowModal={() => {
              setShowModal(true);
            }}
            onViewDetail={() => {
              props.navigation.navigate("PostDetail", {
                postId: itemData.item.id,
              });
            }}
            visible={showModal}
            onHideModal={() => {
              setShowModal(false);
            }}
          />
        )}
      />
      <FAB
        style={styles.fab}
        big
        icon="plus"
        color="white"
        onPress={() => {
          props.navigation.navigate("CreateNewPost");
        }}
      />
    </View>
  );
};

HomeFeedScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Location App",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Profile"
          iconName="person-circle-outline"
          iconSize={24}
          color="black"
          onPress={() => {
            navData.navigation.navigate("Profile");
          }}
        />
      </HeaderButtons>
    ),
  };
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },

  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#20A7FF",
  },

  centered: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "white",
  },
});

export default HomeFeedScreen;

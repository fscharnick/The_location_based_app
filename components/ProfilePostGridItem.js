import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

const ProfileGridItem = (props) => {
  return (
    <View>
      <TouchableOpacity onPress={props.onViewDetail}>
        <View style={styles.gridPost}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: props.image }} />
          </View>
          <View style={styles.detailContainer}>
            <View style={styles.details}>
              <View style={styles.captionContainer}>
                <Text numberOfLines={1} style={styles.caption}>
                  {props.caption}
                </Text>
              </View>
              <View>
                <TouchableOpacity onPress={props.showModal} style={styles.icon}>
                  <Ionicons
                    title="more"
                    name="ellipsis-vertical"
                    size={16}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <Modal transparent={true} visible={props.visible}>
        <TouchableWithoutFeedback onPress={props.onHideModal}>
          <View style={styles.modal}>
            <View style={styles.subModal}>
              <TouchableOpacity style={styles.iconTwo}>
                <Ionicons
                  title="close modal"
                  name="close"
                  size={24}
                  color="black"
                  onPress={props.onHideModal}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={props.onEditProfileCaption}
                style={styles.buttonContainer}
              >
                <Text style={styles.text}>Edit Post</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={props.onDeleteProfilePost}
                style={styles.buttonContainerBottom}
              >
                <Text style={styles.text}>Delete Post</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  gridPost: {
    flex: 1,
    height: 210,
    width: 156,
    marginHorizontal: 12,
    marginVertical: 24,
  },

  imageContainer: {
    backgroundColor: "#ccc",
    height: "100%",
    width: 156,
    borderRadius: 10,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  caption: {
    color: "black",
    fontWeight: "bold",
    fontSize: 13,
  },

  details: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: 156,
    marginTop: 4,
  },

  icon: {
    paddingLeft: 8,
  },

  captionContainer: {
    width: "90%",
  },
  detailContainer: {
    marginTop: 2,
  },

  buttonContainer: {
    padding: 16,
    marginTop: 24,
  },

  buttonContainerBottom: {
    padding: 16,
  },

  iconTwo: {
    position: "absolute",
    top: 16,
    right: 16,
  },

  text: {
    fontSize: 16,
    fontWeight: "600",
  },

  modal: {
    backgroundColor: "#000000aa",
    flex: 1,
    justifyContent: "center",
  },

  subModal: {
    backgroundColor: "#ffffff",
    margin: 50,
    padding: 16,
    borderRadius: 10,
  },
});

export default ProfileGridItem;

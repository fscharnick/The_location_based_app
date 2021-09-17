import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

import { useDispatch } from "react-redux";
import * as authActions from "../store/auth-actions";

const SettingsScreen = (props) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.screen}>
      <View style={styles.subScreen}>
        <Text>This is the settings screen</Text>
        <View style={styles.button}>
          <Button
            title="Logout"
            onPress={() => {
              dispatch(authActions.logout());
              props.navigation.navigate("Auth");
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },

  subScreen: {
    margin: 16,
  },

  button: {
    marginTop: 550,
    backgroundColor: "#20A7FF",
  },
});

export default SettingsScreen;

import React, { useState, useReducer, useCallback, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  Button,
  View,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Text,
} from "react-native";

import Input from "../components/Input";
import { useDispatch } from "react-redux";

import * as authActions from "../store/auth-actions";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const AuthScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert("An error occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const authHandler = async () => {
    let action;
    if (isSignup) {
      action = authActions.signup(
        formState.inputValues.email,
        formState.inputValues.password
      );
    } else {
      action = authActions.login(
        formState.inputValues.email,
        formState.inputValues.password
      );
    }
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      props.navigation.navigate("Home");
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.subScreen}>
        <View style={styles.screenHeading}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            {isSignup ? "Create" : "Login"}
          </Text>
          <Text style={{ fontSize: 18 }}>
            {isSignup ? "New Account" : "to your Account"}
          </Text>
        </View>
        <View style={styles.formContainer}>
          <Input
            id="email"
            label="E-Mail Address"
            placeholder="Enter your email address"
            keyboardType="email-address"
            required
            email
            autoCapitalize="none"
            errorText="Please enter a valid email address"
            onInputChange={inputChangeHandler}
            initialValue=""
          />
          <Input
            id="password"
            label="Password"
            placeholder="Enter your password"
            keyboardType="default"
            secureTextEntry
            required
            minLength={5}
            autoCapitalize="none"
            errorText="Please enter a valid password"
            onInputChange={inputChangeHandler}
            initialValue=""
          />
        </View>

        {isLoading ? (
          <ActivityIndicator size="small" color="#20A7FF" />
        ) : (
          <Button
            title={isSignup ? "Sign Up" : "Login"}
            onPress={authHandler}
            color="#20A7FF"
          />
        )}
        <TouchableOpacity
          onPress={() => {
            setIsSignup((prevState) => !prevState);
          }}
        >
          <View style={{ alignItems: "center", marginTop: 16 }}>
            <Text
              style={{ color: "#20A7FF", fontWeight: "bold" }}
            >{`Switch to ${isSignup ? "Login" : "Create New Account"}`}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: "Authenticate",
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },

  subScreen: {
    margin: 16,
  },

  formContainer: {
    marginBottom: 32,
  },

  screenHeading: {
    marginBottom: 32,
  },
});

export default AuthScreen;

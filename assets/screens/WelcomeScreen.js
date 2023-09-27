import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  Alert,
  TouchableOpacity,
} from "react-native";

function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.text}>Rapport til</Text>
        <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 50 }}>
          Indregulering
        </Text>
      </View>

      <View style={styles.imgContainer}>
        <Image
          style={styles.img}
          source={require("../Ventilationsrens_logo.png")}
        ></Image>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Input")}
        >
          <Text style={styles.buttonText}>Lav rapport</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    height: 150,
    resizeMode: "contain",
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    borderRadius: 40,
    height: 60,
    width: "75%",
    backgroundColor: "orange",
    justifyContent: "center",
    margin: 80,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: "20",
    textTransform: "uppercase",
    fontWeight: "400",
  },
  text: {
    color: "black",
    fontSize: 40,
    fontWeight: "300",
    textAlign: "center",
    letterSpacing: 2,
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    marginTop: 50,
  },
});

export default WelcomeScreen;

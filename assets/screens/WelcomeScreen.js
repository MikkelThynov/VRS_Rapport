import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  Alert,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.topText}>VRS.</Text>
        <Text style={styles.titleText}>Indregulering og rapport</Text>
        <Text style={styles.subText}>
          Udfyld dine rapporter hurtigt og nemt, så du kan sende dem direkte til
          dine kunder
        </Text>
      </View>

      <View style={styles.fanContainer}>
        <Image
          style={styles.fan}
          source={require("../fan_bg.png")}
          resizeMode="contain"
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

      <View style={styles.imgContainer}>
        {/*<Image
          style={styles.img}
          source={require("../Ventilationsrens_logo.png")}
        ></Image>*/}
        <Text style={styles.bottomText}>Ventilationsrens.dk</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCFBFB",
  },
  imgContainer: {
    flex: 0.5,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: 40,
  },
  img: {
    height: 50,
    resizeMode: "contain",
  },
  fanContainer: {
    marginLeft: -180,
    marginBottom: 10,
    marginTop: 50,
    justifyContent: "center",
  },
  fan: {
    height: 300,
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    //marginBottom: 80,
    marginBottom: 20,
  },
  button: {
    borderRadius: 40,
    height: 50,
    width: "75%",
    backgroundColor: "orange",
    justifyContent: "center",
    margin: 80,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "600",
  },
  topText: {
    color: "#0C0C0C",
    fontSize: 26,
    fontWeight: "800",
    paddingBottom: 20,
  },
  titleText: {
    fontSize: 48,
    color: "#0C0C0C",
    fontWeight: "700",
    paddingBottom: 20,
  },
  subText: {
    color: "#656565",
    fontSize: 17,
    fontWeight: "400",
    lineHeight: 30,
  },
  bottomText: {
    color: "#656565",
    letterSpacing: 2,
    fontSize: 10,
    fontWeight: "300",
    marginBottom: 10,
  },
  titleContainer: {
    flex: 4,
    justifyContent: "flex-end",
    marginTop: 100,
    paddingHorizontal: 30,
  },
});

export default WelcomeScreen;

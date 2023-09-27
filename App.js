import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  TextInput,
  Linking,
} from "react-native";
import * as XLSX from "xlsx";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./assets/screens/WelcomeScreen";
import InputScreen from "./assets/screens/InputScreen";
import SettingsScreen from "./assets/screens/SettingsScreen";

import * as fs from "expo-file-system";
import * as share from "expo-sharing";

import { sendEmail } from "./assets/components/email";
import * as MailComposer from "expo-mail-composer";
import { sendMail } from "./assets/components/sendMail";

import * as Print from "expo-print";
import generateContent from "./assets/components/pdfTemplate01";

const saveXsxlFile = async (file, nameOfFile) => {
  const name = nameOfFile;
  const fileUri = fs.cacheDirectory + nameOfFile;

  try {
    await fs.writeAsStringAsync(fileUri, file, {
      encoding: fs.EncodingType.Base64,
    });
    console.log("File saved at:", fileUri);
    await share.shareAsync(fileUri);
  } catch (error) {
    console.error(error);
  }
};

const generateExcel = async (fn) => {
  const data = [
    ["Name", "Age", "Email"],
    ["John Doe", 30, "john.doe@example.com"],
    ["Jane Doe", 25, "jane.doe@example.com"],
    ["Bob Smith", 40, "bob.smith@example.com"],
  ];

  const ws = XLSX.utils.aoa_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Rapport");

  const wbout = XLSX.write(wb, { type: "base64", bookType: "xlsx" });

  saveXsxlFile(wbout, fn);
};

const Stack = createNativeStackNavigator();

export default function App() {
  const [text, onChangeText] = React.useState("Filnavn");
  if (text === null) {
    text = "Rapport";
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Input" component={InputScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    borderRadius: 8,
    height: 50,
    width: "75%",
    backgroundColor: "orange",
    justifyContent: "center",
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: "20",
    textTransform: "uppercase",
    fontWeight: "400",
  },
  inputContainer: {
    flex: 1,
    justifyContent: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
  CheckBox,
  Alert,
  Image,
} from "react-native";
import * as Print from "expo-print";
import generateContent from "../components/pdfTemplate01";

import { sendMail } from "../components/sendMail";

import BouncyCheckbox from "react-native-bouncy-checkbox";

import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from "accordion-collapse-react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

let content;

let mailBodyName;
let mailBodyCustomer;

let date = getCurrentDate();

function getCurrentDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const currentDate = `${year}-${month}-${day}`;
  return currentDate;
}

const mail = async () => {
  const htmlContent = content;
  const { uri } = await Print.printToFileAsync({ html: htmlContent });

  const mailBody = `
    Kære ${mailBodyCustomer},

    Tusind tak fordi du valgte Ventilationsrens! Vi sender dig hermed en rapport med et overblik over vores arbejde. Hvis du har spørgsmål, er du altid velkommen til at kontakte os.

    Husk at dit anlæg bør renses hvert 2. år, så du undgår en kortere levetid og et dårligt indeklima.

    ${mailBodyName}
    Ventilationsrens
    52 11 41 09
  `;

  sendMail(
    "mikkel.thynov@gmail.com",
    "Indreguleringsrapport",
    mailBody,
    uri
  ).then(() => {
    console.log("Your message was successfully sent!");
  });
};

function InputScreen({ navigation }) {
  /*--------------------- Initial info --------------------*/
  const [name, setName] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [address, setAdress] = useState("");
  const [postNr, setPostNr] = useState("");
  const [company, setCompany] = useState("Ventilationsrens");
  const [gear, setGear] = useState("Testo dP440");
  const [SEL_Value, setSEL_Value] = useState(""); // calculated by taking Wattage / (total udsugning luft mængde / 3600)

  /*--------------------- Vent type --------------------*/
  const [vent, setVent] = useState("");
  const [model, setModel] = useState("");
  const [trin, setTrin] = useState("");
  const [m2, setM2] = useState(0);
  const [watt, setWatt] = useState(0);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [_1st_1, set1st_1] = useState(0);
  const [_1st_2, set1st_2] = useState(0);
  const [_1st_3, set1st_3] = useState(0);
  const [_2nd_1, set2nd_1] = useState(0);
  const [_2nd_2, set2nd_2] = useState(0);
  const [_2nd_3, set2nd_3] = useState(0);
  const [_3rd_1, set3rd_1] = useState(0);
  const [_3rd_2, set3rd_2] = useState(0);
  const [_3rd_3, set3rd_3] = useState(0);
  const [_4th_1, set4th_1] = useState(0);
  const [_4th_2, set4th_2] = useState(0);
  const [_4th_3, set4th_3] = useState(0);
  const [_5th_1, set5th_1] = useState(0);
  const [_5th_2, set5th_2] = useState(0);
  const [_5th_3, set5th_3] = useState(0);
  const [_6th_1, set6th_1] = useState(0);
  const [_6th_2, set6th_2] = useState(0);
  const [_6th_3, set6th_3] = useState(0);
  const [totalAirOut, setTotalAirOut] = useState(0);

  const [stue_1, setStue_1] = useState(0);
  const [køkken_1, setKøkken_1] = useState(0);
  const [room_1_1, setRoom_1_1] = useState(0);
  const [room_2_1, setRoom_2_1] = useState(0);
  const [room_3_1, setRoom_3_1] = useState(0);
  const [room_4_1, setRoom_4_1] = useState(0);
  const [room_5_1, setRoom_5_1] = useState(0);
  const [køkken_ekstra_1, setKøkken_ekstra_1] = useState(0);
  const [gang_1, setGang_1] = useState(0);
  const [kontor_1, setKontor_1] = useState(0);
  const [stue_2, setStue_2] = useState(0);
  const [køkken_2, setKøkken_2] = useState(0);
  const [room_1_2, setRoom_1_2] = useState(0);
  const [room_2_2, setRoom_2_2] = useState(0);
  const [room_3_2, setRoom_3_2] = useState(0);
  const [room_4_2, setRoom_4_2] = useState(0);
  const [room_5_2, setRoom_5_2] = useState(0);
  const [køkken_ekstra_2, setKøkken_ekstra_2] = useState(0);
  const [gang_2, setGang_2] = useState(0);
  const [kontor_2, setKontor_2] = useState(0);
  const [stue_3, setStue_3] = useState(0);
  const [køkken_3, setKøkken_3] = useState(0);
  const [room_1_3, setRoom_1_3] = useState(0);
  const [room_2_3, setRoom_2_3] = useState(0);
  const [room_3_3, setRoom_3_3] = useState(0);
  const [room_4_3, setRoom_4_3] = useState(0);
  const [room_5_3, setRoom_5_3] = useState(0);
  const [køkken_ekstra_3, setKøkken_ekstra_3] = useState(0);
  const [gang_3, setGang_3] = useState(0);
  const [kontor_3, setKontor_3] = useState(0);
  const [totalAirIn, setTotalAirIn] = useState(0);

  const [minimumAir, setMinimumAir] = useState(0);
  const [undertryk, setUndertryk] = useState(0);

  const teknikerNavnRef = useRef(null);
  const kundenavnRef = useRef(null);
  const adresseRef = useRef(null);
  const postnummerRef = useRef(null);
  const firmaRef = useRef(null);
  const måleudstyrRef = useRef(null);
  const ventilationsanlægRef = useRef(null);
  const modelRef = useRef(null);
  const trinValgtRef = useRef(null);
  const antalM2Ref = useRef(null);
  const wattYdelseRef = useRef(null);

  const _1st_1Ref = useRef(null);
  const _2nd_1Ref = useRef(null);
  const _3rd_1Ref = useRef(null);
  const _4th_1Ref = useRef(null);
  const _5th_1Ref = useRef(null);
  const _6th_1Ref = useRef(null);

  const _1st_2Ref = useRef(null);
  const _2nd_2Ref = useRef(null);
  const _3rd_2Ref = useRef(null);
  const _4th_2Ref = useRef(null);
  const _5th_2Ref = useRef(null);
  const _6th_2Ref = useRef(null);

  const _1st_3Ref = useRef(null);
  const _2nd_3Ref = useRef(null);
  const _3rd_3Ref = useRef(null);
  const _4th_3Ref = useRef(null);
  const _5th_3Ref = useRef(null);
  const _6th_3Ref = useRef(null);

  const stue_1Ref = useRef(null);
  const køkken_1Ref = useRef(null);
  const room_1_1Ref = useRef(null);
  const room_2_1Ref = useRef(null);
  const room_3_1Ref = useRef(null);
  const room_4_1Ref = useRef(null);
  const room_5_1Ref = useRef(null);
  const køkken_ekstra_1Ref = useRef(null);
  const gang_1Ref = useRef(null);
  const kontor_1Ref = useRef(null);

  const stue_2Ref = useRef(null);
  const køkken_2Ref = useRef(null);
  const room_1_2Ref = useRef(null);
  const room_2_2Ref = useRef(null);
  const room_3_2Ref = useRef(null);
  const room_4_2Ref = useRef(null);
  const room_5_2Ref = useRef(null);
  const køkken_ekstra_2Ref = useRef(null);
  const gang_2Ref = useRef(null);
  const kontor_2Ref = useRef(null);

  const stue_3Ref = useRef(null);
  const køkken_3Ref = useRef(null);
  const room_1_3Ref = useRef(null);
  const room_2_3Ref = useRef(null);
  const room_3_3Ref = useRef(null);
  const room_4_3Ref = useRef(null);
  const room_5_3Ref = useRef(null);
  const køkken_ekstra_3Ref = useRef(null);
  const gang_3Ref = useRef(null);
  const kontor_3Ref = useRef(null);

  const [checkboxes, setCheckboxes] = useState([
    { isChecked: false, displayText: "Kanaler rene" },
    { isChecked: false, displayText: "Filter kontrol" },
    { isChecked: false, displayText: "Kanalisolering" },
    { isChecked: false, displayText: "Varmeveksler" },
  ]);

  const [c1_ja, setC1Ja] = useState("");
  const [c1_nej, setC1Nej] = useState("");
  const [c2_ja, setC2Ja] = useState("");
  const [c2_nej, setC2Nej] = useState("");
  const [c3_ja, setC3Ja] = useState("");
  const [c3_nej, setC3Nej] = useState("");
  const [c4_ja, setC4Ja] = useState("");
  const [c4_nej, setC4Nej] = useState("");

  const handleCheckboxPress = (index, isChecked) => {
    const newCheckboxes = [...checkboxes];
    newCheckboxes[index].isChecked = isChecked;

    let c1Ja = "",
      c1Nej = "",
      c2Ja = "",
      c2Nej = "",
      c3Ja = "",
      c3Nej = "",
      c4Ja = "",
      c4Nej = "";

    for (let i = 0; i < newCheckboxes.length; i++) {
      if (newCheckboxes[i].isChecked) {
        switch (i) {
          case 0:
            c1Ja = "x";
            c1Nej = "";
            break;
          case 1:
            c2Ja = "x";
            c2Nej = "";
            break;
          case 2:
            c3Ja = "x";
            c3Nej = "";
            break;
          case 3:
            c4Ja = "x";
            c4Nej = "";
            break;
          default:
            break;
        }
      } else {
        switch (i) {
          case 0:
            c1Ja = "";
            c1Nej = "x";
            break;
          case 1:
            c2Ja = "";
            c2Nej = "x";
            break;
          case 2:
            c3Ja = "";
            c3Nej = "x";
            break;
          case 3:
            c4Ja = "";
            c4Nej = "x";
            break;
          default:
            break;
        }
      }
    }

    setC1Ja(c1Ja);
    setC1Nej(c1Nej);
    setC2Ja(c2Ja);
    setC2Nej(c2Nej);
    setC3Ja(c3Ja);
    setC3Nej(c3Nej);
    setC4Ja(c4Ja);
    setC4Nej(c4Nej);

    setCheckboxes(newCheckboxes);
  };

  //let totalOut;

  function calcSEL() {
    let result = 0;
    if (totalAirOut === 0 || watt === 0) {
      result = 0;
    } else {
      // calculated by taking Wattage / (total udsugning luft mængde / 3600)
      result = watt / (totalAirOut / 3600);
    }

    if (typeof result === "number") {
      setSEL_Value(parseFloat(result.toFixed(2)));
    } else {
      setSEL_Value(result);
    }
  }

  useEffect(() => {
    calcSEL();
  }, [watt, totalAirOut]);

  function calcTotalAir() {
    let totalOut =
      (parseFloat(_1st_3) || 0) +
      (parseFloat(_2nd_3) || 0) +
      (parseFloat(_3rd_3) || 0) +
      (parseFloat(_4th_3) || 0) +
      (parseFloat(_5th_3) || 0) +
      (parseFloat(_6th_3) || 0);
    setTotalAirOut(totalOut);
  }

  useEffect(() => {
    calcTotalAir();
  }, [_1st_3, _2nd_3, _3rd_3, _4th_3, _5th_3, _6th_3]);

  function calcTotalAirIn() {
    let totalIn =
      parseFloat(stue_3 || 0) +
      parseFloat(køkken_3 || 0) +
      parseFloat(room_1_3 || 0) +
      parseFloat(room_2_3 || 0) +
      parseFloat(room_3_3 || 0) +
      parseFloat(room_4_3 || 0) +
      parseFloat(room_5_3 || 0) +
      parseFloat(køkken_ekstra_3 || 0) +
      parseFloat(gang_3 || 0) +
      parseFloat(kontor_3 || 0);
    setTotalAirIn(totalIn);
  }

  useEffect(() => {
    calcTotalAirIn();
  }, [
    stue_3,
    køkken_3,
    room_1_3,
    room_2_3,
    room_3_3,
    room_4_3,
    room_5_3,
    køkken_ekstra_3,
    gang_3,
    kontor_3,
  ]);

  //calculates minimum air pr m3/h
  function calcMinAir() {
    let minimumAir = parseFloat(m2) * 0.3 * 3.6;
    setMinimumAir(minimumAir);
    // set minimum air in pdf first
  }

  useEffect(() => {
    calcMinAir();
  }, [m2]);

  function calcUndertryk() {
    let undertryk = 0;
    if (totalAirOut !== 0 && totalAirIn !== 0) {
      undertryk = parseFloat(
        ((totalAirIn / totalAirOut) * 100 - 100).toFixed(2)
      );
    }
    console.log(undertryk);
    setUndertryk(undertryk);
  }

  useEffect(() => {
    calcUndertryk();
  }, [totalAirIn, totalAirOut]);

  // store relevant data to make it easier next time you send a report
  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("@teknikerNavn", value);
    } catch (e) {
      console.log(e + "..., Kan ikke gemme tekniker navn");
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("@teknikerNavn");
      if (value !== null) {
        setName(value);
      }
    } catch (e) {
      console.log(e + "..., Kan ikke finde tekniker navn");
    }
  };

  useEffect(() => {
    getData();
  }, [name]);

  const handleNameChange = (name) => {
    setName(name);
    storeData(name);
  };

  const handleNextInput = (currentRef, nextRef) => {
    if (nextRef.current) {
      nextRef.current.focus();
    }
  };

  function checkErrors() {
    /*if(watt === null){
        Alert.alert('OBS', 'Udfyld watt ydelse før du fortsætter', [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
        return false; // indicate that there are errors
      } else if (_1st_3 === 0 || _2nd_3 === 0 || _3rd_3 === 0 || _4th_3 === 0 || _5th_3 === 0) {
        Alert.alert('OBS', 'Udfyld alle målinger ydelse før du fortsætter', [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
        return false; // indicate that there are errors
      }*/
    return true; // indicate that there are no errors
  }

  // error handling fundtion if a value in the input field is deleted after being entered. Instead of NaN it will be 0
  /*function handleNumberInputChange(value, setter) {
    let parsedValue = parseFloat(value);

    if (isNaN(parsedValue)) {
      parsedValue = 0;
    } else if (value === "") {
      parsedValue = 0;
    }
    console.log(parsedValue);
    setter(parsedValue);
  }*/

  content = generateContent(
    "Indreguleringsrapport",
    name,
    customerName,
    address,
    postNr,
    company,
    gear,
    SEL_Value,
    date,
    vent,
    model,
    trin,
    m2,
    watt,
    phoneNumber,
    "kontakt@ventilationsrens.dk",
    "www.ventilationsrens.dk",
    "Andet", // --------------------------------------------------- FIX THIS, need to be a variable that you can change depending on the room
    "",
    _1st_1,
    _1st_2,
    _1st_3,
    _2nd_1,
    _2nd_2,
    _2nd_3,
    _3rd_1,
    _3rd_2,
    _3rd_3,
    _4th_1,
    _4th_2,
    _4th_3,
    _5th_1,
    _5th_2,
    _5th_3,
    _6th_1,
    _6th_2,
    _6th_3,
    c1_ja,
    c2_ja,
    c3_ja,
    c4_ja,
    c1_nej,
    c2_nej,
    c3_nej,
    c4_nej,
    totalAirOut,
    stue_1,
    køkken_1,
    room_1_1,
    room_2_1,
    room_3_1,
    room_4_1,
    room_5_1,
    køkken_ekstra_1,
    gang_1,
    kontor_1,
    stue_2,
    køkken_2,
    room_1_2,
    room_2_2,
    room_3_2,
    room_4_2,
    room_5_2,
    køkken_ekstra_2,
    gang_2,
    kontor_2,
    stue_3,
    køkken_3,
    room_1_3,
    room_2_3,
    room_3_3,
    room_4_3,
    room_5_3,
    køkken_ekstra_3,
    gang_3,
    kontor_3,
    totalAirIn,
    minimumAir,
    undertryk
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.settingsContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <Image style={styles.img} source={require("../setting.png")}></Image>
        </TouchableOpacity>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Udfyld rapport</Text>
      </View>
      <View>
        {/*<Collapse style={styles.collapseContainer}>
          <CollapseHeader>
            <View>
              <Text style={{textAlign: 'center', paddingVertical: 30, fontSize:20, fontWeight:'bold'}}>Oplysninger</Text>
            </View>
          </CollapseHeader>
          <CollapseBody>
            <Text>hejehjehjehejhejh</Text>
          </CollapseBody>
        </Collapse>*/}

        <View style={styles.inputContainer}>
          <Text style={styles.inputGroupTitle}>Grundlæggende info</Text>
          <TextInput
            style={styles.input}
            placeholder="Tekniker navn"
            onChangeText={handleNameChange}
            value={name}
            ref={teknikerNavnRef}
            onSubmitEditing={() =>
              handleNextInput(teknikerNavnRef, kundenavnRef)
            }
            returnKeyType="next"
          />
          <TextInput
            style={styles.input}
            placeholder="Kundenavn"
            onChangeText={setCustomerName}
            value={customerName}
            ref={kundenavnRef}
            onSubmitEditing={() => handleNextInput(kundenavnRef, adresseRef)}
            returnKeyType="next"
          />
          <TextInput
            style={styles.input}
            placeholder="Adresse"
            onChangeText={setAdress}
            value={address}
            ref={adresseRef}
            onSubmitEditing={() => handleNextInput(adresseRef, postnummerRef)}
            returnKeyType="next"
          />
          <TextInput
            style={styles.input}
            placeholder="Postnummer"
            onChangeText={setPostNr}
            value={postNr}
            keyboardType="numeric"
            ref={postnummerRef}
            onSubmitEditing={() => handleNextInput(postnummerRef, firmaRef)}
            returnKeyType="done"
          />
          <TextInput
            style={styles.input}
            placeholder="Firma"
            onChangeText={setCompany}
            value={company}
            ref={firmaRef}
            onSubmitEditing={() => handleNextInput(firmaRef, måleudstyrRef)}
            returnKeyType="next"
          />
          <TextInput
            style={styles.input}
            placeholder="Måleudstyr"
            onChangeText={setGear}
            value={gear}
            ref={måleudstyrRef}
            onSubmitEditing={() =>
              handleNextInput(måleudstyrRef, ventilationsanlægRef)
            }
            returnKeyType="next"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputGroupTitle}>Ventilationstype</Text>
          <TextInput
            style={styles.input}
            placeholder="Ventilationsanlæg"
            onChangeText={setVent}
            value={vent}
            ref={ventilationsanlægRef}
            onSubmitEditing={() =>
              handleNextInput(ventilationsanlægRef, modelRef)
            }
            returnKeyType="next"
          />
          <TextInput
            style={styles.input}
            placeholder="Model"
            onChangeText={setModel}
            value={model}
            ref={modelRef}
            onSubmitEditing={() => handleNextInput(modelRef, trinValgtRef)}
            returnKeyType="next"
          />
          <TextInput
            style={styles.input}
            placeholder="Trin valgt"
            onChangeText={setTrin}
            value={trin}
            keyboardType="numeric"
            returnKeyType="done"
            ref={trinValgtRef}
            onSubmitEditing={() => handleNextInput(trinValgtRef, antalM2Ref)}
          />
          <TextInput
            style={styles.input}
            placeholder="Antal m2"
            onChangeText={setM2}
            value={m2}
            keyboardType="numeric"
            returnKeyType="done"
            ref={antalM2Ref}
            onSubmitEditing={() => handleNextInput(antalM2Ref, wattYdelseRef)}
          />
          <TextInput
            style={styles.input}
            placeholder="Watt ydelse"
            onChangeText={setWatt}
            value={watt}
            keyboardType="numeric"
            returnKeyType="done"
            ref={wattYdelseRef}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputGroupTitle}>SEL Værdi</Text>
          <Text style={{ fontSize: 16 }}>{SEL_Value}</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputGroupTitle}>Kontrol</Text>
          <View style={styles.checkboxContainer}>
            {checkboxes.map((checkbox, index) => (
              <View style={styles.checkbox} key={index}>
                <BouncyCheckbox
                  isChecked={checkbox.isChecked}
                  text={checkbox.displayText}
                  onPress={(isChecked) => handleCheckboxPress(index, isChecked)}
                  disableTextDecoration={true}
                  textStyle={{ textDecorationLine: "none" }}
                />
              </View>
            ))}
          </View>
        </View>

        {/*<View style={styles.titleContainer}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 30,
              fontWeight: "bold",
              marginTop: 30,
            }}
          >
            Udsugning
          </Text>
        </View> */}

        <View style={styles.inputContainer}>
          <Text style={[styles.inputGroupTitle, { paddingBottom: 10 }]}>
            Udsugning
          </Text>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.inputGridTitle}>1. måling</Text>
              <TextInput
                style={styles.inputInGrid}
                placeholder="bad 1"
                onChangeText={set1st_1}
                value={_1st_1}
                keyboardType="numeric"
                returnKeyType={_1st_1 && !isNaN(_1st_1) ? "done" : "next"}
                onSubmitEditing={() => handleNextInput(_1st_1Ref, _2nd_1Ref)}
                ref={_1st_1Ref}
              />
              <TextInput
                style={styles.inputInGrid}
                placeholder="bad 2"
                onChangeText={set2nd_1}
                value={_2nd_1}
                keyboardType="numeric"
                returnKeyType={_2nd_1 && !isNaN(_2nd_1) ? "done" : "next"}
                onSubmitEditing={() => handleNextInput(_2nd_1Ref, _3rd_1Ref)}
                ref={_2nd_1Ref}
              />
              <TextInput
                style={styles.inputInGrid}
                placeholder="køkken"
                onChangeText={set3rd_1}
                value={_3rd_1}
                keyboardType="numeric"
                returnKeyType={_3rd_1 && !isNaN(_3rd_1) ? "done" : "next"}
                onSubmitEditing={() => handleNextInput(_3rd_1Ref, _4th_1Ref)}
                ref={_3rd_1Ref}
              />
              <TextInput
                style={styles.inputInGrid}
                placeholder="bryggers"
                onChangeText={set4th_1}
                value={_4th_1}
                keyboardType="numeric"
                returnKeyType={_4th_1 && !isNaN(_4th_1) ? "done" : "next"}
                onSubmitEditing={() => handleNextInput(_4th_1Ref, _5th_1Ref)}
                ref={_4th_1Ref}
              />
              <TextInput
                style={styles.inputInGrid}
                placeholder="toilet"
                onChangeText={set5th_1}
                value={_5th_1}
                keyboardType="numeric"
                returnKeyType={_5th_1 && !isNaN(_5th_1) ? "done" : "next"}
                onSubmitEditing={() => handleNextInput(_5th_1Ref, _1st_2Ref)}
                ref={_5th_1Ref}
              />
              <TextInput
                style={styles.inputInGrid}
                placeholder="andet..."
                onChangeText={set6th_1}
                value={_6th_1}
                keyboardType="numeric"
                returnKeyType="done"
                ref={_6th_1Ref}
              />
            </View>

            <View style={styles.column}>
              <Text style={styles.inputGridTitle}>2. måling</Text>
              <TextInput
                style={styles.inputInGrid}
                placeholder="bad 1"
                onChangeText={set1st_2}
                value={_1st_2}
                keyboardType="numeric"
                returnKeyType={_1st_2 && !isNaN(_1st_2) ? "done" : "next"}
                onSubmitEditing={() => handleNextInput(_1st_2Ref, _2nd_2Ref)}
                ref={_1st_2Ref}
              />
              <TextInput
                style={styles.inputInGrid}
                placeholder="bad 2"
                onChangeText={set2nd_2}
                value={_2nd_2}
                keyboardType="numeric"
                returnKeyType={_2nd_2 && !isNaN(_2nd_2) ? "done" : "next"}
                onSubmitEditing={() => handleNextInput(_2nd_2Ref, _3rd_2Ref)}
                ref={_2nd_2Ref}
              />
              <TextInput
                style={styles.inputInGrid}
                placeholder="køkken"
                onChangeText={set3rd_2}
                value={_3rd_2}
                keyboardType="numeric"
                returnKeyType={_3rd_2 && !isNaN(_3rd_2) ? "done" : "next"}
                onSubmitEditing={() => handleNextInput(_3rd_2Ref, _4th_2Ref)}
                ref={_3rd_2Ref}
              />
              <TextInput
                style={styles.inputInGrid}
                placeholder="bryggers"
                onChangeText={set4th_2}
                value={_4th_2}
                keyboardType="numeric"
                returnKeyType={_4th_2 && !isNaN(_4th_2) ? "done" : "next"}
                onSubmitEditing={() => handleNextInput(_4th_2Ref, _5th_2Ref)}
                ref={_4th_2Ref}
              />
              <TextInput
                style={styles.inputInGrid}
                placeholder="toilet"
                onChangeText={set5th_2}
                value={_5th_2}
                keyboardType="numeric"
                returnKeyType={_5th_2 && !isNaN(_5th_2) ? "done" : "next"}
                onSubmitEditing={() => handleNextInput(_5th_2Ref, _1st_3Ref)}
                ref={_5th_2Ref}
              />
              <TextInput
                style={styles.inputInGrid}
                placeholder="andet..."
                onChangeText={set6th_2}
                value={_6th_2}
                keyboardType="numeric"
                returnKeyType="done"
                ref={_6th_2Ref}
              />
            </View>

            <View style={styles.column}>
              <Text style={styles.inputGridTitle}>3. måling</Text>
              <TextInput
                style={styles.inputInGrid}
                placeholder="bad 1"
                onChangeText={set1st_3}
                value={_1st_3}
                keyboardType="numeric"
                returnKeyType={_1st_3 && !isNaN(_1st_3) ? "done" : "next"}
                onSubmitEditing={() => handleNextInput(_1st_3Ref, _2nd_3Ref)}
                ref={_1st_3Ref}
              />
              <TextInput
                style={styles.inputInGrid}
                placeholder="bad 2"
                onChangeText={set2nd_3}
                value={_2nd_3}
                keyboardType="numeric"
                returnKeyType={_2nd_3 && !isNaN(_2nd_3) ? "done" : "next"}
                onSubmitEditing={() => handleNextInput(_2nd_3Ref, _3rd_3Ref)}
                ref={_2nd_3Ref}
              />
              <TextInput
                style={styles.inputInGrid}
                placeholder="køkken"
                onChangeText={set3rd_3}
                value={_3rd_3}
                keyboardType="numeric"
                returnKeyType={_3rd_3 && !isNaN(_3rd_3) ? "done" : "next"}
                onSubmitEditing={() => handleNextInput(_3rd_3Ref, _4th_3Ref)}
                ref={_3rd_3Ref}
              />
              <TextInput
                style={styles.inputInGrid}
                placeholder="bryggers"
                onChangeText={set4th_3}
                value={_4th_3}
                keyboardType="numeric"
                returnKeyType={_4th_3 && !isNaN(_4th_3) ? "done" : "next"}
                onSubmitEditing={() => handleNextInput(_4th_3Ref, _5th_3Ref)}
                ref={_4th_3Ref}
              />
              <TextInput
                style={styles.inputInGrid}
                placeholder="toilet"
                onChangeText={set5th_3}
                value={_5th_3}
                keyboardType="numeric"
                returnKeyType={_5th_3 && !isNaN(_5th_3) ? "done" : "next"}
                onSubmitEditing={() => handleNextInput(_5th_3Ref, _6th_3Ref)}
                ref={_5th_3Ref}
              />
              <TextInput
                style={styles.inputInGrid}
                placeholder="andet..."
                onChangeText={set6th_3}
                value={_6th_3}
                keyboardType="numeric"
                returnKeyType="done"
                ref={_6th_3Ref}
              />
            </View>
          </View>
          <Text style={[styles.inputGroupTitle, { paddingTop: 30 }]}>
            Total mængde luft
          </Text>
          <Text style={{ fontSize: 16 }}>{totalAirOut}</Text>
        </View>

        {/*<View style={styles.inputContainer}>
          <Text style={styles.inputGroupTitle}>Bad 1</Text>
          <TextInput
            style={styles.input}
            placeholder="Indtast måling 1"
            onChangeText={set1st_1}
            value={_1st_1}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Indtast måling 2"
            onChangeText={set1st_2}
            value={_1st_2}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Indtast måling 3"
            onChangeText={set1st_3}
            value={_1st_3}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputGroupTitle}>Bad 2</Text>
          <TextInput
            style={styles.input}
            placeholder="Indtast måling 1"
            onChangeText={set2nd_1}
            value={_2nd_1}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Indtast måling 2"
            onChangeText={set2nd_2}
            value={_2nd_2}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Indtast måling 3"
            onChangeText={set2nd_3}
            value={_2nd_3}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputGroupTitle}>Køkken</Text>
          <TextInput
            style={styles.input}
            placeholder="Indtast måling 1"
            onChangeText={set3rd_1}
            value={_3rd_1}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Indtast måling 2"
            onChangeText={set3rd_2}
            value={_3rd_2}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Indtast måling 3"
            onChangeText={set3rd_3}
            value={_3rd_3}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputGroupTitle}>Bryggers</Text>
          <TextInput
            style={styles.input}
            placeholder="Indtast måling 1"
            onChangeText={set4th_1}
            value={_4th_1}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Indtast måling 2"
            onChangeText={set4th_2}
            value={_4th_2}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Indtast måling 3"
            onChangeText={set4th_3}
            value={_4th_3}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputGroupTitle}>Toilet</Text>
          <TextInput
            style={styles.input}
            placeholder="Indtast måling 1"
            onChangeText={set5th_1}
            value={_5th_1}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Indtast måling 2"
            onChangeText={set5th_2}
            value={_5th_2}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Indtast måling 3"
            onChangeText={set5th_3}
            value={_5th_3}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputGroupTitle}>Andet rum</Text>
          <TextInput
            style={styles.input}
            placeholder="Indtast måling 1"
            onChangeText={set6th_1}
            value={_6th_1}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Indtast måling 2"
            onChangeText={set6th_2}
            value={_6th_2}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Indtast måling 3"
            onChangeText={set6th_3}
            value={_6th_3}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputGroupTitle}>Total mængde luft</Text>
          <Text style={{ fontSize: 16 }}>{totalAirOut}</Text>
        </View>*/}

        {/*<View style={styles.titleContainer}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 30,
              fontWeight: "bold",
              marginTop: 30,
            }}
          >
            Indblæsning
          </Text>
        </View>*/}

        <View style={styles.inputContainer}>
          <Text style={[styles.inputGroupTitle, { paddingBottom: 10 }]}>
            Indblæsning
          </Text>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.inputGridTitle}>1. måling</Text>
              <TextInput
                style={styles.inputInGrid}
                placeholder="Stue"
                onChangeText={setStue_1}
                value={stue_1}
                keyboardType="numeric"
                returnKeyType={stue_1 && !isNaN(stue_1) ? "done" : "next"}
                onSubmitEditing={() => handleNextInput(stue_1Ref, køkken_1Ref)}
                ref={stue_1Ref}
              />
              <TextInput
                style={styles.inputInGrid}
                placeholder="Køkken/Alrum"
                onChangeText={setKøkken_1}
                value={køkken_1}
                keyboardType="numeric"
                returnKeyType={køkken_1 && !isNaN(køkken_1) ? "done" : "next"}
                onSubmitEditing={() =>
                  handleNextInput(køkken_1Ref, room_1_1Ref)
                }
                ref={køkken_1Ref}
              />
              <TextInput
                style={styles.inputInGrid}
                placeholder="Værelse 1"
                onChangeText={setRoom_1_1}
                value={room_1_1}
                keyboardType="numeric"
                returnKeyType={room_1_1 && !isNaN(room_1_1) ? "done" : "next"}
                onSubmitEditing={() =>
                  handleNextInput(room_1_1Ref, room_2_1Ref)
                }
                ref={room_1_1Ref}
              />
              <TextInput
                style={styles.inputInGrid}
                placeholder="Værelse 2"
                onChangeText={setRoom_2_1}
                value={room_2_1}
                keyboardType="numeric"
                returnKeyType={room_2_1 && !isNaN(room_2_1) ? "done" : "next"}
                onSubmitEditing={() =>
                  handleNextInput(room_2_1Ref, room_3_1Ref)
                }
                ref={room_2_1Ref}
              />
              <TextInput
                style={styles.inputInGrid}
                placeholder="Værelse 3"
                onChangeText={setRoom_3_1}
                value={room_3_1}
                keyboardType="numeric"
                returnKeyType={room_3_1 && !isNaN(room_3_1) ? "done" : "next"}
                onSubmitEditing={() =>
                  handleNextInput(room_3_1Ref, room_4_1Ref)
                }
                ref={room_3_1Ref}
              />
              <TextInput
                style={styles.inputInGrid}
                placeholder="Værelse 4"
                onChangeText={setRoom_4_1}
                value={room_4_1}
                keyboardType="numeric"
                returnKeyType={room_4_1 && !isNaN(room_4_1) ? "done" : "next"}
                onSubmitEditing={() =>
                  handleNextInput(room_4_1Ref, room_5_1Ref)
                }
                ref={room_4_1Ref}
              />
              <TextInput
                style={styles.inputInGrid}
                placeholder="Værelse 5"
                onChangeText={setRoom_5_1}
                value={room_5_1}
                keyboardType="numeric"
                returnKeyType={room_5_1 && !isNaN(room_5_1) ? "done" : "next"}
                onSubmitEditing={() =>
                  handleNextInput(room_5_1Ref, køkken_ekstra_1Ref)
                }
                ref={room_5_1Ref}
              />
              <TextInput
                style={styles.inputInGrid}
                placeholder="Evt køkken"
                onChangeText={setKøkken_ekstra_1}
                value={køkken_ekstra_1}
                keyboardType="numeric"
                returnKeyType={
                  køkken_ekstra_1 && !isNaN(køkken_ekstra_1) ? "done" : "next"
                }
                onSubmitEditing={() =>
                  handleNextInput(køkken_ekstra_1Ref, gang_1Ref)
                }
                ref={køkken_ekstra_1Ref}
              />
              <TextInput
                style={styles.inputInGrid}
                placeholder="Gang"
                onChangeText={setGang_1}
                value={gang_1}
                keyboardType="numeric"
                returnKeyType={gang_1 && !isNaN(gang_1) ? "done" : "next"}
                onSubmitEditing={() => handleNextInput(gang_1Ref, kontor_1Ref)}
                ref={gang_1Ref}
              />
              <TextInput
                style={styles.inputInGrid}
                placeholder="kontor"
                onChangeText={setKontor_1}
                value={kontor_1}
                keyboardType="numeric"
                returnKeyType={kontor_1 && !isNaN(kontor_1) ? "done" : "next"}
                ref={kontor_1Ref}
                onSubmitEditing={() => handleNextInput(kontor_1Ref, stue_2Ref)}
              />
            </View>
            <View style={styles.column}>
              <Text style={styles.inputGridTitle}>2. måling</Text>
              <TextInput
                style={styles.inputInGrid}
                placeholder="Stue"
                onChangeText={setStue_2}
                value={stue_2}
                keyboardType="numeric"
                returnKeyType={stue_2 && !isNaN(stue_2) ? "done" : "next"}
                onSubmitEditing={() => handleNextInput(stue_2Ref, køkken_2Ref)}
                ref={stue_2Ref}
              />
              <TextInput
                style={styles.inputInGrid}
                placeholder="Køkken/Alrum"
                onChangeText={setKøkken_2}
                value={køkken_2}
                keyboardType="numeric"
                returnKeyType={køkken_2 && !isNaN(køkken_2) ? "done" : "next"}
                onSubmitEditing={() =>
                  handleNextInput(køkken_2Ref, room_1_2Ref)
                }
                ref={køkken_2Ref}
              />
              <TextInput
                style={styles.inputInGrid}
                placeholder="Værelse 1"
                onChangeText={setRoom_1_2}
                value={room_1_2}
                keyboardType="numeric"
                returnKeyType={room_1_2 && !isNaN(room_1_2) ? "done" : "next"}
                onSubmitEditing={() =>
                  handleNextInput(room_1_2Ref, room_2_2Ref)
                }
                ref={room_1_2Ref}
              />
              <TextInput
                style={styles.inputInGrid}
                placeholder="Værelse 2"
                onChangeText={setRoom_2_2}
                value={room_2_2}
                keyboardType="numeric"
                returnKeyType={room_2_2 && !isNaN(room_2_2) ? "done" : "next"}
                onSubmitEditing={() =>
                  handleNextInput(room_2_2Ref, room_3_2Ref)
                }
                ref={room_2_2Ref}
              />
              <TextInput
                style={styles.inputInGrid}
                placeholder="Værelse 3"
                onChangeText={setRoom_3_2}
                value={room_3_2}
                keyboardType="numeric"
                returnKeyType={room_3_2 && !isNaN(room_3_2) ? "done" : "next"}
                onSubmitEditing={() =>
                  handleNextInput(room_3_2Ref, room_4_2Ref)
                }
                ref={room_3_2Ref}
              />
              <TextInput
                style={styles.inputInGrid}
                placeholder="Værelse 4"
                onChangeText={setRoom_4_2}
                value={room_4_2}
                keyboardType="numeric"
                returnKeyType={room_4_2 && !isNaN(room_4_2) ? "done" : "next"}
                onSubmitEditing={() =>
                  handleNextInput(room_4_2Ref, room_5_2Ref)
                }
                ref={room_4_2Ref}
              />
              <TextInput
                style={styles.inputInGrid}
                placeholder="Værelse 5"
                onChangeText={setRoom_5_2}
                value={room_5_2}
                keyboardType="numeric"
                returnKeyType={room_5_2 && !isNaN(room_5_2) ? "done" : "next"}
                onSubmitEditing={() =>
                  handleNextInput(room_5_2Ref, køkken_ekstra_2Ref)
                }
                ref={room_5_2Ref}
              />
              <TextInput
                style={styles.inputInGrid}
                placeholder="Evt køkken"
                onChangeText={setKøkken_ekstra_2}
                value={køkken_ekstra_2}
                keyboardType="numeric"
                returnKeyType={
                  køkken_ekstra_2 && !isNaN(køkken_ekstra_2) ? "done" : "next"
                }
                onSubmitEditing={() =>
                  handleNextInput(køkken_ekstra_2Ref, gang_2Ref)
                }
                ref={køkken_ekstra_2Ref}
              />
              <TextInput
                style={styles.inputInGrid}
                placeholder="Gang"
                onChangeText={setGang_2}
                value={gang_2}
                keyboardType="numeric"
                returnKeyType={gang_2 && !isNaN(gang_2) ? "done" : "next"}
                onSubmitEditing={() => handleNextInput(gang_2Ref, kontor_2Ref)}
                ref={gang_2Ref}
              />
              <TextInput
                style={styles.inputInGrid}
                placeholder="kontor"
                onChangeText={setKontor_2}
                value={kontor_2}
                keyboardType="numeric"
                returnKeyType={kontor_2 && !isNaN(kontor_2) ? "done" : "next"}
                onSubmitEditing={() => handleNextInput(kontor_2Ref, stue_3Ref)}
                ref={kontor_2Ref}
              />
            </View>
            <View style={styles.column}>
              <Text style={styles.inputGridTitle}>3. måling</Text>
              <TextInput
                style={styles.inputInGrid}
                placeholder="Stue"
                onChangeText={setStue_3}
                value={stue_3}
                keyboardType="numeric"
                returnKeyType={stue_3 && !isNaN(stue_3) ? "done" : "next"}
                onSubmitEditing={() => handleNextInput(stue_3Ref, køkken_3Ref)}
                ref={stue_3Ref}
              />
              <TextInput
                style={styles.inputInGrid}
                placeholder="Køkken/Alrum"
                onChangeText={setKøkken_3}
                value={køkken_3}
                keyboardType="numeric"
                returnKeyType={køkken_3 && !isNaN(køkken_3) ? "done" : "next"}
                onSubmitEditing={() =>
                  handleNextInput(køkken_3Ref, room_1_3Ref)
                }
                ref={køkken_3Ref}
              />
              <TextInput
                style={styles.inputInGrid}
                placeholder="Værelse 1"
                onChangeText={setRoom_1_3}
                value={room_1_3}
                keyboardType="numeric"
                returnKeyType={room_1_3 && !isNaN(room_1_3) ? "done" : "next"}
                onSubmitEditing={() =>
                  handleNextInput(room_1_3Ref, room_2_3Ref)
                }
                ref={room_1_3Ref}
              />
              <TextInput
                style={styles.inputInGrid}
                placeholder="Værelse 2"
                onChangeText={setRoom_2_3}
                value={room_2_3}
                keyboardType="numeric"
                returnKeyType={room_2_3 && !isNaN(room_2_3) ? "done" : "next"}
                onSubmitEditing={() =>
                  handleNextInput(room_2_3Ref, room_3_3Ref)
                }
                ref={room_2_3Ref}
              />
              <TextInput
                style={styles.inputInGrid}
                placeholder="Værelse 3"
                onChangeText={setRoom_3_3}
                value={room_3_3}
                keyboardType="numeric"
                returnKeyType={room_3_3 && !isNaN(room_3_3) ? "done" : "next"}
                onSubmitEditing={() =>
                  handleNextInput(room_3_3Ref, room_4_3Ref)
                }
                ref={room_3_3Ref}
              />
              <TextInput
                style={styles.inputInGrid}
                placeholder="Værelse 4"
                onChangeText={setRoom_4_3}
                value={room_4_3}
                keyboardType="numeric"
                returnKeyType={room_4_3 && !isNaN(room_4_3) ? "done" : "next"}
                onSubmitEditing={() =>
                  handleNextInput(room_4_3Ref, room_5_3Ref)
                }
                ref={room_4_3Ref}
              />
              <TextInput
                style={styles.inputInGrid}
                placeholder="Værelse 5"
                onChangeText={setRoom_5_3}
                value={room_5_3}
                keyboardType="numeric"
                returnKeyType={room_5_3 && !isNaN(room_5_3) ? "done" : "next"}
                onSubmitEditing={() =>
                  handleNextInput(room_5_3Ref, køkken_ekstra_3Ref)
                }
                ref={room_5_3Ref}
              />
              <TextInput
                style={styles.inputInGrid}
                placeholder="Evt køkken"
                onChangeText={setKøkken_ekstra_3}
                value={køkken_ekstra_3}
                keyboardType="numeric"
                returnKeyType={
                  køkken_ekstra_3 && !isNaN(køkken_ekstra_3) ? "done" : "next"
                }
                onSubmitEditing={() =>
                  handleNextInput(køkken_ekstra_3Ref, gang_3Ref)
                }
                ref={køkken_ekstra_3Ref}
              />
              <TextInput
                style={styles.inputInGrid}
                placeholder="Gang"
                onChangeText={setGang_3}
                value={gang_3}
                keyboardType="numeric"
                returnKeyType={gang_3 && !isNaN(gang_3) ? "done" : "next"}
                onSubmitEditing={() => handleNextInput(gang_3Ref, kontor_3Ref)}
                ref={gang_3Ref}
              />
              <TextInput
                style={styles.inputInGrid}
                placeholder="kontor"
                onChangeText={setKontor_3}
                value={kontor_3}
                keyboardType="numeric"
                returnKeyType="done"
                ref={kontor_3Ref}
              />
            </View>
          </View>
          <Text style={[styles.inputGroupTitle, { paddingTop: 30 }]}>
            Total mængde luft
          </Text>
          <Text style={{ fontSize: 16 }}>{totalAirIn}</Text>

          <Text style={[styles.inputGroupTitle, { paddingTop: 30 }]}>
            Minimum m3/h
          </Text>
          <Text style={{ fontSize: 16 }}>{minimumAir}</Text>

          <Text style={[styles.inputGroupTitle, { paddingTop: 30 }]}>
            Undertryk i %
          </Text>
          <Text style={{ fontSize: 16 }}>{undertryk} %</Text>
        </View>

        {/*<View style={styles.inputContainer}>
          <Text style={styles.inputGroupTitle}>Bad 1</Text>
          <TextInput
            style={styles.input}
            placeholder="Indtast måling 1"
            onChangeText={set1st_1}
            value={_1st_1}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Indtast måling 2"
            onChangeText={set1st_2}
            value={_1st_2}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Indtast måling 3"
            onChangeText={set1st_3}
            value={_1st_3}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputGroupTitle}>Bad 2</Text>
          <TextInput
            style={styles.input}
            placeholder="Indtast måling 1"
            onChangeText={set2nd_1}
            value={_2nd_1}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Indtast måling 2"
            onChangeText={set2nd_2}
            value={_2nd_2}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Indtast måling 3"
            onChangeText={set2nd_3}
            value={_2nd_3}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputGroupTitle}>Køkken</Text>
          <TextInput
            style={styles.input}
            placeholder="Indtast måling 1"
            onChangeText={set3rd_1}
            value={_3rd_1}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Indtast måling 2"
            onChangeText={set3rd_2}
            value={_3rd_2}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Indtast måling 3"
            onChangeText={set3rd_3}
            value={_3rd_3}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputGroupTitle}>Bryggers</Text>
          <TextInput
            style={styles.input}
            placeholder="Indtast måling 1"
            onChangeText={set4th_1}
            value={_4th_1}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Indtast måling 2"
            onChangeText={set4th_2}
            value={_4th_2}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Indtast måling 3"
            onChangeText={set4th_3}
            value={_4th_3}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputGroupTitle}>Toilet</Text>
          <TextInput
            style={styles.input}
            placeholder="Indtast måling 1"
            onChangeText={set5th_1}
            value={_5th_1}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Indtast måling 2"
            onChangeText={set5th_2}
            value={_5th_2}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Indtast måling 3"
            onChangeText={set5th_3}
            value={_5th_3}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputGroupTitle}>Andet rum</Text>
          <TextInput
            style={styles.input}
            placeholder="Indtast måling 1"
            onChangeText={set6th_1}
            value={_6th_1}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Indtast måling 2"
            onChangeText={set6th_2}
            value={_6th_2}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Indtast måling 3"
            onChangeText={set6th_3}
            value={_6th_3}
            keyboardType="numeric"
          />
        </View>*/}

        {/*<View style={styles.inputContainer}>
          <Text style={styles.inputGroupTitle}>Total mængde luft</Text>
          <Text style={{ fontSize: 16 }}>{totalAirOut}</Text>
        </View>*/}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (checkErrors()) {
              mailBodyName = name;
              mailBodyCustomer = customerName;
              mail();
            }
          }}
        >
          <Text style={styles.buttonText}>Send rapport</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flex: 1,
    marginBottom: 50,
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 100,
  },
  inputContainer: {
    width: "90%",
    marginBottom: 50,
    paddingVertical: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  inputInGrid: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    padding: 8,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  column: {
    flex: 1,
    marginHorizontal: 8,
    alignItems: "center",
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 50,
  },
  button: {
    borderRadius: 40,
    height: 60,
    width: "75%",
    backgroundColor: "orange",
    justifyContent: "center",
    margin: 20,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: "20",
    textTransform: "uppercase",
    fontWeight: "400",
  },
  inputGroupTitle: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputGridTitle: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "300",
    marginBottom: 20,
  },
  collapseContainer: {
    width: "100%",
    marginBottom: 50,
    paddingVertical: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  checkboxContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  checkbox: {
    width: "45%",
    paddingHorizontal: 10,
    margin: "2.5%",
    alignSelf: "flex-start",
  },
  img: {
    width: 25,
    height: 25,
  },
  settingsBnt: {},
  settingsContainer: {
    flex: 1,
    position: "absolute",
    top: 60,
    right: 20,
    zIndex: 1,
  },
});

export default InputScreen;

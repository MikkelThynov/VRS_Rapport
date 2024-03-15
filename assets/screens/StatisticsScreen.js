import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { MailContext } from "./ManualsScreen";

function StatisticsScreen(props) {
  const { mailCount } = useContext(MailContext);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Statistics</Text>
      <Text style={styles.mailCount}>Antal sendte rapporter: {mailCount}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  mailCount: {
    fontSize: 18,
  },
});

export default StatisticsScreen;

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  FlatList,
  Image,
  TextInput,
} from "react-native";
import { getStorage, ref, getDownloadURL, listAll } from "firebase/storage";
//import { DocumentPicker } from "react-native-document-picker";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

export const MailContext = React.createContext();

function ManualsScreen(props) {
  const [files, setFiles] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFiles = files.filter((file) => {
    const fileName = decodeURIComponent(file).split("/").pop();
    return fileName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  useEffect(() => {
    const fetchFiles = async () => {
      const storage = getStorage();
      const pdfRef = ref(storage, "Manuals");

      const res = await listAll(pdfRef);
      const fileURLs = await Promise.all(
        res.items.map((item) => getDownloadURL(item))
      );

      setFiles(fileURLs);
    };

    fetchFiles();
  }, []);

  const renderItem = ({ item }) => {
    const decodedUrl = decodeURIComponent(item);
    const title = decodedUrl.split("/").pop().split(".pdf")[0] + ".pdf";
    console.log(title);
    return (
      <TouchableOpacity onPress={() => handleDownload(item)}>
        <View style={styles.item}>
          <Image source={require("../pdf_icon.png")} style={styles.image} />
          <Text style={styles.itemTitle}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const handleUpload = async () => {
    try {
      // Pick multiple files
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.pdf],
      });

      const storage = getStorage();

      // Upload each file
      for (const res of results) {
        const pdfRef = ref(storage, `pdfs/${res.name}`);
        const pdfBlob = await fetch(res.uri).then((res) => res.blob());

        await uploadBytes(pdfRef, pdfBlob);
      }

      Alert.alert("Upload successful!");
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        // User cancelled the picker
        Alert.alert("Upload cancelled.");
      } else {
        console.error("Error uploading file:", error);
        Alert.alert("Upload failed. Please try again.");
      }
    }
  };

  const handleDownload = async (url) => {
    try {
      const localFile = FileSystem.documentDirectory + url.split("/").pop();

      const downloadResumable = FileSystem.createDownloadResumable(
        url,
        localFile,
        {},
        (progress) => {
          console.log(
            progress.totalBytesWritten / progress.totalBytesExpectedToWrite
          );
        }
      );

      const { uri } = await downloadResumable.downloadAsync();
      console.log("Finished downloading to ", uri);

      // Check if sharing is available, then share the downloaded file
      if (!(await Sharing.isAvailableAsync())) {
        alert("Sharing is not available on your platform");
        return;
      }
      await Sharing.shareAsync(uri);

      console.log("Download successful!");
    } catch (error) {
      console.error("Error downloading file:", error);
      console.log("Download failed. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Find manual</Text>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={filteredFiles}
          renderItem={renderItem}
          keyExtractor={(item) => item}
          numColumns={2}
          contentContainerStyle={{
            alignItems: "center",
            padding: 15,
            paddingBottom: 25,
          }}
        />
        <TextInput
          style={styles.input}
          value={searchTerm}
          onChangeText={setSearchTerm}
          placeholder="Søg efter manual"
        />
      </View>
      {/*<View style={styles.inputContainer}></View>*/}
      {/*<View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleUpload}>
          <Text style={styles.buttonText}>Upload manual</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleDownload}>
          <Text style={styles.buttonText}>Download manual</Text>
        </TouchableOpacity>
      </View>*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  titleContainer: {
    flex: 0.5,
    marginTop: 70,
  },
  title: {
    textAlign: "center",
    fontSize: 36,
    fontWeight: "bold",
    marginTop: 0,
  },
  inputContainer: {
    flex: 0.5,
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  listContainer: {
    flex: 3,
    paddingBottom: 10,
    marginVertical: 5,
    paddingHorizontal: 10,
    width: "100%",
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
  item: {
    flex: 1,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "70%",
    aspectRatio: 1 / 1.4142,
  },
  itemTitle: {
    fontSize: 14,
    marginTop: 15,
    fontWeight: "400",
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: "80%",
    resizeMode: "contain",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    borderRadius: 40,
    height: 60,
    width: "75%",
    backgroundColor: "orange",
    justifyContent: "center",
    margin: 5,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
    textTransform: "uppercase",
    fontWeight: "400",
  },
});

export default ManualsScreen;

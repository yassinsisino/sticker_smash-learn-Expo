import { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { type ImageSource } from "expo-image";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as MediaLibrary from "expo-media-library"
import { captureRef } from "react-native-view-shot";
import domtoimage from 'dom-to-image';

import ImageViewer from "@/components/ImageViewer";
import Button from "@/components/Button";
import CirculeButton from "@/components/CircleButton";
import IconButton from "@/components/IconButton";
import EmojiPicker from "@/components/EmojiPicker";
import EmojiList from "@/components/EmojiList";
import EmojiSticker from "@/components/EmojiSticker";


const Placeholder_Image = require("@/assets/images/background-image.png");


export default function Index() {

  const [selectedImage, setSelectedImage] = useState<string | undefined>()
  const [showAppOptions, setShowAppOptions] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [pickedEmoji, setPickedEmoji] = useState<ImageSource | undefined>(undefined)
  const [permission, requestPermission] = MediaLibrary.usePermissions()
  const imageRef = useRef<View>(null)

  useEffect(() => {
    if (!permission?.granted)
      requestPermission()
  }, [])

  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true)
    } else (
      alert('You did not select any image.')
    )
  }

  const onReset = () => {
    setShowAppOptions(false)
  }
  const onAddSticker = () => {
    setIsModalVisible(true)

  }
  const onSaveImageAsync = async () => {
    if (Platform.OS === 'web') {
      try {
        const dataUrl = await domtoimage.toJpeg(imageRef.current, {
          quality: 0.95,
          width: 320,
          height: 440
        })
        const link = document.createElement('a')
        link.download = 'sticker-smash.jpeg'
        link.href = dataUrl
        link.click()
      } catch (error) {
        console.log(error)
      }
    }
    else {
      try {
        const localUri = await captureRef(imageRef, {
          format: 'png',
          quality: 1,
          // height:
        })
        await MediaLibrary.saveToLibraryAsync(localUri)
        if (localUri)
          alert('Image saved to gallery')
      } catch (error) {
        console.log(error)
      }
    }
  }

  const onModalClose = () => {
    setIsModalVisible(false)
  }



  return (
    <GestureHandlerRootView
      style={styles.container}
    >
      <View ref={imageRef} style={{}} collapsable={false}>
        <ImageViewer imgSource={Placeholder_Image} selectedImage={selectedImage} />
        {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton label="Reset" onPress={onReset} icon="refresh" />
            <CirculeButton onPress={onAddSticker} />
            <IconButton label="Save" onPress={onSaveImageAsync} icon="save-alt" />
          </View>
        </View>
      ) : (
        <>
          <Button label="Choose a photo" theme="primary" onPress={pickImageAsync} />
          <Button label="Use this photo" onPress={() => setShowAppOptions(true)} />
        </>
      )
      }
      <EmojiPicker onClose={onModalClose} isVisible={isModalVisible}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#25292e',
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: '#fff'
  },
  button: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: "#fff",
  },
  imageContainer: {
    flex: 1
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },

})
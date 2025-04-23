import { Image, type ImageSource } from 'expo-image'
import { StyleSheet } from 'react-native'

type props = {
  imgSource: ImageSource
  selectedImage: string | undefined
}


const ImageViewer = ({ imgSource, selectedImage }: props) => {

  const imageSource = selectedImage ? { uri: selectedImage } : imgSource
  return (
    <Image source={imageSource} style={styles.image} />
  )

}
export default ImageViewer
const styles = StyleSheet.create({

  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  }
})
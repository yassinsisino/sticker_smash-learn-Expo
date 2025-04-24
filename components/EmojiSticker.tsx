import { View } from 'react-native';
import { Image, type ImageSource } from 'expo-image';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';


type TEmojiStickerProps = {
  imageSize: number;
  stickerSource: ImageSource;
};

export default function EmojiSticker({ imageSize, stickerSource }: TEmojiStickerProps) {

  const scaleImage = useSharedValue(imageSize)
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)
  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
    }
  })

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value
        },
      ]
    }
  })

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      if (scaleImage.value === imageSize) {
        scaleImage.value = imageSize * 2
      } else {
        scaleImage.value = Math.round(scaleImage.value / 2)
      }
    })

  const onDrag = Gesture.Pan().onChange((event) => {
    translateX.value += event.changeX
    translateY.value += event.changeY
  })

  return (
    <GestureDetector gesture={onDrag}>
      <Animated.View style={[containerStyle, { top: -350 }]}>
        <GestureDetector gesture={doubleTap}>
          <Animated.Image
            source={stickerSource}
            resizeMode='contain'
            style={[{ width: imageSize, height: imageSize }, imageStyle]}
          />
        </GestureDetector>
      </Animated.View>
    </GestureDetector>
  );
}

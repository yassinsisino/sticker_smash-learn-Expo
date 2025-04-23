import { View } from 'react-native';
import { Image, type ImageSource } from 'expo-image';

type TEmojiStickerProps = {
  imageSize: number;
  stickerSource: ImageSource;
};

export default function EmojiSticker({ imageSize, stickerSource }: TEmojiStickerProps) {
  return (
    <View style={{ top: -350 }}>
      <Image source={stickerSource} style={{ width: imageSize, height: imageSize }} />
    </View>
  );
}

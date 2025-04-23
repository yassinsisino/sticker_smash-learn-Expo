import { Pressable, Text, View, StyleSheet } from "react-native"
import MaterialIcons from "@expo/vector-icons/MaterialIcons"


type TIconButtonProps = {
  label: string
  onPress: () => void
  icon: keyof typeof MaterialIcons.glyphMap
}

export default function IconButton({ label, onPress, icon }: TIconButtonProps) {
  return (
    <View>
      <Pressable onPress={onPress} style={styles.iconButton}>
        <MaterialIcons name={icon} size={24} color={'#fff'} />
        <Text style={styles.iconButtonLabel}>{label}</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButtonLabel: {
    color: '#fff',
    marginTop: 12,
  },
});


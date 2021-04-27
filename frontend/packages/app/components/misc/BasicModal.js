import React from "react";
import { StyleSheet, Pressable, View, Modal } from "react-native";

import { centeredFull } from "../style-snipets";
const BasicModal = ({
  isOpen = false,
  animationType = undefined,
  onRequestClose,
  children,
  containerStyle = {},
  backgroundColor = "#ffffff00",
}) => {
  return (
    <Modal
      animationType={animationType}
      transparent={true}
      visible={isOpen}
      onRequestClose={onRequestClose}
    >
      <View style={[centeredFull, { backgroundColor: backgroundColor }]}>
        {/* Full screen overlay to catch a press outside the "modal" to close the modal */}
        <Pressable
          style={styles.modalOverlay}
          onPress={onRequestClose}
          android_disableSound
        />
        <View style={containerStyle}>{children}</View>
      </View>
    </Modal>
  );
};

export default BasicModal;

const styles = StyleSheet.create({
  modalOverlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
});

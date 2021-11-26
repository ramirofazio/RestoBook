//todos los inputs apuntaban a la misma key del state

import React, { useState } from "react";
import {
  View,
  Button,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";

const AddUserScreen = ({ navigation }) => {
  return (
    <View>
      <ScrollView>
        <View>
          <Button
            title="Login Empresa"
            onPress={() => navigation.navigate("LoginResto")}
          />
        </View>

        <View>
          <Button
            title="Login Usuario"
            onPress={() => navigation.navigate("LoginUser")}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default AddUserScreen;

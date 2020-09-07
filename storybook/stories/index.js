import React from "react";
import { View, Text } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Icon } from "react-native-elements";

import { storiesOf } from "@storybook/react-native";

import Picker from "./picker";

storiesOf("Picker", module)
  .addDecorator((story) => (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 50,
      }}
    >
      {story()}
      <View
        style={{
          width: "100%",
          height: 100,
          backgroundColor: "red",
        }}
      />
    </View>
  ))
  .add("Default", () => (
    <Picker
      data={[
        { label: "Option 1", value: 1 },
        { label: "Option 2", value: 2 },
        { label: "Option 3", value: 3 },
        { label: "Option 4", value: 4 },
        { label: "Option 5", value: 5 },
        { label: "Option 6", value: 6 },
        { label: "Option 7", value: 7 },
        { label: "Option 8", value: 8 },
        { label: "Option 9", value: 9 },
        { label: "Option 10", value: 10 },
      ]}
    />
  ))
  .add("Preselected item", () => (
    <Picker
      data={[
        { label: "Option 1", value: 1 },
        { label: "Option 2", value: 2 },
        { label: "Option 3", value: 3 },
        { label: "Option 4", value: 4, selected: true },
        { label: "Option 5", value: 5 },
        { label: "Option 6", value: 6 },
        { label: "Option 7", value: 7 },
        { label: "Option 8", value: 8 },
        { label: "Option 9", value: 9 },
        { label: "Option 10", value: 10 },
      ]}
    />
  ))
  .add("Right to left", () => (
    <Picker
      data={[
        { label: "Option 1", value: 1 },
        { label: "Option 2", value: 2 },
        { label: "Option 3", value: 3 },
        { label: "Option 4", value: 4 },
        { label: "Option 5", value: 5 },
        { label: "Option 6", value: 6 },
        { label: "Option 7", value: 7 },
        { label: "Option 8", value: 8 },
        { label: "Option 9", value: 9 },
        { label: "Option 10", value: 10 },
      ]}
      rtl={true}
    />
  ))
  .add("Custom item component", () => (
    <Picker
      data={[
        { label: "Option 1", value: 1 },
        { label: "Option 2", value: 2 },
        { label: "Option 3", value: 3 },
        { label: "Option 4", value: 4 },
        { label: "Option 5", value: 5 },
        { label: "Option 6", value: 6 },
        { label: "Option 7", value: 7 },
        { label: "Option 8", value: 8 },
        { label: "Option 9", value: 9 },
        { label: "Option 10", value: 10 },
      ]}
      itemComponent={(props) => (
        <Text
          style={[
            {
              textAlign: props.rtl ? "right" : "left",
              textAlignVertical: "center",
              paddingHorizontal: wp(3),
              paddingVertical: wp(2),
              overflow: "hidden",
              backgroundColor: "#ff000011",
            },
            props.style,
          ]}
          numberOfLines={1}
        >
          {props.children}
        </Text>
      )}
    />
  ))
  .add("Custom icon component", () => (
    <Picker
      data={[
        { label: "Option 1", value: 1 },
        { label: "Option 2", value: 2 },
        { label: "Option 3", value: 3 },
        { label: "Option 4", value: 4 },
        { label: "Option 5", value: 5 },
        { label: "Option 6", value: 6 },
        { label: "Option 7", value: 7 },
        { label: "Option 8", value: 8 },
        { label: "Option 9", value: 9 },
        { label: "Option 10", value: 10 },
      ]}
      iconComponent={() => <Icon name="sentiment-satisfied" size={wp(8)} />}
    />
  ));

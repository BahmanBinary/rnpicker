import React, { Component, PureComponent, createRef } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  Animated,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Icon } from "react-native-elements";

export default class Picker extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      containerHeight: null,
      dropDown: false,
      selectedItem: null,
      selectedIndex: null,
    };

    this.list = createRef();
  }

  dismissPicker() {
    this.setState({ dropDown: false });
  }

  render() {
    const {
      data = [],
      rtl = false,
      itemComponent: Item = (props) => (
        <Text
          style={[
            {
              textAlign: props.rtl ? "right" : "left",
              textAlignVertical: "center",
              paddingHorizontal: wp(3),
              paddingVertical: wp(2),
              overflow: "hidden",
            },
            props.style,
          ]}
          numberOfLines={1}
        >
          {props.children}
        </Text>
      ),
      iconComponent: IconComponent = ({
        iconColor,
        iconSize,
        iconStyle,
        ...props
      }) => (
        <Icon
          name="arrow-drop-down"
          size={iconSize}
          color={iconColor}
          style={iconStyle}
        />
      ),
      onSelect,
      containerStyle,
      placeholder = "Please select",
      placeholderStyle,
      itemStyle,
      iconColor = "black",
      iconSize = wp(8),
      iconStyle,
    } = this.props;

    const {
      containerHeight,
      dropDown,
      selectedItem,
      selectedIndex,
    } = this.state;

    return (
      <View
        style={[styles.container, containerStyle, styles.containerOverride]}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            this.setState(
              {
                dropDown: true,
              },
              () => {
                Animated.timing(this.containerHeight, {
                  toValue: containerHeight * 5,
                  duration: 50,
                  useNativeDriver: true,
                }).start();
                if (this.state.dropDown && this.state.selectedIndex)
                  this.list.current.scrollToIndex({
                    index: this.state.selectedIndex,
                    animated: false,
                  });
              }
            );
          }}
        >
          <View
            onLayout={(event) => {
              this.containerHeight = new Animated.Value(
                event.nativeEvent.layout.height
              );
              this.setState({
                containerHeight: event.nativeEvent.layout.height,
              });
            }}
            style={{
              width: "100%",
              backgroundColor: "white",
              flexDirection: rtl ? "row-reverse" : "row",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Item
              style={[
                styles.placeholder,
                selectedItem
                  ? itemStyle
                  : [styles.placeholderColor, placeholderStyle],
              ]}
              rtl={rtl}
            >
              {selectedItem ? selectedItem.label : placeholder}
            </Item>
            <IconComponent
              iconColor={iconColor}
              iconSize={iconSize}
              style={iconStyle}
            />
          </View>
        </TouchableWithoutFeedback>
        <Animated.View
          style={[
            styles.animatedView,
            {
              height: dropDown ? this.containerHeight : 0,
            },
          ]}
        >
          <FlatList
            ref={this.list}
            getItemLayout={(data, index) => {
              return {
                length: containerHeight,
                offset: containerHeight * index,
                index,
              };
            }}
            data={data}
            renderItem={({ item, index }) => {
              if (!selectedItem && item.selected)
                this.setState({
                  selectedItem: item,
                  selectedIndex: index,
                });

              return (
                <TouchableNativeFeedback
                  onPress={() => {
                    if (onSelect) onSelect(item, index);
                    Animated.timing(this.containerHeight, {
                      toValue: containerHeight,
                      duration: 50,
                      useNativeDriver: true,
                    }).start(() => {
                      this.setState({
                        dropDown: false,
                        selectedItem: item,
                        selectedIndex: index,
                      });
                    });
                  }}
                >
                  <View
                    style={{
                      backgroundColor:
                        selectedIndex == index ? "#00000011" : "transparent",
                    }}
                  >
                    <Item style={itemStyle} rtl={rtl}>
                      {item.label}
                    </Item>
                  </View>
                </TouchableNativeFeedback>
              );
            }}
            keyExtractor={(item) => item.label + item.value}
          />
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  containerOverride: {
    height: undefined,
  },
  placeholder: {
    flex: 1,
  },
  placeholderColor: { color: "#888" },
  animatedView: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "white",
    width: "100%",
  },
});

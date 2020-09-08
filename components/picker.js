import React, { PureComponent, createRef } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  Animated,
  Modal,
  UIManager,
  findNodeHandle,
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
      buttonMeasurements: null,
    };

    this.list = createRef();
    this.button = createRef();
    this.modal = createRef();
  }

  dismissPicker = (callback) => {
    Animated.timing(this.containerHeight, {
      toValue: this.state.containerHeight,
      duration: 50,
      useNativeDriver: false,
    }).start(() => {
      this.setState({
        dropDown: false,
      });
      if (callback) callback();
    });
  };

  _measure = () => {
    UIManager.measure(
      findNodeHandle(this.button.current),
      (x, y, width, height, pageX, pageY) => {
        this.setState({
          buttonMeasurements: {
            width,
            height,
            x: pageX,
            y: pageY,
          },
        });
      }
    );
  };

  componentDidMount() {
    setTimeout(this._measure, 100);
  }

  componentDidMount() {
    setTimeout(this._measure, 100);
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
      buttonMeasurements,
    } = this.state;

    return (
      <View
        style={[styles.container, containerStyle, styles.containerOverride]}
      >
        <TouchableWithoutFeedback
          ref={this.button}
          onPress={() => {
            this.setState(
              {
                dropDown: true,
              },
              () => {
                Animated.timing(this.containerHeight, {
                  toValue: containerHeight * 5,
                  duration: 50,
                  useNativeDriver: false,
                }).start();
                if (this.state.dropDown && this.state.selectedIndex) {
                  this.list.current.scrollToIndex({
                    index: this.state.selectedIndex,
                    animated: false,
                  });
                }
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
        <Modal
          ref={this.modal}
          visible={this.state.dropDown}
          transparent={true}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              this.dismissPicker();
            }}
          >
            <View
              style={{
                flex: 1,
              }}
            >
              <Animated.View
                style={[
                  styles.animatedView,
                  {
                    top: buttonMeasurements ? buttonMeasurements.y : 0,
                    left: buttonMeasurements ? buttonMeasurements.x : 0,
                    height: dropDown ? this.containerHeight : 0,
                    width: buttonMeasurements ? buttonMeasurements.width : 0,
                    // display: buttonMeasurements ? "flex" : "none",
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
                          this.dismissPicker(() => {
                            this.setState({
                              selectedItem: item,
                              selectedIndex: index,
                            });
                          });
                        }}
                      >
                        <View
                          style={{
                            backgroundColor:
                              selectedIndex == index
                                ? "#00000011"
                                : "transparent",
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
          </TouchableWithoutFeedback>
        </Modal>
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
    backgroundColor: "white",
    width: "100%",
  },
});

import React, { Component } from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import * as Typography from "../../../styles/typography";
import * as Colors from "../../../styles/colors";

export default class ContinueButton extends Component {
  render() {
    const { navigation } = this.props.navigation;
    const disableButton = this.props.disableButton;
    const view = this.props.view;
    const text = this.props.text;
    const id = this.props.id;
    const menuItems = this.props.menuItems;
    const menuID = this.props.menuID;
    const menuItemReviews= this.props.menuItemReviews;

    if (disableButton === false) {
      return (
          <TouchableOpacity
              onPress={() => navigation.navigate(view, {id:id, menuItems:menuItems, menuID:menuID, menuItemReviews:menuItemReviews})}
              style={[styles.button, { backgroundColor: Colors.PINK }]}
          >
            <Text style={[Typography.FONT_H4_WHITE, { textAlign: "center" }]}>
              {text}
            </Text>
          </TouchableOpacity>
      );
    }
    return (
        <View style={[styles.button, { backgroundColor: Colors.GRAY_MEDIUM }]}>
          <Text style={[Typography.FONT_H4_WHITE, { textAlign: "center" }]}>
            CONTINUE
          </Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 145,
    height: 34,
    borderRadius: 50,
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
    alignSelf: "center"
  }
});

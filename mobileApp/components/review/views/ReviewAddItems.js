import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import * as Typography from "../../../styles/typography";
import BackButton from "../components/backButton";
import ContinueButton from "../components/continueButton";
import * as Colors from "../../../styles/colors";
import * as Api from "../../../services/api";
import { NavigationActions, StackActions } from "react-navigation";

export default class ReviewAddItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disableButton: true,
      menuItemName: null,
      backgroundColor: Colors.WHITE,
      colorIndex: 3,
      menuItems: "",
      imageID: null,
      menuID: null,
      menuName: null,
      restaurant: null,
      selectedMenuItems: [],
      token: null,
      loggedIn: false,
      isLoaded: false
    };
  }

  componentDidMount = async () => {
    this.focusListener = this.props.navigation.addListener("didFocus", () => {
      AsyncStorage.getItem("userToken").then(async token => {
        this.setState({
          loggedIn: token !== null,
          isLoaded: true
        });
        if (this.state.loggedIn) {
          const { navigation } = this.props;
          const menuID = navigation.getParam("menuID", "000");
          const menuName = navigation.getParam("menuName", "no-menu");
          const imageID = navigation.getParam("imageID", "0");
          const restaurant = navigation.getParam("restaurant", "no-restaurant");
          this.setState({ imageID, menuID, menuName, restaurant, token });
          await this.getMenuItems(menuID, token);
        }
      });
    });
  };

  componentWillUnmount() {
    this.focusListener.remove();
  }

  async getMenuItems(menuID, token) {
    try {
      const response = await fetch(Api.SERVER_GET_MENUITEMS(menuID), {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-auth-token": token
        }
      });
      if (response.ok) {
        const responseJson = await response.json();
        const menuItems = responseJson.map(index => ({
          menuItemID: index.menuItemID.toString(),
          menuItemName: index.name
        }));
        this.setState({ menuItems });
      }
      if (!response.ok) {
        console.log("Failed fetching menuItems");
      }
    } catch (e) {
      console.log("ERROR fetching menuItems", e);
    }
  }

  setSelected(id, name) {
    if (this.state.selectedMenuItems.some(e => e.menuItemID === id)) {
      this.setState(state => {
        const selectedMenuItems = state.selectedMenuItems.filter(
          e => e.menuItemID !== id
        );
        return {
          selectedMenuItems
        };
      });
      if (this.state.selectedMenuItems.length === 0) {
        this.setState({ disableButton: true });
      }
    } else {
      this.setState(state => {
        const selectedMenuItems = state.selectedMenuItems.concat({
          menuItemID: id,
          menuItemName: name,
          rating: null,
          content: ""
        });
        return {
          selectedMenuItems
        };
      });
      this.setState({ disableButton: false });
    }
  }

  render() {
    const resetStack = () => {
      this.props.navigation.dispatch(
        StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({
              routeName: "ReviewAddImage"
            })
          ]
        })
      );
    };
    if (!this.state.isLoaded) {
      return <ActivityIndicator />;
    }
    if (this.state.isLoaded) {
      if (!this.state.loggedIn) {
        resetStack();
        return null;
      }
      if (this.state.loggedIn) {
        return (
          <View style={styles.container}>
            <View>
              <View style={styles.header}>
                <Text style={Typography.FONT_H3_BLACK}>
                  What did you eat/drink?
                </Text>
              </View>
              <BackButton navigation={this.props.navigation} />
            </View>
            <View style={styles.resultList}>
              <FlatList
                data={this.state.menuItems}
                extraData={this.state}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={{
                      backgroundColor: this.state.selectedMenuItems.some(
                        e => e.menuItemID === item.menuItemID
                      )
                        ? Colors.TURQUOISE
                        : Colors.WHITE
                    }}
                    onPress={() =>
                      this.setSelected(item.menuItemID, item.menuItemName)
                    }
                  >
                    <Text
                      style={[
                        Typography.FONT_H4_BLACK,
                        {
                          marginVertical: 10,
                          marginLeft: 50
                        }
                      ]}
                    >
                      {item.menuItemName}
                    </Text>
                  </TouchableOpacity>
                )}
                keyExtractor={item => item.menuItemID}
              />
            </View>
            <ContinueButton
              disableButton={this.state.disableButton}
              navigation={this.props}
              menuItems={this.state.selectedMenuItems}
              imageID={this.state.imageID}
              menuID={this.state.menuID}
              menuName={this.state.menuName}
              restaurant={this.state.restaurant}
              token={this.state.token}
              view={"ReviewItems"}
              text={"CONTINUE"}
              colorIndex={this.state.colorIndex}
            />
          </View>
        );
      }
    }
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1
  },
  resultList: {
    flex: 6
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center"
  }
});

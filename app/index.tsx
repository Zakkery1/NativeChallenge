import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, ImageBackground, Image } from "react-native";
import * as React from "react";
import { BottomNavigation, Text, Avatar, Button, Card } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import axios from "axios";
import { useEffect, useState } from "react";

const image = require("../assets/images/NBA.jpg");


const HomeRoute = () => (
  <ImageBackground source={image} resizeMode="cover" style={styles.image}>
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <Image
        style={styles.tinyLogo}
        source={{
        }}
      />
      <Text style={styles.text}>NBA App</Text>
    </View>
  </ImageBackground>
);

const TeamsRoute = () => (
  <ImageBackground source={image} resizeMode="cover" style={styles.image}>
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <Image
        style={styles.tinyLogo}
        source={{
        }}
      />
      {/* <Text style={styles.text}>Welcome to Cache42</Text> */}
        {/* {teamData} */}
    </View>
  </ImageBackground>
);

export default function Index() {
  const [index, setIndex] = React.useState(0);
  const [teams, setTeams] = React.useState([]);
  const [routes] = React.useState([
    {
      key: "Home",
      title: "Home",
      focusedIcon: "cart",
      unfocusedIcon: "cart-outline",
    },
    { key: "Teams", title: "Teams", focusedIcon: "book-open-page-variant" },
  ]);
  const renderScene = BottomNavigation.SceneMap({
    Home: HomeRoute,
    Teams: TeamsRoute,
  });

  useEffect(() => {
    const getData = async () => 
      await axios.get("http://localhost:3000/teams")
        .then((res) => {
          console.log(res.data)
        setTeams(res.data);
      })
        .catch((error) => {
        console.error(error);
      });
    //   fetch("http://localhost:3000/teams")
    //     .then((res) => {
    //         return res.json()
    //     })
    //     .then((data) => {
    //       setTeams(data);
    //     })
      getData();
  },[])
  const teamData = [];
  teams.map((d, i) => {
    // console.log(d.name)
    const teamsDatas = (
      <Card key={i}>
        <Card.Content>
          <Text variant="titleLarge">{d.name}</Text>
          <Text variant="bodyMedium">{d.wins} / {d.losses}</Text>
        </Card.Content>
      </Card>
    )
    teamData.push(teamsDatas);
  })

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <BottomNavigation
          style={styles.bottomNavigation}
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          renderScene={renderScene}
        />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  image: {
    zIndex: 0,
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  bottomNavigation: {
    zIndex: 1,
  },
  tinyLogo: {
    width: 50,
    height: 50,
    alignSelf: "center",
    top: 50,
  },
  text: {
    color: "Black",
    fontSize: 50,
    top: -25,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
});

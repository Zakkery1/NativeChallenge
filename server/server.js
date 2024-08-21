const express = require("express");
const cors = require("cors");
const axios = require("axios");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const nbaSchema = require("./schema");
const nba_json = require("./NbaData.json");

const app = express();
app.use(cors());
// app.use(express.json());

const url = process.env.MONGO_DB;
const port = process.env.PORT;

mongoose.connect(url).then(() => {
  console.log("Connected!");
});

// const dbName = 'nba_teams';

// nbaData();
async function nbaData() {
  try {
    const nba_Scheme = nba_json.Teams.map((data, index) => {
      return {
        name: data.name,
        wins: data.wins,
        losses: data.losses,
      };
    });
    // console.log(nba_Scheme)
    const nba = await nbaSchema.create(nba_Scheme);
    console.log(nba);
  } catch (e) {
    console.log(e);
  }
}

app.get("/teams", async (req, res) => {
  try {
    const resData = await nbaSchema.find();
    res.status(200).json(resData);
    // res.send(res.data);
  } catch (e) {
    console.log(e);
  }
});

app.listen(port, () => {
  console.log("http://localhost:3000");
});

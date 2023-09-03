const { Schema, model } = require("mongoose");

const AutoReconnect = new Schema({
  ChannelID: String,
  TextChannelID: String,
  GuildID: String,
});

const MessageModel = (module.exports = model("channels", AutoReconnect));
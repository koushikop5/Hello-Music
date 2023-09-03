const {Schema, model} = require("mongoose");
// const mongoPerm = mongoose;
const client = require("../index");

const PremiumSchema = new Schema({
  GuildID: String,
  Expire: Number,
  Permanent: Boolean,
});

const MessageModel = (module.exports = model("premiumGuilds", PremiumSchema));
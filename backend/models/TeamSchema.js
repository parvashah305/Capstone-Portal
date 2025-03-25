const mongoose = require("mongoose");

const teamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  srn: { type: String, required: true, unique: true },
  section: { type: String, required: true },
  cgpa: { type: Number, required: true, min: 0, max: 10 },
});

const teamSchema = new mongoose.Schema({
  teamMembers: {
    type: [teamMemberSchema],
    validate: {
      validator: function (members) {
        return members.length >= 1 && members.length <= 4;
      },
      message: "A team must have between 1 to 4 members.",
    },
  },
  domainsOfInterest: {
    type: [String],
    validate: {
      validator: function (domains) {
        return domains.length >= 1 && domains.length <= 3;
      },
      message: "You must select between 1 to 3 domains of interest.",
    },
  },
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
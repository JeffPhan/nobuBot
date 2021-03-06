const Command = require('../../main/command');
const Constants = require('../../main/const');
const snek = require('snekfetch');

module.exports = class FGOUSProfileCommand extends Command {
  constructor(main) {
    super(main, {
      name: "us-profile",
      category: "Fate Grand Order",
      help: "Get your saved FGO Profile (EN version)",
      args: [
        {
          name: "Player",
          desc: "Optional. The bot will show the player's profile if this argument is provided and the player's privacy setting is off. Can use User Mention or User ID for this argument."
        }
      ]
    });
  }
  run(message, args, prefix) {
    let player = message.author.id;
    if (args = args.join(' ')) players = args.match(/(?:<@!?)?(\d+)/)[1];
    this.main.db.get(`fgoUSProfile_${player}`).then((profile) => {
      if (profile) {
        profile = JSON.parse(profile);
        if (!profile.privacy || !args) message.channel.send('', {embed: this.main.util.fgoProfile(message.author, profile)});
        else message.channel.send(`This player has set his privacy setting to true, thus the profile cannot be displayed`);
      } else if (args) message.channel.send(`Cannot find profile of provided player. Please recheck your arguments and try again`);
      else message.channel.send(`Profile not found, please use \`${prefix}profile-edit\` to create one`);
    });
  }
}
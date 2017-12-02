exports.exec = (client, message) => {
  var msg = message.content.trim().replace(/ +/g, ' ');
  if (!message.author.bot) {
    if ((client.config.selfbot || process.env.SELFBOT) && message.author.id !== client.config.ownerID) return;
    if (msg.startsWith(client.prefix)) {
      msg = msg.slice(client.prefix.length);
      msgArray = msg.split(' ');
      if (msgArray[0].toLowerCase() in client.commands) {
        client.commands[msgArray[0].toLowerCase()].count++;
        client.commands[msgArray[0].toLowerCase()].exec(client, message, msgArray);
        console.log("Command " + msgArray[0].toLowerCase() + " was triggered");
      }
    } else {
      if (msg in client.emoji) {
        if (client.emoji[msg].includes("http://")) message.channel.send("", {file: {attachment: client.emoji[msg]}});
        else message.channel.send(client.emoji[msg]);
      }
    }
  }
}
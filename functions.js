const Client = require("./main.js").Clirnt;

const send = function(channelid, content) {
  return new Promise(function(resolve, reject) {
    Client.channels.cache
      .filter(channel => channel.id == channelid)
      .forEach(channel => {
        channel.send(content).then(message => {
          resolve(message);
        });
      });
  });
};
exports.send = send;

exports.editLast = (channelID, content) => {
  return new Promise((resolve, reject) => {
    this.fetchMessages("703421092869570665", { limit: 1 }).then(messages => {
      messages.first().edit(content);
      resolve();
    });
  });
};

exports.fetchMessages = (channelID, fetch) => {
  return new Promise((resolve, reject) => {
    Client.channels.cache
      .filter(channel => channel.id == channelID)
      .forEach(channel => {
        channel.messages.fetch(fetch).then(messages => {
          resolve(messages);
        });
      });
  });
};

exports.log = function(channelNamber) {
  const all_logChannelID = "705313109249884260"; //起動通知がされるチャンネルID
  const logChannelIDs = ["705031690799677441", "705334109752524853"];
  let content = "";
  let index = 0;
  for (let arg of arguments) {
    if (index >= 1) {
      content += "  " + arg;
    }
    index++;
  }
  if (channelNamber != 0) {
    if (channelNamber != 2) {
      send(
        all_logChannelID,
        content +
          " " +
          Client.channels.cache.get(logChannelIDs[channelNamber - 1]).toString()
      );
    }
    return send(logChannelIDs[channelNamber - 1], content);
  } else {
    send(all_logChannelID, content);
  }
};

// Response for Uptime Robot
const http = require("http");
http
  .createServer(function(request, response) {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Discord bot is active now \n");
  })
  .listen(3000);

// Discord bot implements
const Discord = require("discord.js");
const Client = new Discord.Client();
exports.Clirnt = Client;

const dicBot = require("./dicBot.js");
const functions = require("./functions.js");
const log = functions.log;
//::実行::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//##bot#######################################################################################################################
const Bot = new (class {
  //::グローバルパラメータ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  constructor() {
    this.parameter = {
      adminName: "yaakiyu",
      userIDs: {
        yaakiyu: "693025129806037003",
        uni: "687599949093011495",
        Takkun: "667319675176091659"
      },
      saverConfigID: "705035857102503997"
    };
    this.database = {
      system: null,
      user: null,
      variable: null
    };

    this.functions = new (class {
      getAdminID() {
        return Bot.parameter.userIDs[Bot.parameter.adminName];
      }
      getDataID(type) {
        return new Promise((resolve, reject) => {
          functions
            .fetchMessages(Bot.parameter.saverConfigID, { limit: 1 })
            .then(messages => {
              resolve(JSON.parse(messages.first().content).databaseIDs[type]);
            });
        });
      }
    })();
  }

  readDatabase() {
    let setDataFunctions = [];
    for (let key of Object.keys(this.database)) {
      let setData = resolve => {
        this.functions.getDataID(key).then(({ channel, message }) => {
          functions.fetchMessages(channel, message).then(messages => {
            if (messages.content != void 0) {
              this.database[key] = JSON.parse(messages.content);
            } else {
              this.database[key] = JSON.parse(messages.first().content);
            }
            resolve();
          });
        });
      };
      setDataFunctions.push(setData);
    }
    let setDataPromise = setDataFunctions.map(func => new Promise(func));
    return Promise.all(setDataPromise);
  }
  Preparation() {
    return this.readDatabase();
  }
  //::実行:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  Run() {
    Client.user.setActivity("ヘルプはdb:help");
    dicBot.Preparation();
    Client.on("message", message => {
      if (!message.author.bot) {
        dicBot.Run(message);
        //notice(message);
      }
    });
    //functions.send(`705032035747496037`, `{"test":0}`);
  }
})();
//::起動:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
Client.on("ready", message => {
  Bot.Preparation().then(() => {
    module.exports.database = Bot.database;
    module.exports.parameter = Bot.parameter;
    console.log("準備完了");
    log(0, "**Bot is ready!**");
    //getLastMessage("703133624567988244");
    console.dir(Bot.database);
    Bot.Run();
  });
});

if (process.env.DISCORD_BOT_TOKEN == undefined) {
  console.log("please set ENV: DISCORD_BOT_TOKEN");
  process.exit(0);
}

Client.login(process.env.DISCORD_BOT_TOKEN);

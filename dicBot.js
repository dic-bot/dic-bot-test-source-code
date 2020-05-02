const Discord = require("discord.js");
const Client = require("./main.js").Clirnt;

const parameter = require("./dic-parameter.js");
const log = require("./functions.js").log;

const dicBot = new (class {
  constructor() {
    //**ローカル関数軍************************************************************************************
    this.functions = new (class {
      getMokuji() {
        let mokuji = "";
        for (let content of parameter.dictionary) {
          mokuji += content.word + "\n";
        }
        parameter.dictionary.push({
          word: "s-目次",
          mean: `現在載っている言葉：\n ${mokuji}`
        });
      }
    })();
  }
  //**準備**********************************************************************************************
  Preparation() {
    this.functions.getMokuji();
  }

  //**本体**********************************************************************************************
  Run(message) {
    const database = require("./main.js").database;
    const system_database = database.system.DictionaryBot;
    const prefixString = parameter.prefix;
    //const prefixString = system_database.normalPrefix;
    const prefix = new RegExp(prefixString, "i");
    const content = message.content;
    const channel = message.channel;
    if (content.match(prefix)) {
      let guild;
      let nickname;
      if (message.channel.type == "dm") {
        guild = "DM";
        nickname = null;
      } else {
        guild = message.guild.name;
        nickname = message.member.nickname;
      }
      const author = message.author;
      const elseMessage = parameter.elseMessage;
      const dictionary = parameter.dictionary;
      //channel.send(JSON.stringify(Bot.database, null, 4));
      //editLast(Bot.functions.getDataID("variable"), `{"test":null}`);
      let search = content.replace(prefix, "");
      if (search == "about") {
        channel.send(parameter.about());
        log(
          1,
          `**Show about**   Server:[${guild}]  Channel:[${channel.toString()}]  User:[${
            author.username
          } (${nickname})]`
        );
        return;
      }
      if (search.match(/^s-news /i)) {
        const adminIDs = require("./main.js").parameter.userIDs;
        if (Object.values(adminIDs).indexOf(message.author.id) + 1) {
          const ch_name = "db-お知らせ";
          let news = search.replace(/^s-news /i, "");
          Client.channels.cache.forEach(newsChannel => {
            if (newsChannel.name === ch_name) {
              newsChannel.send(news);
              let embed = new Discord.MessageEmbed()
                .setColor(0x00ff00)
                .setTitle("お知らせを配信しました。")
                .setDescription(news)
                .setTimestamp(new Date());
              channel.send(embed);
            }
          });
        } else {
          let news = search.replace(/^s-news /i, "");
          let embed = new Discord.MessageEmbed()
            .setColor(0xff0000)
            .setTitle("実行エラー")
            .setDescription("このコマンドは開発者限定です。")
            .setTimestamp(new Date());
          channel.send(embed);
        }
        return;
      }
      if ((search = "s-help")) {
        channel.send(parameter.help());
        log(
          1,
          `**Show help**   Server:[${guild}]  Channel:[${channel.toString()}]  User:[${
            author.username
          } (${nickname})]`
        );
        return;
      }
      //channel.send({content:"test",embed:{title:"test"}})
      for (let item of dictionary) {
        const embedColor = parameter.embedColor;
        const embedFooter = parameter.embedFooter;
        let reg = new RegExp(`^${item.word}`, "i");
        if (search.match(reg)) {
          if (item.mean == "" || item.writing) {
            channel.send(
              parameter.sendMessage(
                search,
                embedColor,
                parameter.inProductionMessage,
                embedFooter
              )
            );
            return;
          }
          channel.send(
            parameter.sendMessage(search, embedColor, item.mean, embedFooter)
          );
          log(
            1,
            `**Searched**   Status:[hit]  Word:[${search}]  Server:[${guild}]  Channel:[${channel.toString()}]  User:[${
              author.username
            } (${nickname})]`
          );
          return;
        }
      }
      if (!search == "") {
        channel.send(parameter.elseMessage(search));
        /* Client.users.cache
        .get(Bot.functions.getAdminID())
        .send(
          `存在しない言葉「${search}」が検索されました。 by ${author.username}`
        );*/
        log(
          1,
          `**Searched**  Status:[Couldn't hit]  Word:[${search}]  Server:[${guild}]  Channel:[${channel.toString()}]  User:[${
            author.username
          } (${nickname})]`
        );
        log(2, `${search}`);
      }
    }
  }
})();
module.exports = dicBot;

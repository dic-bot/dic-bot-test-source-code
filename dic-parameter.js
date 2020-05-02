const Discord = require("discord.js");
const Client = require("./main.js").Clirnt;

module.exports = new (function() {
  //**ローカルパラメータ**********************************************************************************
  this.prefix = /^db=|^[&＆]/i;

  this.dictionary = [/*
    {
      word: "s-ヘルプ|s-help|s-へるぷ",
      mean: `このボットでは、主にdiscordで使われる用語などを検索できます。
また、それ以外の言葉も一部対応しています。
このボットの先頭には、「\`db=\`」が必要です。
目次を見たい場合は、\`db=s-目次\`を参照してください。
また、\`db=about\`でこのボットについて見ることができます。
**作成者**：<@693025129806037003>
**不適切なものを見つけたときは**
不適切なものを見つけたときは、\`db=s-report\`で報告してください。`
    },*/
    {
      word: "discord|ディスコード",
      mean: `「[**Discord(ディスコード)**](https://discordapp.com/)」とは様々な機種で動作する、ゲーマー向けの匿名チャットツールである。
テキストチャット以外にも、ボイスチャット、画面の共有、ビデオ通話機能などがある。ただし、画面の共有は現在web版では使えない。
Web版、Windows版、Mac版、Android版、iOS版、Linux版などがある。([ダウンロードはこちらから](https://discordapp.com/download))`
    },
    {
      word: "ロール",
      mean: ``,
      writing: true
    },
    {
      word: "nitro",
      mean: `「nitro(ニトロ)」は、ディスコードで使える有料サービスである。別サーバーのカスタム絵文字が使用できるなど、特典がついている。`
    },
    {
      word: "辞書",
      mean: `「辞書」は、このBotのように大量の語句が収録されているものである。`
    },
    {
      word: "Bot|ボット",
      mean: `「ボット（Bot）」は、人間に代わって作業を行うコンピュータープログラムの総称。語源は人に代わって作業を行う機械「ロボット(ROBOT)」から。`
    },
    {
      word: "help|ヘルプ",
      mean: `「ヘルプ」は、ソフトウェアを使いながらコンピュータの画面で参照することのできる説明書である。英語で「助ける」の意味。
（このBotのヘルプを見たい場合は、\`db:s-help\`を参照してください。）`
    },
    {
      word: "グローバルチャット",
      mean: `「グローバルチャット」は、Botを使うことによって別のサーバーの人とのやり取りをするためのもの。現在このBotではサポートされていない。`
    },
    {
      word: "NSFW",
      mean: `「NSFW」は、Not safe for work（ノット・セーフ・フォー・ワーク）の頭字語で、職場や学校などの環境下での閲覧に注意を促すために、裸、暴力などの要素を含む動画やウェブサイトのURLを示す際に使われるインターネットスラング。
NSFWは、性的コンテンツへのアクセスを禁止している職場や学校内で、個人的にインターネットを使う人物に特に関係がある。`
    },
    {
      word: "脳漿炸裂ガール",
      mean: `「脳漿炸裂ガール」は、れるりりが作ったボーカロイド曲である。`
    },
    {
      word: "TakuTukirou|月浪たく",
      mean: `「takutukirou」は、T-takuの開発した多機能Botである。グローバルチャットが使えるほか、ゲームなどの娯楽要素も存在する。公式サーバーあり。
（以下は本人からの要望により招待リンクを掲載させていただく。）
[導入する](https://discordapp.com/api/oauth2/authorize?client_id=476012428170362880&permissions=2147347828&scope=bot)`
    },
    {
      word: "sina-chan|思惟奈ちゃん",
      mean: `**本人からの許可を得ていないので現在この項目を見ることは出来ません。**`
    },
    {
      word: "佐藤 真美|佐藤真美",
      mean: `「佐藤 真美」はjun50により開発された多機能Botである。主にスクリーンショットなど機能が使えるほか、「一文字ずつに☆を入れる」などの面白い機能も使える。公式サーバーあり。
[導入はこちらから](https://discordapp.com/api/oauth2/authorize?client_id=479506436142006282&permissions=2083912785&scope=bot)`
    },
    {
      word: "wikipedia",
      mean: `「ウィキペディア（Wikipedia）」は、フリーなインターネット辞書である。`
    }
  ];

  this.embedColor = 0x42f5f5;
  this.embedFooter = "ご利用いただきありがとうございます。";
  this.inProductionMessage = "<この項目は只今執筆中です...>";

  this.help= () => {
	let embed = new Discord.MessageEmbed();
	return embed
		.setColor(0x00ffff)
		.setTitle("Help")
		.setDescription("Helpの一覧です。")
		.addField(":mag:検索する","`db=検索する文字`または`db=s-目次`で項目一覧が見れます。")
		.addField(":regional_indicator_p:プレフィックス","コマンドを実行する際はプレフィックスの`db=`を最初につけてください。")
		.addField(":loudspeaker:お知らせ","辞書 Botがいるサーバーで`db-お知らせ`というチャンネルを作ると、開発チームからのお知らせを受け取れます。")
		.addField(":envelope:連絡する","不適切な項目やバクを見つけたり、わからないことがあれば`db~s-contact 連絡内容`で連絡できます。")
		.setTimestamp(new Date())
		.setFooter(this.embedFooter);
};

  
  this.about = () => {
    let embed = new Discord.MessageEmbed();
    return embed
      .setColor(0xffd700)
      .setTitle("このボットについて")
      .setDescription("このBotは2020/04/22に作成されました。")
      .addField(
        "作成者",
        "このボットは <@693025129806037003> などが協力して作成しています。"
      )
      .addField("Bot version", "0.7(Build 07010)")
      .addField("最終更新（大規模アップデート時のみ）", "2020/04/29 20:37:54")
      .setTimestamp(new Date())
      .setFooter(this.embedFooter);
  };

  this.sendMessage = (word, color, descrip, foot) => {
    let embed = new Discord.MessageEmbed();
    return embed
      .setColor(color)
      .setTitle(`${word}`)
      .setDescription(descrip)
      .setFooter(foot);
  };

  this.elseMessage = word => {
    let embed = new Discord.MessageEmbed();
    return embed
      .setColor(0xa103fc)
      .setTitle("すみません...")
      .setDescription(`${word}が見つかりませんでした。 `)
      .setFooter("目次：db:s-目次\nヘルプ：db:s-help");
  };
})();

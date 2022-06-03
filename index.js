const Discord = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]});
const prefix = "kek!";
var rpsGame = false;
var rpsPlayers = [];
var rpsChallenged = undefined;

client.on("ready", () =>
{
    console.log(`Салам, я ${client.user.tag}`);
    const channel = client.channels.cache.get('692786872962908223');
    channel.send(`Салам, я ${client.user.username}`);
});

client.on("messageCreate", async (message) =>
{
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(" ");
    const command = args.shift().toLowerCase();

    if (command === "salam") {
        message.reply(`Salam ualeykum ${message.author.username}`);
    }
    // else if (command === "test")
    // {
    //     let foundUser = args[0].split("@").pop();
    //     foundUser = foundUser.slice(0, -1);
    //     message.channel.send(`${client.users.cache.get(foundUser)} please type \"kek!acceptRps\" to accept the game challenge!`);
    // }
    else if (command === "tt")
    {
        message.channel.send(`${client.users.cache.get("483282427188609025")}` + ` ${client.users.cache.get("360855163457634305")}` + ` ${client.users.cache.get("692835416776376330")}` + ` ${client.users.cache.get("194542177970421762")}` + ` ${client.users.cache.get("505783628555616257")}` + ` go tricky towers`);
    }
    else if (command === "rps")
    {
        if (args.length < 1)
        {
            message.reply("You have to provide an opponent you want to play against");
            return;
        }
        if (rpsGame)
        {
            if (rpsPlayers.length < 2)
            {
                return;
            }
            message.reply("Game has already started. Wait for it to finish!");
            return;
        }
        rpsPlayers.push(message.author);
        let challengedUser = args[0].split("@").pop();
        challengedUser = challengedUser.slice(0, -1);
        rpsChallenged = client.users.cache.get(challengedUser);
        console.log(rpsChallenged.username);
        console.log(message.author.username);
        message.channel.send(`${rpsChallenged} please type \"kek!acceptRps\" to accept the game challenge!`);
        let check = function checkPlayers()
        {
            if (rpsPlayers.length < 2)
            {
                setTimeout(checkPlayers, 500);
            }
            else
            {
                return true;
            }
        }
        if (check() === true)
            message.channel.send(`The players are: ${rpsPlayers[0].username}, ${rpsPlayers[1].username}`);
    }
    else if (command === "acceptRps")
    {
        if (rpsChallenged == null)
        {
            console.log(1);
            return;
        }
        if(rpsChallenged.username !== message.author.username) 
        {
            console.log(2);
            return;
        }
        rpsPlayers.push(rpsChallenged);
        console.log(rpsPlayers);
        rpsChallenged = undefined;
        rpsGame = true;
    }
});

client.login(config.BOT_TOKEN);
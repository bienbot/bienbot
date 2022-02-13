import DiscordClient from "./client/client";
// const { Client, Intents, Collection } = require("discord.js");
import { Intents, Collection } from "discord.js";
import { registerCommands, registerEvents } from "./utils/registry";
import updateUsersInVoice from "./utils/function/updateUsersInVoice";
import getUsersData from "./utils/function/getUsersData";
require("dotenv").config();

const allIntents = [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.GUILD_INTEGRATIONS,
    Intents.FLAGS.GUILD_WEBHOOKS,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING,
    Intents.FLAGS.GUILD_SCHEDULED_EVENTS,
];
const client = new DiscordClient(
    {
        intents: allIntents,
    },
    "cookies"
);

const admin = require("firebase-admin");

const adminConfig = {
    type: "service_account",
    project_id: "bienbot-8fde7",
    private_key_id: "a73d05cf1bc3221ca8677a6687621bc2e4342e29",
    private_key:
        "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCT4vwBjb4WvtyH\nhXfJeYOBi2NMT6CsnAENMV5cdyhhQexZfeXIDlfWNwRtZSN/kZObO3rsIcJCYbPQ\nln+xqSE+md8LOYaz/WVLUvaJrmnvDv7i4E8TQBmewSoQtE6xVGofbUZHK83suEb1\n7o6/Zvh3yJr1/rXUXsPQSPhjnyU+nDww7M7mLHITQaNq0QRKe9WymDor764pktta\nDri5xSk6NLHX5IHmVDAilEkjM8Qdmo0O69ANP3nCmY8LeJho3styzKpfLNGyr9il\n+kHdFY5PeVNePhL+d6mmk2XnkcA5DgoCwXRLW4d8NKlF0UZYvrjggxAc560usGJ+\nRlp2tbOvAgMBAAECggEANCKRNPsDSIGAvUYQNLbh5Yl+OCjaO//DXyNIYNChK6hR\n6jq4Bw8HaD19EhPVr+NiZhdR/mzoTv6ipaZo3fkB/0+/kfV1x35Nd4CH6YHTVrOy\np8jsF51BavYuHjVyiJF52Bpt7ClFL27HlWvEZzWl4pSWDKL+9x9xaLxQ1M4GE0v3\nluv14mWchZi8VvRIFbMIOJuq0IO8gu6rAbfD3lFf4vmHebOqNavprR4Tv1XiBOue\nChdPz0y78BvbmGHBrZCjHBeK5vpJtEucNZITEX+QikeJRNjcqKum7R0YLlpEUdMC\nzfq4G28/8LrLmoPwDxjkeqiiipuuZc1oLoZ0z6PWAQKBgQDLr0CjelIWQvAa6nmK\n9KUU9ICHJbEXsk520S7pmeM3L84zUBqpshtxuN6V52FrFMLHH0MKKw3GaATWr1ta\nxI3F16p6sAcBTIsev5ildjKaxSQkhzsGRFJ9M72N/+Vt1Q5sYK7xOOcJySlL4K+x\nmRyhXfpKITMOvbifQ4ju8YsFGwKBgQC53uKhsFXC3p7O4xUuDkUMIxoktOL21dBL\nLbgJB4lSnOk3DHOj+ok9EmZESB/71w1H0rPVDo3DsvW+Kctmmi+B61Nk4tuGIdRp\nC3Pz8PZuHNu0BW/i3u2wEw6EGXaTJKBcvFaFqcZytTrq/LcXupHrU5Xsaw93bAzh\nxIF16Zd4/QKBgD/5Q2wVN0MWsyNBEfu66z6xrMzF4eF3d32KJhno45ypvzIOrtEt\nx8DoN8ENc2OWmbbA8uV2sFToxtxHJ4JSydSh8EGomAqoZ+m4c9FEVpCV6swuTTOi\nseXxIlA/V2gvyt/vXgMVxDsmm3nhkE1PsdZdFgfCda7jl+Et7QxfgTKRAoGAQc5y\nyLIouvScnzzwy7yLn69x2xsb3C55L5TBOpkrek9Jlo7XBnB2VGQGRxiOEljiP9KO\njtk3QdlDfg9ID0x5k3LgtLBI7qVdkc9XPz/Jz9RxyLvAED/DQXqNwiFNxOzLxel8\nbJheRVB6yqWsoT8R2JJgWzLQaASeTvSGrVuFoHUCgYEAyVnFX5eQE/BSYKcDBSpO\ng0o8ua8PA5I6uKin/MixxkQkQ83Tw3xTFSsHmdnWFceWS+ck2ts699FU/wGkkbgn\nTfQM7zO9xLCt6u2uUk8T+mp8HKpmf+4vF6b8bwzo0YXmDbp4wueuFwEUgodOjA8z\nhzrfBt6UalimPpXuumVgnrk=\n-----END PRIVATE KEY-----\n",
    client_email:
        "firebase-adminsdk-eeigy@bienbot-8fde7.iam.gserviceaccount.com",
    client_id: "108044717159037307403",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
        "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-eeigy%40bienbot-8fde7.iam.gserviceaccount.com",
};

admin.initializeApp({
    credential: admin.credential.cert(adminConfig),
});

(async () => {
    client.prefix = "!";
    await registerCommands(client, "../commands");
    await registerEvents(client, "../events");
    await client.login(process.env["TOKEN"]);
    await getUsersData(client);
    setInterval(() => updateUsersInVoice(client), 1000 * 60);
})();

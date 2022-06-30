import {
    CommandInteractionOptionResolver,
    GuildMember,
    User,
} from "discord.js";
import DiscordClient from "../../../client/client";

const addMemberToDatabase = async ({
    client,
    user,
    member,
}: {
    client: DiscordClient;
    user: User;
    member: GuildMember;
}) => {
    const userObject = {
        id: Number(user.id),
        bot: user.bot,
        discriminator: user.discriminator,
        displayColor: member.displayHexColor,
        displayName: member.displayName,
        joinedAt: member.joinedAt,
        presence: member?.presence?.status,
        username: user.username,
        avatar: user.avatarURL({
            format: "png",
            dynamic: true,
        }),
        roles: member.roles.cache.map((role) => role.id),
        guild: member.guild.id,
    };

    console.log(member.guild.id);

    const { data, error } = await client.database
        .from("members")
        .select()
        .match({ id: Number(user.id), guild: Number(member.guild.id) });
    if (error) console.log(error);
    const { data: membersData } = await client.database
        .from("members")
        .select();
    console.log(membersData);
    console.log(data);
    if (data?.length === 0) {
        console.log("inserting");
        const { error } = await client.database
            .from("members")
            .insert([userObject]);
        if (error) console.log(error);
    } else {
        console.log("updating");
        //     const { error } = await client.database
        //         .from("members")
        //         .update(userObject)
        //         .match({ id: user.id, guild: member.guild.id });
        //     if (error) console.log(error);
    }
};

export { addMemberToDatabase };

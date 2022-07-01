import { GuildMember, User } from "discord.js";
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
        id: user.id,
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
        uniqueId: `${member.id}-${member.guild.id}`,
    };

    const { data, error } = await client.database
        .from("members")
        .select()
        .match({ id: user.id, guild: member.guild.id });
    if (error) console.log(error);

    /* Checking if the user is already in the database, if they are it will update their information,
    if they are not it will insert them into the database.
    */
    if (data?.length === 0) {
        const { error } = await client.database
            .from("members")
            .insert([userObject]);
        if (error) console.log(error);
    } else {
        const { error } = await client.database
            .from("members")
            .update(userObject)
            .match({ id: user.id, guild: member.guild.id });
        if (error) console.log(error);
    }
};

export { addMemberToDatabase };

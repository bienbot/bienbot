import DiscordClient from "apps/bot/src/client/client";

/**
 * It fetches all the roles from all the guilds the bot is in, and inserts them into the database
 * @param  - `client`: The Discord client.
 * @returns Nothing.
 */
const addRolesToDatabase = async ({ client }: { client: DiscordClient }) => {
    const guilds = await client.guilds.cache;
    if (!guilds) return;

    guilds.forEach(async (guild) => {
        const role = await guild.roles.fetch();

        role.forEach(async (role) => {
            if (!role.tags?.botId) {
                /* Creating an object with the properties of the role. */
                const roleObject = {
                    id: role.id,
                    icon: role.iconURL(),
                    unicodeEmoji: role.unicodeEmoji,
                    color: role.color,
                    permissions: role.permissions.bitfield,
                    name: role.name,
                };

                /* Checking if the role is already in the database, and if it is, it updates it, if it
                isn't, it inserts it. */
                const { data, error } = await client.database
                    .from("roles")
                    .select()
                    .match({ id: role.id });
                if (error) console.log(error);

                if (data?.length === 0) {
                    const { error } = await client.database
                        .from("roles")
                        .insert([roleObject]);
                    if (error) console.log(error);
                } else {
                    const { error } = await client.database
                        .from("roles")
                        .update(roleObject)
                        .match({ id: role.id });
                    if (error) console.log(error);
                }
            }
        });
    });

    return;
};

export { addRolesToDatabase };

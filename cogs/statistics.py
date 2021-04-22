import discord
from discord.ext import commands, tasks
import firebase_admin
from firebase_admin import credentials

cred = credentials.Certificate("path/to/serviceAccountKey.json")
firebase_admin.initialize_app(cred)


class Statistics(commands.Cog):

    def __init__(self, bot):
        self.bot = bot
        # pylint: disable=no-member
        self.update_database.start()

    @tasks.loop(seconds=1)
    async def update_database(self):
        for guild in self.bot.guilds:
            for channel in guild.channels:
                if (channel.type == discord.ChannelType.voice):
                    print(channel.members)


def setup(bot):
    bot.add_cog(Statistics(bot))

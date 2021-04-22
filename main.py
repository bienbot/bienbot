import discord
import os
from discord.ext import commands

if __name__ == '__main__':
    token = 'ODM0ODAyNTU5Mjg1NDYwOTk5.YIGMeA.jvCFMg1V_-Z5s-TJfNtEqmUbF1c'
    intents = discord.Intents.all()
    bot = commands.Bot(command_prefix='.')

    for filename in os.listdir('./cogs'):
        if filename.endswith('.py'):
            bot.load_extension(f'cogs.{filename[:-3]}')

    bot.run(token)

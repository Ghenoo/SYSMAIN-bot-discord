const fs = require("fs")

module.exports = async (client) => {

    const SlashArray = []

    fs.readdir(`./Comandos`, (error, folder) => {
        folder.forEach(subfolder => {
            fs.readdir(`./Comandos/${subfolder}/`, (error, files) => {
                !files?.forEach(files => {

                    if (!files?.endsWith('.js')) return;
                    files = require(`../Comandos/${subfolder}/${files}`);
                    if (!files?.name) return;
                    client.slashCommands.set(files?.name, files);

                    SlashArray.push(files)
                });
            });
        });
    });
    client.on("ready", async () => {
        client.guilds.cache.forEach(guild => guild.commands.set(SlashArray))
    });

    client.on("guildCreate", async (guild) => {
        guild.commands.set(SlashArray)
    });

};
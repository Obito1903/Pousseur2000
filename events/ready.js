module.exports = (client) => {
    client.user.setPresence({
        activity: { name: `${client.config.prefix}help` },
        status: "online"
    });
    console.log("I am ready!");
}
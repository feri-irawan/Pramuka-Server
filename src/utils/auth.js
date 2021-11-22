function checkApiKey(userApikey) {
    if (!userApikey) return

    return userApikey === process.env.API_KEY
}

module.exports = {
    checkApiKey,
}

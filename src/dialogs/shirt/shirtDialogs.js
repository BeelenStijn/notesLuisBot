var showShirts = require('./showShirts');
var buyShirt = require('./buyShirt');

module.exports = function () {
    // Carousel of hero cards
    bot.dialog('showShirts', showShirts)
        .triggerAction({
            matches: /^(show|list)/i
        })

    // buy shirt dialog
    bot.dialog('buyButtonClick', buyShirt)
        .triggerAction({
            matches: /(buy|add)\s.*shirt/i
        })
}
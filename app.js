var Bot    = require('ttapi');
var AUTH   = process.env.AUTH
var USERID = process.env.USERID
var ROOMID = process.env.ROOMID

var bot = new Bot(AUTH, USERID, ROOMID);

var current=0;
bot.on('speak', function (data) {
   // Get the data
   var name = data.name;
   var text = data.text;
   // Respond to "!hello" command
   if (text.match(/^!hello$/)) {
      bot.speak('Hello '+name+'.');
      console.log('said hi to '+name+'.');
   }
   // Bop
   if (text.match(/^!karma++/)){
      console.log('upvote from '+name+'.');
      bot.vote('up');
      bot.speak('Bop!');
   }
   // DeBop
   if (text.match(/^!karma--/)){
      console.log('downvote from '+name+'.');
      bot.vote('down');
      bot.speak('Boo!');
   }
   // start DJing
   if (text.match(/^!dj$/)) {
      bot.addDj();
   }
   // stop DJing
   if (text.match(/^!listen$/)) {
      bot.remDj();
   }

});
bot.on('pmmed', function(data){
   var name = data.name;
   var text = data.text;
   if (text.match(/^!dj$/)) {
      bot.addDj();
   }
   if (text.match(/^!skip$/)) {
      bot.skip();
   }
   if (text.match(/^!listen$/)) {
      bot.remDj();
   }
   if (text.match(/^!chrometop$/)){
      bot.modifyLaptop ('chrome');
   }
   if (text.match(/^!mactop$/)){
      bot.modifyLaptop ('mac');
   }
   if (text.match(/^!pctop$/)){
      bot.modifyLaptop ('pc');
   }
   if (text.match(/^!linuxtop$/)){
      bot.modifyLaptop ('linux');
   }
   if (text.match(/^!iphone$/)){
      bot.modifyLaptop ('iphone');
   }
   if (text.match(/^!android$/)){
      bot.modifyLaptop ('android');
   }
   if (text.match(/^!add/)){
      var song=text.split("?");
      if(song[1]!=""){
        console.log('added '+song[1]);
        bot.searchSong(song[1],add);
      }
   }
});
function add(songid){
  bot.playlistAdd(songid.docs[0]._id);
  console.log(songid.docs[0]._id);
}

bot.listen(8080, '0.0.0.0');

var myScriptVersion = '0.0.5';

bot.on('httpRequest', function (req, res) {
   var method = req.method;
   var url    = req.url;
   switch (url) {
      case '/version/':
         if (method == 'GET') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end('{"version":"'+myScriptVersion+'"}');
         } else {
            res.writeHead(500);
            res.end();
         }
         break;
      default:
         res.writeHead(200);
         res.end('For api access to TulsaBot');
         break;
   }
});


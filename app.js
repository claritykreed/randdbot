//READ ME - THIS IS THE MAIN BOT WHERE ALL CODES ARE BEING CONSOLIDATED
//Each tax campaign is called an archive, since each archive is a separate resource on a particular subject.
//"archives" refers to the total number of archives.
//"fileno" is the number of archives - and the variable is used to select an archive at random
//"endfileno" is necessary as the fileno output begins at 0, while logical, each number is increased by one to correspond with the actual file numbers. 
//"msgfilesource" is the file picked at random.
//"imagefile" is the corresponding jpg template corresponding with the selected archive.
//"archivetitles" is the title of the selected archive.  The titles are contained in a separate file called subject.txt.  
//"archivetips" is the array of tips contained in a particular archive. 
//"todaystaxtip" is the tip picked from the array at random.
//"tweettip" is the name given to the function.
//statuses[x].txt files are files which contain an archive of statuses relevant to the archive subject.
// Twit keys for Budget2018 and Demotaxtwit included in config.js file

var Twit = require('twit');
var config = require('./config');
var T = new Twit(config);
var Jimp = require("jimp");

var tweettip = function() {

    var imagelibrary = Math.round(Math.random() * 6);  //always have one no. less than the actual number of files as 0 is counted as the first
    console.log("Img file no. : "+imagelibrary);
    var adjustedimglib = imagelibrary + 1; // 1 is added as 0 is counted as the first
    var imagefile = './images/rand'+adjustedimglib+'.jpeg';
    console.log("Img file : "+imagefile);

    // Code for finding message and tweeting it - note randomIndex detects the length of the contents in the file
    
    var fs = require('fs');
    var archivetips = fs.readFileSync('./datafiles/randtips.txt').toString().split('\n');
    var randomIndex = Math.round(Math.random() * archivetips.length);
    //the next line pics a line from the relevant array file selected based on the random number picked above.
    var todaystaxtip = archivetips[randomIndex];

    //Error for undefined taxtip

    if (todaystaxtip == undefined) {
                    console.log("Today's taxtip is undefined so changing it");
                    var todaystaxtip = "Andrews Tax Consulting - your resourse for tax advice on R&D and intellectual property";
                    console.log("New tax tip : "+todaystaxtip);
                    }
                    else {
                    console.log("twt msg : "+todaystaxtip);
                    }//closes else of (if)

    // Code for findng suitable status update to accompany tweet
    
    //URL shortener for R&D https://goo.gl/Bnw9dB
    
    var statuses = fs.readFileSync('./datafiles/statuses.txt').toString().split('\n');
    var randomStatusIndex = Math.round(Math.random() * statuses.length);
    var statusupdatetxt = statuses[randomStatusIndex];
    // console.log("twt msg : "+statusupdatetxt);

    //Error for undefined tweet message

    if (statusupdatetxt == undefined) {
                    console.log("Status update is undefined so changing it");
                    var statusupdatetxt = "For advice on R&D tax credits contact us at +353 (0)1 6978012";
                    console.log("New Status update : "+statusupdatetxt);
                    console.log("----------------END OF TWEET----------------");
                    }
                    else {
                    console.log("twt msg : "+statusupdatetxt);
                    console.log("----------------END OF TWEET----------------");
                         }//closes else of (if)

    //Code for making & finding suitable image to accompany tweet
    
    var loadedImage;
    
    Jimp.read(imagefile)
        .then(function (image) {
            loadedImage = image;
            return Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
        })
        .then(function (font) {
            //loadedImage.print(font, 50, 50, imageCaption, 750)
            loadedImage.print(font, 50, 60, todaystaxtip,550)
                      .write('taxtipsnew.png');
        })
        .catch(function (err) {
            console.error(err);
        });

    var filename = 'taxtipsnew.png';
    var params = {
      encoding: 'base64'
      };
    var b64 = require('fs').readFileSync(filename, params);
    
    // Code to upload image to twitter (note this does not tweet merely uploads)
    T.post('media/upload', { media_data: b64 }, uploaded);
    
    function uploaded (err, data, response) {
      if(err) {
        console.log("there was an error uploading the file to twitter");
      } else {
              console.log("Statusupdatetxt is OK");                 
                         }                                         
              var id = data.media_id_string;
              var tweetbody = (statusupdatetxt);
                var tweet = {
                            status: tweetbody,
                            media_ids: [id]
                            };
    
                console.log(tweetbody);
    
                T.post('statuses/update', tweet, tweeted);
    
                function tweeted(err, data, response) {
                if (err) {
                        console.log("Something went wrong with the tweet");
                         }
                }//closes function tweeted
    
            }//closes else of uploaded function 
    };//closes uploaded function
// };

function Runbot() {
    tweettip();
    }
    
Runbot();

setInterval(Runbot, 1000*60*60*24*7);
// setInterval(tweettip, 1000*20);
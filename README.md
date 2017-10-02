# randdbot
Bot which selects string from array, creates image file and tweets (with random string from another array)

Most of the code was learnt from Daniel Schiffman's cool youtube channel and site (schiffman.net) - google it.

This bot does the following:-

1. selects a random image (from library of 10 images)
2. selects a random message (from a txt file)
3. merges the two into a new file
4. selects a suitable status update from another txt file
5. sends a twitter message
6. repeats weekly

Known bugs

The file creation process doesn't happen in time for the tweet process. To avoid an error, the first file was saved with the tweet function commented out //
This just created an initial file so on the first tweet there was something to send.
In effect, the bot starts with a premade file, sends this tweet and makes a new file which is then ready for the next tweet.
I didn't take the time to iron this out...

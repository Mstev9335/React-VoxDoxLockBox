# React-VoxDoxLockBox
This is react-based version of the previous VoxDoxLockBox application that allows a user to input an audio file that is stored within the cloud that can then be selected and played back using an audio player that is on the home page.  The audio files are stored within an Amazon S3 bucket and the metadata about that audio file is stored within a mysql database so that it can be referenced later by the application.  The audio files are displayed on the page and the user can select one of them by clicking on the associated button which will place the url of where the audio file is stored within the player.  The user can then play the selected audio file by pressing the play button on the player.

## Collaborators:
* Joe Dumford
* Shane Wetherington
* Matthew Stevens


### Technologies used:
* HTML
* CSS
* Javascript
* React
* Amazon S3 cloud storage
* MongoDB
* Monoose
* Heroku
* JawsDb
* Node
* aws-sdk npm package to access the Amazon S3 storage
* multer npm package to get information on the file that is being uploaded

### Main page
![start](/assets/images/vox1.png)

### Upload page
![upload](/assets/images/vox2.png)

### Deployed on Heroku: [VoxDoxLockBox](https://damp-sea-97566.herokuapp.com/)


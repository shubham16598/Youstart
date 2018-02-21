// Initialize Firebase
let config = {
  apiKey: "AIzaSyCcNJeeRVUgDbWUMV-7lQbxNsEHCMcwPzc",
  authDomain: "youstart-a45b3.firebaseapp.com",
  databaseURL: "https://youstart-a45b3.firebaseio.com",
  projectId: "youstart-a45b3",
  storageBucket: "youstart-a45b3.appspot.com",
  messagingSenderId: "987848724297"
};
firebase.initializeApp(config);
console.log("yo");
var ref = firebase.database().ref();

var users = ref.child("user");
function upload(email) {
  const ref = firebase.storage().ref();
  const file = document.querySelector('#file').files[0];
  const name =  email;
  console.log(name);
  const metadata = {
    contentType: file.type
  };
  const task = ref.child(name).put(file, metadata);
  task.then((snapshot) => {
    const url = snapshot.downloadURL;
    console.log(url);
    users.push ({
      email: name,
      url: url
    });
  toastr.remove();
  toastr.success('Image Uploaded!', 'Go to gallery to see the images')
  document.getElementById('email').value = "";

    //document.querySelector('#someImageTagID').src = url;
  }).catch((error) => {
    toastr.error('Failed, Please try again!')
    console.error(error);
  });
}

let emailid = "";
$( "#upload" ).click(function() {
  toastr.warning('Uploading image, Please wait!');
  emailid = document.getElementById('email').value;
  upload(emailid);
});

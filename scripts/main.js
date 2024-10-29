function getNameFromAuth() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            // Do something for the currently logged-in user here: 
            console.log(user.uid); //print the uid in the browser console
            console.log(user.displayName);  //print the user name in the browser console
            userName = user.displayName;

            //method #1:  insert with JS
            //document.getElementById("name-goes-here").innerText = userName;    

            //method #2:  insert using jquery
            $("#name-goes-here").text(userName); //using jquery

            //method #3:  insert using querySelector
            //document.querySelector("#name-goes-here").innerText = userName

        } else {
            // No user is signed in.
            console.log("No user is logged in");
        }
    });
}

function insertNameFromFirestore() {
    // Check if the user is logged in:
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(user.uid); // Let's know who the logged-in user is by logging their UID
            currentUser = db.collection("users").doc(user.uid); // Go to the Firestore document of the user
            currentUser.get().then(userDoc => {
                // Get the user name
                let userName = userDoc.data().name;
                console.log(userName);
                //$("#name-goes-here").text(userName); // jQuery
                document.getElementById("name-goes-here").innerText = userName;
            })
        } else {
            console.log("No user is logged in."); // Log a message when no user is logged in
        }
    })
}

// Function to read the quote of the day from the Firestore "quotes" collection
// Input param is the String representing the day of the week, aka, the document name
function readQuote(day) {
    db.collection("quotes").doc(day)                                                         //name of the collection and documents should matach excatly with what you have in Firestore
        .onSnapshot(dayDoc => {                                                              //arrow notation
            console.log("current document data: " + dayDoc.data());                          //.data() returns data object
            document.getElementById("quote-goes-here").innerHTML = dayDoc.data().quote;      //using javascript to display the data on the right place

            //Here are other ways to access key-value data fields
            //$('#quote-goes-here').text(dayDoc.data().quote);         //using jquery object dot notation
            //$("#quote-goes-here").text(dayDoc.data()["quote"]);      //using json object indexing
            //document.querySelector("#quote-goes-here").innerHTML = dayDoc.data().quote;

        }, (error) => {
            console.log("Error calling onSnapshot", error);
        });
}

function writeSpots() {
    //define a variable for the collection you want to create in Firestore to populate data
    var spotsRef = db.collection("Study Spots");

    spotsRef.add({
        code: "CafVan04",
        name: "Cafe", //replace with your own city?
        city: "Vancouver",
        province: "BC",
        wifi: "yes",
        outlets: "yes",
        washrooms: "yes",
        details: "Quiet ambiance, friendly staff, great place to study!",
        open: "9:00am",      //number value
        close: "10:00pm",     //number value
        lat: 49.2467097082573,
        lng: -122.9187029619698,
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });
    spotsRef.add({
        code: "LiS01",
        name: "Semiahmoo Library", //replace with your own city?
        city: "Surrey",
        province: "BC",
        wifi: "yes",
        outlets: "yes",
        washrooms: "yes",
        details: "Quiet rooms, chill place to study",
        open: "9:30am",      //number value
        close: "9:00pm",     //number value
        lat: 49.3399431028579,
        lng: -122.85908496766939,
        last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 10, 2022"))
    });
    spotsRef.add({
        code: "OtWR03",
        name: "Park", //replace with your own city?
        city: "White ROck",
        province: "BC",
        wifi: "no",
        outlets: "no",
        washrooms: "yes",
        details: "Great place to get fresh air and study!",
        open: "sunrise",      //number value
        close: "sunset",     //number value
        lat: 49.38847101455571,
        lng: -122.94092543551031,
        last_updated: firebase.firestore.Timestamp.fromDate(new Date("January 1, 2023"))
    });
}

writeSpots();
insertNameFromFirestore();
readQuote("tuesday");        //calling the function
getNameFromAuth(); //run the function
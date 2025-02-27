const express = require("express");
const cors = require("cors");
const fs = require("fs"); // feature to read&Write files

const app = express();
/***Create a new booking
Read all bookings
Read one booking, specified by an ID
Delete a booking, specified by an ID */

app.use(express.json());
app.use(cors());

//Use this array as your (in-memory) data store.
const bookingData = require("./bookings.json");
//const bookingData = JSON.parse(fs.readFileSync('./bookingData.json', 'utf8'));

app.get("/", function (req, res) {
  res.send("Hotel booking server.  Ask for /bookings, etc.");
});

//read
app.get("/bookings", function (req, res) {
  res.status(200).send(bookingData);
  // res.status(200).json({ message:"Booking data available"});
});

//let x = [0,1,2,3,4,5,6,7]
//x[8] = x[x.length] = undefined
//to get last thing: x[x.length-1]

app.post("/bookings", function (req, res) {
  //create a unique id for the booking
  //const id = bookingData.length; requires the id to match the index in the array

  //bookingData[bookingData.length-1] = last booking in the array
  //bookingData[bookingData.length-1].id = ID of last booking in the array
  //bookingData[bookingData.length-1].id + 1 = ID  of last booking in the array plus 1
  const newId = bookingData[bookingData.length - 1].id + 1;

  //METHOD 1
  //const lastBookingIndex = bookingData.length - 1;
  //const lastBooking = bookingData[lastBookingIndex];
  //const lastBookingId = lastBooking.id;
  //const newIdThatDoesNotExistAnywhereYet = lastBookingId + 1;

  //METHOD 2
  //const id = bookingData[bookingData.length-1].id + 1;

  //METHOD 1 AND METHOD 2 DO THE SAME THING

  //add the new booking to the "data" array
  let newBooking = { id: newId, ...req.body };
  bookingData.push(newBooking);

  /*
  This code might not actually work and is a best guess at what you need to do

  // const checkInDate = req.body.checkInDate; //formatted like yyyy-mm-dd
  // const checkOutDate = req.body.checkOutDate;

  // //NOTE: these will probably throw an exception if the date is malformed
  // // or maybe the return value will be undefined
  // const validCheckInDate = dayjs(checkInDate);
  // const validCheckOutDate = dayjs(checkOutDate);

  // const dateDiff = validCheckInDate.diff(validCheckOutDate);
  // if(dateDiff < 0) {
  //   //BAD STUFF HAPPENED (OUT DATE IS BEFORE IN DATE)
  // }
  // */
  // // add error handling
  // // validate the input

  // // TODO

  //send the response
  fs.writeFileSync(
    "./bookings.json",
    JSON.stringify(bookingData, null, 2),
    () => {}
  ); // logic for adding -formats the file immediately

  res.sendStatus(200).json("Booking successful");
}); // TODO add your routes and helper functions here


// app.get("/bookings/:id", function (req, res) {
//   const searchId = parseInt(req.params.id);
//   let foundBooking= {}
//   console.log(searchId)
//   foundBooking = bookingData.find((booking) => {
//     // console.log("booking id", booking.id === searchId)
//     if (searchId === booking.id) {
//        return booking
//     }
//   // return res.status(200).send(foundBooking)

//   });
//   // if (foundId === undefined) {
//   // }
//   console.log("FB", foundBooking)
//    res.status(200).send(foundBooking);
//   // res.status(200).json({ message:"Booking data available"});
// });


// app.get("/bookings/:id", function (req, res) {
//   const searchId = parseInt(req.params.id);
//   try {
//     const foundBooking = bookingData.find((booking) => {
//       // function looks for the first element that matches the condition, starting from index 0
//       // console.log("booking id", booking.id === searchId)
//       if (searchId === booking.id) {
//         return booking;
//       }
//     });
//     // if (foundId === undefined) {
//     // }
//     res.status(200).send(foundBooking);
//     // res.status(200).json({ message:"Booking data available"});
//   } catch (error) {
//     console.log(error.booking);
//     res.sendStatus(400);
//   }
// });


// app.post("/bookings", function (req, res) {
//   //create a unique id for the booking
//   //const id = bookingData.length; requires the id to match the index in the array

//   //bookingData[bookingData.length-1] = last booking in the array
//   //bookingData[bookingData.length-1].id = ID of last booking in the array
//   //bookingData[bookingData.length-1].id + 1 = ID  of last booking in the array plus 1
//   const newId = bookingData[bookingData.length - 1].id + 1;

//   //METHOD 1
//   //const lastBookingIndex = bookingData.length - 1;
//   //const lastBooking = bookingData[lastBookingIndex];
//   //const lastBookingId = lastBooking.id;
//   //const newIdThatDoesNotExistAnywhereYet = lastBookingId + 1;

//   //METHOD 2
//   //const id = bookingData[bookingData.length-1].id + 1;

//   //METHOD 1 AND METHOD 2 DO THE SAME THING

//   //add the new booking to the "data" array
//   let newBooking = { id: newId, ...req.body };
//   bookingData.push(newBooking);

//   /*
//   This code might not actually work and is a best guess at what you need to do

//   const checkInDate = req.body.checkInDate; //formatted like yyyy-mm-dd
//   const checkOutDate = req.body.checkOutDate;

//   //NOTE: these will probably throw an exception if the date is malformed
//   // or maybe the return value will be undefined
//   const validCheckInDate = dayjs(checkInDate);
//   const validCheckOutDate = dayjs(checkOutDate);

//   const dateDiff = validCheckInDate.diff(validCheckOutDate);
//   if(dateDiff < 0) {
//     //BAD STUFF HAPPENED (OUT DATE IS BEFORE IN DATE)
//   }
//   */
//   // add error handling
//   // validate the input

//   // TODO

//   //send the response
//   fs.writeFileSync(
//     "./bookings.json",
//     JSON.stringify(bookingData, null, 2),
//     () => {}
//   ); // logic for adding -formats the file immediately

//   res.sendStatus(200).json("Booking successful");
// }); // TODO add your routes and helper functions here











//Create
// app.post("/messages", (req, res) => {
//   let newMessage = req.body;
//   console.log("req body", req.body);
//   if (!newMessage.from || !newMessage.text) {
//     res.status(400); // level 2
//     res.send({ message: "bad data" });
//   } else {
//     const id = parseInt(welcomeMessage[welcomeMessage.length - 1].id) + 1; // adds 1 to the last index
//     newMessage = { id, ...newMessage };
//     newMessage.timeSent = new Date(); // level 4
//     welcomeMessage.push(newMessage); // id from text
//     res.status(201);
//     // res.send(newMessage);
//   }
//   fs.writeFileSync("./data.json", JSON.stringify(welcomeMessage), () => {});
//   res.send(newMessage);
// });

const listener = app.listen(process.env.PORT || 4040, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

// fs.writeFileSync("./data.json", JSON.stringify(welcomeMessage), () => {});

// const PORT = process.env.PORT || 4003;
// app.listen(PORT, () => console.log(`Your app is listening ...${PORT}`));




// old search 


// search term
// app.get("/booking/search", function (req, res) {
//   try {
//     const searchedDate = req.query.date;
//     // let convertedDate = moment([searchedDate]);
//     console.log("search",searchedDate);
//     // console.log(typeof(searchedDate), "get search date");
//     // res.send(search(searchedDate));
//         res.send(search(searchedDate));

//     // res.send(search(searchedDate, bookingData));
//   } catch (error) {
//     // console.log(error.message);
//     res.sendStatus(400);
//   }
// });

// // /bookings/search?date=2019-05-20
// function Search(date, bookingData) {
//   const convertedCheckInDate = dayjs(booking.checkInDate);
//   const convertedCheckOutDate = dayjs(booking.checkOutDate);
//   bookingData.map((booking) => {
//     booking.checkInDate.includes(date) || booking.checkout.includes(date);
//     if (convertedCheckInDate === date || convertedCheckOutDate === date) {
//       return booking
//     }
//   });
// }

// function search(date, bookingData) {
//   bookingData.map((booking) => {
//       // const convertedCheckInDate = moment([booking.checkInDate]);
//       const convertedCheckInDate = dayjs(booking.checkInDate);
//     if (convertedCheckInDate === date) {
//       // console.log("search func", typeof date);
//       return booking;
//     }
//     // || booking.checkOutDate.includes(date);
//   });
// }

// const bookingEmail = req.body.email;
  // // console.log("email", bookingEmail);
  // if (bookingEmail.includes("@")) {
  //   console.log(bookingEmail);
  // } else if (bookingEmail != bookingEmail.includes("@")) {
  //   res.status(400);
  // } else {
  //   res.status(400);
  // }

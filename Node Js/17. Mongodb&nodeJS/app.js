const { MongoClient, ObjectId } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";
const dbNama = "db_test";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((error, client) => {
  if (error) {
    return console.log("Koneksi Gagal");
  }

  const db = client.db(dbNama);

  // ADDING 1 DATA TO COLLECTION Mahasiswa
  //   db.collection("Mahasiswa").insertOne(
  //     {
  //       nama: "Erik",
  //       email: "erik12@gmail.com",
  //     },
  //     (error, result) => {
  //       if (error) {
  //         return console.log("Gagal Menambahkan Data MasPur!");
  //       }
  //       console.log(result);
  //     }
  //   );

  // ADDING MANY DATA TO COLLECTION Mahasiswa
  //   db.collection("Mahasiswa").insertMany(
  //     [
  //       {
  //         nama: "aqua",
  //         email: "aqua12@gmail.com",
  //       },
  //       {
  //         nama: "akane",
  //         email: "akane12@gmail.com",
  //       },
  //     ],
  //     (error, result) => {
  //       if (error) {
  //         return console.log("Gagal Menambahkan Data MasPur!");
  //       }
  //       console.log(result);
  //     }
  //   );

  // SHOW ALL DATA
  // console.log(
  //     db
  //     .collection('Mahasiswa')
  //     .find()
  //     .toArray((error,result) =>{
  //         console.log(result);
  //     })
  // );

  // SHOW DATA BASED ON CRITERIA
  // console.log(
  //     db
  //     .collection('Mahasiswa')
  //     .find( { _id: ObjectId('68c3babba13de2257068ec9d')})
  //     .toArray((error,result) =>{
  //         console.log(result);
  //     })
  // );

  // EDIT DATA BY CRETERIA
  //   const updateData = db.collection("Mahasiswa").updateOne(
  //     {
  //       _id: ObjectId("68c3babba13de2257068ec9d"),
  //     },
  //     {
  //       $set: {
  //         email: "akane123@yahoo.com",
  //       },
  //     }
  //   );

  //   updateData
  //     .then((result) => {
  //       console.log(result);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });

  // DELETE DATA
  db.collection("Mahasiswa")
    .deleteOne({
      nama: "purwa",
    }) 
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
});

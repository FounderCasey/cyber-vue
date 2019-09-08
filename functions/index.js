const functions = require('firebase-functions');
const stripe = require('stripe')('sk_test_6Tb9b7fn7kR3c9vcKoYOW1kp00vvWV2cKg');
const cors = require('cors')({
  origin: true
});
const admin = require('firebase-admin');

admin.initializeApp();

exports.PurchaseAd = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    const token = request.body.stripeToken;
    const db = functions.firestore.document(`postings/{id}`);
    const charge = await stripe.charges.create({
      amount: 9999,
      currency: 'usd',
      description: 'CyberJobs Posting',
      source: "tok_mastercard",
    }, function (error, charge) {
      // asynchronously called
      if (error) {
        console.log(error);
      } else {
        console.log(charge);
      }
    });
  });
});
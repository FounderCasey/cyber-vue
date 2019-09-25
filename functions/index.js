const functions = require('firebase-functions');
const stripe = require('stripe')('sk_test_6Tb9b7fn7kR3c9vcKoYOW1kp00vvWV2cKg');
const cors = require('cors')({
  origin: true
});
const admin = require('firebase-admin');

admin.initializeApp();

exports.Purchase = functions.https.onCall((data) => {
  var paymentSuccess = false;
  const stripe = require('stripe')('sk_test_6Tb9b7fn7kR3c9vcKoYOW1kp00vvWV2cKg');

  const token = data.token;

  let myFirstPromise = new Promise((resolve, reject) => {
    let payment = false;
    const charge = stripe.charges.create({
      amount: 99999,
      currency: 'usd',
      description: 'TEST CHARGE',
      source: token.id
    }).then((result) => {
      if (result.status === 'succeeded') {
        payment = true;
        console.log("Payment was successful, update payment");
        resolve(payment)
      }
      return payment;
    }).catch((err) => {
      throw new functions.https.HttpsError('unknown', err.message, err)
    })
  });

  return myFirstPromise.then((payment) => {
    console.log(payment);
    return {
      payment: payment
    }
  })
});
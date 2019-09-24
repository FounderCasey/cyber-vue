const functions = require('firebase-functions');
const stripe = require('stripe')('sk_test_6Tb9b7fn7kR3c9vcKoYOW1kp00vvWV2cKg');
const cors = require('cors')({
  origin: true
});
const admin = require('firebase-admin');

admin.initializeApp();

exports.Purchase = functions.https.onCall((data, context) => {
  const stripe = require('stripe')('sk_test_6Tb9b7fn7kR3c9vcKoYOW1kp00vvWV2cKg');

  const token = data.token;

  console.log(token);

  (async () => {
    const charge = await stripe.charges.create({
      amount: 99999,
      currency: 'usd',
      description: 'TEST CHARGE',
      source: token.id,
    });
  })();
});
const functions = require('firebase-functions');
const stripe = require('stripe')('sk_test_6Tb9b7fn7kR3c9vcKoYOW1kp00vvWV2cKg');
const cors = require('cors')({
  origin: true
});
const admin = require('firebase-admin');

admin.initializeApp();

exports.CheckoutSession = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {

    stripe.checkout.sessions.create({
      success_url: "https://cyber-board.firebaseapp.com",
      cancel_url: "https://example.com/cancel",
      payment_method_types: ["card"],
      line_items: [{
        name: 'CyberJobs Posting',
        description: 'The first step to hiring a great security team.',
        images: ['https://images.unsplash.com/photo-1511919884226-fd3cad34687c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'],
        amount: 9900,
        currency: 'usd',
        quantity: 1,
      }]
    }, function (err, session) {
      response.send(session)
    });
  });
});

exports.PurchaseAd = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    const token = request.body.stripeToken;
    console.log(token)
    const charge = await stripe.charges.create({
      amount: 9999,
      currency: 'usd',
      description: 'Example charge',
      source: token,
    });
    console.log("Should have went through")
  });
});
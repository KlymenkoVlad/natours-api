/* eslint-disable */

import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51N0mJRJu0Pr4kOZ7FBGYXCvLYYKjwfNwxmhP8CzNHSV0bfiRc0TUuTGr4WWLN07SHdwymMyZDPxrD5VkrI9tsDOX00IHt8lwbU'
);

export const bookTour = async (tourId) => {
  try {
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);

    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (error) {
    console.error(error);
    showAlert('error', error);
  }
};

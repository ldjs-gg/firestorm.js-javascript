/**
 * Stripe Payment Functions
 * 
 * Functions for handling Stripe payment integration including:
 * - Checkout session creation
 * - Customer portal access
 * - Firebase integration
 */

'use client'

import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  getFirestore,
  onSnapshot,
} from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";

/**
 * Creates a Stripe checkout session and returns the checkout URL
 * 
 * @param {import('firebase/app').FirebaseApp} app - The Firebase app instance
 * @param {string} priceId - The Stripe price ID for the subscription
 * @returns {Promise<string>} The URL to redirect to for Stripe checkout
 * @throws {Error} If user is not authenticated or if checkout session creation fails
 */
export const getCheckoutUrl = async (app, priceId) => {
  const auth = getAuth(app);
  const userId = auth.currentUser?.uid;
  if (!userId) throw new Error("User is not authenticated");

  const db = getFirestore(app);
  const checkoutSessionRef = collection(
    db,
    "users",
    userId,
    "checkout_sessions"
  );

  const docRef = await addDoc(checkoutSessionRef, {
    price: priceId,
    success_url: `${window.location.origin}/dashboard`,
    cancel_url: `${window.location.origin}/dashboard`,
  });

  return new Promise((resolve, reject) => {
    const unsubscribe = onSnapshot(docRef, (snap) => {
      const { error, url } = snap.data();
      if (error) {
        unsubscribe();
        reject(new Error(`An error occurred: ${error.message}`));
      }
      if (url) {
        console.log("Stripe Checkout URL:", url);
        unsubscribe();
        resolve(url);
      }
    });
  });
};

/**
 * Creates a Stripe customer portal session and returns the portal URL
 * 
 * @param {import('firebase/app').FirebaseApp} app - The Firebase app instance
 * @returns {Promise<string>} The URL to redirect to for the Stripe customer portal
 * @throws {Error} If user is not authenticated or if portal session creation fails
 */
export const getPortalUrl = async (app) => {
  const auth = getAuth(app);
  const user = auth.currentUser;
  
  if (!user) throw new Error("User is not authenticated");

  try {
    const functions = getFunctions(app, "europe-west2");
    const functionRef = httpsCallable(functions, "ext-firestore-stripe-payments-createPortalLink");
    
    const { data } = await functionRef({
      returnUrl: `${window.location.origin}/dashboard`
    });

    // The response data should contain the URL
    if (!data?.url) {
      throw new Error("No portal URL returned");
    }

    return data.url;
  } catch (error) {
    console.error("Error getting portal URL:", error);
    throw error;
  }
}; 
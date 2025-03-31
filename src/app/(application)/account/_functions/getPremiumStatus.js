/**
 * Premium Status Check Function
 * 
 * Function for checking a user's premium subscription status.
 * Features include:
 * - Real-time subscription status monitoring
 * - Firebase Firestore integration
 * - Active and trialing subscription detection
 */

import { getAuth } from "firebase/auth";
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

/**
 * Checks if the current user has an active or trialing subscription
 * 
 * @param {import('firebase/app').FirebaseApp} app - The Firebase app instance
 * @returns {Promise<boolean>} True if user has an active/trialing subscription, false otherwise
 * @throws {Error} If user is not logged in or if subscription check fails
 */
export const getPremiumStatus = async (app) => {
  const auth = getAuth(app);
  const userId = auth.currentUser?.uid;
  if (!userId) throw new Error("User not logged in");

  const db = getFirestore(app);
  const subscriptionsRef = collection(db, "users", userId, "subscriptions");
  const q = query(
    subscriptionsRef,
    where("status", "in", ["trialing", "active"])
  );

  return new Promise((resolve, reject) => {
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        // In this implementation we only expect one active or trialing subscription to exist.
        console.log("Subscription snapshot", snapshot.docs.length);
        if (snapshot.docs.length === 0) {
          console.log("No active or trialing subscriptions found");
          resolve(false);
        } else {
          console.log("Active or trialing subscription found");
          resolve(true);
        }
        unsubscribe();
      },
      reject
    );
  });
}; 
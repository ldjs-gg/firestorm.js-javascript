/**
 * Premium Feature B Page Component
 * 
 * A premium feature page that:
 * - Requires user authentication
 * - Requires premium subscription
 * - Redirects non-premium users
 * - Provides access to premium features
 */

'use client'

import { initFirebase } from "../../../firebase";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getPremiumStatus } from "../account/_functions/getPremiumStatus";

/**
 * Premium Feature B Page Component
 * 
 * Renders the premium feature interface with authentication and subscription protection.
 * 
 * @returns {JSX.Element} The premium feature page
 */
export default function PremiumFeatureB() {
  const app = initFirebase();
  const auth = getAuth(app);
  const router = useRouter();
  const [user, setUser] = useState(auth.currentUser);
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      if (!user) {
        router.push("/");
        return;
      }
      
      // Check premium status
      const premiumStatus = await getPremiumStatus(app);
      setIsPremium(premiumStatus);
      
      if (!premiumStatus) {
        router.push("/dashboard");
      }
    });

    return () => unsubscribe();
  }, [auth, router, app]);

  if (!user || !isPremium) {
    return null; // or a loading spinner
  }

  return (
    <div className="p-4 bg-background h-[calc(100vh-65px)]">
      <h5 className="font-bold text-foreground">Premium Feature B</h5>
    </div>
  );
} 
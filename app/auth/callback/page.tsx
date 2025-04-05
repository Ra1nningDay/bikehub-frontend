"use client";

import { useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/auth/use-auth";
import type { User } from "@/lib/auth-store";
import { FullScreenLoader } from "@/components/ui/FullScreenLoader";

// การห่อหุ้ม AuthCallback ด้วย Suspense
const AuthCallbackWithSuspense = () => (
  <Suspense fallback={<FullScreenLoader />}>
    <AuthCallback />
  </Suspense>
);

export default AuthCallbackWithSuspense;

function AuthCallback() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { handleProviderCallback, isLoading, error } = useAuth();
  const hasProcessed = useRef(false);

  useEffect(() => {
    if (isLoading || hasProcessed.current) {
      return;
    }

    const token = searchParams.get("token");
    const encodedUserData = searchParams.get("user");

    if (token && encodedUserData) {
      hasProcessed.current = true;
      try {
        const decodedUserData = decodeURIComponent(encodedUserData);
        const user: User = JSON.parse(decodedUserData);

        // console.log("Received from callback:", { token, user });

        // calling handleProviderCallback with token and user
        const success = handleProviderCallback(token, user);

        if (success) {
          console.log("Provider callback handled successfully. Redirecting...");
          // Redirect to the original URL or home page if successful
          const redirectUrl = localStorage.getItem("redirectAfterLogin") || "/";
          localStorage.removeItem("redirectAfterLogin"); //clear the redirect URL after using it
          setTimeout(() => {
            router.push(redirectUrl);
          }, 1000); // Optional delay for better UX
        } else {
          console.error("Failed to handle provider callback in useAuth.");

          router.push("/login?error=callback_processing_failed");
        }
      } catch (parseError) {
        console.error("Failed to parse user data from URL:", parseError);
        router.push("/login?error=invalid_callback_data");
      }
    } else if (!isLoading) {
      hasProcessed.current = true;
      console.warn("Token or user data missing in callback URL.");
      router.push("/login?error=missing_callback_info");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, isLoading, handleProviderCallback, router]);

  // แสดงสถานะ Loading หรือ Error
  if (isLoading) {
    return <div>Processing login... Please wait.</div>;
  }

  // แสดงข้อผิดพลาดจาก Auth Store ถ้ามี
  if (error && !isLoading) {
    return (
      <div>
        Error during login: {error}. Please try <a href="/login">logging in</a>{" "}
        again.
      </div>
    );
  }

  // Fallback loading state
  return <FullScreenLoader />;
}

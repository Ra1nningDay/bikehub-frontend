"use client";

import { useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/auth/use-auth";
import { FullScreenLoader } from "@/components/ui/FullScreenLoader";

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

    const encodedUserData = searchParams.get("user");
    const encodedToken = searchParams.get("token");

    if (encodedUserData && encodedToken) {
      hasProcessed.current = true;

      try {
        const decodedUserData = decodeURIComponent(encodedUserData);
        const decodedToken = decodeURIComponent(encodedToken);

        const user = JSON.parse(decodedUserData);
        const token = decodedToken; // ไม่ต้อง parse อีกเพราะ token เป็น string
        handleProviderCallback(token, user);
        // ทำการจัดการ user data ได้ที่นี่ เช่น ส่งไปยัง context หรือ store
        router.push("/");
      } catch (parseError) {
        console.error("Failed to parse user data from URL:", parseError);
        router.push("/login?error=invalid_callback_data");
      }
    } else if (!isLoading) {
      hasProcessed.current = true;
      console.warn("User data missing in callback URL.");
      router.push("/login?error=missing_callback_info");
    }
  }, [searchParams, isLoading, handleProviderCallback, router]);

  if (isLoading) {
    return <div>Processing login... Please wait.</div>;
  }

  if (error && !isLoading) {
    return (
      <div>
        Error during login: {error}. Please try <a href="/login">logging in</a>{" "}
        again.
      </div>
    );
  }

  return (
    <div>
      <FullScreenLoader />
    </div>
  );
}

// ใน Component ที่รับ Callback เช่น pages/auth/callback.tsx หรือ app/auth/callback/page.tsx
"use client";

import { useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/auth/use-auth"; // Import hook ที่แก้ไขแล้ว
import type { User } from "@/lib/auth-store"; // หรือ "@/lib/auth-store"
import { FullScreenLoader } from "@/components/ui/FullScreenLoader"; // Import FullScreenLoader

export default function AuthCallback() {
    const searchParams = useSearchParams();
    const router = useRouter();
    // ดึงฟังก์ชันใหม่และ state ที่เกี่ยวข้องจาก useAuth
    const { handleProviderCallback, isLoading, error } = useAuth();
    const hasProcessed = useRef(false); // ป้องกันการเรียกซ้ำ

    useEffect(() => {
        // ไม่ต้องทำอะไรถ้ากำลังโหลด หรือเคยประมวลผลไปแล้ว
        if (isLoading || hasProcessed.current) {
            return;
        }

        const token = searchParams.get("token");
        const encodedUserData = searchParams.get("user");
        const errorParam = searchParams.get("error"); // เช็ค error จาก query params ด้วย

        if (errorParam) {
            console.error("Error received from provider redirect:", errorParam);
            hasProcessed.current = true;
            router.push(
                `/login?error=provider_error&message=${encodeURIComponent(
                    errorParam
                )}`
            );
            return;
        }

        if (token && encodedUserData) {
            hasProcessed.current = true; // ทำเครื่องหมายว่ากำลังประมวลผล
            try {
                // Decode และ Parse ข้อมูล user
                const decodedUserData = decodeURIComponent(encodedUserData);
                const user: User = JSON.parse(decodedUserData);

                // console.log("Received from callback:", { token, user });

                // เรียกฟังก์ชันใหม่ใน useAuth
                const success = handleProviderCallback(token, user);

                if (success) {
                    console.log(
                        "Provider callback handled successfully. Redirecting..."
                    );
                    // Redirect ไปหน้าหลักหรือหน้าที่ต้องการหลัง login สำเร็จ
                    const redirectUrl =
                        localStorage.getItem("redirectAfterLogin") || "/";
                    localStorage.removeItem("redirectAfterLogin"); // เคลียร์ redirect URL
                    router.push(redirectUrl);
                } else {
                    console.error(
                        "Failed to handle provider callback in useAuth."
                    );
                    // ถ้า handleProviderCallback คืน false (เกิด error ภายใน)
                    router.push("/login?error=callback_processing_failed");
                }
            } catch (parseError) {
                console.error(
                    "Failed to parse user data from URL:",
                    parseError
                );
                router.push("/login?error=invalid_callback_data");
            }
        } else if (!isLoading) {
            // กรณีไม่มี token หรือ user data มาใน URL และไม่ได้กำลังโหลด
            hasProcessed.current = true;
            console.warn("Token or user data missing in callback URL.");
            router.push("/login?error=missing_callback_info");
        }

        // Dependency array ควรมีค่าที่ effect นี้ขึ้นอยู่ด้วย
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
                Error during login: {error}. Please try{" "}
                <a href="/login">logging in</a> again.
            </div>
        );
    }

    // Fallback loading state
    return <FullScreenLoader />;
}

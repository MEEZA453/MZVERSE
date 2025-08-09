"use client";
import { Suspense } from "react";
import OtpContent from "../Components/OtpContent";

export default function OtpPage() {
  return (
    <Suspense fallback={<div>Loading OTP page...</div>}>
      <OtpContent />
    </Suspense>
  );
}

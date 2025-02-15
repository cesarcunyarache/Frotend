import React, { Suspense } from "react";
import ForgotPassword from "@/features/auth/ui/components/forms/ForgotPassword";
import SplitLayout from "@/features/auth/ui/components/layout/SplitLayout";

const Page = () => {
  return (
    <Suspense>
      <SplitLayout>
        <ForgotPassword />
      </SplitLayout>
    </Suspense>
  );
};

export default Page;

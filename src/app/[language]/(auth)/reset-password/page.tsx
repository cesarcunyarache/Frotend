import React, { Suspense } from "react";
import ResetPassword from "@/features/auth/ui/components/forms/ResetPassword";
import SplitLayout from "@/features/auth/ui/components/layout/SplitLayout";

const Page = () => {
  return (
    <Suspense>
      <SplitLayout>
        <ResetPassword />
      </SplitLayout>
    </Suspense>
  );
};

export default Page;

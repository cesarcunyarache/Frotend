import { Suspense } from "react";
import VerifyMfa from "@/features/auth/ui/components/forms/VerifyMFA";
import SplitLayout from "@/features/auth/ui/components/layout/SplitLayout";

const Page = () => {
  return (
    <Suspense>
      <SplitLayout>
        <VerifyMfa />;
      </SplitLayout>
    </Suspense>
  );
};

export default Page;

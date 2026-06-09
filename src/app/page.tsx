import { Suspense } from "react";
import AppShell from "@/components/AppShell";

const HomePage = () => {
  return (
    <Suspense fallback={null}>
      <AppShell />
    </Suspense>
  );
};

export default HomePage;

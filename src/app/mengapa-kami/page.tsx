import { Suspense } from "react";
import MengapaKamiView from "@/components/MengapaKamiView";
import MobileAppFrame from "@/components/MobileAppFrame";

const MengapaKamiPage = () => {
  return (
    <Suspense fallback={null}>
      <MobileAppFrame>
        <MengapaKamiView />
      </MobileAppFrame>
    </Suspense>
  );
};

export default MengapaKamiPage;

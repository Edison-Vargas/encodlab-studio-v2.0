import { AppLayout } from "@/components/layout/AppLayout";
import { JWTEncoder } from "@/components/jwt/JWTEncoder";

const Encoder = () => {
  return (
    <AppLayout>
      <JWTEncoder />
    </AppLayout>
  );
};

export default Encoder;
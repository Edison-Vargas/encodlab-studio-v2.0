import { AppLayout } from "@/components/layout/AppLayout";
import { JWTGenerator } from "@/components/jwt/JWTGenerator";

const Generator = () => {
  return (
    <AppLayout>
      <JWTGenerator />
    </AppLayout>
  );
};

export default Generator;
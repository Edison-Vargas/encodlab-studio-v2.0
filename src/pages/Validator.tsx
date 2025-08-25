import { AppLayout } from "@/components/layout/AppLayout";
import { JWTValidator } from "@/components/jwt/JWTValidator";

const Validator = () => {
  return (
    <AppLayout>
      <JWTValidator />
    </AppLayout>
  );
};

export default Validator;
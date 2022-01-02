import { Provider } from "../constants/provider.enum";

export interface JwtPayload {
  userId: string;
  providerId?: string;
  provider: Provider;
}

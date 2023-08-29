import { TAddressUpdate } from "@/interfaces/address";
import { TUserRegisterResquest } from "@/interfaces/user";

export interface IUserContext {
  patchUser: (data: TUserRegisterResquest) => Promise<void>;
  destroyUser: () => Promise<void>;
  editUserAddress: (data: TAddressUpdate) => Promise<void>;
}

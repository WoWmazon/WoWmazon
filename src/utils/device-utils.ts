import { randomUUID } from "crypto";

export const createDeviceInfo = (): DeviceType => ({
  os: Math.random() > 0.5 ? "android" : "ios",
  uid: "uid:" + randomUUID(),
  token: "token:" + randomUUID(),
});

import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

const STORAGE_KEY = "zyralex:server_ip_override";
const DEFAULT_PORT = 8000;

let cachedOverride: string | null = null;
let overrideLoaded = false;

async function loadOverride(): Promise<string | null> {
  if (overrideLoaded) return cachedOverride;
  try {
    cachedOverride = await AsyncStorage.getItem(STORAGE_KEY);
  } catch {
    cachedOverride = null;
  }
  overrideLoaded = true;
  return cachedOverride;
}

function getHostFromExpo(): string | null {
  const hostUri =
    Constants.expoConfig?.hostUri ??
    (Constants as any).manifest2?.extra?.expoClient?.hostUri ??
    (Constants as any).manifest?.debuggerHost ??
    null;

  if (!hostUri) return null;
  return hostUri.replace("exp://", "").split(":")[0];
}
export async function resolveServerIp(): Promise<string | null> {
  const override = await loadOverride();
  if (override) return override;
  return getHostFromExpo();
}

export async function setServerIpOverride(ip: string | null) {
  cachedOverride = ip && ip.trim().length > 0 ? ip.trim() : null;
  overrideLoaded = true;
  if (cachedOverride) {
    await AsyncStorage.setItem(STORAGE_KEY, cachedOverride);
  } else {
    await AsyncStorage.removeItem(STORAGE_KEY);
  }
}

export async function clearServerIpOverride() {
  await setServerIpOverride(null);
}

export function buildUrls(ip: string) {
  return {
    base: `http://${ip}:${DEFAULT_PORT}`,
    ws: `ws://${ip}:${DEFAULT_PORT}/ws/app`,
  };
}
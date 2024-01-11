import {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
  useMemo,
} from "react";
import CryptoJS from "crypto-js";
import SHA256 from 'crypto-js/sha256';
import PocketBase from "pocketbase";
import { useInterval } from "usehooks-ts";
import { jwtDecode } from "jwt-decode";
import ms from "ms";

const BASE_URL = "http://127.0.0.1:8090";
const fiveMinutesInMs = ms("5 minutes");
const twoMinutesInMs = ms("2 minutes");

const PocketContext = createContext({});


export const PocketProvider = ({ children }) => {
  const pb = useMemo(() => new PocketBase(BASE_URL), []);

  const [token, setToken] = useState(pb.authStore.token);
  const [user, setUser] = useState(pb.authStore.model);
  const [password, setPassword] = useState(null);
  const [hashedPassword, setHashedPassword] = useState(null);

  useEffect(() => {
    return pb.authStore.onChange((token, model) => {
      setToken(token);
      setUser(model);
    });
  }, []);

  const hashPassword = (password) => {
    const ciphertext = SHA256(password).toString();
    return ciphertext;
  }

  const setAndHashPassword = (password) => {
    setPassword(password)
    const ciphertext = hashPassword(password)
    setHashedPassword(ciphertext)
    console.log(ciphertext)
    return ciphertext
  }

  const encryptData = (data) => {
    //const secretKey = import.meta.env.VITE_SECRET_SIGNATURE; // SecretENVKeyEncryption
    const secretKey = getHashedPassword(); // SecretPasswordKeyEncryption
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
    return encryptedData;
  }


  const decryptData = (encryptedData) => {
    //const secretKey = import.meta.env.VITE_SECRET_SIGNATURE; // SecretENVKeyEncryption
    const secretKey = getHashedPassword(); // SecretPasswordKeyEncryption
    var bytes  = CryptoJS.AES.decrypt(encryptedData, secretKey);
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  }

  const getPassword = () => {
    return password;
  }

  const getHashedPassword = () => {
    return hashedPassword;
  }

  const register = useCallback(async (email, password) => {
    return await pb
      .collection("users")
      .create({ email, password, passwordConfirm: password });
  }, []);

  const login = useCallback(async (email, password) => {
    return await pb.collection("users").authWithPassword(email, password);
  }, []);

  const logout = useCallback(() => {
    setHashedPassword(null);
    setPassword(null);
    pb.authStore.clear();
  }, []);

  const refreshSession = useCallback(async () => {
    if (!pb.authStore.isValid) return;
    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp;
    const expirationWithBuffer = (decoded.exp + fiveMinutesInMs) / 1000;
    if (tokenExpiration < expirationWithBuffer) {
      await pb.collection("users").authRefresh();
    }
  }, [token]);

  useInterval(refreshSession, token ? twoMinutesInMs : null);

  return (
    <PocketContext.Provider
      value={{ register, login, logout, hashPassword, setAndHashPassword, getPassword, getHashedPassword, hashedPassword, encryptData, decryptData, user, token, pb }}
    >
      {children}
    </PocketContext.Provider>
  );
};

export const usePocket = () => useContext(PocketContext);

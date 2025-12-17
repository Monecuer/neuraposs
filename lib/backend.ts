import { Client } from "../client";
import { useAuth } from "@clerk/clerk-react";

const backend = new Client("https://anesu.monecuer.com");

export function useBackend() {
  const { isSignedIn, getToken } = useAuth();

  if (!isSignedIn) {
    return backend;
  }

  return backend.with({
    auth: async () => {
      const token = await getToken({
        template: "jwt-template-name", // EXACT name from Clerk PROD
      });

      return {
        authorization: `Bearer ${token}`,
      };
    },
  });
}

import { Property } from "@/types/property";
import * as Linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";
import {
  Account,
  Avatars,
  Client,
  OAuthProvider,
  Query,
  TablesDB,
} from "react-native-appwrite";

export const config = {
  platform: "com.apnaghar.estate",
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  galleriesTableId: process.env.EXPO_PUBLIC_APPWRITE_GALLERIES_TABLE_ID,
  reviewsTableId: process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_TABLE_ID,
  agentsTableId: process.env.EXPO_PUBLIC_APPWRITE_AGENTS_TABLE_ID,
  propertiesTableId: process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_TABLE_ID,
};

export const client = new Client();

client
  .setEndpoint(config.endpoint!)
  .setProject(config.projectId!)
  .setPlatform(config.platform!);

export const avatar = new Avatars(client);
export const account = new Account(client);
export const tablesDB = new TablesDB(client);

export async function login() {
  try {
    const redirectUri = Linking.createURL("/");

    const response = await account.createOAuth2Token(
      OAuthProvider.Google,
      redirectUri,
    );

    if (!response) throw new Error("Failed to Login");

    const browserResult = await openAuthSessionAsync(
      response.toString(),
      redirectUri,
    );

    if (browserResult.type !== "success") throw new Error("Failed to Login");

    const url = new URL(browserResult.url);

    const secret = url.searchParams.get("secret")?.toString();
    const userId = url.searchParams.get("userId")?.toString();

    if (!secret || !userId) throw new Error("Failed to Login");

    const session = await account.createSession(userId, secret);

    if (!session) throw new Error("Failed to create a session");

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function logout() {
  try {
    await account.deleteSession("current");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getCurrentUser() {
  try {
    const response = await account.get();

    if (response.$id) {
      const avatarUrl = `${config.endpoint}/avatars/initials?name=${encodeURIComponent(
        response.name,
      )}&project=${config.projectId}`;

      return {
        ...response,
        avatar: avatarUrl,
      };
    }

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getLatestProperties(): Promise<Property[]> {
  try {
    const result = await tablesDB.listRows(
      config.databaseId!,
      config.propertiesTableId!,
      [Query.orderAsc("$createdAt"), Query.limit(5)],
    );

    return result.rows as unknown as Property[];
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getProperties({
  filter,
  query,
  limit,
}: {
  filter: string;
  query: string;
  limit?: number;
}): Promise<Property[]> {
  try {
    const buildQuery = [Query.orderDesc("$createdAt")];

    if (filter && filter !== "all") {
      buildQuery.push(Query.equal("type", filter));
    }

    if (query) {
      buildQuery.push(
        Query.or([
          Query.search("name", query),
          Query.search("address", query),
          Query.search("type", query),
        ]),
      );
    }

    if (limit) {
      buildQuery.push(Query.limit(limit));
    }

    const result = await tablesDB.listRows(
      config.databaseId!,
      config.propertiesTableId!,
      buildQuery,
    );

    return result.rows as unknown as Property[];
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getPropertyById({
  id,
}: {
  id: string;
}): Promise<Property> {
  try {
    const property = await tablesDB.getRow(
      config.databaseId!,
      config.propertiesTableId!,
      id,
    );

    const agent = await tablesDB.getRow(
      config.databaseId!,
      config.agentsTableId!,
      property.agent,
    );

    return {
      ...property,
      agent,
      gallery: [],
      reviews: [],
    } as unknown as Property;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

import { Ebook } from "@/types/ebook";
import { NicheData } from "@/types/niche";

// OpenAI API integration
export async function generateEbookContent(topic: string, outline: string[]) {
  try {
    const response = await fetch("/api/openai/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topic,
        outline,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate content");
    }

    return await response.json();
  } catch (error) {
    console.error("Error generating ebook content:", error);
    throw error;
  }
}

// Gumroad API integration
export async function authenticateGumroad(email: string, password: string) {
  try {
    const response = await fetch("/api/gumroad/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error("Authentication failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Error authenticating with Gumroad:", error);
    throw error;
  }
}

export async function fetchNicheAnalytics() {
  try {
    const response = await fetch("/api/gumroad/niches", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch niche analytics");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching niche analytics:", error);
    throw error;
  }
}

export async function publishToGumroad(ebook: Ebook) {
  try {
    const response = await fetch("/api/gumroad/publish", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ebook),
    });

    if (!response.ok) {
      throw new Error("Failed to publish to Gumroad");
    }

    return await response.json();
  } catch (error) {
    console.error("Error publishing to Gumroad:", error);
    throw error;
  }
}

export async function fetchUserEbooks() {
  try {
    const response = await fetch("/api/gumroad/ebooks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user ebooks");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching user ebooks:", error);
    throw error;
  }
}

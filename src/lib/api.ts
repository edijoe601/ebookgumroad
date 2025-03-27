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
    // Using Gumroad's API directly instead of a local endpoint
    // Note: In a production app, this should be done through a backend for security
    const response = await fetch("https://api.gumroad.com/v2/user/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Gumroad API error:", data);
      throw new Error(data.message || "Authentication failed");
    }

    // Store the access token for future requests
    if (data.access_token) {
      localStorage.setItem("gumroadToken", data.access_token);
    }

    return data;
  } catch (error) {
    console.error("Error authenticating with Gumroad:", error);
    throw error;
  }
}

export async function fetchNicheAnalytics() {
  try {
    const token = localStorage.getItem("gumroadToken");
    if (!token) {
      throw new Error("Not authenticated with Gumroad");
    }

    const response = await fetch("https://api.gumroad.com/v2/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Gumroad API error:", data);
      throw new Error(data.message || "Failed to fetch niche analytics");
    }

    // Process the data to extract niche analytics
    // This is a simplified example - you would need to process the actual response
    return data.products || [];
  } catch (error) {
    console.error("Error fetching niche analytics:", error);
    throw error;
  }
}

export async function publishToGumroad(ebook: Ebook) {
  try {
    const token = localStorage.getItem("gumroadToken");
    if (!token) {
      throw new Error("Not authenticated with Gumroad");
    }

    // Create a new product on Gumroad
    const response = await fetch("https://api.gumroad.com/v2/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: ebook.title,
        description: ebook.description,
        price: ebook.price,
        // Add other necessary fields based on Gumroad API requirements
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Gumroad API error:", data);
      throw new Error(data.message || "Failed to publish to Gumroad");
    }

    return data;
  } catch (error) {
    console.error("Error publishing to Gumroad:", error);
    throw error;
  }
}

export async function fetchUserEbooks() {
  try {
    const token = localStorage.getItem("gumroadToken");
    if (!token) {
      throw new Error("Not authenticated with Gumroad");
    }

    // Fetch all products from the user's Gumroad account
    const response = await fetch("https://api.gumroad.com/v2/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Gumroad API error:", data);
      throw new Error(data.message || "Failed to fetch user ebooks");
    }

    // Filter for ebook products or process as needed
    return data.products || [];
  } catch (error) {
    console.error("Error fetching user ebooks:", error);
    throw error;
  }
}

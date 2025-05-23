"use server";

export async function getLatestRelease() {
  try {
    const response = await fetch(
      "https://api.github.com/repos/spotlightify/spotlightify/releases/latest",
      {
        // Ensure fresh data
        next: { revalidate: 600 }, // Cache for 10 minutes
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch release info");
    }

    const data = await response.json();
    return { version: data.tag_name };
  } catch (err) {
    return {
      error: "Failed to fetch version",
    };
  }
}

export async function getGithubStars(): Promise<string> {
  try {
    const response = await fetch(
      "https://api.github.com/repos/spotlightify/spotlightify",
      {
        next: { revalidate: 600 }, // Cache for 10 minutes
      }
    );
    const data = await response.json();
    return data.stargazers_count;
  } catch (err) {
    return "200+";
  }
}

import { toaster } from "./utils";

const domain = process.env.REACT_APP_API_URL || "http://localhost:8000/";

export const getUsages = async (data: any) => {
  try {
    const url = new URL(`${domain}usages`);

    const params: any = {
      start: data["start"],
      end: data["end"],
    };

    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key])
    );

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Network response not ok: ${response.statusText}`);
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    toaster(`Error when attempting to get usages: ${error}`, false);
  }
};

export const createNewUsage = async (data: any) => {
  try {
    const response = await fetch(`${domain}usages/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Network response not ok: ${response.statusText}`);
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    toaster(`Error when attempting to create new usage: ${error}`, false);
  }
};

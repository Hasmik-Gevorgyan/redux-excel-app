const URL = "https://sheetdb.io/api/v1/vzvn8pnunja1z";

export const fetchRandomNumber = async (name: string) => {
    const number = Math.floor(Math.random() * 100000);
    const body = {data: [{ name, number }]};

    await fetch(URL, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
       },
    }).catch((error) => {
      console.error("Error submitting user:", error);
    });

    return { name, number };
}
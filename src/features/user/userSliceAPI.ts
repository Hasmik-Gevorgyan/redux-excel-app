const URL = "https://sheetdb.io/api/v1/3z8cvbz5ctcyd";

export const fetchRandomNumber = async (name: string, color: string) => {
    const body = {data: [{ name, color }]};

    await fetch(`${URL}?sheet=Participants`, {
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

    return { name, color };
}

export const fetchAllColors = async () => {
  const response = await fetch(`${URL}?sheet=AvailableColors`, {
    method: "GET"
  });
  const data = await response.json();

  return data;
}

export const fetchSelectedColor = async (id: string) => {
  console.log("id: ", id, `${URL}/color/${id}?sheet=AvailableColors`);
  const response = await fetch(`${URL}/color/${encodeURIComponent(id)}?sheet=AvailableColors`, {
    method: "DELETE",
    body: JSON.stringify({ id }),
    headers: { "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
     },
  });
  const data = await response.json();

  return data;
}

export async function POST(request: Request) {
  const json = await request.json();
  console.log(json);
  return await fetch("http://127.0.0.1:8000/bvpg/slides/responsive-reading", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(json),
  });
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ format: string }> }
) {
  console.log("something something");
  const format = (await params).format;
  const json = await request.json();
  return await fetch(`${process.env.PASSAGE_API}/bvpg/slides/${format}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(json),
  });
}

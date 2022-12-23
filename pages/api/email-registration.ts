import { readFileSync, writeFileSync } from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";

function buildPath() {
  return path.join(process.cwd(), "data.json");
}

function extractData() {
  const data = readFileSync(buildPath());
  return JSON.parse(data.toString());
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const fileData = extractData();

  if (req.method === "POST") {
    const { email, eventId } = req.body;
    const { events_categories, allEvents } = fileData;
    const found = allEvents.find((event: any) => event.id === eventId);
    if (email !== "" || !found.emails_registered.includes(email)) {
      found.emails_registered = [...found.emails_registered, email];
      const filterOut = allEvents.filter((event: any) => event.id !== eventId);
      filterOut.push(found);
      writeFileSync(
        buildPath(),
        JSON.stringify({ events_categories, allEvents: filterOut })
      );
    }

    if (email === "") {
      res.status(200).json({ message: "Empty Email :(" });
    } else {
      res
        .status(200)
        .json({ message: "Email Registered Successfully!" + " -> " + email });
    }
  }
}

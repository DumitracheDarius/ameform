import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, phone } = body;

  if (!email || !phone) {
    return NextResponse.json({ error: "Email și telefon sunt obligatorii." }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: "Email invalid." }, { status: 400 });
  }

  const phoneClean = phone.replace(/\s/g, "");
  if (phoneClean.length < 10) {
    return NextResponse.json({ error: "Număr de telefon invalid." }, { status: 400 });
  }

  const supabase = getSupabase();
  const { error } = await supabase.from("tombola_entries").insert([
    {
      email: email.toLowerCase().trim(),
      phone: phoneClean,
    },
  ]);

  if (error) {
    if (error.code === "23505") {
      const detail = error.details ?? "";
      if (detail.includes("phone")) {
        return NextResponse.json(
          { error: "Acest număr de telefon este deja înscris în tombolă." },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { error: "Acest email este deja înscris în tombolă." },
        { status: 409 }
      );
    }
    console.error(error);
    return NextResponse.json({ error: "A apărut o eroare. Încearcă din nou." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

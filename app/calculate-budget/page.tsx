"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Cinzel } from "next/font/google";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["700"] });

const PRIMARY_YELLOW = "#facc15";
const PRIMARY_BLUE = "#0a2540";

export default function CalculateBudgetPage() {
  const router = useRouter();

  // step state
  const [step, setStep] = useState<number>(0);
  const totalSteps = 4;

  // selections
  const [propertyType, setPropertyType] = useState<"1BHK" | "2BHK" | "3BHK" | "4BHK+">("1BHK");
  const [bedrooms, setBedrooms] = useState<number>(0);
  const [bedroomOptions, setBedroomOptions] = useState<number[]>([0, 1]); // will update on propertyType
  const [kitchenType, setKitchenType] = useState<"L-shape" | "Parallel" | "Island">("L-shape");
  const [living, setLiving] = useState<number>(1); // 0 or 1
  const [dining, setDining] = useState<number>(1); // 0 or 1
  const [category, setCategory] = useState<"Budget" | "Premium" | "Luxury">("Budget");

  // lead + otp
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpToken, setOtpToken] = useState("");

  // UI
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // ensure bedroom options update when propertyType changes
  useEffect(() => {
    let opts: number[] = [];
    if (propertyType === "1BHK") opts = [0, 1];
    if (propertyType === "2BHK") opts = [0, 1, 2];
    if (propertyType === "3BHK") opts = [0, 1, 2, 3];
    if (propertyType === "4BHK+") opts = Array.from({ length: 11 }, (_, i) => i); // 0..10
    setBedroomOptions(opts);
    // clamp bedrooms to allowed
    if (!opts.includes(bedrooms)) {
      setBedrooms(opts[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propertyType]);

  // navigation
  const goNext = () => {
    setMessage(null);
    if (step < totalSteps - 1) setStep((s) => s + 1);
  };
  const goBack = () => {
    setMessage(null);
    if (step > 0) setStep((s) => s - 1);
  };

  // send OTP via your API (Brevo)
  const sendOtp = async () => {
    if (!name || !email || !phone) {
      setMessage("Please fill name, email and phone.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/otp/send", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email }),
});

const json = await res.json(); // ✅ read ONCE

setLoading(false);

if (!res.ok) {
  setMessage(json.error || "Failed to send OTP.");
  return;
}

// ✅ success path only
setOtpToken(json.token); // store token
setOtpSent(true);
setMessage("OTP sent to your email. Please check inbox/spam.");

    } catch (e) {
      setLoading(false);
      setMessage("Network error while sending OTP.");
    }
  };

  // verify OTP
  const verifyOtp = async () => {
    if (!otpCode) {
      setMessage("Enter the OTP sent to your email.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
        otp: otpCode,
        token: otpToken,
        }),
      });
      const json = await res.json();
      setLoading(false);
      if (!res.ok) {
        setMessage(json.error || "OTP verification failed.");
        return;
      }
      setOtpVerified(true);
      setMessage("OTP verified — showing estimate.");
      // send lead to Google Sheet
      fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          propertyType,
          bedrooms,
          kitchenType,
          living,
          dining,
          category,
          timestamp: new Date().toISOString(),
        }),
      }).catch(() => {});
    } catch (e) {
      setLoading(false);
      setMessage("Network error while verifying OTP.");
    }
  };

  // calculation (placeholder fixed option values; change later)
const calculateEstimateRange = (): [number, number] => {

  const LIVING_COST = 40000 + 50000 + 35000 + 15000;
  const DINING_COST = 30000 + 8000;

  const KITCHEN: Record<string, number> = {
    "L-shape": 120000,
    Parallel: 160000,
    Island: 220000,
  };

  // ✅ Bedroom includes BED now
  const BEDROOM_PER_ROOM =
    70000 + // wardrobe
    15000 + // wallpaper
    10000 + // electrical
    30000;  // bed

  const MULT: Record<string, number> = {
    Budget: 1,
    Premium: 1.2,
    Luxury: 1.4,
  };

  let total = 0;

  if (living) total += LIVING_COST;

  if (kitchenType) {
    total += KITCHEN[kitchenType] + 40000 + 12000;
  }

  if (bedrooms > 0) {
    total += bedrooms * BEDROOM_PER_ROOM;
  }

  if (dining) total += DINING_COST;

  total = Math.round(total * MULT[category]);

  const min = Math.round(total * 0.9);
  const max = Math.round(total * 1.15);

  return [min, max];
};

  // WhatsApp number
  const whatsappNumber = "918605897892";

  return (
    <main className="min-h-screen bg-neutral-50 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* stepper (circles + line) */}
        <div className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              {["BHK Type", "Bedrooms", "Package", "Get Quote"].map((label, i) => {
                const active = i <= step;
                return (
                  <div key={i} className="flex items-center gap-3">
                    <div
                      className="flex items-center justify-center rounded-full w-8 h-8 text-sm"
                      style={{
                        background: active ? PRIMARY_BLUE : "#f1f1f1",
                        color: active ? "white" : PRIMARY_BLUE,
                        border: active ? `2px solid ${PRIMARY_BLUE}` : "2px solid #e6e6e6",
                      }}
                    >
                      {i + 1}
                    </div>
                    <div className="hidden md:block text-sm" style={{ color: PRIMARY_BLUE, opacity: active ? 1 : 0.45 }}>
                      {label}
                    </div>
                    {i < 3 && <div style={{ width: 36, height: 2, background: i < step ? PRIMARY_BLUE : "#eee" }} />}
                  </div>
                );
              })}
            </div>
            <div>
              <button onClick={() => router.push("/")} className="text-sm text-gray-600">Close</button>
            </div>
          </div>
        </div>

        {/* animated step content */}
        <div className="p-8 min-h-[520px]">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={step}
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -400, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 30 }}
            >
              {/* STEP 0: BHK Type */}
              {step === 0 && (
                <div className="text-center">
                  <h2 className={`${cinzel.className} text-3xl font-bold mb-3`} style={{ color: PRIMARY_BLUE }}>
                    Choose BHK type
                  </h2>
                  <p className="text-gray-600 mb-8">Select the flat type — this will set the maximum bedrooms allowed.</p>

                  <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {(["1BHK", "2BHK", "3BHK", "4BHK+"] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => {
                          setPropertyType(t);
                          // set default bedrooms to 0 for user control
                          if (t === "1BHK") setBedrooms(0);
                          if (t === "2BHK") setBedrooms(0);
                          if (t === "3BHK") setBedrooms(0);
                          if (t === "4BHK+") setBedrooms(4);
                        }}
                        className={`text-left p-5 rounded-xl border shadow-sm ${propertyType === t ? "border-yellow-400 bg-white" : "bg-white border-gray-200"}`}
                        style={{ borderColor: propertyType === t ? PRIMARY_YELLOW : undefined }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-semibold text-lg" style={{ color: PRIMARY_BLUE }}>{t}</div>
                            <div className="text-sm text-gray-600 mt-1">
                              {t === "4BHK+" ? "Choose up to 10 bedrooms" : `Choose up to ${t === "1BHK" ? "1" : t === "2BHK" ? "2" : "3"} bedrooms`}
                            </div>
                          </div>
                          <div className="text-sm text-gray-500">Select</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 1: Bedrooms & room toggles */}
              {step === 1 && (
                <div>
                  <h2 className={`${cinzel.className} text-3xl font-bold mb-3`} style={{ color: PRIMARY_BLUE }}>
                    Bedrooms & Rooms
                  </h2>
                  <p className="text-gray-600 mb-6">Select how many bedrooms (0 if you don't want bedrooms designed) and toggle living/dining.</p>

                  <div className="max-w-3xl mx-auto space-y-4">
                   {/* Bedrooms selector */}
<div className="p-4 bg-white border rounded-xl shadow-sm flex items-center justify-between">
  <div>
    <div className="font-semibold" style={{ color: PRIMARY_BLUE }}>Bedrooms</div>
    <div className="text-sm text-gray-600">
      Choose between {Math.min(...bedroomOptions)} and {Math.max(...bedroomOptions)} bedrooms
    </div>
  </div>

  <div className="flex items-center gap-3">
    <select
      value={bedrooms}
      onChange={(e) => setBedrooms(Number(e.target.value))}
      className="p-2 border border-black rounded text-black bg-white"
    >
      {bedroomOptions.map((n) => (
        <option key={n} value={n}>
          {n}
        </option>
      ))}
    </select>
  </div>
</div>

                    {/* Living toggle */}
                    <div className="p-4 bg-white border rounded-xl shadow-sm flex items-center justify-between">
                      <div>
                        <div className="font-semibold" style={{ color: PRIMARY_BLUE }}>Living Room</div>
                        <div className="text-sm text-gray-600">Include interior work for living room</div>
                      </div>
                      <div>
                        <button onClick={() => setLiving((v) => (v === 1 ? 0 : 1))} className="px-4 py-2 rounded-full border" style={{ background: living ? PRIMARY_YELLOW : "white", color: living ? PRIMARY_BLUE : PRIMARY_BLUE }}>
                          {living ? "Yes" : "No"}
                        </button>
                      </div>
                    </div>

                    {/* Dining toggle */}
                    <div className="p-4 bg-white border rounded-xl shadow-sm flex items-center justify-between">
                      <div>
                        <div className="font-semibold" style={{ color: PRIMARY_BLUE }}>Dining Area</div>
                        <div className="text-sm text-gray-600">Include interior work for dining area</div>
                      </div>
                      <div>
                        <button onClick={() => setDining((v) => (v === 1 ? 0 : 1))} className="px-4 py-2 rounded-full border" style={{ background: dining ? PRIMARY_YELLOW : "white", color: dining ? PRIMARY_BLUE : PRIMARY_BLUE }}>
                          {dining ? "Yes" : "No"}
                        </button>
                      </div>
                    </div>

                    {/* Kitchen Type */}
                    <div className="p-4 bg-white border rounded-xl shadow-sm">
                      <div className="font-semibold mb-2" style={{ color: PRIMARY_BLUE }}>Kitchen Type</div>
                      <div className="flex gap-3">
                        {(["L-shape", "Parallel", "Island"] as const).map((k) => (
                          <button
                            key={k}
                            onClick={() => setKitchenType(k)}
                            className={`px-4 py-2 rounded-lg border ${kitchenType === k ? "bg-yellow-400 text-white" : "bg-white text-black border-black"}`}
                            style={{ borderColor: kitchenType === k ? PRIMARY_YELLOW : undefined }}
                          >
                            {k}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Package */}
              {step === 2 && (
                <div>
                  <h2 className={`${cinzel.className} text-3xl font-bold mb-3`} style={{ color: PRIMARY_BLUE }}>
                    Pick a package
                  </h2>
                  <p className="text-gray-600 mb-6">Budget, Premium or Luxury — choose a package.</p>

                  <div className="max-w-3xl mx-auto space-y-4">
                    {[
                      { key: "Budget", title: "Essentials (Budget)", desc: "Functional finishes for value." },
                      { key: "Premium", title: "Premium", desc: "Better materials + customisations." },
                      { key: "Luxury", title: "Luxury", desc: "High-end finishes & bespoke design." },
                    ].map((p: any) => (
                      <div key={p.key} className={`p-5 rounded-xl border shadow-sm ${category === p.key ? "border-yellow-400" : "border-gray-200"}`} style={{ borderColor: category === p.key ? PRIMARY_YELLOW : undefined }}>
                        <label className="flex items-start gap-4 cursor-pointer">
                          <input type="radio" name="pkg" checked={category === p.key} onChange={() => setCategory(p.key)} />
                          <div>
                            <div className="font-semibold" style={{ color: PRIMARY_BLUE }}>{p.title}</div>
                            <p className="text-sm text-gray-600 mt-1">{p.desc}</p>
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 3: Get Quote — lead form, OTP, result */}
              {step === 3 && (
                <div className="max-w-3xl mx-auto">
                  {!otpVerified ? (
                    <>
                      <h2 className={`${cinzel.className} text-3xl font-bold mb-3`} style={{ color: PRIMARY_BLUE }}>
                        Get your quote
                      </h2>
                      <p className="text-gray-600 mb-6">Enter contact details and verify your email to see the estimate.</p>

                      <div className="space-y-4">
                        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="w-full p-3 border rounded-lg border-black text-gray-600" />
                        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full p-3 border rounded-lg border-black text-gray-600" />
                        <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" className="w-full p-3 border rounded-lg border-black text-gray-600" />

                        <div className="flex gap-3">
                          <button onClick={sendOtp} disabled={loading} className="px-6 py-3 rounded-full" style={{ background: PRIMARY_YELLOW, color: PRIMARY_BLUE }}>
                            {otpSent ? "Resend OTP" : "Send OTP"}
                          </button>
                          <button onClick={() => { setName(""); setEmail(""); setPhone(""); setOtpSent(false); setOtpCode(""); }} className="px-4 py-3 border rounded border-black text-gray-600">Clear</button>
                        </div>

                        {otpSent && (
                          <div className="mt-4">
                            <input value={otpCode} onChange={(e) => setOtpCode(e.target.value)} placeholder="Enter OTP" className="w-56 p-3 border rounded-lg text-black placeholder-gray-400"/>
                            <div className="mt-3 flex gap-3">
                              <button onClick={verifyOtp} disabled={loading} className="px-6 py-3 rounded-full" style={{ background: PRIMARY_YELLOW, color: PRIMARY_BLUE }}>
                                Verify OTP
                              </button>
                              <button onClick={() => setOtpSent(false)} className="px-4 py-3 border rounded text-gray-700">Cancel</button>
                            </div>
                          </div>
                        )}

                        {message && <div className="text-sm text-red-500 mt-2">{message}</div>}
                      </div>
                    </>
                  ) : (
                    <ResultDisplay
                      propertyType={propertyType}
                      bedrooms={bedrooms}
                      kitchenType={kitchenType}
                      living={living}
                      dining={dining}
                      category={category}
                      whatsappNumber={whatsappNumber}
                    />
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* footer */}
        <div className="px-6 py-4 border-t flex items-center justify-between">
          <div>{message && <span className="text-sm text-red-500">{message}</span>}</div>

          <div className="flex gap-3">
            {step > 0 && (
              <button onClick={goBack} className="px-4 py-2 rounded-md border text-black border-black">
                Back
              </button>
            )}
            {step < totalSteps - 1 && (
              <button onClick={goNext} className="px-6 py-2 rounded-full" style={{ background: PRIMARY_YELLOW, color: PRIMARY_BLUE }}>
                Next
              </button>
            )}
            {step === totalSteps - 1 && !otpVerified && (
              <button onClick={sendOtp} className="px-6 py-2 rounded-full" style={{ background: PRIMARY_YELLOW, color: PRIMARY_BLUE }}>
                Send OTP
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

/* Result display component */
function ResultDisplay({ propertyType, bedrooms, kitchenType, living, dining, category, whatsappNumber }: any) {
  const PRIMARY_BLUE = "#0a2540";
  // same calculation as above
 let total = 0;

const LIVING_COST = 40000 + 50000 + 35000 + 15000;
const DINING_COST = 30000 + 8000;

const KITCHEN: Record<string, number> = {
  "L-shape": 120000,
  Parallel: 160000,
  Island: 220000,
};

const BEDROOM_PER_ROOM = 70000 + 15000 + 10000 + 30000;

const MULT: Record<string, number> = {
  Budget: 1,
  Premium: 1.2,
  Luxury: 1.4,
};

if (living) total += LIVING_COST;

if (kitchenType) {
  total += KITCHEN[kitchenType] + 40000 + 12000;
}

if (bedrooms > 0) {
  total += bedrooms * BEDROOM_PER_ROOM;
}

if (dining) total += DINING_COST;

total = Math.round(total * MULT[category]);

const min = Math.round(total * 0.9);
const max = Math.round(total * 1.15);

  const message = encodeURIComponent(`Hi, I'd like a detailed quote. My estimate: ₹${min.toLocaleString()} - ₹${max.toLocaleString()}`);

  return (
    <div className="text-center">
      <h3 className="text-2xl font-bold mb-3" style={{ color: PRIMARY_BLUE }}>Estimated Budget</h3>
      <div className="text-3xl font-extrabold mb-4 text-black">₹{min.toLocaleString()} - ₹{max.toLocaleString()}</div>
      <p className="text-gray-600 mb-6">This is a quick estimate. Our team will follow up with a detailed quote.</p>

      <div className="flex gap-4 justify-center">
        <a href={`https://wa.me/${whatsappNumber}?text=${message}`} target="_blank" rel="noreferrer" className="px-6 py-3 rounded-full" style={{ background: "#25D366", color: "white" }}>
          Chat on WhatsApp
        </a>

        <button onClick={() => window.dispatchEvent(new CustomEvent("open-consultation-popup"))} className="px-6 py-3 rounded-full" style={{ background: PRIMARY_YELLOW, color: PRIMARY_BLUE }}>
          Book Free Consultation
        </button>
      </div>
    </div>
  );
}

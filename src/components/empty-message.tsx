import { ANCHOR_CLASS_NAME } from "@/hooks/use-markdown-processor";
import Link from "next/link";

export const EmptyMessage = () => {
  return (
    <div className="max-w-2xl my-auto mx-auto w-full bg-emerald-50 border-2 border-emerald-100 p-4 lg:p-8 rounded-lg text-emerald-950">
      <p className="font-sans text-base font-semibold mb-6">
        StreamLLM
      </p>
      <p className="font-sans text-base mb-6">
        This app is a simple demo to simulate working with LLMs (Groq API).
      </p>
      <p className="font-sans text-base mb-6">
        Try something like:{" "}
        <em className="italic font-semibold">
          &quot;Top 10 grossing movies of all time as a pie chart&quot;
        </em>
      </p>
    </div>
  );
};

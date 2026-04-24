import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { TiMessage } from "react-icons/ti";
import Button from "./Button";

const accessKey1 = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY_1;
const accessKey2 = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY_2;

const CATEGORIES = [
  "Bug Report",
  "Feature Request",
  "General Feedback",
  "UI/UX",
  "Performance",
];

const FeedbackBtn = () => {
  const [showModal, setShowModal] = useState(false);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null); // { success, msg }

  const overlayRef = useRef(null);
  const modalRef = useRef(null);

  // Animate modal in/out
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power3.out" }
      );
    } else {
      document.body.style.overflow = "";
    }
  }, [showModal]);

  const openModal = () => {
    setResult(null);
    setErrors({});
    setShowModal(true);
  };

  const closeModal = () => {
    gsap.to(modalRef.current, {
      opacity: 0,
      y: 30,
      scale: 0.95,
      duration: 0.25,
      ease: "power2.in",
    });
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => setShowModal(false),
    });
  };

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = "Required";
    if (!category) e.category = "Required";
    if (!message.trim()) e.message = "Required";
    else if (message.trim().length < 10) e.message = "Too short (min 10 chars)";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setSubmitting(true);
    setResult({ success: null, msg: "Sending..." });

    const payload = {
      from_name: `Cyberpunk - ${category}`,
      subject: `[${category}] Feedback from ${name}`,
      email: "no-reply@cyberpunk.vercel.app",
      name,
      category,
      message,
    };

    const post = async (key) => {
      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ access_key: key, ...payload }),
        });
        const data = await res.json();
        return { success: res.ok, msg: data.message };
      } catch (err) {
        return { success: false, msg: err.message };
      }
    };

    const [r1, r2] = await Promise.all([post(accessKey1), post(accessKey2)]);

    if (r1.success || r2.success) {
      setResult({ success: true, msg: "Feedback sent. Thank you!" });
      setName(""); setCategory(""); setMessage(""); setErrors({});
      setTimeout(closeModal, 1800);
    } else {
      setResult({ success: false, msg: `Failed: ${r1.msg}` });
    }
    setSubmitting(false);
  };

  // Floating button hover animation
  // (handled by Button.jsx internally)

  return (
    <>
      {/* Floating trigger button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button
          id="feedback-btn"
          title="Feedback"
          leftIcon={<TiMessage className="size-4" />}
          containerClass="bg-yellow-300 flex-center gap-1"
          onClick={openModal}
        />
      </div>

      {/* Modal */}
      {showModal && (
        <>
          {/* Backdrop */}
          <div
            ref={overlayRef}
            onClick={closeModal}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm"
          />

          {/* Panel */}
          <div
            ref={modalRef}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="pointer-events-auto w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-blue-200 shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
                <h3 className="special-font font-zentry text-2xl font-black uppercase text-blue-50">
                  Share Feedback
                </h3>
                <button
                  onClick={closeModal}
                  className="font-general text-sm text-blue-50/50 transition-colors hover:text-yellow-300"
                >
                  ✕
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4 p-6">
                {/* Name */}
                <div>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 font-general text-sm text-blue-50 placeholder-blue-50/30 outline-none transition-colors focus:border-yellow-300/60"
                  />
                  {errors.name && <p className="mt-1 font-general text-xs text-red-400">{errors.name}</p>}
                </div>

                {/* Category */}
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className={`w-full appearance-none rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 pr-10 font-general text-sm outline-none transition-colors focus:border-yellow-300/60 ${
                      category ? "text-blue-50" : "text-blue-50/30"
                    }`}
                  >
                    <option value="" className="bg-black text-blue-50/50">Select category</option>
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c} className="bg-black text-blue-50">{c}</option>
                    ))}
                  </select>
                  <svg className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-blue-50/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
                  {errors.category && <p className="mt-1 font-general text-xs text-red-400">{errors.category}</p>}
                </div>

                {/* Message */}
                <div>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    placeholder="What can we improve?"
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 font-general text-sm text-blue-50 placeholder-blue-50/30 outline-none transition-colors focus:border-yellow-300/60"
                  />
                  {errors.message && <p className="mt-1 font-general text-xs text-red-400">{errors.message}</p>}
                </div>

                {/* Result message */}
                {result && (
                  <div
                    className={`rounded-xl border px-4 py-2.5 font-general text-sm ${
                      result.success
                        ? "border-yellow-300/30 bg-yellow-300/10 text-yellow-300"
                        : result.success === null
                        ? "border-white/10 bg-white/5 text-blue-50/60"
                        : "border-red-500/20 bg-red-500/10 text-red-400"
                    }`}
                  >
                    {result.msg}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-full bg-yellow-300 py-2.5 font-general text-xs font-semibold uppercase text-black transition-opacity disabled:opacity-50"
                >
                  {submitting ? "Submitting..." : "Submit Feedback"}
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default FeedbackBtn;

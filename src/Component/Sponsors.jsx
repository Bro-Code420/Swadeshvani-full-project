import React, { useState } from "react";
import {
  Megaphone,
  CheckCircle,
  Send,
  Phone,
  Mail,
  MapPin,
  Clock,
  Upload,
  FileText,
  Info,
} from "lucide-react";

const Advertisement = () => {
  const [submitted, setSubmitted] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    phone: "",
    email: "",
    city: "",
    advertisementType: "Banner Advertisement",
    duration: "7 Days",
    budget: "",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    setSelectedFile(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setSubmitted(true);

    console.log({
      ...formData,
      advertisementFile: selectedFile,
    });
  };

  const resetForm = () => {
    setSubmitted(false);
    setSelectedFile(null);

    setFormData({
      name: "",
      businessName: "",
      phone: "",
      email: "",
      city: "",
      advertisementType: "Banner Advertisement",
      duration: "7 Days",
      budget: "",
      message: "",
    });
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
          <div className="max-w-3xl">
            <div className="mb-4 flex items-center gap-3 text-orange-600">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100">
                <Megaphone size={22} />
              </div>

              <span className="text-sm font-semibold uppercase tracking-widest">
                Advertise With Us
              </span>
            </div>

            <h1 className="text-3xl font-bold leading-tight text-blue-950 sm:text-4xl">
              अपने व्यवसाय का प्रचार हमारे समाचार प्लेटफॉर्म पर करें
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              अपने व्यवसाय, संस्था, कार्यक्रम या सेवा का प्रचार करने के लिए
              नीचे दिया गया फॉर्म भरें। हमारी टीम आपकी जानकारी की समीक्षा करके
              आपसे संपर्क करेगी।
            </p>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Information panel */}
          <div className="space-y-5 lg:col-span-1">
            <div className="rounded-2xl bg-blue-950 p-6 text-white">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500">
                <Megaphone size={22} />
              </div>

              <h2 className="text-xl font-bold">
                अपने ब्रांड को लोगों तक पहुंचाएं
              </h2>

              <p className="mt-3 text-sm leading-6 text-blue-100">
                हमारे स्थानीय पाठकों और दर्शकों तक अपने व्यवसाय की जानकारी
                पहुंचाएं।
              </p>

              <div className="mt-6 space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <CheckCircle
                    size={18}
                    className="mt-0.5 shrink-0 text-orange-400"
                  />
                  <span>स्थानीय दर्शकों और पाठकों तक पहुंच</span>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle
                    size={18}
                    className="mt-0.5 shrink-0 text-orange-400"
                  />
                  <span>व्यवसाय और कार्यक्रम का प्रचार</span>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle
                    size={18}
                    className="mt-0.5 shrink-0 text-orange-400"
                  />
                  <span>किफायती विज्ञापन पैकेज</span>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle
                    size={18}
                    className="mt-0.5 shrink-0 text-orange-400"
                  />
                  <span>हमारी टीम से सीधा संपर्क</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-bold text-blue-950">
                विज्ञापन प्रक्रिया
              </h3>

              <div className="mt-5 space-y-5">
                <ProcessStep
                  number="01"
                  title="फॉर्म भरें"
                  description="अपनी और अपने व्यवसाय की जानकारी दर्ज करें।"
                />

                <ProcessStep
                  number="02"
                  title="समीक्षा"
                  description="हमारी टीम आपके विज्ञापन अनुरोध की समीक्षा करेगी।"
                />

                <ProcessStep
                  number="03"
                  title="संपर्क"
                  description="हमारी टीम कीमत और प्रचार की जानकारी के लिए आपसे संपर्क करेगी।"
                />
              </div>
            </div>

            <div className="rounded-2xl border border-orange-200 bg-orange-50 p-6">
              <div className="flex gap-3">
                <Info className="shrink-0 text-orange-600" size={20} />

                <div>
                  <h3 className="font-semibold text-orange-900">
                    महत्वपूर्ण जानकारी
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-orange-800">
                    फॉर्म जमा करने के बाद हमारी टीम उपलब्धता, कीमत और विज्ञापन
                    सामग्री के संबंध में आपसे संपर्क करेगी।
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Advertisement form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <SuccessMessage onReset={resetForm} />
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8"
              >
                <div className="mb-8 border-b border-slate-200 pb-5">
                  <h2 className="text-2xl font-bold text-blue-950">
                    विज्ञापन अनुरोध फॉर्म
                  </h2>

                  <p className="mt-2 text-sm text-slate-500">
                    कृपया सभी आवश्यक जानकारी सही-सही भरें।
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <FormField label="आपका नाम" required>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="अपना नाम दर्ज करें"
                      required
                      className="input-style"
                    />
                  </FormField>

                  <FormField label="व्यवसाय / संस्था का नाम" required>
                    <input
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      placeholder="व्यवसाय का नाम"
                      required
                      className="input-style"
                    />
                  </FormField>

                  <FormField label="मोबाइल नंबर" required>
                    <div className="relative">
                      <Phone
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="मोबाइल नंबर"
                        required
                        className="input-style pl-11"
                      />
                    </div>
                  </FormField>

                  <FormField label="ईमेल पता">
                    <div className="relative">
                      <Mail
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="ईमेल पता"
                        className="input-style pl-11"
                      />
                    </div>
                  </FormField>

                  <FormField label="शहर / स्थान" required>
                    <div className="relative">
                      <MapPin
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="शहर या स्थान"
                        required
                        className="input-style pl-11"
                      />
                    </div>
                  </FormField>

                  <FormField label="विज्ञापन का प्रकार" required>
                    <select
                      name="advertisementType"
                      value={formData.advertisementType}
                      onChange={handleChange}
                      className="input-style bg-white"
                    >
                      <option>Banner Advertisement</option>
                      <option>Video Advertisement</option>
                      <option>Sponsored News</option>
                      <option>Business Promotion</option>
                      <option>Event Promotion</option>
                      <option>Job Advertisement</option>
                      <option>Other</option>
                    </select>
                  </FormField>

                  <FormField label="विज्ञापन की अवधि" required>
                    <div className="relative">
                      <Clock
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <select
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        className="input-style bg-white pl-11"
                      >
                        <option>7 Days</option>
                        <option>15 Days</option>
                        <option>30 Days</option>
                        <option>3 Months</option>
                        <option>6 Months</option>
                        <option>1 Year</option>
                      </select>
                    </div>
                  </FormField>

                  <FormField label="अनुमानित बजट">
                    <input
                      type="text"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      placeholder="उदाहरण: ₹5,000"
                      className="input-style"
                    />
                  </FormField>

                  <FormField label="विज्ञापन सामग्री अपलोड करें" full>
                    <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-blue-200 bg-blue-50/30 px-5 py-8 text-center transition hover:border-orange-400 hover:bg-orange-50">
                      <Upload className="mb-3 text-orange-500" size={28} />

                      <span className="text-sm font-semibold text-blue-950">
                        विज्ञापन फाइल अपलोड करें
                      </span>

                      <span className="mt-1 text-xs text-slate-400">
                        JPG, PNG, PDF या MP4 फाइल
                      </span>

                      {selectedFile && (
                        <span className="mt-3 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                          {selectedFile.name}
                        </span>
                      )}

                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf,.mp4"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  </FormField>

                  <FormField label="अतिरिक्त जानकारी" full>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="5"
                      placeholder="अपने विज्ञापन या आवश्यकता के बारे में बताएं..."
                      className="input-style resize-y"
                    />
                  </FormField>
                </div>

                <div className="mt-8 border-t border-slate-200 pt-6">
                  <label className="flex items-start gap-3 text-sm text-slate-600">
                    <input
                      type="checkbox"
                      required
                      className="mt-1 h-4 w-4 accent-orange-500"
                    />

                    <span>
                      मैं पुष्टि करता/करती हूं कि मेरे द्वारा दी गई जानकारी सही
                      है और मैं विज्ञापन संबंधी बातचीत के लिए सहमत हूं।
                    </span>
                  </label>

                  <button
                    type="submit"
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-orange-600 sm:w-auto"
                  >
                    <Send size={17} />
                    विज्ञापन अनुरोध भेजें
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Contact strip */}
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 px-5 py-8 sm:px-8 md:flex-row md:items-center">
          <div>
            <h2 className="font-bold text-blue-950">
              विज्ञापन से जुड़ी जानकारी चाहिए?
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              हमारी टीम से सीधे संपर्क करें।
            </p>
          </div>

          <div className="flex flex-col gap-3 text-sm text-slate-600 sm:flex-row sm:items-center sm:gap-6">
            <a
              href="tel:+919999999999"
              className="flex items-center gap-2 transition hover:text-orange-600"
            >
              <Phone size={17} className="text-orange-500" />
              +91 99999 99999
            </a>

            <a
              href="mailto:advertisement@example.com"
              className="flex items-center gap-2 transition hover:text-orange-600"
            >
              <Mail size={17} className="text-orange-500" />
              advertisement@example.com
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

function FormField({ label, children, required = false, full = false }) {
  return (
    <div className={full ? "md:col-span-2" : ""}>
      <label className="mb-2 block text-sm font-semibold text-blue-950">
        {label}
        {required && <span className="ml-1 text-orange-500">*</span>}
      </label>

      {children}
    </div>
  );
}

function ProcessStep({ number, title, description }) {
  return (
    <div className="flex gap-4">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-orange-600">
        {number}
      </div>

      <div>
        <h4 className="text-sm font-semibold text-blue-950">{title}</h4>
        <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>
      </div>
    </div>
  );
}

function SuccessMessage({ onReset }) {
  return (
    <div className="flex min-h-[500px] items-center justify-center rounded-2xl border border-green-200 bg-white p-8 text-center shadow-sm">
      <div className="max-w-md">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
          <CheckCircle size={34} />
        </div>

        <h2 className="mt-6 text-2xl font-bold text-blue-950">
          आपका अनुरोध सफलतापूर्वक भेज दिया गया है
        </h2>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          धन्यवाद। हमारी विज्ञापन टीम जल्द ही आपसे संपर्क करेगी।
        </p>

        <button
          onClick={onReset}
          className="mt-7 rounded-lg bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
        >
          दूसरा अनुरोध भेजें
        </button>
      </div>
    </div>
  );
}

export default Advertisement;
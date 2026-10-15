# ScamSense - India's Scam Awareness Assistant

> **"Pause. Check. Stay Safe."**  


ScamSense is a full-stack web application designed to help citizens and smartphone users across India identify, understand, and safely react to suspicious SMS, WhatsApp messages, UPI payment traps, parcel delivery alerts, electricity disconnection threats, and other digital fraud schemes.

---

##   Gemma: Model Architecture

This application strictly uses a **multimodal Gemma model** for the visual analysis of user-uploaded screenshots.
- **No Gemini models are used** for the analysis.
- **No silent fallbacks** to Gemini exist. If the configured Gemma model is unavailable, the application displays a clear error with configuration guidance.
- The model name is centralized in one clearly identifiable server-side configuration value in `server.ts` and can be overridden via an environment variable.

### Exact Model Configured
- **Model Name:** `models/gemma-4-26b-a4b-it`
- **Display Name:** Gemma 4 26B A4B IT (Multimodal Instruction-Tuned)
- **API Provider:** Google Gen AI SDK (`@google/genai`)
- **Modalities Used:** Vision (PNG, JPEG, WebP) + Text instructions
- **Server Configuration Constant:** `GEMMA_MODEL_NAME` in `server.ts`

---

## 🇮 India-Specific Focus & Capabilities

ScamSense addresses the most pervasive cyber scams targeting mobile users in India:

1. **Urgent Electricity Disconnection Scams:**  
   Fake notices claiming power will be disconnected at 9:30 PM due to unpaid bills, prompting the victim to call a personal 10-digit mobile number.
2. **UPI "Enter PIN to Receive Money" Traps:**  
   Cashback, lottery, or refund scams that ask users to scan a QR code or enter their UPI PIN to "deposit" money into their account.
   *(Golden Rule: UPI PIN is strictly for debiting/sending money, never for receiving.)*
3. **Fake Courier & India Post Alerts:**  
   Messages claiming a parcel cannot be delivered without updating an address on a suspicious URL or downloading an APK.
4. **Bank Account Blocked / PAN & KYC Updates:**  
   Impersonation of SBI, HDFC, or ICICI sent from regular mobile numbers instead of registered 6-character sender IDs (e.g., VK-SBI, AX-HDFC).
5. **Prepaid Task & Telegram Job Scams:**  
   Offers to earn ₹3,000–₹8,000 daily by simply liking YouTube videos, leading to Telegram investment groups.
6. **Multi-Language Guidance:**  
   Provides responses in English, Hinglish, Hindi (हिंदी), Bengali (বাংলা), Tamil (தமிழ்), Telugu (తెలుగు), Marathi (मराठी), Gujarati (ગુજરાતી), Kannada (ಕನ್ನಡ), Malayalam (മലയാളം), or Punjabi (ਪੰਜਾਬੀ).

---

##  How to Run the Application

### 1. Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** (v9+)
- A **Google Gen AI API Key** with access to Gemma models.

### 2. Environment Variables
Create or verify your `.env` file:
```env
# Google Gen AI API Key (Injected automatically in AI Studio)
GEMINI_API_KEY="your-google-genai-api-key"

# Multimodal Gemma Model Configuration (Default: models/gemma-4-26b-a4b-it)
GEMMA_MODEL_NAME="models/gemma-4-26b-a4b-it"

# Port (Defaults to 3000)
PORT=3000
```

### 3. Installation & Development
```bash
# Install dependencies
npm install

# Start full-stack development server (Express + Vite)
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Production Build
```bash
# Build the client bundle
npm run build

# Start the production server
npm start
```

---

##  Structured Output Format

Every analysis report provides clear, structured cards with these specific headings:
1. **Overall assessment:** High Suspicion / Caution Advised / Low Risk / Unreadable, with a plain-language summary.
2. **Potential warning signs:** Observable red flags with exact evidence quoted from the image.
3. **Why these signs matter:** Psychological levers (urgency, fear, greed) and malware/phishing mechanisms.
4. **Recommended safe actions:** Step-by-step guidance, highlighting the primary action to take immediately.
5. **What could not be verified:** Explicit limits of AI image inspection (e.g., unverified sender phone carrier records, live webpage safety).
6. **India-Specific Safety Essentials:** Emergency instructions for the **1930 Cyber Crime Helpline** and **cybercrime.gov.in / Sanchar Saathi (Chakshu)** reporting.

---

##  Known Limitations & Responsible-Use Guidance

- **Educational Awareness Tool:** ScamSense is an awareness assistant. An AI analysis does **not constitute legal or forensic proof** that a message is genuine or fraudulent.
- **No Live Threat DB Queries:** The model analyzes visual and textual evidence in the screenshot; it does not crawl external hyperlinks or execute APKs.
- **Unreadable Screenshots:** Very blurry, low-resolution, or heavily cropped images may prevent accurate optical character extraction.
- **Privacy First:** Screenshots uploaded through ScamSense are processed strictly in-memory during the analysis request and are **never stored permanently** or shared with third parties.
- **Do Not Disclose Sensitive Data:** Users should never share screenshots containing visible passwords, full debit card CVVs, or active OTPs.

---

##  Official Indian Cyber Crime Helplines

- **Emergency Financial Cyber Fraud Helpline:** **1930** (Toll-Free, MHA / I4C)
- **National Cyber Crime Reporting Portal:** [https://cybercrime.gov.in](https://cybercrime.gov.in)
- **Report Fraudulent SMS / WhatsApp (Chakshu):** [https://sancharsaathi.gov.in/sfc](https://sancharsaathi.gov.in/sfc)
- **RBI Sachet (Unapproved Financial Apps):** [https://sachet.rbi.org.in](https://sachet.rbi.org.in)

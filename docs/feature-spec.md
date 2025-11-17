# Athena Connect – Feature Specification (MVP)

## 1. Goal

Create a donor experience platform for Shield of Athena that:
- Deepens connection between donors and the mission.
- Makes donating interactive, transparent, and rewarding.
- Encourages long-term engagement and sharing with others.
- Stays inclusive across ages and tech familiarity.

Core concept: **Athena Connect** – a guided donation journey with impact pathways, stories, a donor space, light gamification, and an optional chatbot.

---

## 2. User Roles

- **Donor (main user)**
  - Can browse information, donate, create an account, and view impact.
- **Organization staff (admin – basic for MVP)**
  - Can view/manage projects, stories, and donations (Django admin is OK for hackathon).

---

## 3. Main Pages & Features (V1)

### 3.1 Landing / Home Page

**Purpose:** Introduce the mission quickly and invite users into an “impact journey”.

**V1 Requirements**
- Hero section with:
  - Short mission statement (Shield of Athena + focus on women & children).
  - Primary CTA: “Start Your Impact Journey”.
  - Secondary CTA: “Learn About Our Programs”.
- High-level explanation of:
  - What the organization does (shelter, counselling, prevention).
  - Why donations matter.
- Highlight of **Impact Pathways** (cards linking to main program areas).
- Simple “How it works” steps (e.g. Choose pathway → Donate → See impact).
- Footer with links: About, Contact, Privacy, Terms, Emergency help note.

---

### 3.2 Impact Pathways / Programs Page

**Purpose:** Let donors choose **where** they want their impact to go.

**V1 Requirements**
- List of 3–5 program “pathways”, e.g.:
  - Emergency Shelter & Safety
  - Children & Youth Support
  - Counselling & Healing
  - Community Education & Prevention
- For each pathway:
  - Short description.
  - 2–3 “micro-impact” examples (e.g. “Your donation can support X” – no exact $ needed).
  - Link/CTA: “Donate to this pathway”.
- Optional: small graphical progress/impact indicators per pathway.

---

### 3.3 Donation Flow

**Purpose:** Simple, safe, 3-step donation.

**V1 Requirements**
- Step 1 – **Choose impact**:
  - Select a pathway (or “Let the organization decide”).
  - Choose one-time vs recurring donation.
- Step 2 – **Amount & details**:
  - Choose amount (preset buttons + custom).
  - Optional: dedicate donation (honor/memory, message).
  - Option: donate anonymously.
- Step 3 – **Payment & confirmation**:
  - Mocked or sandbox payment form (for hackathon).
  - Success screen with:
    - Short thank-you message.
    - Brief summary of chosen pathway and expected impact.
    - CTA: “Create an account” or “Go to your dashboard”.
    - Buttons to share on social media (link only, no full integration needed).

Backend:
- Store donation with: user (if logged in), pathway, amount, frequency, timestamp, anonymity flag.

---

### 3.4 Donor Account & Dashboard

**Purpose:** Show donors their personal impact in a simple, non-competitive way.

**V1 Requirements**
- Login / register using Django auth.
- Dashboard sections:
  - **My donations**: list of past donations (date, pathway, amount, recurring tag).
  - **My impact summary**: simple stats (e.g. “You supported 3 programs this year”).
  - **Stories & updates**: list of stories or updates linked to the pathways they supported.
  - **Settings**:
    - Update email/password.
    - Manage newsletter / follow-up preferences.
    - Manage recurring donations (even if only UI for now).
- If the donor chose anonymity, show that only on public-facing components (not in their private view).

---

### 3.5 Stories & Testimonials

**Purpose:** Storytelling to connect donors emotionally to the mission.

**V1 Requirements**
- Section or page that:
  - Shows anonymized stories (cards) with:
    - Title, short story (2–3 paragraphs), associated pathway.
    - Tag like “Name changed for safety” / “Story anonymized”.
  - Highlights that all stories are anonymous and safe.
- Optionally surfaced on:
  - Home page (“Featured story”).
  - Dashboard (stories related to pathways the donor supports).

---

### 3.6 Awareness Quiz

**Purpose:** Raise awareness using light gamification.

**V1 Requirements**
- Quiz component (e.g. separate page or section in dashboard/home).
- Uses a predefined list of MCQs (from `/content/quiz_questions.json`).
- For each question:
  - Show question + options.
  - After answer: show correct answer + short explanation.
- At end:
  - Show completion message + encouraging text (“Thank you for taking time to learn more”).
  - Optional badge text (“Awareness Explorer”, etc.) to display in dashboard.

---

### 3.7 Chatbot (“Athena Guide”)

**Purpose:** Help donors quickly find information and feel supported.

**V1 Requirements**
- Frontend:
  - Floating chat icon on main pages.
  - When opened: simple chat window.
- Backend:
  - Endpoint `POST /api/chatbot/query` that:
    - Receives `{ message, userId? }`.
    - Searches a FAQ/knowledge base (from `/content/faqs.json`).
    - Returns best matching answer or a generic safe fallback.
  - Optional: LLM fallback if time + allowed by mentors.
- Typical topics:
  - “Where does my money go?”
  - “What services do you offer?”
  - “How do you protect privacy?”
  - “How can I get help?”

---

### 3.8 Auth & Accounts (Backend)

**V1 Requirements**
- Django auth with:
  - Register (email + password, optional name).
  - Login, logout.
  - Basic password reset flow (even if simplified for hackathon).
- Only authenticated users see full dashboard “My donations” and personal settings.

---

### 3.9 Emails & Notifications

**V1 Requirements**
- At least one **real** email flow:
  - Donation confirmation email with short thank-you + impact summary.
- Optional:
  - Follow-up “micro-impact” email.
  - “We miss you” email (if there is time).

---

### 3.10 Admin / Internal View (Optional)

**V1 Requirements**
- Use Django admin or a simple internal page to:
  - View donations list.
  - Manage pathways/programs.
  - Manage stories content.

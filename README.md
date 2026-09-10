# VYAPAR SETU (व्यापार सेतु)
### Industrial Approvals & Compliance Pre-Verification Platform

> **"Know what's missing before you submit."**  
> *A Modern Crystal + Glass Compliance Command Center bridging Indian enterprises and statutory government portals.*

---

## 📌 Executive Summary

Setting up or expanding an industrial unit in India requires navigating dozens of statutory clearances across state pollution control boards, industrial development corporations, single-window clearance portals, and labor/safety directorates. 

In Maharashtra, businesses interact with **MAITRI**, **MPCB**, **MIDC**, and **DISH**. However, up to **40% of industrial applications are rejected or delayed** due to avoidable clerical errors:
* Mismatched plant addresses or plot areas between deed and consent forms.
* Blurred, skewed, or illegible document scans.
* Expired or non-compliant environmental affidavits.
* Missing mandatory annexures based on CPCB pollution categorization (Red / Orange / Green).
* Invalid entity identification formats (GSTIN / PAN).

**VYAPAR SETU** solves this systemic bottleneck by serving as an intelligent **Pre-Verification and Document Readiness Platform**. It acts as an automated compliance co-pilot that verifies documentation, cross-matches business parameters, calculates a **Document Readiness Score**, and guides applicants to the official government portals with zero clerical discrepancies.

---

## ✨ Core Pillars & Architectural Principles

1. **AI Heuristics + Deterministic Validation Separation**
   * **Multimodal AI Pre-Check**: Leverages vision-language models (e.g. Gemini 1.5 Pro/Flash) for unstructured document extraction, text legibility analysis, and document type detection.
   * **Deterministic Rule Engine**: Enforces strict statutory logic, regular expressions (e.g., 15-digit GSTIN with State Code `27` for Maharashtra, 10-char PAN entity classifier), and mathematical consistency checks without relying on AI hallucination.

2. **Modern Crystal + Glass Architecture Design System**
   * Built on a white / very light cool-gray foundation (`#f8fafc`) with a subtle geometric background grid.
   * Frosted crystal-glass surfaces (`backdrop-filter: blur(18px)`), crisp 1px borders, soft layered shadows, and subtle crystal refraction highlights.
   * Palette: Deep Royal Blue (`#1e40af` / `#2563eb`) for enterprise authority and Cyan / Blue-Teal (`#0284c7`) for AI intelligence states.

3. **Dual-Mode API Architecture (Instant Demo + Production Python Ready)**
   * Out of the box, the frontend includes an in-browser mock engine storing state in `localStorage`, enabling instant evaluations with zero configuration.
   * The API client (`js/api.js`) is mapped 1:1 to standard Django REST Framework endpoints. Flipping `USE_LIVE_BACKEND = true` in `js/config.js` routes calls to the Python backend (`http://localhost:8000/api`).

4. **Statutory Regulatory Guardrails (Section 26 Compliance)**
   * Explicitly avoids terms like *"Government Approved"* or *"Statutory Clearance Issued"*.
   * Exclusively uses **"Document Readiness Score"** or **"Pre-check Score"**.
   * Prominently embeds Section 26 statutory notices stating that final authority remains exclusively with competent government departments (MAITRI, MPCB, MIDC, DISH).

5. **FR-16 Auto-Purge & Privacy Lifecycle**
   * Raw industrial annexures and financial project reports are retained only temporarily in secure storage and automatically purged after an admin-configurable window (default: 7 days), leaving only cryptographic verification hashes.

---

## 🗺️ 11-Stage Connected Compliance Workflow

```
[1. Business Profile]
       ↓
[2. Industry + Location]
       ↓
[3. Rule Engine] ─────── (Database-driven statutory requirement generator)
       ↓
[4. Applicable Approvals]
       ↓
[5. Dynamic Checklist]
       ↓
[6. Document Upload] ──── (Client-side HTML5 canvas quality scanner)
       ↓
[7. AI Pre-Check] ────── (Vision extraction & readability check)
       ↓
[8. Deterministic Validation] (Regex, jurisdiction, and profile cross-match)
       ↓
[9. Readiness Score] ─── (4-pillar weighted evaluation: Completeness, Validity, Quality, Consistency)
       ↓
[10. Verification Report] (Categorized Passed, Warnings, Errors & Actionable Corrections)
       ↓
[11. Official Govt Portal] (Authoritative routing to MAITRI, MPCB, MIDC, Aaple Sarkar)
```

---

## 🖥️ Screen & Feature Guide

### 1. Landing Page (`js/components/landing.js`)
* **Hero Headline**: *"Know what's missing before you submit."*
* **Crystal Compliance Dashboard Preview**: Floating inside a transparent crystal frame, accompanied by floating glass badges:
  * `12 Approvals Required`
  * `28 Documents`
  * `92% Readiness`
  * `3 Issues Found`
  * `AI Pre-check Complete`
* **Connected 11-Stage Workflow Visualization**: Connected with glowing lines and visual distinction for the Rule Engine and AI Pre-check stages.

### 2. Enterprise Dashboard (`js/components/dashboard.js`)
* Personalized greeting (*"Good morning, Rajesh Shinde"*).
* Primary Crystal Card: **Application Readiness (92% Ready for Submission)** featuring an animated SVG circular gauge.
* 4 High-impact metrics:
  * **Documents Complete**: `8 / 10`
  * **Documents Pending**: `2 Pending Upload`
  * **Issues Found**: `3 Flagged for Review` (1 Critical, 2 Warnings)
  * **Verification Status**: `Pre-Verification Active`

### 3. Dynamic Compliance Checklist (`js/components/checklist.js`)
* Dynamically generated from the enterprise profile and industry pollution category (Red / Orange / Green).
* Clear status indicators:
  * `✓ Application Form` (Format verified, 0 issues)
  * `✓ Business Registration` (Matched with MCA, 0 issues)
  * `⚠ Environmental Declaration` (Requires review)
  * `○ Supporting Document / Land Deed` (Pending upload)
* Shows document name, mandatory/optional tag, upload button, verification badge, and issue count.

### 4. Document Verification Inspector (`js/components/verification.js`)
* **Left Column**: Visual document preview with zoom controls, bounding box inspection, and client-side canvas quality metrics (luminance, contrast, sharpness).
* **Right Column**: Side-by-side comparison between **AI Pre-check** (multimodal vision extraction) and **Deterministic Validation** (structured regex and business profile cross-matching).

### 5. Document Readiness Report (`js/components/report.js`)
* Comprehensive summary card displaying **Document Readiness Score: 92 / 100**.
* Passed Checks (18), Warnings (2), Errors (1).
* 4 Categorized Sections:
  1. `✓ Passed Verifications`
  2. `⚠ Warnings`
  3. `✕ Errors`
  4. `→ Recommended Corrections`
* Print-optimized layout for offline review and presentation.

### 6. Official Government Portals Directory (`js/components/routing.js`)
* Directory of verified Maharashtra government portals:
  * **MAITRI** (Maharashtra Industry, Trade and Investment Facilitation Cell)
  * **MPCB** (Maharashtra Pollution Control Board)
  * **MIDC** (Maharashtra Industrial Development Corporation)
  * **Aaple Sarkar** (Government of Maharashtra Citizen & Enterprise Portal)
* Live uptime status, last verified timestamp, and authoritative *"Open Official Portal"* routing modal.

### 7. Rule Engine Admin Console (`js/components/admin.js`)
* Database-driven compliance rule management with versioning (`v1.2`).
* Catalogs for Maharashtra industry sectors, CPCB categories, approvals/NOCs, and standardized annexures.
* Non-sensitive audit logging stream (FR-15).

---

## 🗂️ Project Directory Structure

```
chall/
├── index.html                      # Master application entry point & layout
├── README.md                       # Comprehensive project documentation
├── css/
│   └── styles.css                  # Modern Crystal + Glass design system tokens & animations
├── js/
│   ├── config.js                   # Maharashtra master data, rule configurations & API switches
│   ├── validators.js               # Deterministic regex, canvas quality scanner & scoring formula
│   ├── api.js                      # Dual-mode API client (localStorage mock + DRF live client)
│   ├── store.js                    # Global reactive state management & notification bus
│   ├── app.js                      # Application bootstrap & route dispatcher
│   └── components/
│       ├── navbar.js               # Crystal header with persona switcher & route links
│       ├── landing.js              # Public landing page with hero, preview & 11-stage workflow
│       ├── dashboard.js            # Enterprise compliance control center & circular score gauge
│       ├── checklist.js            # Dynamic compliance checklist grouped by clearance
│       ├── upload.js               # Drag-and-drop document uploader with canvas scanner
│       ├── verification.js         # Side-by-side AI Pre-check vs Deterministic Validation
│       ├── report.js               # Printable Document Readiness Report card (92/100)
│       ├── routing.js              # Official Government Portal directory & safe redirect modal
│       ├── businessProfile.js      # Enterprise profile with live GSTIN/PAN validation
│       ├── auth.js                 # Login & Register views with 1-click test personas
│       ├── profile.js              # User profile, privacy settings & auto-purge controls
│       ├── admin.js                # Rule engine editor, industry catalog & audit logs
│       └── onboarding.js           # 3-step MSME quick start walkthrough
```

---

## 🚀 Quick Start Guide

The frontend is built using standard HTML5, modern Tailwind CSS, and Vanilla JavaScript (ES6+). It requires **no node build steps, bundlers, or heavy npm installs** to run.

### Option 1: Direct Browser Opening (Fastest)
Simply double-click or open `index.html` in any modern web browser:
```
file:///c:/Users/Welcome/Documents/chall/index.html
```

### Option 2: Using Local HTTP Server
Using Node's built-in server:
```bash
npx serve -l 8080 c:/Users/Welcome/Documents/chall
```
Or using Python:
```bash
python -m http.server 8080 --directory c:/Users/Welcome/Documents/chall
```
Then open `http://localhost:8080` in your browser.

---

## 👥 1-Click Evaluation Personas

To facilitate testing and evaluation during hackathons or client reviews, pre-configured personas can be switched with one click from the navigation bar or login screen:

1. **Rajesh Shinde (Industrialist / MSME Owner)**
   * Company: *Shinde Specialty Chemicals Pvt Ltd*
   * Sector: Chemical Manufacturing (CPCB Red Category)
   * Location: Chakan Industrial Area, Phase II, Pune (MIDC)
   * Active Application: MPCB Consent to Establish (CTE) & MIDC Allotment

2. **Pooja Deshmukh (Compliance & Legal Consultant)**
   * Firm: *Apex Environmental & Industrial Solutions*
   * Multiple client filings across Thane and Raigad zones

3. **Sunil Wagh (System Administrator)**
   * Full administrative privileges to inspect and version compliance rules, view audit logs, and manage government portal endpoints.

---

## 🐍 Python Backend Architecture (Django 5 + DRF)

The frontend is designed to plug directly into a Python backend.

### Target Technology Stack
* **Language**: Python 3.11+
* **Framework**: Django 5.x + Django REST Framework (DRF)
* **Database**: PostgreSQL with JSONB support
* **AI Vision Layer**: Google GenAI SDK (`google-genai`) with Gemini 1.5 Pro / Flash
* **Task Queue**: Celery + Redis (for asynchronous OCR and multimodal pre-checking)

### Django Model Mapping
```python
# Target Schema Overview
class BusinessProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    legal_name = models.CharField(max_length=255)
    trade_name = models.CharField(max_length=255)
    entity_type = models.CharField(max_length=50) # Pvt Ltd, LLP, Prop
    gstin = models.CharField(max_length=15)
    pan = models.CharField(max_length=10)
    industry_id = models.CharField(max_length=50)
    cpcb_category = models.CharField(max_length=20) # Red, Orange, Green, White
    investment_plant_machinery = models.DecimalField(max_digits=12, decimal_places=2)
    state = models.CharField(default="Maharashtra", max_length=50)
    district = models.CharField(max_length=50)
    industrial_area = models.CharField(max_length=100) # MIDC Zone
    plot_number = models.CharField(max_length=50)
    plot_area_sqm = models.DecimalField(max_digits=10, decimal_places=2)

class ComplianceRule(models.Model):
    rule_code = models.CharField(max_length=50, unique=True)
    version = models.DecimalField(max_digits=4, decimal_places=1, default=1.0)
    name = models.CharField(max_length=255)
    conditions = models.JSONField() # category, scale, zone
    approvals_required = models.JSONField() # list of approval codes
    documents_required = models.JSONField() # list of doc schemas
    is_active = models.BooleanField(default=True)
    last_verified = models.DateField(auto_now=True)

class DocumentVerification(models.Model):
    application_id = models.CharField(max_length=50)
    document_type = models.CharField(max_length=50)
    file_hash = models.CharField(max_length=64)
    canvas_quality_score = models.FloatField()
    ai_extracted_data = models.JSONField()
    deterministic_validation = models.JSONField()
    readiness_score = models.IntegerField()
    is_purged = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
```

### Enabling Live Backend
In [`js/config.js`](file:///c:/Users/Welcome/Documents/chall/js/config.js):
```javascript
window.APP_CONFIG = {
  USE_LIVE_BACKEND: true, // Switch from false to true
  API_BASE_URL: "http://localhost:8000/api",
  // ...
};
```

---

## ⚖️ Statutory Product Notice (Section 26)

> **IMPORTANT REGULATORY NOTICE**:  
> **VYAPAR SETU** is an automated pre-submission checking, document-readiness scoring, and guidance tool. Its AI and deterministic outputs are provided strictly for **pre-check verification** and do **NOT** constitute official government approval, statutory NOC issuance, or legal certification. Final verification and approvals remain exclusively with the designated government authorities (**MAITRI**, **MPCB**, **MIDC**, and **DISH**).

---

## 🏆 Smart India Hackathon (SIH) Demo Flow

1. **Landing Page**: Highlight the hero value proposition *"Know what's missing before you submit"*, the floating crystal dashboard preview, and the 11-stage compliance workflow.
2. **Dashboard**: Show the enterprise compliance overview and 92% readiness circular meter.
3. **Business Profile**: Demonstrate live Maharashtra GSTIN format validation (State Code `27` check) and dynamic MIDC zone selection.
4. **Dynamic Checklist**: Show automated generation of MPCB CTE requirements based on CPCB Red category.
5. **Document Verification**: Showcase the dual-layer pipeline:
   * Left: Canvas quality scan (luminance, contrast, sharpness).
   * Right: AI Pre-check findings side-by-side with backend Deterministic Validation.
6. **Readiness Report**: Present the 92/100 score breakdown across Completeness (30%), Validity (30%), Quality (20%), and Consistency (20%), plus the printable layout.
7. **Government Routing**: Demonstrate safe, authoritative routing to the MAITRI Single Window portal.
8. **FR-16 Privacy & Admin**: Open the Admin Rule Engine to show rule versioning (`v1.2`) and trigger the 1-click manual auto-purge demonstration.

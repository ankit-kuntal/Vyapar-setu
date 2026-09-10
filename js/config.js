/**
 * VYAPAR SETU - Configuration & Master Compliance Data (Maharashtra MVP)
 * Based on Project Requirements & Technical Blueprint
 */

const CONFIG = {
  APP_NAME: "VYAPAR SETU",
  VERSION: "1.0.0-SIH-MVP",
  API_BASE_URL: "http://localhost:8000/api",
  USE_LIVE_BACKEND: false, // Set to true to route to live Python Django REST API
  AUTO_PURGE_DEFAULT_DAYS: 7,
  JURISDICTION: "Maharashtra, India",
  STATUTORY_DISCLAIMER: "VYAPAR SETU is an automated pre-submission assistance and document-readiness system. Its AI output is an automated pre-check and must NOT be presented or construed as legal advice, statutory certification, or government approval. Final statutory approval remains strictly with the relevant government authority."
};

// Application Status Enums as per PDF Section 11
const APPLICATION_STATUS = {
  DRAFT: "Draft",
  DOCS_PENDING: "Documents Pending",
  VERIFYING: "Verification in Progress",
  ISSUES_FOUND: "Issues Found",
  READY: "Ready for Submission",
  REDIRECTED: "Redirected"
};

// Document Verification Status
const DOC_STATUS = {
  PENDING: "Pending Upload",
  UPLOADED: "Uploaded",
  CHECKING: "Checking Quality",
  ANALYZING: "AI Analyzing",
  PASSED: "Verified - Valid",
  WARNING: "Needs Review",
  ERROR: "Invalid / Corrupted"
};

// Master Data: Industries & Pollution Categorization (CPCB / MPCB norms)
const MASTER_INDUSTRIES = [
  {
    id: "IND-001",
    name: "Chemical & Petrochemicals",
    category: "Red",
    categoryDesc: "High pollution potential - Strict MPCB Consent to Establish & Operate required",
    subSectors: ["Specialty Chemicals", "Dyes & Pigments", "Organic Intermediates", "Fertilizers & Pesticides"],
    defaultScale: "Medium"
  },
  {
    id: "IND-002",
    name: "Food & Agro Processing",
    category: "Orange",
    categoryDesc: "Moderate pollution potential - Effluent treatment & FSSAI pre-requisites",
    subSectors: ["Dairy Products", "Beverages & Fruit Juices", "Grain Milling", "Cold Storage & Processing"],
    defaultScale: "Small"
  },
  {
    id: "IND-003",
    name: "Engineering & Metal Fabrication",
    category: "Orange",
    categoryDesc: "Moderate pollution potential - Air emission & hazardous waste NOC",
    subSectors: ["Auto Components", "Sheet Metal Works", "Machining & Tooling", "Electroplating"],
    defaultScale: "Small"
  },
  {
    id: "IND-004",
    name: "Electronics & Electrical Assembly",
    category: "Green",
    categoryDesc: "Low pollution potential - Expedited consent clearance",
    subSectors: ["PCB Assembly", "Consumer Appliances", "LED Lighting", "Solar Inverters"],
    defaultScale: "Small"
  },
  {
    id: "IND-005",
    name: "Textile Processing & Weaving",
    category: "Red",
    categoryDesc: "High water consumption & effluent generation",
    subSectors: ["Dyeing & Bleaching", "Spinning & Weaving", "Garment Manufacturing"],
    defaultScale: "Medium"
  },
  {
    id: "IND-006",
    name: "Pharmaceutical Formulations",
    category: "Orange",
    categoryDesc: "Regulated formulations & packaging - FDA and MPCB compliance",
    subSectors: ["Tablets & Capsules", "Liquid Orals", "Packaging & Repacking"],
    defaultScale: "Medium"
  }
];

// Master Data: Maharashtra Locations & MIDC Industrial Zones
const MASTER_LOCATIONS = [
  {
    district: "Pune",
    state: "Maharashtra",
    industrialAreas: [
      { id: "MIDC-PUN-01", name: "Chakan Industrial Area (Phase 1 & 2)", type: "MIDC" },
      { id: "MIDC-PUN-02", name: "Bhosari Industrial Area (PCMC)", type: "MIDC" },
      { id: "MIDC-PUN-03", name: "Ranjangaon Mega Industrial Park", type: "MIDC" },
      { id: "MIDC-PUN-04", name: "Talegaon Industrial Area", type: "MIDC" }
    ]
  },
  {
    district: "Thane",
    state: "Maharashtra",
    industrialAreas: [
      { id: "MIDC-THA-01", name: "Thane-Belapur Industrial Area (TTC)", type: "MIDC" },
      { id: "MIDC-THA-02", name: "Ambernath Industrial Area", type: "MIDC" },
      { id: "MIDC-THA-03", name: "Badlapur Industrial Estate", type: "MIDC" }
    ]
  },
  {
    district: "Raigad",
    state: "Maharashtra",
    industrialAreas: [
      { id: "MIDC-RAI-01", name: "Taloja Chemical & Industrial Zone", type: "MIDC" },
      { id: "MIDC-RAI-02", name: "Roha Industrial Area", type: "MIDC" },
      { id: "MIDC-RAI-03", name: "Mahad Industrial Area", type: "MIDC" }
    ]
  },
  {
    district: "Chhatrapati Sambhajinagar",
    state: "Maharashtra",
    industrialAreas: [
      { id: "MIDC-CSN-01", name: "Waluj Industrial Area", type: "MIDC" },
      { id: "MIDC-CSN-02", name: "Shendra DMIC Industrial Park", type: "MIDC" },
      { id: "MIDC-CSN-03", name: "Chikalthana Industrial Area", type: "MIDC" }
    ]
  },
  {
    district: "Nagpur",
    state: "Maharashtra",
    industrialAreas: [
      { id: "MIDC-NAG-01", name: "Butibori Industrial Area", type: "MIDC" },
      { id: "MIDC-NAG-02", name: "Hingna Industrial Estate", type: "MIDC" },
      { id: "MIDC-NAG-03", name: "MIHAN SEZ", type: "Non-MIDC/SEZ" }
    ]
  }
];

// Master Data: Standard Approvals / NOCs
const MASTER_APPROVALS = [
  {
    id: "APP-MPCB-CTE",
    code: "MPCB-CTE",
    name: "Consent to Establish (CTE)",
    authority: "Maharashtra Pollution Control Board (MPCB)",
    category: "Environment & Pollution",
    turnaroundDays: 45,
    applicableCategory: ["Red", "Orange", "Green"]
  },
  {
    id: "APP-MPCB-CTO",
    code: "MPCB-CTO",
    name: "Consent to Operate (CTO)",
    authority: "Maharashtra Pollution Control Board (MPCB)",
    category: "Environment & Pollution",
    turnaroundDays: 60,
    applicableCategory: ["Red", "Orange", "Green"]
  },
  {
    id: "APP-MIDC-ALLOT",
    code: "MIDC-ALLOT",
    name: "Plot Allotment & Possession Sanction",
    authority: "Maharashtra Industrial Development Corporation (MIDC)",
    category: "Land & Infrastructure",
    turnaroundDays: 30,
    applicableCategory: ["Red", "Orange", "Green", "White"]
  },
  {
    id: "APP-DISH-PLAN",
    code: "DISH-PLAN",
    name: "Factory Building Plan Approval (Form 1)",
    authority: "Directorate of Industrial Safety & Health (DISH)",
    category: "Safety & Labour",
    turnaroundDays: 30,
    applicableCategory: ["Red", "Orange", "Green"]
  },
  {
    id: "APP-FIRE-NOC",
    code: "FIRE-NOC",
    name: "Provisional Fire NOC",
    authority: "Maharashtra Fire Services / MIDC Fire Wing",
    category: "Safety & Fire",
    turnaroundDays: 21,
    applicableCategory: ["Red", "Orange"]
  },
  {
    id: "APP-MSEDCL-PWR",
    code: "MSEDCL-PWR",
    name: "High Tension / Low Tension Power Sanction",
    authority: "Maharashtra State Electricity Distribution Co. (MSEDCL)",
    category: "Utilities",
    turnaroundDays: 15,
    applicableCategory: ["Red", "Orange", "Green", "White"]
  }
];

// Master Data: Required Document Types with expected formats & schemas
const MASTER_DOCUMENTS = [
  {
    id: "DOC-GST",
    code: "GST_CERT",
    name: "GST Registration Certificate (Form REG-06)",
    description: "Certificate issued by Goods and Services Tax Department with verified 15-digit GSTIN",
    allowedFormats: ["PDF", "PNG", "JPG"],
    maxSizeMB: 5,
    mandatory: true,
    expectedFields: ["gstin", "legalName", "tradeName", "principalPlaceOfBusiness", "registrationDate"],
    regexValidators: {
      gstin: "^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$"
    }
  },
  {
    id: "DOC-PAN",
    code: "PAN_CARD",
    name: "Permanent Account Number (PAN) Card",
    description: "PAN Card of Entity / Proprietor / Company",
    allowedFormats: ["PDF", "PNG", "JPG"],
    maxSizeMB: 2,
    mandatory: true,
    expectedFields: ["panNumber", "entityName", "dateOfIncorporation"],
    regexValidators: {
      panNumber: "^[A-Z]{5}[0-9]{4}[A-Z]{1}$"
    }
  },
  {
    id: "DOC-DPR",
    code: "DETAILED_PROJ_REP",
    name: "Detailed Project Report (DPR) & Flowsheet",
    description: "Manufacturing process flowsheet, capital investment, raw material balance & water balance chart",
    allowedFormats: ["PDF"],
    maxSizeMB: 15,
    mandatory: true,
    expectedFields: ["projectCost", "capacityUnits", "manufacturingProcess", "effluentDischargeLitresPerDay"]
  },
  {
    id: "DOC-MIDC-POSS",
    code: "MIDC_POSSESSION",
    name: "MIDC Land Allotment Letter / Lease Deed",
    description: "Copy of registered lease deed or allotment letter issued by MIDC regional office",
    allowedFormats: ["PDF"],
    maxSizeMB: 10,
    mandatory: true,
    expectedFields: ["plotNumber", "industrialArea", "leaseholderName", "areaSqMeters", "allotmentOrderDate"]
  },
  {
    id: "DOC-SITE-PLAN",
    code: "FACTORY_SITE_PLAN",
    name: "Architectural Layout & Site Plan",
    description: "Civil drawings showing machinery layout, green belt area (minimum 33%), and ETP/STP location",
    allowedFormats: ["PDF", "PNG"],
    maxSizeMB: 20,
    mandatory: false,
    expectedFields: ["totalPlotArea", "builtUpArea", "greenBeltAreaPercent", "architectLicenceNumber"]
  },
  {
    id: "DOC-ETP-SCHEME",
    code: "ETP_STP_SCHEME",
    name: "Effluent Treatment Plant (ETP/STP) Scheme",
    description: "Detailed hydraulic design, treatment unit dimensions, and treated wastewater recycling plan",
    allowedFormats: ["PDF"],
    maxSizeMB: 10,
    mandatory: true, // For Red/Orange categories
    expectedFields: ["etpCapacityKLD", "primaryTreatment", "secondaryTreatment", "zeroLiquidDischargeFlag"]
  }
];

// Master Compliance Rules (Database-driven rule engine representation)
const MASTER_RULES = [
  {
    id: "RULE-MAH-01",
    version: "1.2",
    name: "Red Category Chemical CTE Compliance",
    conditions: {
      industryCategory: "Red",
      state: "Maharashtra",
      scale: ["Micro", "Small", "Medium", "Large"]
    },
    approvalsRequired: ["APP-MPCB-CTE", "APP-MIDC-ALLOT", "APP-FIRE-NOC", "APP-DISH-PLAN"],
    documentsRequired: [
      { docId: "DOC-GST", mandatory: true },
      { docId: "DOC-PAN", mandatory: true },
      { docId: "DOC-DPR", mandatory: true },
      { docId: "DOC-MIDC-POSS", mandatory: true },
      { docId: "DOC-SITE-PLAN", mandatory: true },
      { docId: "DOC-ETP-SCHEME", mandatory: true }
    ],
    officialPortalId: "PORTAL-MAITRI",
    effectiveFrom: "2024-01-01",
    effectiveUntil: "2027-12-31",
    status: "Active",
    lastVerifiedDate: "2025-02-15",
    sourceReference: "MPCB Circular No. B-29012/1/ESS(CPA)/2015-16"
  },
  {
    id: "RULE-MAH-02",
    version: "1.1",
    name: "Orange Category Food & Engineering CTE Compliance",
    conditions: {
      industryCategory: "Orange",
      state: "Maharashtra",
      scale: ["Micro", "Small", "Medium"]
    },
    approvalsRequired: ["APP-MPCB-CTE", "APP-MIDC-ALLOT", "APP-DISH-PLAN", "APP-MSEDCL-PWR"],
    documentsRequired: [
      { docId: "DOC-GST", mandatory: true },
      { docId: "DOC-PAN", mandatory: true },
      { docId: "DOC-DPR", mandatory: true },
      { docId: "DOC-MIDC-POSS", mandatory: true },
      { docId: "DOC-SITE-PLAN", mandatory: false },
      { docId: "DOC-ETP-SCHEME", mandatory: true }
    ],
    officialPortalId: "PORTAL-MAITRI",
    effectiveFrom: "2024-01-01",
    effectiveUntil: "2027-12-31",
    status: "Active",
    lastVerifiedDate: "2025-02-20",
    sourceReference: "Maharashtra Industrial Policy 2019 Notification"
  },
  {
    id: "RULE-MAH-03",
    version: "1.0",
    name: "Green Category Electronics Fast-Track",
    conditions: {
      industryCategory: "Green",
      state: "Maharashtra",
      scale: ["Micro", "Small"]
    },
    approvalsRequired: ["APP-MPCB-CTE", "APP-MIDC-ALLOT", "APP-MSEDCL-PWR"],
    documentsRequired: [
      { docId: "DOC-GST", mandatory: true },
      { docId: "DOC-PAN", mandatory: true },
      { docId: "DOC-DPR", mandatory: true },
      { docId: "DOC-MIDC-POSS", mandatory: true }
    ],
    officialPortalId: "PORTAL-MAITRI",
    effectiveFrom: "2024-01-01",
    effectiveUntil: "2027-12-31",
    status: "Active",
    lastVerifiedDate: "2025-02-10",
    sourceReference: "Green Industrial Units Exemption Framework"
  }
];

// Master Government Portal Directory (Section 7 of PDF)
const MASTER_GOV_PORTALS = [
  {
    id: "PORTAL-MAITRI",
    name: "MAITRI - Maharashtra Industry, Trade And Investment Facilitation Cell",
    department: "Industries Department, Govt. of Maharashtra",
    state: "Maharashtra",
    approvalTypes: ["Single Window Clearances", "Composite Application Form (CAF)", "Incentive Claims"],
    officialUrl: "https://maitri.mahaonline.gov.in",
    subPageUrl: "https://maitri.mahaonline.gov.in/SingleWindowServices",
    description: "Official Single Window portal of Maharashtra. File Composite Application Form (CAF) to trigger all department clearances simultaneously.",
    status: "Active & Verified",
    lastVerifiedDate: "2025-03-01",
    badge: "Official Single Window"
  },
  {
    id: "PORTAL-MPCB",
    name: "MPCB e-Governance Portal",
    department: "Maharashtra Pollution Control Board",
    state: "Maharashtra",
    approvalTypes: ["Consent to Establish (CTE)", "Consent to Operate (CTO)", "Hazardous Waste Authorization"],
    officialUrl: "https://mpcb.gov.in",
    subPageUrl: "https://mpcbrpcb.ecmpcb.in",
    description: "Direct portal for submitting environmental consents, pollution control schemes, stack emission reports, and paying statutory consent fees.",
    status: "Active & Verified",
    lastVerifiedDate: "2025-03-01",
    badge: "Pollution Control"
  },
  {
    id: "PORTAL-MIDC",
    name: "MIDC Single Window Clearance Portal",
    department: "Maharashtra Industrial Development Corporation",
    state: "Maharashtra",
    approvalTypes: ["Plot Allotment", "Water Sanction", "Building Plan Approval", "Subletting Permission"],
    officialUrl: "https://www.midcindia.org",
    subPageUrl: "https://services.midcindia.org",
    description: "Allotment of industrial plots in Chakan, Taloja, Butibori, Waluj and other MIDC estates, along with infrastructure utilities.",
    status: "Active & Verified",
    lastVerifiedDate: "2025-02-28",
    badge: "Industrial Land & Utilities"
  },
  {
    id: "PORTAL-AAPLE-SARKAR",
    name: "Aaple Sarkar Citizen Services",
    department: "Revenue & Labour Department, Govt. of Maharashtra",
    state: "Maharashtra",
    approvalTypes: ["Factory Licence Registration", "Boiler Inspection", "Contract Labour Registration"],
    officialUrl: "https://aaplesarkar.mahaonline.gov.in",
    subPageUrl: "https://aaplesarkar.mahaonline.gov.in/en/Login/Login",
    description: "Departmental approvals under Directorate of Industrial Safety & Health (DISH) and Chief Inspector of Factories.",
    status: "Active & Verified",
    lastVerifiedDate: "2025-02-25",
    badge: "Labour & Safety Clearances"
  }
];

// Preloaded Demo Profiles for 1-Click Evaluation
const DEMO_PERSONAS = [
  {
    id: "demo-msme-1",
    name: "Rajesh Shinde",
    email: "rajesh@shindespecialty.com",
    role: "Industrialist / MSME Owner",
    businessProfile: {
      businessName: "Shinde Specialty Chemicals Pvt Ltd",
      industryId: "IND-001",
      industryName: "Chemical & Petrochemicals",
      industryCategory: "Red",
      subSector: "Specialty Chemicals",
      scale: "Medium",
      capitalInvestmentCr: 18.5,
      state: "Maharashtra",
      district: "Pune",
      industrialArea: "Chakan Industrial Area (Phase 1 & 2)",
      plotNo: "Plot C-42/B, Chakan MIDC",
      gstin: "27AABCS9821R1Z5",
      pan: "AABCS9821R",
      contactPerson: "Rajesh Shinde (Managing Director)",
      phone: "+91 98230 45678"
    }
  },
  {
    id: "demo-consultant-1",
    name: "Pooja Deshmukh",
    email: "pooja@maha-compliance.in",
    role: "Documentation & Compliance Consultant",
    businessProfile: {
      businessName: "MahaCompliance Advisory Services",
      industryId: "IND-002",
      industryName: "Food & Agro Processing",
      industryCategory: "Orange",
      subSector: "Beverages & Fruit Juices",
      scale: "Small",
      capitalInvestmentCr: 6.2,
      state: "Maharashtra",
      district: "Raigad",
      industrialArea: "Taloja Chemical & Industrial Zone",
      plotNo: "Plot A-11, Taloja MIDC",
      gstin: "27AAECM5520P1Z8",
      pan: "AAECM5520P",
      contactPerson: "Pooja Deshmukh",
      phone: "+91 98221 11223"
    }
  },
  {
    id: "demo-admin-1",
    name: "Sunil Wagh (Admin)",
    email: "admin@smartclear.gov.in",
    role: "System Administrator",
    isAdmin: true
  }
];

// Export to window for browser usage
window.CONFIG = CONFIG;
window.APPLICATION_STATUS = APPLICATION_STATUS;
window.DOC_STATUS = DOC_STATUS;
window.MASTER_INDUSTRIES = MASTER_INDUSTRIES;
window.MASTER_LOCATIONS = MASTER_LOCATIONS;
window.MASTER_APPROVALS = MASTER_APPROVALS;
window.MASTER_DOCUMENTS = MASTER_DOCUMENTS;
window.MASTER_RULES = MASTER_RULES;
window.MASTER_GOV_PORTALS = MASTER_GOV_PORTALS;
window.DEMO_PERSONAS = DEMO_PERSONAS;

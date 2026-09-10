/**
 * VYAPAR SETU - API Service Layer
 * Supports both Live Django REST Backend and In-Browser Mock Simulation Engine
 * Section 10 API Requirements
 */

const API = (function() {
  // Local storage keys for mock persistence
  const STORAGE_KEYS = {
    USER: "smartclear_user",
    PROFILE: "smartclear_profile",
    APPLICATIONS: "smartclear_applications",
    DOCUMENTS: "smartclear_documents",
    RULES: "smartclear_rules",
    AUDIT_LOGS: "smartclear_audit_logs",
    SETTINGS: "smartclear_settings"
  };

  // Helper to simulate network latency in mock mode
  function delay(ms = 350) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Generate unique IDs
  function uid(prefix = "id") {
    return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 5)}`;
  }

  // Initialize seed data if not present
  function initMockStorage() {
    if (!localStorage.getItem(STORAGE_KEYS.RULES)) {
      localStorage.setItem(STORAGE_KEYS.RULES, JSON.stringify(window.MASTER_RULES));
    }

    if (!localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS)) {
      const initialLogs = [
        {
          id: "log-1",
          timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
          actor: "System Rule Engine",
          action: "RULE_VERSION_PUBLISHED",
          details: "Compliance rule RULE-MAH-01 (Red Category Chemical) updated to v1.2",
          ip: "127.0.0.1"
        },
        {
          id: "log-2",
          timestamp: new Date(Date.now() - 86400000).toISOString(),
          actor: "Admin Sunil Wagh",
          action: "PORTAL_DIRECTORY_SYNC",
          details: "Verified live connectivity to MAITRI and MPCB portal sub-pages",
          ip: "103.21.14.8"
        },
        {
          id: "log-3",
          timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
          actor: "Auto-Purge Cron Daemon",
          action: "PURGE_POLICY_EXECUTED",
          details: "Scanned temporary storage. 0 expired document artifacts purged.",
          ip: "internal"
        }
      ];
      localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(initialLogs));
    }

    if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify({
        autoPurgeDays: 7,
        retentionMode: "Auto-purge upon report generation + 7 days grace",
        geminiModel: "Gemini 1.5 Flash (Multimodal OCR & Document Verification)",
        enableDeterministicRegex: true
      }));
    }

    // Seed default user and application if empty
    if (!localStorage.getItem(STORAGE_KEYS.USER)) {
      const defaultUser = window.DEMO_PERSONAS[0];
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(defaultUser));
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(defaultUser.businessProfile));

      const seedAppId = "APP-2025-001";
      const seedApp = {
        id: seedAppId,
        title: "Consent to Establish (CTE) - Specialty Organic Intermediates",
        approvalCode: "MPCB-CTE",
        approvalName: "Consent to Establish (CTE)",
        authority: "Maharashtra Pollution Control Board (MPCB)",
        businessName: defaultUser.businessProfile.businessName,
        industryName: defaultUser.businessProfile.industryName,
        industryCategory: defaultUser.businessProfile.industryCategory,
        scale: defaultUser.businessProfile.scale,
        location: `${defaultUser.businessProfile.industrialArea}, ${defaultUser.businessProfile.district}`,
        status: window.APPLICATION_STATUS.ISSUES_FOUND,
        createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
        updatedAt: new Date().toISOString(),
        readinessScore: 78,
        scoreBreakdown: { completeness: 30, validity: 25, quality: 13, consistency: 10 },
        checklist: [
          {
            docId: "DOC-GST",
            name: "GST Registration Certificate (Form REG-06)",
            mandatory: true,
            status: window.DOC_STATUS.PASSED,
            uploadedFile: { name: "GST_Certificate_ShindeChemicals.pdf", sizeMB: "0.85" },
            verifiedAt: new Date(Date.now() - 3600000 * 5).toISOString()
          },
          {
            docId: "DOC-PAN",
            name: "Entity PAN Card",
            mandatory: true,
            status: window.DOC_STATUS.PASSED,
            uploadedFile: { name: "Company_PAN_AABCS9821R.jpg", sizeMB: "1.20" },
            verifiedAt: new Date(Date.now() - 3600000 * 4).toISOString()
          },
          {
            docId: "DOC-DPR",
            name: "Detailed Project Report (DPR) & Flowsheet",
            mandatory: true,
            status: window.DOC_STATUS.WARNING,
            uploadedFile: { name: "DPR_Phase1_Draft_v2.pdf", sizeMB: "4.50" },
            verifiedAt: new Date(Date.now() - 3600000 * 3).toISOString(),
            flaggedIssue: "Water balance effluent discharge calculation omitted for recovery section."
          },
          {
            docId: "DOC-MIDC-POSS",
            name: "MIDC Land Allotment Letter / Lease Deed",
            mandatory: true,
            status: window.DOC_STATUS.PASSED,
            uploadedFile: { name: "MIDC_Chakan_Plot_C42B_Allotment.pdf", sizeMB: "2.10" },
            verifiedAt: new Date(Date.now() - 3600000 * 2).toISOString()
          },
          {
            docId: "DOC-SITE-PLAN",
            name: "Architectural Layout & Site Plan",
            mandatory: true,
            status: window.DOC_STATUS.ERROR,
            uploadedFile: { name: "Chakan_Site_Layout_LowRes.png", sizeMB: "0.45" },
            verifiedAt: new Date(Date.now() - 3600000).toISOString(),
            flaggedIssue: "Image resolution too low (<600px). Green belt area (33%) boundary markings unreadable."
          },
          {
            docId: "DOC-ETP-SCHEME",
            name: "Effluent Treatment Plant (ETP/STP) Scheme",
            mandatory: true,
            status: window.DOC_STATUS.PENDING,
            uploadedFile: null
          }
        ]
      };

      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify([seedApp]));
    }
  }

  // Call mock DB initializer
  initMockStorage();

  // Audit Log recording helper (FR-15: Never log raw sensitive documents)
  function recordAuditLog(action, details, actor = null) {
    const logs = JSON.parse(localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS) || "[]");
    const user = JSON.parse(localStorage.getItem(STORAGE_KEYS.USER) || "{}");
    logs.unshift({
      id: uid("log"),
      timestamp: new Date().toISOString(),
      actor: actor || user.name || "Anonymous User",
      action: action,
      details: details,
      ip: "127.0.0.1"
    });
    // Keep last 150 entries
    if (logs.length > 150) logs.pop();
    localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(logs));
  }

  // --- PUBLIC API EXPORTS ---
  return {
    recordAuditLog,

    // POST /api/auth/register
    register: async function(userData) {
      if (CONFIG.USE_LIVE_BACKEND) {
        const res = await fetch(`${CONFIG.API_BASE_URL}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData)
        });
        return await res.json();
      }
      await delay(400);
      const newUser = {
        id: uid("usr"),
        name: userData.name,
        email: userData.email,
        role: userData.role || "Industrialist / MSME Owner",
        isAdmin: false,
        businessProfile: {
          businessName: userData.businessName || "Registered Enterprise",
          industryCategory: "Orange",
          state: "Maharashtra",
          district: "Pune"
        }
      };
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(newUser.businessProfile));
      recordAuditLog("USER_REGISTERED", `New account registered for ${userData.email} (${newUser.role})`);
      return { success: true, user: newUser, token: "mock_jwt_token_" + Date.now() };
    },

    // POST /api/auth/login
    login: async function(credentials) {
      if (CONFIG.USE_LIVE_BACKEND) {
        const res = await fetch(`${CONFIG.API_BASE_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials)
        });
        return await res.json();
      }
      await delay(300);
      let user = JSON.parse(localStorage.getItem(STORAGE_KEYS.USER) || "null");
      if (!user || user.email !== credentials.email) {
        user = {
          id: uid("usr"),
          name: credentials.email.split('@')[0],
          email: credentials.email,
          role: credentials.email.includes("admin") ? "System Administrator" : "Industrialist / MSME Owner",
          isAdmin: credentials.email.includes("admin")
        };
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      }
      recordAuditLog("USER_LOGIN", `User ${user.email} authenticated successfully`);
      return { success: true, user: user, token: "mock_jwt_token_" + Date.now() };
    },

    // Fast switch persona for 1-click evaluation
    switchPersona: async function(personaId) {
      const persona = window.DEMO_PERSONAS.find(p => p.id === personaId) || window.DEMO_PERSONAS[0];
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(persona));
      if (persona.businessProfile) {
        localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(persona.businessProfile));
      }
      recordAuditLog("PERSONA_SWITCH", `Demo switched to persona: ${persona.name} (${persona.role})`);
      return persona;
    },

    getCurrentUser: function() {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.USER) || "null");
    },

    logout: function() {
      recordAuditLog("USER_LOGOUT", "User logged out");
      localStorage.removeItem(STORAGE_KEYS.USER);
    },

    // GET /api/industries
    getIndustries: async function() {
      if (CONFIG.USE_LIVE_BACKEND) {
        const res = await fetch(`${CONFIG.API_BASE_URL}/industries`);
        return await res.json();
      }
      await delay(100);
      return window.MASTER_INDUSTRIES;
    },

    // GET /api/locations
    getLocations: async function() {
      if (CONFIG.USE_LIVE_BACKEND) {
        const res = await fetch(`${CONFIG.API_BASE_URL}/locations`);
        return await res.json();
      }
      await delay(100);
      return window.MASTER_LOCATIONS;
    },

    // POST /api/business-profile
    saveBusinessProfile: async function(profileData) {
      if (CONFIG.USE_LIVE_BACKEND) {
        const res = await fetch(`${CONFIG.API_BASE_URL}/business-profile`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(profileData)
        });
        return await res.json();
      }
      await delay(300);
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profileData));
      
      // Update attached user profile
      const user = JSON.parse(localStorage.getItem(STORAGE_KEYS.USER) || "{}");
      user.businessProfile = profileData;
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));

      recordAuditLog("PROFILE_UPDATED", `Business profile updated for ${profileData.businessName} (${profileData.scale})`);
      return { success: true, profile: profileData };
    },

    getBusinessProfile: async function() {
      if (CONFIG.USE_LIVE_BACKEND) {
        const res = await fetch(`${CONFIG.API_BASE_URL}/business-profile`);
        return await res.json();
      }
      await delay(100);
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.PROFILE) || "null");
    },

    // POST /api/applications
    createApplication: async function(appData) {
      if (CONFIG.USE_LIVE_BACKEND) {
        const res = await fetch(`${CONFIG.API_BASE_URL}/applications`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(appData)
        });
        return await res.json();
      }
      await delay(400);
      const apps = JSON.parse(localStorage.getItem(STORAGE_KEYS.APPLICATIONS) || "[]");
      const profile = JSON.parse(localStorage.getItem(STORAGE_KEYS.PROFILE) || "{}");
      
      // Compute dynamic checklist using Rule Engine
      const rule = window.MASTER_RULES.find(r => r.conditions.industryCategory === (profile.industryCategory || "Red")) || window.MASTER_RULES[0];
      const dynamicChecklist = rule.documentsRequired.map(req => {
        const docDef = window.MASTER_DOCUMENTS.find(d => d.id === req.docId) || {};
        return {
          docId: req.docId,
          name: docDef.name || req.docId,
          mandatory: req.mandatory,
          status: window.DOC_STATUS.PENDING,
          uploadedFile: null
        };
      });

      const newApp = {
        id: "APP-" + new Date().getFullYear() + "-" + (apps.length + 1).toString().padStart(3, '0'),
        title: appData.title || `Application for ${appData.approvalName || "MPCB Consent"}`,
        approvalCode: appData.approvalCode || "MPCB-CTE",
        approvalName: appData.approvalName || "Consent to Establish (CTE)",
        authority: appData.authority || "Maharashtra Pollution Control Board (MPCB)",
        businessName: profile.businessName || "Unspecified Business",
        industryName: profile.industryName || "Chemical & Petrochemicals",
        industryCategory: profile.industryCategory || "Red",
        scale: profile.scale || "Medium",
        location: `${profile.industrialArea || "MIDC Estate"}, ${profile.district || "Pune"}`,
        status: window.APPLICATION_STATUS.DOCS_PENDING,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        readinessScore: 0,
        scoreBreakdown: { completeness: 0, validity: 0, quality: 0, consistency: 0 },
        checklist: dynamicChecklist
      };

      apps.unshift(newApp);
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(apps));
      recordAuditLog("APPLICATION_CREATED", `Created new approval application ${newApp.id} (${newApp.approvalCode})`);
      return { success: true, application: newApp };
    },

    // GET /api/applications
    getApplications: async function() {
      if (CONFIG.USE_LIVE_BACKEND) {
        const res = await fetch(`${CONFIG.API_BASE_URL}/applications`);
        return await res.json();
      }
      await delay(150);
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.APPLICATIONS) || "[]");
    },

    getApplicationById: async function(appId) {
      if (CONFIG.USE_LIVE_BACKEND) {
        const res = await fetch(`${CONFIG.API_BASE_URL}/applications/${appId}`);
        return await res.json();
      }
      await delay(150);
      const apps = JSON.parse(localStorage.getItem(STORAGE_KEYS.APPLICATIONS) || "[]");
      return apps.find(a => a.id === appId) || null;
    },

    // GET /api/applications/{id}/checklist
    getApplicationChecklist: async function(appId) {
      if (CONFIG.USE_LIVE_BACKEND) {
        const res = await fetch(`${CONFIG.API_BASE_URL}/applications/${appId}/checklist`);
        return await res.json();
      }
      await delay(200);
      const apps = JSON.parse(localStorage.getItem(STORAGE_KEYS.APPLICATIONS) || "[]");
      const app = apps.find(a => a.id === appId);
      return app ? app.checklist : [];
    },

    // POST /api/documents/upload
    uploadDocument: async function(appId, docId, file) {
      if (CONFIG.USE_LIVE_BACKEND) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('app_id', appId);
        formData.append('doc_id', docId);
        const res = await fetch(`${CONFIG.API_BASE_URL}/documents/upload`, {
          method: 'POST',
          body: formData
        });
        return await res.json();
      }
      await delay(400);

      // Client Quality Pre-check
      const qualityCheck = await window.Validators.checkImageQuality(file);

      const apps = JSON.parse(localStorage.getItem(STORAGE_KEYS.APPLICATIONS) || "[]");
      const app = apps.find(a => a.id === appId);
      if (!app) throw new Error("Application not found");

      const item = app.checklist.find(c => c.docId === docId);
      if (item) {
        item.status = window.DOC_STATUS.UPLOADED;
        item.uploadedFile = {
          name: file.name,
          sizeMB: (file.size / (1024 * 1024)).toFixed(2),
          type: file.type,
          lastModified: file.lastModified
        };
        item.quality = qualityCheck;
      }

      app.status = window.APPLICATION_STATUS.VERIFYING;
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(apps));
      recordAuditLog("DOCUMENT_UPLOADED", `Uploaded ${file.name} for ${docId} on application ${appId}`);

      return {
        success: true,
        document: {
          appId,
          docId,
          fileName: file.name,
          quality: qualityCheck
        }
      };
    },

    // POST /api/documents/{id}/verify (FR-06 AI Pre-check, FR-07 Deterministic Validation, FR-08 Consistency)
    verifyDocument: async function(appId, docId) {
      if (CONFIG.USE_LIVE_BACKEND) {
        const res = await fetch(`${CONFIG.API_BASE_URL}/documents/${docId}/verify`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ app_id: appId })
        });
        return await res.json();
      }

      await delay(800); // Simulate Gemini multimodal API processing time

      const apps = JSON.parse(localStorage.getItem(STORAGE_KEYS.APPLICATIONS) || "[]");
      const app = apps.find(a => a.id === appId);
      if (!app) throw new Error("Application not found");

      const profile = JSON.parse(localStorage.getItem(STORAGE_KEYS.PROFILE) || "{}");
      const item = app.checklist.find(c => c.docId === docId);
      if (!item) throw new Error("Checklist item not found");

      // Simulated Gemini Structured Multimodal Extraction & Rule Verification
      let extracted = {};
      let detectedIssues = [];
      let recommendations = [];
      let isDeterministicValid = true;

      if (docId === "DOC-GST") {
        const testGstin = profile.gstin || "27AABCS9821R1Z5";
        const val = window.Validators.validateGSTIN(testGstin);
        extracted = {
          documentType: "GST Registration Certificate (Form REG-06)",
          gstin: testGstin,
          legalName: profile.businessName || "Shinde Specialty Chemicals Pvt Ltd",
          tradeName: profile.businessName || "Shinde Specialty Chemicals",
          stateCode: "27 (Maharashtra)",
          constitutionOfBusiness: "Private Limited Company",
          principalPlaceOfBusiness: `${profile.industrialArea || "Chakan MIDC"}, Pune - 410501`,
          dateOfValidity: "From 12/04/2018 - Regular",
          issuingAuthority: "State Goods and Services Tax Department, Maharashtra"
        };
        if (!val.valid) {
          isDeterministicValid = false;
          detectedIssues.push({ severity: "Error", text: val.error });
          recommendations.push("Re-upload an authentic and active GSTIN REG-06 certificate.");
        }
      } else if (docId === "DOC-PAN") {
        const testPan = profile.pan || "AABCS9821R";
        const val = window.Validators.validatePAN(testPan);
        extracted = {
          documentType: "Income Tax Department Permanent Account Number",
          panNumber: testPan,
          entityName: profile.businessName || "Shinde Specialty Chemicals Pvt Ltd",
          dateOfIncorporation: "14/02/2018",
          entityType: val.entityType
        };
        if (!val.valid) {
          isDeterministicValid = false;
          detectedIssues.push({ severity: "Error", text: val.error });
        }
      } else if (docId === "DOC-MIDC-POSS") {
        extracted = {
          documentType: "MIDC Allotment & Registered Lease Order",
          plotNumber: profile.plotNo || "Plot C-42/B",
          industrialArea: profile.industrialArea || "Chakan Industrial Area (Phase 1 & 2)",
          leaseholderName: profile.businessName || "Shinde Specialty Chemicals Pvt Ltd",
          allotmentDate: "20/08/2021",
          leasePeriodYears: 95,
          areaSqMeters: 4500
        };
      } else if (docId === "DOC-DPR") {
        extracted = {
          documentType: "Comprehensive Detailed Project Report",
          projectCostCr: profile.capitalInvestmentCr || 18.5,
          proposedProducts: "Organic fine chemicals & specialty solvents",
          dailyFreshWaterReqKLD: 45,
          effluentGenerationKLD: 28,
          powerSanctionReqKVA: 350
        };
        detectedIssues.push({
          severity: "Warning",
          text: "Clarify whether Zero Liquid Discharge (ZLD) is adopted for high TDS streams."
        });
        recommendations.push("Attach dedicated ZLD evaporator layout to avoid MPCB scrutiny query.");
      } else if (docId === "DOC-SITE-PLAN") {
        extracted = {
          documentType: "Factory Building & Machinery Layout Plan",
          totalPlotAreaSqMtr: 4500,
          builtUpAreaSqMtr: 2100,
          greenBeltAreaPercent: 28.5, // Less than mandatory 33%
          architectRegNo: "CA/2012/58914"
        };
        detectedIssues.push({
          severity: "Error",
          text: "Green belt area marked at 28.5%, falling short of mandatory MPCB requirement of 33%."
        });
        recommendations.push("Revise plot layout to demonstrate minimum 33% dedicated tree plantation / green coverage.");
      } else {
        extracted = {
          documentType: "Industrial Technical Submission",
          extractedFieldsCount: 6,
          summary: "Document verified for regulatory conformity."
        };
      }

      // Run Cross-Document Consistency Check
      const consistency = window.Validators.checkConsistency(extracted, profile);
      consistency.issues.forEach(iss => {
        detectedIssues.push({ severity: iss.type, text: `${iss.field}: ${iss.recommendation}` });
      });

      // Compute status for this item
      let docStatus = window.DOC_STATUS.PASSED;
      if (detectedIssues.some(i => i.severity === "Error" || i.severity === "Critical Error")) {
        docStatus = window.DOC_STATUS.ERROR;
      } else if (detectedIssues.some(i => i.severity === "Warning") || (item.quality && !item.quality.isQualityPassed)) {
        docStatus = window.DOC_STATUS.WARNING;
      }

      item.status = docStatus;
      item.verifiedAt = new Date().toISOString();
      item.aiResult = {
        documentType: extracted.documentType || "Standard Annexure",
        readable: item.quality ? item.quality.isQualityPassed : true,
        confidence: (0.92 + Math.random() * 0.07).toFixed(2),
        extractedFields: extracted,
        detectedIssues: detectedIssues,
        consistencyMatches: consistency.passed,
        recommendations: recommendations
      };

      // Recalculate Application Overall Score
      const checks = app.checklist.map(c => ({
        isValid: c.status !== window.DOC_STATUS.ERROR,
        status: c.status,
        quality: c.quality,
        consistency: c.aiResult ? { consistencyScore: c.aiResult.detectedIssues.length === 0 ? 100 : 70 } : null
      }));

      const readiness = window.Validators.calculateReadinessScore(app.checklist, checks);
      app.readinessScore = readiness.totalScore;
      app.scoreBreakdown = {
        completeness: readiness.completeness,
        validity: readiness.validity,
        quality: readiness.quality,
        consistency: readiness.consistency
      };

      if (readiness.totalScore >= 85) {
        app.status = window.APPLICATION_STATUS.READY;
      } else if (app.checklist.some(c => c.status === window.DOC_STATUS.ERROR || c.status === window.DOC_STATUS.WARNING)) {
        app.status = window.APPLICATION_STATUS.ISSUES_FOUND;
      }

      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(apps));
      recordAuditLog("DOCUMENT_VERIFIED", `Verified document ${docId} on app ${appId}. Result: ${docStatus}`);

      return {
        success: true,
        documentStatus: docStatus,
        verificationResult: item.aiResult,
        applicationReadinessScore: readiness.totalScore
      };
    },

    // GET /api/applications/{id}/report
    getApplicationReport: async function(appId) {
      if (CONFIG.USE_LIVE_BACKEND) {
        const res = await fetch(`${CONFIG.API_BASE_URL}/applications/${appId}/report`);
        return await res.json();
      }
      await delay(250);
      const app = await this.getApplicationById(appId);
      if (!app) throw new Error("Application not found");

      const profile = JSON.parse(localStorage.getItem(STORAGE_KEYS.PROFILE) || "{}");

      // Aggregate issues and passed checks across all documents
      const allErrors = [];
      const allWarnings = [];
      const allPassed = [];

      app.checklist.forEach(item => {
        if (item.aiResult) {
          (item.aiResult.detectedIssues || []).forEach(iss => {
            const entry = {
              docName: item.name,
              docId: item.docId,
              text: iss.text,
              severity: iss.severity
            };
            if (iss.severity === "Error" || iss.severity === "Critical Error") {
              allErrors.push(entry);
            } else {
              allWarnings.push(entry);
            }
          });

          (item.aiResult.consistencyMatches || []).forEach(m => {
            allPassed.push({
              docName: item.name,
              text: `${m.field} successfully matched profile data (${m.docValue})`
            });
          });
        }

        if (item.status === window.DOC_STATUS.PASSED) {
          allPassed.push({
            docName: item.name,
            text: `Deterministic format & quality checks passed successfully`
          });
        }
      });

      // Target official portal
      const targetPortal = window.MASTER_GOV_PORTALS.find(p => p.id === "PORTAL-MAITRI") || window.MASTER_GOV_PORTALS[0];

      return {
        applicationId: app.id,
        applicationTitle: app.title,
        approvalName: app.approvalName,
        authority: app.authority,
        businessName: app.businessName,
        generatedAt: new Date().toISOString(),
        readinessScore: app.readinessScore,
        scoreBreakdown: app.scoreBreakdown,
        readinessRating: app.readinessScore >= 85 ? "Ready for Official Submission" : (app.readinessScore >= 70 ? "Minor Corrections Recommended" : "Action Required - Pre-Check Flaws"),
        statutoryDisclaimer: CONFIG.STATUTORY_DISCLAIMER,
        targetPortal: targetPortal,
        checklistSummary: {
          total: app.checklist.length,
          uploaded: app.checklist.filter(c => c.uploadedFile).length,
          passed: app.checklist.filter(c => c.status === window.DOC_STATUS.PASSED).length,
          warnings: allWarnings.length,
          errors: allErrors.length
        },
        passedChecks: allPassed,
        warnings: allWarnings,
        criticalErrors: allErrors,
        checklistItems: app.checklist
      };
    },

    // GET /api/government-portals
    getGovernmentPortals: async function() {
      if (CONFIG.USE_LIVE_BACKEND) {
        const res = await fetch(`${CONFIG.API_BASE_URL}/government-portals`);
        return await res.json();
      }
      await delay(100);
      return window.MASTER_GOV_PORTALS;
    },

    // GET /api/admin/rules
    getAdminRules: async function() {
      if (CONFIG.USE_LIVE_BACKEND) {
        const res = await fetch(`${CONFIG.API_BASE_URL}/admin/rules`);
        return await res.json();
      }
      await delay(150);
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.RULES) || "[]");
    },

    // POST/PUT /api/admin/rules
    saveAdminRule: async function(ruleData) {
      if (CONFIG.USE_LIVE_BACKEND) {
        const res = await fetch(`${CONFIG.API_BASE_URL}/admin/rules`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(ruleData)
        });
        return await res.json();
      }
      await delay(300);
      const rules = JSON.parse(localStorage.getItem(STORAGE_KEYS.RULES) || "[]");
      const existingIdx = rules.findIndex(r => r.id === ruleData.id);
      if (existingIdx >= 0) {
        rules[existingIdx] = { ...ruleData, lastVerifiedDate: new Date().toISOString().split('T')[0] };
      } else {
        ruleData.id = uid("RULE");
        ruleData.version = "1.0";
        ruleData.lastVerifiedDate = new Date().toISOString().split('T')[0];
        rules.push(ruleData);
      }
      localStorage.setItem(STORAGE_KEYS.RULES, JSON.stringify(rules));
      recordAuditLog("RULE_MODIFIED", `Compliance rule ${ruleData.id} (${ruleData.name}) updated.`);
      return { success: true, rule: ruleData };
    },

    // Audit logs
    getAuditLogs: async function() {
      await delay(100);
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS) || "[]");
    },

    // Settings & Auto-purge
    getSettings: async function() {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.SETTINGS) || "{}");
    },

    saveSettings: async function(newSettings) {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(newSettings));
      recordAuditLog("SETTINGS_UPDATED", `Retention and purge configuration saved (Auto-purge: ${newSettings.autoPurgeDays} days)`);
      return { success: true };
    },

    // FR-16 Auto-purge trigger demonstration
    triggerAutoPurge: async function() {
      await delay(600);
      const apps = JSON.parse(localStorage.getItem(STORAGE_KEYS.APPLICATIONS) || "[]");
      let purgedCount = 0;
      apps.forEach(app => {
        app.checklist.forEach(item => {
          if (item.uploadedFile) {
            // Retain metadata while flagging file as purged
            item.uploadedFile.purged = true;
            item.uploadedFile.purgedAt = new Date().toISOString();
            purgedCount++;
          }
        });
      });
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(apps));
      recordAuditLog("AUTO_PURGE_RUN", `Auto-purge executed successfully. ${purgedCount} temporary raw file copies deleted from secure cache.`);
      return { success: true, purgedCount: purgedCount };
    }
  };
})();

window.API = API;

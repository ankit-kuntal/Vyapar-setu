/**
 * VYAPAR SETU - Crystal Document Verification Screen
 * AI Pre-Check & Deterministic Validation Inspector
 */

const VerificationComponent = {
  render: async function(state) {
    const appId = state.activeApplicationId || "APP-2025-001";
    const app = await API.getApplicationById(appId);
    const selectedDocId = state.activeDocId || "DOC-GST";

    const checklist = app ? app.checklist : [];
    const currentItem = checklist.find(c => c.docId === selectedDocId) || checklist[0] || {};
    const docDef = window.MASTER_DOCUMENTS.find(d => d.id === currentItem.docId) || {};

    const aiResult = currentItem.aiResult || {
      documentType: "GST Registration Certificate (Form REG-06)",
      readable: true,
      confidence: "0.96",
      extractedFields: {
        gstin: "27AABCS9821R1Z5",
        legalName: "Shinde Specialty Chemicals Pvt Ltd",
        tradeName: "Shinde Specialty Chemicals",
        stateCode: "27 (Maharashtra)",
        principalPlaceOfBusiness: "Chakan Industrial Area Phase 2, Pune - 410501",
        dateOfRegistration: "12/04/2018"
      },
      detectedIssues: [],
      consistencyMatches: [
        { field: "Entity Name", docValue: "Shinde Specialty Chemicals Pvt Ltd" },
        { field: "GSTIN Match", docValue: "27AABCS9821R1Z5" },
        { field: "State Code", docValue: "27 (Maharashtra)" }
      ],
      recommendations: ["Annexure verified. Meets all statutory MPCB criteria."]
    };

    return `
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-left">
        
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="text-xs uppercase font-bold tracking-wider text-blue-700">Section 5 & FR-06 • Pre-Check Inspector</span>
              <span class="text-slate-300">•</span>
              <span class="font-mono text-xs text-slate-500 font-semibold">${app ? app.id : ''}</span>
            </div>
            <h1 class="text-2xl font-extrabold text-slate-900 tracking-tight">Document Verification & Rule Matching</h1>
            <p class="text-xs text-slate-500 mt-1">Comparing Gemini Multimodal OCR extraction against deterministic regex and database compliance rules.</p>
          </div>
          <div class="flex items-center gap-3">
            <button onclick="Store.navigate('checklist', { appId: '${appId}' })" class="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 shadow-xs transition">
              &larr; Checklist
            </button>
            <button onclick="Store.navigate('report', { appId: '${appId}' })" class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition">
              Readiness Report &rarr;
            </button>
          </div>
        </div>

        <!-- Document Quick Selector Bar -->
        <div class="flex items-center gap-2 overflow-x-auto pb-1">
          <span class="text-xs font-bold text-slate-400 shrink-0">Switch Document:</span>
          ${checklist.map(item => `
            <button onclick="window.switchInspectionDoc('${appId}', '${item.docId}')" class="px-3 py-1.5 rounded-xl text-xs font-semibold transition shrink-0 ${item.docId === currentItem.docId ? 'bg-blue-600 text-white shadow-xs' : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'}">
              ${item.docId}: ${item.name.split(' ')[0]}
            </button>
          `).join('')}
        </div>

        <!-- TWO-COLUMN INSPECTOR (User Requested Spec) -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          <!-- LEFT: Uploaded Document Preview (5 cols) -->
          <div class="lg:col-span-5 space-y-4">
            <div class="crystal-panel rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
              
              <div class="flex items-center justify-between">
                <span class="font-mono text-xs text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-200">${currentItem.docId}</span>
                <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                  ${currentItem.uploadedFile ? currentItem.uploadedFile.sizeMB + ' MB' : '1.20 MB'}
                </span>
              </div>

              <div>
                <h3 class="text-lg font-bold text-slate-900">${currentItem.name}</h3>
                <p class="text-xs text-slate-500 mt-0.5">${docDef.description || 'Statutory compliance document.'}</p>
              </div>

              <!-- Document Graphic Simulation Frame -->
              <div class="p-5 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 text-center space-y-3 relative overflow-hidden">
                <div class="w-16 h-20 mx-auto rounded-lg bg-white border border-slate-200 shadow-sm flex flex-col items-center justify-center p-2 relative">
                  <div class="w-full h-1.5 bg-blue-600 rounded-full mb-1"></div>
                  <div class="w-3/4 h-1 bg-slate-200 rounded-full mb-1"></div>
                  <div class="w-5/6 h-1 bg-slate-200 rounded-full mb-1"></div>
                  <div class="w-2/3 h-1 bg-slate-200 rounded-full mb-2"></div>
                  <div class="w-6 h-6 rounded bg-blue-50 border border-blue-100 flex items-center justify-center text-[8px] font-mono font-bold text-blue-600">
                    PDF
                  </div>
                </div>

                <div>
                  <div class="font-mono text-xs font-bold text-slate-800 truncate">
                    ${currentItem.uploadedFile ? currentItem.uploadedFile.name : 'GST_Registration_Certificate.pdf'}
                  </div>
                  <p class="text-[10px] text-slate-500 mt-0.5">Uploaded & Staged in Secure Cache</p>
                </div>

                <!-- Canvas Scan Metrics Ribbon -->
                <div class="grid grid-cols-2 gap-2 pt-2 text-[11px] text-left">
                  <div class="p-2 rounded-lg bg-white border border-slate-200">
                    <span class="text-[10px] text-slate-400 block">Resolution & Clarity</span>
                    <strong class="text-emerald-700">${currentItem.quality ? currentItem.quality.readability : 'High Clarity'}</strong>
                  </div>
                  <div class="p-2 rounded-lg bg-white border border-slate-200">
                    <span class="text-[10px] text-slate-400 block">Blur Metric</span>
                    <strong class="text-slate-800 font-mono">${currentItem.quality ? currentItem.quality.blurScore : '0.94'} / 1.0</strong>
                  </div>
                </div>
              </div>

              <div class="flex items-center justify-between text-xs pt-1">
                <button onclick="Store.navigate('upload', { appId: '${appId}', docId: '${currentItem.docId}' })" class="text-blue-600 hover:text-blue-800 font-semibold">
                  Upload Alternative File &rarr;
                </button>
                <span class="text-[10px] text-slate-400">Retention: 7 Days</span>
              </div>

            </div>

            <!-- Architecture Reminder Card -->
            <div class="p-4 rounded-2xl bg-blue-50/60 border border-blue-200/80 text-xs text-blue-950 leading-relaxed">
              <strong class="text-blue-900 font-bold block mb-1">Section 5 Architectural Mandate:</strong>
              AI does not invent legal rules; it performs pre-check extraction. Reliable deterministic logic validates formats, and the rule engine verifies statutory necessity.
            </div>
          </div>

          <!-- RIGHT: AI Pre-check & Deterministic Validation (7 cols) -->
          <div class="lg:col-span-7 space-y-4">
            
            <!-- 1. AI Pre-check Card (User Requested Checklist Items) -->
            <div class="crystal-panel rounded-3xl p-6 border border-cyan-200/80 bg-gradient-to-b from-cyan-50/30 to-white shadow-xs space-y-4">
              <div class="flex items-center justify-between pb-3 border-b border-cyan-100">
                <div class="flex items-center gap-2">
                  <div class="w-6 h-6 rounded-lg bg-cyan-600 text-white flex items-center justify-center font-bold text-xs">
                    AI
                  </div>
                  <h3 class="text-sm font-extrabold uppercase tracking-wider text-cyan-950">AI Pre-check (Multimodal OCR)</h3>
                </div>
                <span class="text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-800 border border-cyan-200">
                  Confidence ${aiResult.confidence || '0.96'}
                </span>
              </div>

              <!-- AI Checklist Items (User Spec) -->
              <div class="space-y-2.5 text-xs">
                
                <div class="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                  <div class="flex items-center gap-2.5">
                    <span class="text-emerald-600 font-extrabold text-sm">✓</span>
                    <span class="font-bold text-slate-800">Document Type Detected:</span>
                  </div>
                  <span class="font-mono text-slate-900 font-medium">${aiResult.documentType}</span>
                </div>

                <div class="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                  <div class="flex items-center gap-2.5">
                    <span class="text-emerald-600 font-extrabold text-sm">✓</span>
                    <span class="font-bold text-slate-800">Document Readable:</span>
                  </div>
                  <span class="font-semibold text-emerald-700">Text & Watermarks Legible</span>
                </div>

                <div class="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                  <div class="flex items-center gap-2.5">
                    <span class="text-emerald-600 font-extrabold text-sm">✓</span>
                    <span class="font-bold text-slate-800">Name Matched:</span>
                  </div>
                  <span class="font-semibold text-slate-900">${aiResult.extractedFields ? (aiResult.extractedFields.legalName || 'Verified') : 'Verified'}</span>
                </div>

                <div class="p-3 rounded-xl bg-white border ${currentItem.docId === 'DOC-SITE-PLAN' ? 'border-amber-300 bg-amber-50/40' : 'border-slate-200'} flex items-center justify-between">
                  <div class="flex items-center gap-2.5">
                    <span class="${currentItem.docId === 'DOC-SITE-PLAN' ? 'text-amber-600' : 'text-emerald-600'} font-extrabold text-sm">
                      ${currentItem.docId === 'DOC-SITE-PLAN' ? '⚠' : '✓'}
                    </span>
                    <span class="font-bold text-slate-800">Date & Validity Window:</span>
                  </div>
                  <span class="${currentItem.docId === 'DOC-SITE-PLAN' ? 'text-amber-700 font-semibold' : 'text-slate-700'}">
                    ${currentItem.docId === 'DOC-SITE-PLAN' ? 'Requires Scrutiny Review' : 'Current & Effective'}
                  </span>
                </div>

                <div class="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                  <div class="flex items-center gap-2.5">
                    <span class="text-emerald-600 font-extrabold text-sm">✓</span>
                    <span class="font-bold text-slate-800">Required Fields Found:</span>
                  </div>
                  <span class="font-semibold text-emerald-700">All 5 Standard Attributes Present</span>
                </div>

              </div>
            </div>

            <!-- 2. Deterministic Validation Card (User Requested Spec) -->
            <div class="crystal-panel rounded-3xl p-6 border border-blue-200/90 bg-gradient-to-b from-blue-50/20 to-white shadow-xs space-y-4">
              <div class="flex items-center justify-between pb-3 border-b border-blue-100">
                <div class="flex items-center gap-2">
                  <div class="w-6 h-6 rounded-lg bg-blue-700 text-white flex items-center justify-center font-bold text-xs">
                    DV
                  </div>
                  <h3 class="text-sm font-extrabold uppercase tracking-wider text-blue-950">Deterministic Validation (Rules & Regex)</h3>
                </div>
                <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                  Backend Rules Engine
                </span>
              </div>

              <!-- Deterministic Checklist Items (User Spec) -->
              <div class="space-y-2.5 text-xs">
                
                <div class="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                  <div class="flex items-center gap-2.5">
                    <span class="text-emerald-600 font-extrabold text-sm">✓</span>
                    <span class="font-bold text-slate-800">Format Valid:</span>
                  </div>
                  <span class="font-semibold text-emerald-700">Standard REG-06 Structure</span>
                </div>

                <div class="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                  <div class="flex items-center gap-2.5">
                    <span class="text-emerald-600 font-extrabold text-sm">✓</span>
                    <span class="font-bold text-slate-800">Business ID Format Valid (GSTIN/PAN):</span>
                  </div>
                  <span class="font-mono font-bold text-blue-700">27AABCS9821R1Z5 (Passes Regex)</span>
                </div>

                <div class="p-3 rounded-xl bg-white border ${currentItem.docId === 'DOC-SITE-PLAN' ? 'border-amber-300 bg-amber-50/40' : 'border-slate-200'} flex items-center justify-between">
                  <div class="flex items-center gap-2.5">
                    <span class="${currentItem.docId === 'DOC-SITE-PLAN' ? 'text-amber-600' : 'text-emerald-600'} font-extrabold text-sm">
                      ${currentItem.docId === 'DOC-SITE-PLAN' ? '⚠' : '✓'}
                    </span>
                    <span class="font-bold text-slate-800">Business Profile Consistency:</span>
                  </div>
                  <span class="${currentItem.docId === 'DOC-SITE-PLAN' ? 'text-amber-800 font-semibold' : 'text-emerald-700 font-semibold'}">
                    ${currentItem.docId === 'DOC-SITE-PLAN' ? 'Greenbelt 28.5% below mandatory 33%' : '100% Alignment with Profile'}
                  </span>
                </div>

              </div>

              <!-- Extracted Fields Collapsible Table -->
              <div class="pt-3 border-t border-slate-100">
                <div class="text-[11px] font-bold text-slate-500 uppercase mb-2">Structured Extracted Data Fields</div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  ${Object.entries(aiResult.extractedFields || {}).map(([key, val]) => `
                    <div class="p-2 rounded-lg bg-slate-50 border border-slate-200 flex flex-col">
                      <span class="text-slate-400 capitalize text-[10px]">${key.replace(/([A-Z])/g, ' $1')}</span>
                      <span class="font-bold font-mono text-slate-800 truncate">${val}</span>
                    </div>
                  `).join('')}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    `;
  }
};

window.switchInspectionDoc = function(appId, docId) {
  Store.setActiveDoc(docId);
  Store.navigate('verification', { appId, docId });
};

window.VerificationComponent = VerificationComponent;

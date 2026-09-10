/**
 * VYAPAR SETU - Crystal Verification Report Component
 * Pre-Check Dossier with Document Readiness Score (92 / 100)
 */

const ReportComponent = {
  render: async function(state) {
    const appId = state.activeApplicationId || "APP-2025-001";
    const report = await API.getApplicationReport(appId);

    const score = report.readinessScore || 92;
    const strokeDash = Math.round((score / 100) * 314);

    return `
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-left">
        
        <!-- Header & Print Controls -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="font-mono text-xs text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-200">${report.applicationId}</span>
              <span class="text-slate-300">•</span>
              <span class="text-xs text-slate-500 font-medium">Compliance Pre-Check Dossier (FR-10)</span>
            </div>
            <h1 class="text-2xl font-extrabold text-slate-900 tracking-tight">Document Readiness Verification Report</h1>
            <p class="text-xs text-slate-500 mt-1">Generated: ${new Date(report.generatedAt).toLocaleString('en-IN')}</p>
          </div>

          <div class="flex items-center gap-3 no-print">
            <button onclick="window.print()" class="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-xs shadow-xs transition flex items-center gap-2">
              <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
              <span>Print Dossier</span>
            </button>
            <button onclick="Store.navigate('government-routing', { appId: '${report.applicationId}' })" class="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 transition flex items-center gap-2">
              <span>Route to MAITRI Portal</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </button>
          </div>
        </div>

        <!-- PRIMARY REPORT CARD: Document Readiness Score 92 / 100 (User Spec) -->
        <div class="crystal-panel rounded-3xl p-6 sm:p-8 border border-white shadow-[0_15px_40px_-10px_rgba(15,23,42,0.06)] relative overflow-hidden crystal-prism">
          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            
            <!-- Left Circular Score Gauge -->
            <div class="flex items-center gap-6">
              <div class="relative w-32 h-32 shrink-0">
                <svg class="w-full h-full" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#e2e8f0" stroke-width="10"/>
                  <circle cx="60" cy="60" r="50" fill="none" 
                    stroke="${score >= 85 ? '#16a34a' : '#d97706'}" 
                    stroke-width="10" 
                    stroke-dasharray="314" 
                    stroke-dashoffset="${314 - strokeDash}" 
                    stroke-linecap="round" 
                    class="score-circle-meter" />
                </svg>
                <div class="absolute inset-0 flex flex-col items-center justify-center">
                  <span class="text-3xl font-black text-slate-900">${score}</span>
                  <span class="text-[9px] uppercase tracking-wider text-slate-400 font-bold">/ 100</span>
                </div>
              </div>

              <div class="space-y-1">
                <div class="text-[11px] uppercase font-bold tracking-wider text-blue-700">Pre-Check Determination</div>
                <h2 class="text-2xl font-black text-slate-900 tracking-tight">Document Readiness Score</h2>
                <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 mt-1">
                  <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Ready for Submission
                </div>
                <p class="text-xs text-slate-500 max-w-sm mt-1 leading-relaxed">
                  Verified against Maharashtra Pollution Control Board (MPCB) and MAITRI Composite Application Form standards.
                </p>
              </div>
            </div>

            <!-- Right Metrics Summary: Passed Checks: 18 | Warnings: 2 | Errors: 1 (User Spec) -->
            <div class="grid grid-cols-3 gap-3 shrink-0 lg:w-[380px] text-center">
              
              <div class="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200">
                <div class="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">Passed Checks</div>
                <div class="text-3xl font-black text-emerald-700 mt-1">18</div>
                <div class="text-[10px] text-emerald-600 mt-0.5">Verified Valid</div>
              </div>

              <div class="p-4 rounded-2xl bg-amber-50/60 border border-amber-200">
                <div class="text-[10px] font-bold text-amber-800 uppercase tracking-wider">Warnings</div>
                <div class="text-3xl font-black text-amber-700 mt-1">2</div>
                <div class="text-[10px] text-amber-600 mt-0.5">Non-Blocking</div>
              </div>

              <div class="p-4 rounded-2xl bg-rose-50/60 border border-rose-200">
                <div class="text-[10px] font-bold text-rose-800 uppercase tracking-wider">Errors</div>
                <div class="text-3xl font-black text-rose-700 mt-1">1</div>
                <div class="text-[10px] text-rose-600 mt-0.5">Action Needed</div>
              </div>

            </div>

          </div>
        </div>

        <!-- 4 DISTINCT SECTIONS (User Spec): ✓ Passed, ⚠ Warnings, ✕ Errors, → Recommended Corrections -->
        <div class="space-y-4">
          
          <!-- 1. ✕ Errors (Red) -->
          <div class="crystal-panel rounded-3xl p-6 border border-rose-200/90 bg-gradient-to-b from-rose-50/30 to-white shadow-xs space-y-3">
            <div class="flex items-center gap-2 text-rose-800 font-bold text-xs uppercase tracking-wider">
              <span class="w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center font-black text-xs">✕</span>
              <span>Errors Requiring Correction (1)</span>
            </div>
            
            <div class="p-4 rounded-2xl bg-white border border-rose-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <span class="font-mono text-[10px] font-bold text-rose-700 uppercase">DOC-SITE-PLAN • Factory Layout & Site Plan</span>
                <div class="text-slate-900 font-bold mt-0.5">Greenbelt area marked at 28.5%, falling short of mandatory MPCB requirement of 33%.</div>
                <div class="text-slate-500 text-[11px] mt-0.5">Authority: MPCB CTE Environmental Scrutiny Standard</div>
              </div>
              <button onclick="Store.navigate('upload', { appId: '${report.applicationId}', docId: 'DOC-SITE-PLAN' })" class="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold shrink-0 text-xs transition shadow-xs">
                Replace Site Plan &rarr;
              </button>
            </div>
          </div>

          <!-- 2. ⚠ Warnings (Amber) -->
          <div class="crystal-panel rounded-3xl p-6 border border-amber-200/90 bg-gradient-to-b from-amber-50/30 to-white shadow-xs space-y-3">
            <div class="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wider">
              <span class="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center font-black text-xs">⚠</span>
              <span>Warnings & Scrutiny Advisory (2)</span>
            </div>

            <div class="space-y-2 text-xs">
              <div class="p-3.5 rounded-2xl bg-white border border-amber-200">
                <span class="font-mono text-[10px] font-bold text-amber-700 uppercase">DOC-DPR • Detailed Project Report</span>
                <div class="text-slate-800 mt-0.5">Water balance flowsheet does not explicitly detail Zero Liquid Discharge (ZLD) evaporator specs for high TDS effluent streams.</div>
              </div>

              <div class="p-3.5 rounded-2xl bg-white border border-amber-200">
                <span class="font-mono text-[10px] font-bold text-amber-700 uppercase">DOC-MIDC-POSS • Land Possession Deed</span>
                <div class="text-slate-800 mt-0.5">Lease order date is over 3 years old. Recommended to attach latest MIDC water/drainage NOC certificate.</div>
              </div>
            </div>
          </div>

          <!-- 3. ✓ Passed Checks (Green) -->
          <div class="crystal-panel rounded-3xl p-6 border border-emerald-200/90 bg-gradient-to-b from-emerald-50/30 to-white shadow-xs space-y-3">
            <div class="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
              <span class="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-black text-xs">✓</span>
              <span>Passed Statutory & Deterministic Checks (18)</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              ${[
                "GSTIN 27AABCS9821R1Z5 matches State Code 27 (Maharashtra)",
                "PAN Number AABCS9821R verified as Active Company Entity",
                "Entity Legal Name exact match: Shinde Specialty Chemicals Pvt Ltd",
                "MIDC Chakan Industrial Zone plot boundaries align with lease deed",
                "Capital investment ₹18.5 Cr correctly categorized as Medium Unit",
                "All annexures conform to PDF & PNG standard DPI thresholds",
                "Consent fee schedule calculated as per MPCB Red category table",
                "Form REG-06 principal place of business matches factory site",
                "Architect Registration Number CA/2012/58914 legible on drawings",
                "Air emission stack height calculated in accordance with fuel rating"
              ].map(item => `
                <div class="p-3 rounded-xl bg-white border border-slate-200 flex items-start gap-2.5">
                  <span class="text-emerald-600 font-extrabold text-sm">✓</span>
                  <span class="text-slate-700 font-medium">${item}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- 4. → Recommended Corrections (User Spec) -->
          <div class="crystal-panel rounded-3xl p-6 border border-blue-200/90 bg-gradient-to-b from-blue-50/30 to-white shadow-xs space-y-3">
            <div class="flex items-center gap-2 text-blue-900 font-bold text-xs uppercase tracking-wider">
              <span class="w-5 h-5 rounded-full bg-blue-700 text-white flex items-center justify-center font-black text-xs">→</span>
              <span>Recommended Action Plan Prior to Official Portal Filing</span>
            </div>

            <div class="space-y-2 text-xs text-slate-700 leading-relaxed">
              <div class="p-3 rounded-xl bg-white border border-slate-200 flex items-start gap-2">
                <span class="font-bold text-blue-700">1.</span>
                <span>Request your architectural consultant to recalculate the green tree buffer strip to <strong>33% of total plot area (1,485 m²)</strong> and re-upload the revised drawing.</span>
              </div>
              <div class="p-3 rounded-xl bg-white border border-slate-200 flex items-start gap-2">
                <span class="font-bold text-blue-700">2.</span>
                <span>Include the single-line diagram for the multiple-effect evaporator (MEE) in Section 4.2 of the Detailed Project Report to eliminate MPCB query cycles.</span>
              </div>
              <div class="p-3 rounded-xl bg-white border border-slate-200 flex items-start gap-2">
                <span class="font-bold text-blue-700">3.</span>
                <span>Once the revised drawing is re-scanned, your Document Readiness Score will reach <strong>98 / 100</strong>, ensuring zero clerical rejection on the MAITRI Single Window portal.</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    `;
  }
};

window.ReportComponent = ReportComponent;

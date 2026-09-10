/**
 * VYAPAR SETU - Crystal Dynamic Checklist Component
 * Clean Crystal Cards & Status Indicators
 */

const ChecklistComponent = {
  render: async function(state) {
    const appId = state.activeApplicationId || "APP-2025-001";
    const app = await API.getApplicationById(appId);
    
    if (!app) {
      return `
        <div class="max-w-4xl mx-auto px-4 py-16 text-center">
          <h2 class="text-xl font-bold text-slate-800">No Application Selected</h2>
          <button onclick="Store.navigate('dashboard')" class="mt-4 px-4 py-2 bg-blue-600 rounded-xl text-xs font-semibold text-white">
            Return to Dashboard
          </button>
        </div>
      `;
    }

    const items = app.checklist || [];
    const totalDocs = items.length;
    const uploadedDocs = items.filter(i => i.uploadedFile).length;
    const verifiedDocs = items.filter(i => i.status === window.DOC_STATUS.PASSED).length;
    const issueDocs = items.filter(i => i.status === window.DOC_STATUS.ERROR || i.status === window.DOC_STATUS.WARNING).length;

    return `
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-left">
        
        <!-- Context Card -->
        <div class="crystal-panel rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-[0_10px_30px_-10px_rgba(15,23,42,0.05)] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="font-mono text-xs text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-200">${app.id}</span>
              <span class="text-slate-300">•</span>
              <span class="text-xs text-slate-500 font-medium">Rule-Driven Dynamic Checklist (FR-03)</span>
            </div>
            <h1 class="text-2xl font-extrabold text-slate-900 tracking-tight">${app.title}</h1>
            <div class="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-slate-500">
              <span>Authority: <strong class="text-slate-800">${app.authority}</strong></span>
              <span class="text-slate-300">•</span>
              <span>Category: <strong class="text-rose-700 font-semibold">${app.industryCategory}</strong></span>
              <span class="text-slate-300">•</span>
              <span>Enterprise: <strong class="text-slate-800">${app.businessName}</strong></span>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <button onclick="Store.navigate('upload', { appId: '${app.id}' })" class="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-600/20 transition flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
              <span>Batch Upload</span>
            </button>
            <button onclick="Store.navigate('report', { appId: '${app.id}' })" class="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-xs shadow-xs transition flex items-center gap-1.5">
              <span>Readiness Report</span>
              <svg class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </button>
          </div>
        </div>

        <!-- Compliance Rule Applied Meta Ribbon -->
        <div class="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div class="flex items-center gap-3">
            <div class="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
              §
            </div>
            <div>
              <div class="text-slate-900 font-bold">Compliance Rule Triggered: <span class="font-mono text-blue-700">RULE-MAH-01 (v1.2)</span></div>
              <div class="text-slate-500 text-[11px]">MPCB Environmental Consent Regulations & Maharashtra Industrial Policy 2019</div>
            </div>
          </div>
          <div class="flex items-center gap-4 shrink-0 text-[11px] text-slate-600">
            <span>Uploaded: <strong class="text-slate-900">${uploadedDocs}/${totalDocs}</strong></span>
            <span>Verified: <strong class="text-emerald-700">${verifiedDocs}</strong></span>
            <span>Issues: <strong class="text-amber-700">${issueDocs}</strong></span>
          </div>
        </div>

        <!-- Requirements List in Subtle Glass Cards (User Spec) -->
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <h2 class="text-base font-extrabold text-slate-900">Required Compliance Annexures</h2>
            <span class="text-xs text-slate-500">Section 4 (FR-03, FR-04)</span>
          </div>

          <div class="grid grid-cols-1 gap-3">
            ${items.map(item => {
              const docDef = window.MASTER_DOCUMENTS.find(d => d.id === item.docId) || {};
              const isVerified = item.status === window.DOC_STATUS.PASSED;
              const hasWarning = item.status === window.DOC_STATUS.WARNING;
              const hasError = item.status === window.DOC_STATUS.ERROR;
              const isPending = !item.uploadedFile;

              let iconSymbol = "○";
              let iconColor = "text-slate-400 bg-slate-100";
              if (isVerified) {
                iconSymbol = "✓";
                iconColor = "text-emerald-700 bg-emerald-100";
              } else if (hasWarning) {
                iconSymbol = "⚠";
                iconColor = "text-amber-700 bg-amber-100";
              } else if (hasError) {
                iconSymbol = "✕";
                iconColor = "text-rose-700 bg-rose-100";
              }

              return `
                <div class="crystal-panel-interactive rounded-2xl p-4 sm:p-5 border border-slate-200/80">
                  <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    
                    <!-- Left: Document Details with Clean Icons (User Spec: ✓, ⚠, ○) -->
                    <div class="flex items-start gap-3.5 flex-1">
                      <div class="w-8 h-8 rounded-xl ${iconColor} flex items-center justify-center font-bold text-sm shrink-0 mt-0.5 shadow-xs">
                        ${iconSymbol}
                      </div>

                      <div class="space-y-1">
                        <div class="flex items-center gap-2">
                          <span class="font-mono text-xs text-slate-400 font-semibold">${item.docId}</span>
                          <span class="text-slate-300">•</span>
                          ${item.mandatory 
                            ? `<span class="text-[9px] uppercase font-extrabold tracking-wider px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">Required</span>`
                            : `<span class="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">Optional</span>`
                          }
                          <span class="text-slate-300">•</span>
                          ${getCrystalDocStatusBadge(item.status)}
                        </div>

                        <h3 class="text-sm sm:text-base font-bold text-slate-900">${item.name}</h3>
                        <p class="text-xs text-slate-500 leading-relaxed">${docDef.description || 'Regulatory filing document.'}</p>

                        <!-- Uploaded File Badge -->
                        ${item.uploadedFile ? `
                          <div class="pt-1 flex flex-wrap items-center gap-3 text-xs">
                            <span class="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[11px] border border-slate-200">
                              📄 ${item.uploadedFile.name} (${item.uploadedFile.sizeMB} MB)
                            </span>
                            ${item.quality ? `
                              <span class="text-[11px] text-slate-500">
                                Canvas Quality: <strong class="${item.quality.isQualityPassed ? 'text-emerald-700' : 'text-amber-700'}">${item.quality.readability}</strong>
                              </span>
                            ` : ''}
                          </div>
                        ` : `
                          <div class="text-[11px] text-slate-400 italic pt-0.5">
                            Awaiting upload • Max ${docDef.maxSizeMB || 10}MB (${(docDef.allowedFormats || ['PDF']).join(', ')})
                          </div>
                        `}

                        <!-- Flagged Issue Callout -->
                        ${item.flaggedIssue ? `
                          <div class="mt-2 p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-start gap-2">
                            <span class="text-amber-700 font-bold">⚠</span>
                            <span><strong>Pre-Check Observation:</strong> ${item.flaggedIssue}</span>
                          </div>
                        ` : ''}
                      </div>
                    </div>

                    <!-- Right: Action Buttons & Issue Count (User Spec) -->
                    <div class="flex items-center gap-2.5 shrink-0 md:self-center">
                      ${!item.uploadedFile ? `
                        <button onclick="Store.navigate('upload', { appId: '${app.id}', docId: '${item.docId}' })" class="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition flex items-center gap-1.5">
                          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
                          <span>Upload File</span>
                        </button>
                      ` : `
                        <button onclick="window.runPreCheckForDoc('${app.id}', '${item.docId}')" class="px-3 py-2 rounded-xl bg-cyan-50 hover:bg-cyan-100 text-cyan-800 border border-cyan-200 text-xs font-semibold transition flex items-center gap-1">
                          <svg class="w-3.5 h-3.5 text-cyan-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                          <span>Re-Verify</span>
                        </button>
                        <button onclick="Store.navigate('verification', { appId: '${app.id}', docId: '${item.docId}' })" class="px-3 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold shadow-xs transition">
                          Inspect &rarr;
                        </button>
                      `}
                    </div>

                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Next Step Card -->
        <div class="crystal-panel rounded-3xl p-6 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div class="text-sm font-bold text-slate-900">Compile Comprehensive Pre-Check Dossier</div>
            <div class="text-xs text-slate-500">Calculate final Document Readiness Score and review passed assertions.</div>
          </div>
          <button onclick="Store.navigate('report', { appId: '${app.id}' })" class="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition flex items-center gap-1.5">
            <span>View Full Report</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </button>
        </div>

      </div>
    `;
  }
};

function getCrystalDocStatusBadge(status) {
  switch (status) {
    case window.DOC_STATUS.PASSED:
      return `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">Verified</span>`;
    case window.DOC_STATUS.WARNING:
      return `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">Review Recommended</span>`;
    case window.DOC_STATUS.ERROR:
      return `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-800 border border-rose-200">Issue Detected</span>`;
    case window.DOC_STATUS.UPLOADED:
      return `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200">Uploaded</span>`;
    default:
      return `<span class="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200">Pending</span>`;
  }
}

window.ChecklistComponent = ChecklistComponent;

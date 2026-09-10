/**
 * VYAPAR SETU - Crystal Dashboard Component
 * Enterprise Compliance Command Center
 */

const DashboardComponent = {
  render: async function(state) {
    const user = state.currentUser || { name: "Rajesh Shinde" };
    const profile = state.businessProfile || (user.businessProfile || {});
    const apps = await API.getApplications();

    const activeApp = apps[0] || null;
    const totalApps = apps.length;
    const readinessScore = activeApp ? (activeApp.readinessScore || 92) : 92;

    let completedDocsCount = 0;
    let pendingDocsCount = 0;
    let issuesCount = 0;

    if (activeApp && activeApp.checklist) {
      activeApp.checklist.forEach(item => {
        if (item.uploadedFile && item.status === window.DOC_STATUS.PASSED) completedDocsCount++;
        else if (!item.uploadedFile) pendingDocsCount++;
        if (item.status === window.DOC_STATUS.ERROR || item.status === window.DOC_STATUS.WARNING) issuesCount++;
      });
    } else {
      completedDocsCount = 4;
      pendingDocsCount = 1;
      issuesCount = 1;
    }

    const strokeDash = Math.round((readinessScore / 100) * 251.2);

    return `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
        
        <!-- Greeting & Enterprise Context -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
          <div>
            <div class="text-xs uppercase font-bold tracking-wider text-blue-700 mb-1">Industrial Compliance Command Center</div>
            <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Good morning, ${user.name ? user.name.split(' ')[0] : 'Industrialist'}
            </h1>
            <p class="text-xs text-slate-500 mt-1">
              ${profile.businessName || "Shinde Specialty Chemicals Pvt Ltd"} • <span class="font-semibold text-slate-700">${profile.industryCategory || "Red"} Category</span> • ${profile.industrialArea || "Chakan MIDC, Pune"}
            </p>
          </div>

          <div class="flex items-center gap-3">
            <button onclick="window.openNewAppModal()" class="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-600/20 transition flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              <span>New Approval Filing</span>
            </button>
            <button onclick="Store.navigate('profile')" class="px-3.5 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold shadow-xs transition">
              Enterprise Profile
            </button>
          </div>
        </div>

        <!-- PRIMARY LARGE CRYSTAL CARD: Application Readiness (User Requested Spec) -->
        <div class="crystal-panel rounded-3xl p-6 sm:p-8 border border-white/90 shadow-[0_15px_40px_-10px_rgba(15,23,42,0.06)] relative overflow-hidden crystal-prism">
          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            
            <!-- Left Header & Status -->
            <div class="space-y-3 max-w-lg">
              <span class="text-xs font-extrabold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200/80">
                Primary Assessment
              </span>
              <h2 class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Application Readiness</h2>
              <div class="flex items-baseline gap-3">
                <span class="text-5xl font-black text-slate-900">${readinessScore}%</span>
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${readinessScore >= 85 ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-amber-50 text-amber-800 border border-amber-200'}">
                  <span class="w-2 h-2 rounded-full ${readinessScore >= 85 ? 'bg-emerald-500' : 'bg-amber-500'}"></span>
                  ${readinessScore >= 85 ? 'Ready for Submission' : 'Pre-Check Adjustments Required'}
                </span>
              </div>
              <p class="text-xs text-slate-600 leading-relaxed">
                Aggregated score across statutory completeness, deterministic regex constraints, canvas quality thresholds, and business profile alignment.
              </p>
            </div>

            <!-- Middle Circular Visualization -->
            <div class="relative w-36 h-36 shrink-0 mx-auto lg:mx-0">
              <svg class="w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#e2e8f0" stroke-width="8"/>
                <circle cx="50" cy="50" r="40" fill="none" 
                  stroke="${readinessScore >= 85 ? '#16a34a' : '#d97706'}" 
                  stroke-width="8" 
                  stroke-dasharray="251.2" 
                  stroke-dashoffset="${251.2 - strokeDash}" 
                  stroke-linecap="round" 
                  class="score-circle-meter"/>
              </svg>
              <div class="absolute inset-0 flex flex-col items-center justify-center">
                <span class="text-2xl font-black text-slate-900">${readinessScore}%</span>
                <span class="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Score</span>
              </div>
            </div>

          </div>

          <!-- UNDER IT (User Spec): Documents Complete | Documents Pending | Issues Found | Verification Status -->
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-200/80">
            
            <div class="p-4 rounded-2xl bg-white/70 border border-slate-200/80 shadow-xs">
              <div class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Documents Complete</div>
              <div class="text-2xl font-black text-emerald-700 mt-1">${completedDocsCount} <span class="text-xs font-normal text-slate-400">/ 6</span></div>
              <div class="text-[10px] text-slate-500 mt-0.5">Verified & Validated</div>
            </div>

            <div class="p-4 rounded-2xl bg-white/70 border border-slate-200/80 shadow-xs">
              <div class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Documents Pending</div>
              <div class="text-2xl font-black text-blue-700 mt-1">${pendingDocsCount}</div>
              <div class="text-[10px] text-slate-500 mt-0.5">ETP Design Scheme</div>
            </div>

            <div class="p-4 rounded-2xl bg-white/70 border border-slate-200/80 shadow-xs">
              <div class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Issues Found</div>
              <div class="text-2xl font-black text-amber-600 mt-1">${issuesCount}</div>
              <div class="text-[10px] text-amber-700 mt-0.5">Greenbelt layout &lt; 33%</div>
            </div>

            <div class="p-4 rounded-2xl bg-white/70 border border-slate-200/80 shadow-xs">
              <div class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Verification Status</div>
              <div class="text-sm font-extrabold text-blue-800 mt-2 flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-blue-600"></span>
                <span>Active Pre-Check</span>
              </div>
              <div class="text-[10px] text-slate-500 mt-0.5">AI Multimodal + Deterministic</div>
            </div>

          </div>
        </div>

        <!-- Active Filings in Crystal Cards -->
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-lg font-bold text-slate-900">Current Industrial Approval Filings</h2>
              <p class="text-xs text-slate-500">Track dynamic checklist status, issue detection, and government routing</p>
            </div>
            <span class="text-xs font-semibold text-slate-500">${apps.length} Filing(s)</span>
          </div>

          <div class="grid grid-cols-1 gap-4">
            ${apps.map(app => {
              const statusPill = getCrystalStatusBadge(app.status);
              const score = app.readinessScore || 78;

              return `
                <div class="crystal-panel-interactive rounded-2xl p-6 border border-slate-200/80 space-y-4">
                  <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    
                    <div class="space-y-2 flex-1">
                      <div class="flex items-center gap-2.5">
                        <span class="font-mono text-xs text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-200">${app.id}</span>
                        <span class="text-slate-300">•</span>
                        ${statusPill}
                      </div>

                      <h3 class="text-base sm:text-lg font-bold text-slate-900">${app.title}</h3>
                      
                      <div class="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                        <span>Issuing Authority: <strong class="text-slate-700">${app.authority}</strong></span>
                        <span class="text-slate-300">•</span>
                        <span>Location: <strong class="text-slate-700">${app.location}</strong></span>
                        <span class="text-slate-300">•</span>
                        <span>Updated: <strong class="text-slate-700">${new Date(app.updatedAt).toLocaleDateString('en-IN')}</strong></span>
                      </div>
                    </div>

                    <!-- Right Score Badge & Action Controls -->
                    <div class="flex flex-wrap lg:flex-nowrap items-center gap-4 shrink-0">
                      
                      <div class="text-center px-4 py-2 rounded-xl bg-slate-50 border border-slate-200">
                        <div class="text-xl font-black text-slate-900">${score}%</div>
                        <div class="text-[9px] uppercase font-bold text-slate-400">Pre-Check Score</div>
                      </div>

                      <div class="flex items-center gap-2">
                        <button onclick="window.selectAndNavigateApp('${app.id}', 'checklist')" class="px-3.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition flex items-center gap-1.5">
                          <span>Checklist</span>
                          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                        </button>

                        <button onclick="window.selectAndNavigateApp('${app.id}', 'report')" class="px-3.5 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold shadow-xs transition">
                          Report
                        </button>

                        <button onclick="window.selectAndNavigateApp('${app.id}', 'government-routing')" class="px-3.5 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-semibold transition flex items-center gap-1">
                          <span>MAITRI Portal</span>
                          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                        </button>
                      </div>

                    </div>

                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

      </div>

      <!-- New Application Modal -->
      <div id="new-app-modal" class="hidden fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
        <div class="max-w-md w-full crystal-panel rounded-3xl p-6 border border-white shadow-2xl relative text-left">
          <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200">
            <h3 class="text-base font-bold text-slate-900">Initiate Approval Pre-Check</h3>
            <button onclick="window.closeNewAppModal()" class="text-slate-400 hover:text-slate-600 text-lg font-bold">&times;</button>
          </div>

          <form onsubmit="window.handleCreateApplication(event)" class="space-y-4">
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Select Approval / Clearance</label>
              <select id="modal-app-code" class="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs font-medium outline-none focus:ring-2 focus:ring-blue-500 shadow-xs">
                <option value="MPCB-CTE">Consent to Establish (CTE) - MPCB</option>
                <option value="MPCB-CTO">Consent to Operate (CTO) - MPCB</option>
                <option value="MIDC-ALLOT">Plot Allotment Sanction - MIDC</option>
                <option value="DISH-PLAN">Factory Building Plan Approval - DISH</option>
                <option value="FIRE-NOC">Provisional Fire NOC - State Fire Service</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Application Descriptor</label>
              <input type="text" id="modal-app-title" required placeholder="e.g. Specialty Chemicals Unit Phase 2" class="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs font-medium outline-none focus:ring-2 focus:ring-blue-500 shadow-xs">
            </div>

            <div class="p-3 rounded-xl bg-blue-50/70 border border-blue-200 text-[11px] text-blue-900 leading-relaxed">
              The dynamic checklist will be generated by the compliance rule engine for category <strong class="text-blue-950">${profile.industryCategory || "Red"}</strong> in Maharashtra.
            </div>

            <div class="flex items-center justify-end gap-3 pt-2">
              <button type="button" onclick="window.closeNewAppModal()" class="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100">Cancel</button>
              <button type="submit" class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs">Generate Checklist &rarr;</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }
};

function getCrystalStatusBadge(status) {
  switch (status) {
    case window.APPLICATION_STATUS.READY:
      return `<span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> ${status}</span>`;
    case window.APPLICATION_STATUS.ISSUES_FOUND:
      return `<span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span> ${status}</span>`;
    case window.APPLICATION_STATUS.VERIFYING:
      return `<span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200 flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-blue-600"></span> ${status}</span>`;
    case window.APPLICATION_STATUS.DOCS_PENDING:
      return `<span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-slate-400"></span> ${status}</span>`;
    default:
      return `<span class="px-2.5 py-1 rounded-full text-[10px] font-medium bg-slate-50 text-slate-600 border border-slate-200">${status || "Draft"}</span>`;
  }
}

window.DashboardComponent = DashboardComponent;

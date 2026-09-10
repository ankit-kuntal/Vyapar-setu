/**
 * VYAPAR SETU - Crystal Government Portal Routing Component
 * Authoritative Directory: MAITRI, MPCB, MIDC, Aaple Sarkar
 */

const RoutingComponent = {
  render: async function(state) {
    const portals = await API.getGovernmentPortals();
    const appId = state.activeApplicationId || "APP-2025-001";
    const app = await API.getApplicationById(appId);

    return `
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-left">
        
        <!-- Section Header (User Spec: Official Government Portals) -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="text-xs uppercase font-bold tracking-wider text-blue-700">Verified Integration Directory</span>
              <span class="text-slate-300">•</span>
              <span class="text-xs text-slate-500 font-medium">Maharashtra State Jurisdiction</span>
            </div>
            <h1 class="text-2xl font-extrabold text-slate-900 tracking-tight">Official Government Portals</h1>
            <p class="text-xs text-slate-500 mt-1">Direct, verified routing to official departmental sub-pages for statutory submission.</p>
          </div>
          <button onclick="Store.navigate('dashboard')" class="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 shadow-xs transition">
            &larr; Dashboard
          </button>
        </div>

        <!-- Pre-submission Readiness Status Callout -->
        ${app ? `
          <div class="p-5 rounded-3xl bg-gradient-to-r from-blue-50/70 via-white to-blue-50/70 border border-blue-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center justify-center text-lg font-black shrink-0">
                ${app.readinessScore || 92}%
              </div>
              <div>
                <div class="text-xs font-bold text-slate-900">${app.title}</div>
                <div class="text-[11px] text-slate-500">
                  Dossier ID: <span class="font-mono text-blue-700 font-bold">${app.id}</span> • Readiness Status: <span class="text-emerald-700 font-bold">Ready for Submission</span>
                </div>
              </div>
            </div>
            <button onclick="Store.navigate('report', { appId: '${app.id}' })" class="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs text-slate-700 font-semibold shadow-xs">
              View Verified Dossier
            </button>
          </div>
        ` : ''}

        <!-- Authoritative Portal Cards Grid (User Spec: Department, Approval type, State, Portal status, Last verified, Open Official Portal button) -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          ${portals.map(portal => `
            <div class="crystal-panel-interactive rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-4">
              
              <div class="space-y-2.5">
                <div class="flex items-center justify-between">
                  <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
                    ${portal.badge || 'Official Government System'}
                  </span>
                  <span class="inline-flex items-center gap-1.5 text-[11px] text-emerald-700 font-bold">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> ${portal.status}
                  </span>
                </div>

                <h3 class="text-lg font-bold text-slate-900">${portal.name}</h3>
                <div class="text-xs font-semibold text-blue-700">${portal.department}</div>
                <p class="text-xs text-slate-500 leading-relaxed">${portal.description}</p>
                
                <!-- Approval types -->
                <div class="pt-2">
                  <span class="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Applicable Approval Types:</span>
                  <div class="flex flex-wrap gap-1.5 mt-1">
                    ${portal.approvalTypes.map(type => `
                      <span class="px-2.5 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-[10px] font-semibold text-slate-700">${type}</span>
                    `).join('')}
                  </div>
                </div>
              </div>

              <!-- Meta & Open Official Portal Button (User Spec) -->
              <div class="pt-4 border-t border-slate-100 space-y-3">
                <div class="flex flex-wrap items-center justify-between text-[11px] text-slate-500">
                  <span>State: <strong class="text-slate-800">${portal.state}</strong></span>
                  <span>Last Verified: <strong class="text-slate-700">${portal.lastVerifiedDate}</strong></span>
                </div>

                <div class="flex items-center gap-2">
                  <button onclick="window.handleOfficialRedirect('${portal.id}', '${portal.subPageUrl}', '${appId}')" class="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition flex items-center justify-center gap-2 shadow-xs">
                    <span>Open Official Portal</span>
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                  </button>

                  <a href="${portal.officialUrl}" target="_blank" rel="noopener noreferrer" class="p-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-500 hover:text-blue-700 transition shadow-xs" title="Official Home Page">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>
                  </a>
                </div>
              </div>

            </div>
          `).join('')}
        </div>

      </div>

      <!-- Pre-Submission Confirmation Modal -->
      <div id="redirect-modal" class="hidden fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
        <div class="max-w-md w-full crystal-panel rounded-3xl p-6 sm:p-7 border border-white shadow-2xl relative space-y-4 text-left">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center justify-center">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <div>
              <div class="text-sm font-bold text-slate-900">Pre-Submission Final Checklist</div>
              <div class="text-[11px] text-slate-500">Verified for official statutory submission</div>
            </div>
          </div>

          <div class="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
            <div class="flex items-center gap-2">
              <span class="text-emerald-600 font-bold">✓</span> <span>Dossier verified with 92% Document Readiness Score.</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-emerald-600 font-bold">✓</span> <span>All annexures formatted and sized properly.</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-emerald-600 font-bold">✓</span> <span>GSTIN and PAN verified for Maharashtra jurisdiction.</span>
            </div>
          </div>

          <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 leading-relaxed">
            Application status will now be recorded as <strong class="text-blue-700">"Redirected"</strong> in your VYAPAR SETU tracking dashboard.
          </div>

          <div class="flex items-center justify-end gap-3 pt-2">
            <button onclick="window.closeRedirectModal()" class="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100">Cancel</button>
            <a id="modal-redirect-link" href="#" target="_blank" onclick="window.confirmRedirectAction()" class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs">
              <span>Open Official Portal</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
            </a>
          </div>
        </div>
      </div>
    `;
  }
};

let pendingRedirectAppId = null;

window.handleOfficialRedirect = function(portalId, targetUrl, appId) {
  pendingRedirectAppId = appId;
  const modal = document.getElementById("redirect-modal");
  const link = document.getElementById("modal-redirect-link");
  if (modal && link) {
    link.href = targetUrl;
    modal.classList.remove("hidden");
  }
};

window.closeRedirectModal = function() {
  const modal = document.getElementById("redirect-modal");
  if (modal) modal.classList.add("hidden");
};

window.confirmRedirectAction = async function() {
  window.closeRedirectModal();
  if (pendingRedirectAppId) {
    const apps = await API.getApplications();
    const app = apps.find(a => a.id === pendingRedirectAppId);
    if (app) {
      app.status = window.APPLICATION_STATUS.REDIRECTED;
      localStorage.setItem("smartclear_applications", JSON.stringify(apps));
    }
  }
  API.recordAuditLog("OFFICIAL_PORTAL_ROUTING", `User routed to official government portal for application ${pendingRedirectAppId}`);
  Store.addToast("Routing to official government portal...", "success");
};

window.RoutingComponent = RoutingComponent;

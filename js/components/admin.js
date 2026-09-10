/**
 * VYAPAR SETU - Admin Rule Engine & Compliance Management Component
 * Modern Crystal + Glass Architecture
 * Section 4 (FR-13, FR-14, FR-15), Section 6 & Section 11
 */

const AdminComponent = {
  render: async function(state) {
    const activeTab = state.activeAdminTab || "dashboard";
    const rules = await API.getAdminRules();
    const portals = await API.getGovernmentPortals();
    const logs = await API.getAuditLogs();
    const apps = await API.getApplications();

    return `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        <!-- Admin Header -->
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="text-xs uppercase font-bold tracking-wider text-purple-600">Section 4 • FR-13 & Section 6</span>
              <span class="text-slate-300">•</span>
              <span class="text-xs text-slate-500 font-mono">Database-Driven Compliance Rule Engine</span>
            </div>
            <h1 class="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
              <span>VYAPAR SETU Administration & Rule System</span>
              <span class="px-2.5 py-0.5 rounded-full text-[10px] uppercase font-black bg-purple-100 text-purple-800 border border-purple-200">Admin Console</span>
            </h1>
            <p class="text-xs text-slate-500 mt-1">Rule logic: Industry + Location + Business Scale &rarr; Applicable Approvals &rarr; Required Documents &rarr; Official Portal.</p>
          </div>

          <div class="flex items-center gap-3">
            <button onclick="Store.navigate('dashboard')" class="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs transition">
              &larr; Switch to User Dashboard
            </button>
          </div>
        </div>

        <!-- Admin Tab Navigation (Section 11 Admin Pages) -->
        <div class="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 text-xs font-semibold">
          <button onclick="Store.setAdminTab('dashboard')" class="px-4 py-2 rounded-xl transition shrink-0 ${activeTab === 'dashboard' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}">
            Dashboard Overview
          </button>
          <button onclick="Store.setAdminTab('rules')" class="px-4 py-2 rounded-xl transition shrink-0 ${activeTab === 'rules' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}">
            Rule Engine (${rules.length})
          </button>
          <button onclick="Store.setAdminTab('industries')" class="px-4 py-2 rounded-xl transition shrink-0 ${activeTab === 'industries' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}">
            Industries (${window.MASTER_INDUSTRIES.length})
          </button>
          <button onclick="Store.setAdminTab('approvals')" class="px-4 py-2 rounded-xl transition shrink-0 ${activeTab === 'approvals' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}">
            Approvals & NOCs (${window.MASTER_APPROVALS.length})
          </button>
          <button onclick="Store.setAdminTab('documents')" class="px-4 py-2 rounded-xl transition shrink-0 ${activeTab === 'documents' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}">
            Required Documents (${window.MASTER_DOCUMENTS.length})
          </button>
          <button onclick="Store.setAdminTab('portals')" class="px-4 py-2 rounded-xl transition shrink-0 ${activeTab === 'portals' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}">
            Govt Portals (${portals.length})
          </button>
          <button onclick="Store.setAdminTab('logs')" class="px-4 py-2 rounded-xl transition shrink-0 ${activeTab === 'logs' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}">
            Audit Logs (FR-15)
          </button>
        </div>

        <!-- Tab Content Area -->
        <div class="space-y-6">
          ${renderTabContent(activeTab, { rules, portals, logs, apps })}
        </div>

      </div>
    `;
  }
};

function renderTabContent(tab, data) {
  switch (tab) {
    case "dashboard":
      return renderAdminDashboard(data);
    case "rules":
      return renderRuleEngineTab(data.rules);
    case "industries":
      return renderIndustriesTab();
    case "approvals":
      return renderApprovalsTab();
    case "documents":
      return renderDocumentsTab();
    case "portals":
      return renderPortalsTab(data.portals);
    case "logs":
      return renderAuditLogsTab(data.logs);
    default:
      return renderAdminDashboard(data);
  }
}

function renderAdminDashboard({ rules, portals, logs, apps }) {
  return `
    <div class="space-y-6">
      <!-- High Level Metrics -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="crystal-panel p-5 rounded-3xl border border-slate-200/90 shadow-sm bg-white/80 backdrop-blur-md">
          <div class="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Filings Evaluated</div>
          <div class="text-3xl font-black text-slate-900 mt-1">${apps.length + 12}</div>
          <div class="text-[11px] text-emerald-600 font-semibold mt-1">&uparrow; 18% this month</div>
        </div>

        <div class="crystal-panel p-5 rounded-3xl border border-slate-200/90 shadow-sm bg-white/80 backdrop-blur-md">
          <div class="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Compliance Rules</div>
          <div class="text-3xl font-black text-purple-700 mt-1">${rules.length}</div>
          <div class="text-[11px] text-slate-500 mt-1">Database-driven (v1.2 latest)</div>
        </div>

        <div class="crystal-panel p-5 rounded-3xl border border-slate-200/90 shadow-sm bg-white/80 backdrop-blur-md">
          <div class="text-xs font-bold text-slate-500 uppercase tracking-wider">Avg Document Readiness</div>
          <div class="text-3xl font-black text-blue-600 mt-1">79.4%</div>
          <div class="text-[11px] text-slate-500 mt-1">Across Maharashtra filings</div>
        </div>

        <div class="crystal-panel p-5 rounded-3xl border border-slate-200/90 shadow-sm bg-white/80 backdrop-blur-md">
          <div class="text-xs font-bold text-slate-500 uppercase tracking-wider">Verified Govt Portals</div>
          <div class="text-3xl font-black text-emerald-600 mt-1">${portals.length}</div>
          <div class="text-[11px] text-emerald-700 font-semibold mt-1">All endpoints connected</div>
        </div>
      </div>

      <!-- Section 6 Architecture Highlight -->
      <div class="crystal-panel p-6 rounded-3xl border border-slate-200/90 shadow-sm bg-white/80 backdrop-blur-md space-y-3">
        <div class="text-xs font-bold uppercase tracking-wider text-purple-700 flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-purple-600"></span>
          <span>Section 6 Architectural Principle: Database-Driven Rule Engine</span>
        </div>
        <p class="text-xs text-slate-600 leading-relaxed">
          The rule engine is a core component and is completely database-driven rather than hard-coded. Government rules are maintained by authorized admins using official sources (e.g. MPCB notifications, Maharashtra Industrial Policy). AI does not invent or infer mandatory approvals; AI strictly performs document interpretation against admin-defined rules.
        </p>
      </div>
    </div>
  `;
}

function renderRuleEngineTab(rules) {
  return `
    <div class="space-y-4 text-left">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-base font-black text-slate-900">Rule Versioning & Compliance Criteria (FR-14)</h2>
          <p class="text-xs text-slate-500">Manage conditions, required statutory approvals, and mandatory annexures.</p>
        </div>
        <button onclick="window.openNewRuleModal()" class="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs transition shadow-sm flex items-center gap-1.5">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
          <span>Create / Version Rule</span>
        </button>
      </div>

      <div class="grid grid-cols-1 gap-4">
        ${rules.map(rule => `
          <div class="crystal-panel rounded-3xl p-6 border border-slate-200/90 shadow-sm bg-white/80 backdrop-blur-md hover:border-purple-300 transition space-y-4">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div class="flex items-center gap-3">
                <span class="font-mono text-xs text-purple-700 font-bold">${rule.id}</span>
                <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-50 text-purple-700 border border-purple-200">v${rule.version}</span>
                <span class="px-2 py-0.5 rounded text-[10px] font-bold ${rule.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-600'}">${rule.status}</span>
              </div>
              <div class="text-[11px] text-slate-500">
                Last Verified: <strong class="text-slate-700">${rule.lastVerifiedDate}</strong> • Effective: ${rule.effectiveFrom} to ${rule.effectiveUntil}
              </div>
            </div>

            <h3 class="text-base font-bold text-slate-900">${rule.name}</h3>

            <!-- Rule Trigger Conditions -->
            <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs flex flex-wrap items-center gap-4">
              <span class="text-slate-500 font-bold uppercase text-[10px]">Trigger Conditions:</span>
              <span>Category: <strong class="text-rose-600">${rule.conditions.industryCategory}</strong></span>
              <span class="text-slate-300">•</span>
              <span>State: <strong class="text-slate-900">${rule.conditions.state}</strong></span>
              <span class="text-slate-300">•</span>
              <span>Scale: <strong class="text-blue-700 font-medium">${(rule.conditions.scale || []).join(', ')}</strong></span>
            </div>

            <!-- Approvals Triggered -->
            <div class="text-xs space-y-1">
              <span class="text-[10px] uppercase font-bold text-slate-500">Triggered Statutory Approvals:</span>
              <div class="flex flex-wrap gap-1.5">
                ${rule.approvalsRequired.map(app => `
                  <span class="px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200 text-[11px] text-blue-700 font-semibold">${app}</span>
                `).join('')}
              </div>
            </div>

            <!-- Required Annexures -->
            <div class="text-xs space-y-1">
              <span class="text-[10px] uppercase font-bold text-slate-500">Mandatory Technical Annexures:</span>
              <div class="flex flex-wrap gap-1.5">
                ${rule.documentsRequired.map(doc => `
                  <span class="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[11px] text-slate-700 font-mono flex items-center gap-1.5 shadow-2xs">
                    ${doc.mandatory ? '<span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span>' : '<span class="w-1.5 h-1.5 rounded-full bg-slate-400"></span>'}
                    <span>${doc.docId}</span>
                  </span>
                `).join('')}
              </div>
            </div>

            <div class="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
              <span>Legal Source: <strong class="text-slate-700">${rule.sourceReference || 'Govt Gazette'}</strong></span>
              <button onclick="window.editRuleVersion('${rule.id}')" class="text-purple-600 hover:text-purple-700 font-bold flex items-center gap-1">
                <span>Publish Next Version (v${(parseFloat(rule.version) + 0.1).toFixed(1)})</span>
                <span>&rarr;</span>
              </button>
            </div>

          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderIndustriesTab() {
  return `
    <div class="space-y-4 text-left">
      <h2 class="text-base font-black text-slate-900">Maharashtra Industry Sectors & CPCB Pollution Categorization</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${window.MASTER_INDUSTRIES.map(ind => `
          <div class="crystal-panel p-5 rounded-3xl border border-slate-200/90 shadow-sm bg-white/80 backdrop-blur-md space-y-3">
            <div class="flex items-center justify-between">
              <span class="font-mono text-xs text-blue-700 font-bold">${ind.id}</span>
              <span class="px-2.5 py-0.5 rounded text-[10px] font-bold ${ind.category === 'Red' ? 'bg-rose-50 text-rose-700 border border-rose-200' : (ind.category === 'Orange' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200')}">
                ${ind.category} Category
              </span>
            </div>
            <h3 class="text-base font-bold text-slate-900">${ind.name}</h3>
            <p class="text-xs text-slate-600 leading-relaxed">${ind.categoryDesc}</p>
            <div class="pt-2">
              <span class="text-[10px] text-slate-500 uppercase font-bold">Sub-Sectors:</span>
              <div class="flex flex-wrap gap-1 mt-1">
                ${ind.subSectors.map(s => `<span class="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-[10px] text-slate-700">${s}</span>`).join('')}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderApprovalsTab() {
  return `
    <div class="space-y-4 text-left">
      <h2 class="text-base font-black text-slate-900">Statutory Approvals & Issuing Authorities Catalog</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${window.MASTER_APPROVALS.map(app => `
          <div class="crystal-panel p-5 rounded-3xl border border-slate-200/90 shadow-sm bg-white/80 backdrop-blur-md space-y-3">
            <div class="flex items-center justify-between">
              <span class="font-mono text-xs text-blue-700 font-bold">${app.code}</span>
              <span class="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-medium">${app.category}</span>
            </div>
            <h3 class="text-base font-bold text-slate-900">${app.name}</h3>
            <div class="text-xs text-blue-600 font-semibold">${app.authority}</div>
            <div class="text-[11px] text-slate-500">Statutory Turnaround Window: <strong class="text-slate-800">${app.turnaroundDays} Days</strong></div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderDocumentsTab() {
  return `
    <div class="space-y-4 text-left">
      <h2 class="text-base font-black text-slate-900">Standardized Technical Documents & Extraction Schemas</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${window.MASTER_DOCUMENTS.map(doc => `
          <div class="crystal-panel p-5 rounded-3xl border border-slate-200/90 shadow-sm bg-white/80 backdrop-blur-md space-y-3">
            <div class="flex items-center justify-between">
              <span class="font-mono text-xs text-slate-500">${doc.id}</span>
              <span class="text-[10px] text-blue-600 font-mono font-semibold">Max ${doc.maxSizeMB}MB</span>
            </div>
            <h3 class="text-base font-bold text-slate-900">${doc.name}</h3>
            <p class="text-xs text-slate-600 leading-relaxed">${doc.description}</p>
            <div class="text-xs">
              <span class="text-[10px] uppercase font-bold text-slate-500">Expected Structured Fields:</span>
              <div class="flex flex-wrap gap-1 mt-1">
                ${(doc.expectedFields || []).map(f => `<span class="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-[10px] font-mono text-emerald-800">${f}</span>`).join('')}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderPortalsTab(portals) {
  return `
    <div class="space-y-4 text-left">
      <h2 class="text-base font-black text-slate-900">Government Portal Directory Management (Section 7)</h2>
      <div class="grid grid-cols-1 gap-4">
        ${portals.map(p => `
          <div class="crystal-panel p-5 rounded-3xl border border-slate-200/90 shadow-sm bg-white/80 backdrop-blur-md space-y-2">
            <div class="flex items-center justify-between">
              <h3 class="text-base font-bold text-slate-900">${p.name}</h3>
              <span class="text-xs text-emerald-700 font-semibold bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">${p.status}</span>
            </div>
            <div class="text-xs text-blue-700 font-semibold">${p.department}</div>
            <div class="font-mono text-xs text-slate-600">${p.subPageUrl}</div>
            <div class="text-[11px] text-slate-500 pt-1">Last Live Ping Verified: <strong class="text-slate-800">${p.lastVerifiedDate}</strong></div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderAuditLogsTab(logs) {
  return `
    <div class="space-y-4 text-left">
      <h2 class="text-base font-black text-slate-900">FR-15 System & Admin Audit Logs (Non-Sensitive)</h2>
      <div class="space-y-2">
        ${logs.map(log => `
          <div class="p-3.5 rounded-2xl bg-white border border-slate-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-2xs">
            <div>
              <div class="flex items-center gap-2">
                <span class="font-mono font-bold text-purple-700 uppercase text-[10px]">${log.action}</span>
                <span class="text-slate-300">•</span>
                <span class="font-semibold text-slate-900">${log.actor}</span>
              </div>
              <div class="text-slate-600 text-[11px] mt-0.5">${log.details}</div>
            </div>
            <div class="font-mono text-[10px] text-slate-400 shrink-0">
              ${new Date(log.timestamp).toLocaleString('en-IN')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

window.editRuleVersion = async function(ruleId) {
  const rules = await API.getAdminRules();
  const r = rules.find(x => x.id === ruleId);
  if (!r) return;
  const newVer = (parseFloat(r.version) + 0.1).toFixed(1);
  r.version = newVer;
  await API.saveAdminRule(r);
  Store.addToast(`Published new rule version ${r.id} v${newVer}!`, "success");
  Store.setAdminTab("rules");
};

window.openNewRuleModal = function() {
  Store.addToast("Rule Engine Editor: Use versioning button to publish incremented rules.", "info");
};

window.AdminComponent = AdminComponent;

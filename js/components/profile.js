/**
 * VYAPAR SETU - User Profile & Auto-Purge Privacy Component
 * Modern Crystal + Glass Architecture
 * Section 4 (FR-15, FR-16) & Section 11
 */

const ProfileComponent = {
  render: async function(state) {
    const user = state.currentUser || { name: "Rajesh Shinde", email: "rajesh@shindespecialty.com", role: "Industrialist / MSME Owner" };
    const settings = await API.getSettings();
    const auditLogs = await API.getAuditLogs();

    return `
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        <!-- Header -->
        <div class="flex items-center justify-between pb-4 border-b border-slate-200">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="text-xs uppercase font-bold tracking-wider text-blue-600">User Settings & Compliance Privacy</span>
              <span class="text-slate-300">•</span>
              <span class="text-xs text-slate-500 font-mono">Section 4 (FR-15, FR-16)</span>
            </div>
            <h1 class="text-2xl font-black text-slate-900 tracking-tight">Account & Document Retention Policy</h1>
            <p class="text-xs text-slate-500 mt-1">Manage entity profile, privacy governance, and automated document lifecycle.</p>
          </div>
          <button onclick="Store.navigate('dashboard')" class="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs transition">
            &larr; Return to Dashboard
          </button>
        </div>

        <!-- User Identity Card -->
        <div class="crystal-panel rounded-3xl p-6 border border-slate-200/90 shadow-sm bg-white/80 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-xl font-bold shadow-md shadow-blue-500/20">
              ${user.name ? user.name.charAt(0) : 'U'}
            </div>
            <div>
              <h2 class="text-lg font-black text-slate-900">${user.name}</h2>
              <div class="text-xs text-blue-600 font-semibold">${user.role}</div>
              <div class="text-xs text-slate-500 font-mono mt-0.5">${user.email}</div>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button onclick="window.handlePersonaChange('demo-admin-1')" class="px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100/70 border border-purple-200 text-purple-700 text-xs font-semibold transition">
              Switch to Admin View
            </button>
            <button onclick="API.logout(); Store.navigate('login');" class="px-3.5 py-2 rounded-xl bg-white hover:bg-rose-50 border border-rose-200 text-rose-600 text-xs font-semibold transition">
              Sign Out
            </button>
          </div>
        </div>

        <!-- Auto-Purge & Privacy Panel (FR-16 Mandate) -->
        <div class="crystal-panel rounded-3xl p-6 border border-slate-200/90 shadow-sm bg-white/80 backdrop-blur-md space-y-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <div class="w-9 h-9 rounded-xl bg-cyan-50 text-cyan-600 border border-cyan-200 flex items-center justify-center">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
              </div>
              <div>
                <h3 class="text-base font-bold text-slate-900">FR-16 Auto-Purge & Document Privacy Architecture</h3>
                <p class="text-xs text-slate-500 font-medium">Zero persistent retention of sensitive raw industrial annexures.</p>
              </div>
            </div>
            <span class="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold">
              Privacy Enforced
            </span>
          </div>

          <p class="text-xs text-slate-600 leading-relaxed">
            As mandated in Section 14 & FR-16 of the technical blueprint, VYAPAR SETU does not permanently store original PDFs, land deeds, or financial project reports in relational databases. After verification and pre-check report generation, original files are automatically purged from secure temporary object storage upon expiry of the retention grace window, retaining only minimal verification hash metadata.
          </p>

          <div class="p-5 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-4">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <label class="block text-xs font-bold text-slate-800">Configured Retention Period</label>
                <div class="text-[11px] text-slate-500">Days to retain temporary files before scheduled daemon deletion</div>
              </div>
              <div class="flex items-center gap-3">
                <input type="number" id="setting-purge-days" min="1" max="30" value="${settings.autoPurgeDays || 7}" class="w-20 px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-slate-900 font-mono text-center text-sm font-semibold shadow-2xs">
                <span class="text-xs text-slate-600 font-medium">Days</span>
                <button onclick="window.saveRetentionDays()" class="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition">
                  Save
                </button>
              </div>
            </div>

            <div class="pt-3 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div class="text-xs text-slate-500">
                Trigger the background deletion lifecycle immediately for review:
              </div>
              <button onclick="window.handleTriggerPurgeNow()" class="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100/80 border border-rose-200 text-rose-700 text-xs font-bold transition flex items-center gap-1.5 self-start sm:self-auto shadow-2xs">
                <svg class="w-3.5 h-3.5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                <span>Trigger Manual Auto-Purge Demonstration</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Audit Trail (FR-15) -->
        <div class="crystal-panel rounded-3xl p-6 border border-slate-200/90 shadow-sm bg-white/80 backdrop-blur-md space-y-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
              <h3 class="text-base font-bold text-slate-900">FR-15 Audit Logging Activity Stream</h3>
            </div>
            <span class="text-[11px] text-slate-400 font-mono">Immutable System Events</span>
          </div>

          <div class="space-y-2 max-h-60 overflow-y-auto pr-1">
            ${auditLogs.slice(0, 10).map(log => `
              <div class="p-3.5 rounded-2xl bg-white border border-slate-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-2xs">
                <div class="space-y-0.5">
                  <div class="flex items-center gap-2">
                    <span class="font-mono text-[10px] text-blue-600 font-bold uppercase">${log.action}</span>
                    <span class="text-slate-300">•</span>
                    <span class="text-slate-800 font-semibold">${log.actor}</span>
                  </div>
                  <div class="text-slate-600 text-[11px]">${log.details}</div>
                </div>
                <div class="font-mono text-[10px] text-slate-400 shrink-0">
                  ${new Date(log.timestamp).toLocaleTimeString('en-IN')}
                </div>
              </div>
            `).join('')}
          </div>
        </div>

      </div>
    `;
  }
};

window.saveRetentionDays = async function() {
  const days = parseInt(document.getElementById("setting-purge-days").value || 7);
  const settings = await API.getSettings();
  settings.autoPurgeDays = days;
  await API.saveSettings(settings);
  Store.addToast(`Retention period set to ${days} days.`, "success");
};

window.handleTriggerPurgeNow = async function() {
  Store.addToast("Running auto-purge lifecycle daemon...", "info");
  const res = await API.triggerAutoPurge();
  Store.addToast(`Auto-purge demonstration completed! Purged ${res.purgedCount} temporary file artifacts. Verification metadata preserved.`, "success");
  Store.navigate('profile');
};

window.ProfileComponent = ProfileComponent;

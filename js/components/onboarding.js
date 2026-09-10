/**
 * VYAPAR SETU - Onboarding Walkthrough Component
 * Modern Crystal + Glass Architecture
 * Section 11 User Pages
 */

const OnboardingComponent = {
  render: function(state) {
    return `
      <div class="max-w-4xl mx-auto px-4 py-12">
        <div class="text-center mb-10">
          <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold mb-3 shadow-2xs">
            <span>⚡ Quick Start Guide</span>
          </div>
          <h2 class="text-3xl font-black text-slate-900 tracking-tight">Welcome to VYAPAR SETU</h2>
          <p class="text-sm text-slate-500 mt-2 max-w-xl mx-auto font-medium">
            A 3-step walkthrough on how our pre-verification engine expedites your industrial approvals across Maharashtra.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          
          <!-- Card 1 -->
          <div class="crystal-panel p-6 rounded-3xl border border-slate-200/90 shadow-sm bg-white/80 backdrop-blur-md space-y-4 hover:shadow-md transition">
            <div class="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 font-black flex items-center justify-center text-base border border-blue-200 shadow-2xs">
              1
            </div>
            <h3 class="text-base font-bold text-slate-900">Define Business Profile</h3>
            <p class="text-xs text-slate-600 leading-relaxed">
              Input your industry type, CPCB pollution category (Red/Orange/Green), investment scale, and target MIDC industrial estate (e.g. Chakan, Taloja, Butibori).
            </p>
            <div class="text-[11px] text-blue-600 font-semibold flex items-center gap-1">
              <span>Captures GSTIN & entity details</span>
              <span>&rarr;</span>
            </div>
          </div>

          <!-- Card 2 -->
          <div class="crystal-panel p-6 rounded-3xl border border-slate-200/90 shadow-sm bg-white/80 backdrop-blur-md space-y-4 hover:shadow-md transition">
            <div class="w-10 h-10 rounded-2xl bg-cyan-50 text-cyan-700 font-black flex items-center justify-center text-base border border-cyan-200 shadow-2xs">
              2
            </div>
            <h3 class="text-base font-bold text-slate-900">Rule Engine Checklist</h3>
            <p class="text-xs text-slate-600 leading-relaxed">
              Our deterministic rule engine dynamically maps statutory NOCs (MPCB CTE/CTO, MIDC Allotment, DISH Plan) and mandatory technical annexures.
            </p>
            <div class="text-[11px] text-cyan-700 font-semibold flex items-center gap-1">
              <span>Zero omitted annexures</span>
              <span>&rarr;</span>
            </div>
          </div>

          <!-- Card 3 -->
          <div class="crystal-panel p-6 rounded-3xl border border-slate-200/90 shadow-sm bg-white/80 backdrop-blur-md space-y-4 hover:shadow-md transition">
            <div class="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 font-black flex items-center justify-center text-base border border-emerald-200 shadow-2xs">
              3
            </div>
            <h3 class="text-base font-bold text-slate-900">Pre-Check & Portal Routing</h3>
            <p class="text-xs text-slate-600 leading-relaxed">
              Multimodal AI & deterministic checks validate formats and cross-match profile data. Receive your Readiness Score, fix flagged issues, and route straight to MAITRI.
            </p>
            <div class="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
              <span>Zero clerical rejections</span>
              <span>&rarr;</span>
            </div>
          </div>

        </div>

        <div class="crystal-panel p-6 rounded-3xl border border-slate-200/90 shadow-md bg-white/90 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="text-left">
            <div class="text-sm font-bold text-slate-900">Ready to begin your compliance pre-check?</div>
            <div class="text-xs text-slate-500 font-medium">Step 1 is completing your Maharashtra Business Profile.</div>
          </div>
          <div class="flex items-center gap-3">
            <button onclick="Store.navigate('dashboard')" class="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 transition">
              Skip to Dashboard
            </button>
            <button onclick="Store.navigate('business-profile')" class="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 transition flex items-center gap-1.5">
              <span>Setup Business Profile</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </button>
          </div>
        </div>

      </div>
    `;
  }
};

window.OnboardingComponent = OnboardingComponent;

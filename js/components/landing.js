/**
 * VYAPAR SETU - Crystal Landing Page Component
 * "Know what's missing before you submit."
 */

const LandingComponent = {
  render: function(state) {
    return `
      <div class="relative overflow-hidden">

        <!-- Hero Section -->
        <section id="hero-section" class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 lg:pt-16 lg:pb-28">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            <!-- Left Hero Content -->
            <div class="lg:col-span-6 space-y-6 text-left">
              
              <!-- Subtle Crystal Tag -->
              <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50/80 border border-blue-200/80 text-xs font-semibold text-blue-800 shadow-xs">
                <span class="w-2 h-2 rounded-full bg-blue-600"></span>
                <span>Industrial Approvals & Compliance Pre-Verification</span>
                <span class="text-slate-300">•</span>
                <span class="text-blue-600 font-bold">Maharashtra MVP</span>
              </div>

              <!-- Main Title & Headline -->
              <div>
                <span class="text-sm font-extrabold uppercase tracking-widest text-blue-700 block mb-2">VYAPAR SETU</span>
                <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
                  Know what's missing <br/>
                  <span class="text-blue-700">before you submit.</span>
                </h1>
              </div>

              <!-- Subtitle -->
              <p class="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-xl">
                VYAPAR SETU helps businesses identify applicable approvals, prepare required documents, pre-check technical annexures, detect potential clerical issues, and route seamlessly to official government portals.
              </p>

              <!-- Coverage Pills -->
              <div class="pt-1">
                <div class="text-[11px] uppercase tracking-wider text-slate-400 font-bold mb-2">Integrated Maharashtra Portals:</div>
                <div class="flex flex-wrap gap-2">
                  <span class="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-700 shadow-xs flex items-center gap-1.5">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> MAITRI Single Window
                  </span>
                  <span class="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-700 shadow-xs flex items-center gap-1.5">
                    <span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span> MPCB e-Governance
                  </span>
                  <span class="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-700 shadow-xs flex items-center gap-1.5">
                    <span class="w-1.5 h-1.5 rounded-full bg-cyan-600"></span> MIDC Industrial Land
                  </span>
                  <span class="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-700 shadow-xs flex items-center gap-1.5">
                    <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Aaple Sarkar (DISH)
                  </span>
                </div>
              </div>

              <!-- Primary Action Buttons -->
              <div class="flex flex-wrap items-center gap-3.5 pt-3">
                <button onclick="Store.navigate('dashboard')" class="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-lg shadow-blue-600/20 transition flex items-center gap-2">
                  <span>Enter Application Dashboard</span>
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                </button>
                <button onclick="Store.navigate('business-profile')" class="px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-700 font-semibold text-sm shadow-xs transition flex items-center gap-2">
                  <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                  <span>Setup Business Profile</span>
                </button>
                <button onclick="Store.navigate('government-routing')" class="px-4 py-3.5 rounded-xl text-slate-500 hover:text-blue-700 text-xs font-semibold transition">
                  Official Directory &rarr;
                </button>
              </div>

              <!-- Mandatory Regulatory Product Notice -->
              <div class="mt-4 p-3 rounded-xl bg-slate-100/80 border border-slate-200 text-slate-600 text-[11px] leading-relaxed flex items-start gap-2.5">
                <svg class="w-4 h-4 text-amber-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span>
                  <strong class="text-slate-800">Pre-Check Advisory:</strong> VYAPAR SETU produces an automated <em>Document Readiness Score</em>. It does not provide legal advice, statutory certification, or official government approval.
                </span>
              </div>

            </div>

            <!-- Right: Floating Crystal Compliance Dashboard Preview -->
            <div class="lg:col-span-6 relative" id="dashboard-preview">
              
              <!-- Subtle outer glow / crystal border -->
              <div class="relative mx-auto max-w-lg lg:max-w-none">
                
                <!-- Main Transparent Glass/Crystal Frame -->
                <div class="crystal-panel rounded-3xl p-6 sm:p-7 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.08)] border border-white/80 relative z-10 crystal-prism">
                  
                  <!-- Top Window Control Bar -->
                  <div class="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
                    <div class="flex items-center gap-2">
                      <div class="w-3 h-3 rounded-full bg-rose-300"></div>
                      <div class="w-3 h-3 rounded-full bg-amber-300"></div>
                      <div class="w-3 h-3 rounded-full bg-emerald-300"></div>
                      <span class="text-xs font-bold text-slate-800 ml-2">Compliance Command Center</span>
                    </div>
                    <span class="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Live Pre-Check
                    </span>
                  </div>

                  <!-- Inside Preview Content: Large Readiness Gauge -->
                  <div class="p-5 rounded-2xl bg-gradient-to-br from-white/90 to-blue-50/40 border border-slate-200/80 shadow-xs mb-5">
                    <div class="flex items-center justify-between">
                      <div>
                        <span class="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">Dossier Readiness</span>
                        <div class="text-3xl font-black text-slate-900 tracking-tight mt-0.5">92%</div>
                        <div class="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 mt-1">
                          <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                          Ready for Submission
                        </div>
                      </div>

                      <!-- Circular Visualization -->
                      <div class="relative w-20 h-20">
                        <svg class="w-full h-full" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="40" fill="none" stroke="#e2e8f0" stroke-width="8"/>
                          <circle cx="50" cy="50" r="40" fill="none" stroke="#2563eb" stroke-width="8" stroke-dasharray="251.2" stroke-dashoffset="20" stroke-linecap="round" class="score-circle-meter"/>
                        </svg>
                        <div class="absolute inset-0 flex items-center justify-center font-extrabold text-xs text-slate-800">
                          92%
                        </div>
                      </div>
                    </div>

                    <!-- Mini breakdown pills -->
                    <div class="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-200/60 text-[11px]">
                      <div>
                        <span class="text-slate-400 block text-[10px]">Completeness</span>
                        <strong class="text-slate-800">28 / 28 Docs</strong>
                      </div>
                      <div>
                        <span class="text-slate-400 block text-[10px]">Deterministic</span>
                        <strong class="text-emerald-600">Valid Regex</strong>
                      </div>
                      <div>
                        <span class="text-slate-400 block text-[10px]">AI OCR</span>
                        <strong class="text-blue-700">0.96 Conf.</strong>
                      </div>
                    </div>
                  </div>

                  <!-- Mock Checklist Summary Inside Preview -->
                  <div class="space-y-2">
                    <div class="text-xs font-bold text-slate-700 flex items-center justify-between">
                      <span>Recent Requirement Pre-Checks</span>
                      <span class="text-[11px] text-blue-600 font-semibold cursor-pointer" onclick="Store.navigate('checklist')">View All &rarr;</span>
                    </div>

                    <div class="p-2.5 rounded-xl bg-white/80 border border-slate-200/80 flex items-center justify-between text-xs">
                      <div class="flex items-center gap-2">
                        <span class="text-emerald-600 font-bold">&check;</span>
                        <span class="font-medium text-slate-800">MPCB Consent to Establish (CTE)</span>
                      </div>
                      <span class="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">Verified</span>
                    </div>

                    <div class="p-2.5 rounded-xl bg-white/80 border border-slate-200/80 flex items-center justify-between text-xs">
                      <div class="flex items-center gap-2">
                        <span class="text-emerald-600 font-bold">&check;</span>
                        <span class="font-medium text-slate-800">MIDC Plot Allotment Order</span>
                      </div>
                      <span class="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">Verified</span>
                    </div>

                    <div class="p-2.5 rounded-xl bg-white/80 border border-amber-200/80 flex items-center justify-between text-xs bg-amber-50/30">
                      <div class="flex items-center gap-2">
                        <span class="text-amber-600 font-bold">⚠</span>
                        <span class="font-medium text-slate-800">Factory Layout & Site Plan</span>
                      </div>
                      <span class="text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">Greenbelt 28% (Req 33%)</span>
                    </div>
                  </div>

                </div>

                <!-- Floating Glass Cards Around It (Requested by User) -->
                
                <!-- Floating Card 1: 12 Approvals Required -->
                <div class="floating-glass-card absolute -top-4 -left-6 z-20 px-3.5 py-2.5 rounded-xl text-xs flex items-center gap-2.5" style="animation-delay: 0s;">
                  <div class="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                    12
                  </div>
                  <div>
                    <div class="font-bold text-slate-800 text-[11px]">Approvals Required</div>
                    <div class="text-[10px] text-slate-500">MPCB, MIDC, DISH, Fire</div>
                  </div>
                </div>

                <!-- Floating Card 2: 28 Documents -->
                <div class="floating-glass-card absolute -bottom-4 -left-4 z-20 px-3.5 py-2.5 rounded-xl text-xs flex items-center gap-2.5" style="animation-delay: 1.5s;">
                  <div class="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                    28
                  </div>
                  <div>
                    <div class="font-bold text-slate-800 text-[11px]">Documents</div>
                    <div class="text-[10px] text-slate-500">Statutory Annexures</div>
                  </div>
                </div>

                <!-- Floating Card 3: 3 Issues Found -->
                <div class="floating-glass-card absolute -top-5 -right-4 z-20 px-3.5 py-2.5 rounded-xl text-xs flex items-center gap-2.5" style="animation-delay: 2.5s;">
                  <div class="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs">
                    3
                  </div>
                  <div>
                    <div class="font-bold text-slate-800 text-[11px]">Issues Found</div>
                    <div class="text-[10px] text-amber-600">Pre-check Corrections</div>
                  </div>
                </div>

                <!-- Floating Card 4: AI Pre-check Complete -->
                <div class="floating-glass-card absolute -bottom-5 -right-5 z-20 px-4 py-2.5 rounded-xl text-xs flex items-center gap-2.5" style="animation-delay: 3.5s;">
                  <div class="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse"></div>
                  <div>
                    <div class="font-bold text-slate-800 text-[11px]">AI Pre-check Complete</div>
                    <div class="text-[10px] text-cyan-700">Multimodal Gemini Scan</div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </section>

        <!-- Horizontal/Vertical Crystal Application Workflow (User Requested Spec) -->
        <section id="workflow-section" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-200/80">
          <div class="text-center max-w-3xl mx-auto mb-12">
            <span class="text-xs uppercase font-bold tracking-widest text-blue-700 block mb-2">Automated Compliance Pipeline</span>
            <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">The VYAPAR SETU Crystal Workflow</h2>
            <p class="text-sm text-slate-600 mt-2">
              A translucent, interconnected network of deterministic logic and AI intelligence.
            </p>
          </div>

          <!-- Workflow Interactive Node Tree -->
          <div class="relative">
            
            <!-- Desktop Horizontal Flow -->
            <div class="hidden lg:grid grid-cols-6 gap-3 relative z-10">
              
              <!-- Node 1: Business Profile -->
              <div class="crystal-panel p-4 rounded-2xl border border-slate-200 text-left space-y-2 relative">
                <div class="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-[11px] font-bold flex items-center justify-center">1</div>
                <div class="text-xs font-bold text-slate-900">Business Profile</div>
                <p class="text-[10px] text-slate-500 leading-tight">Entity name, scale & capital investment.</p>
              </div>

              <!-- Node 2: Industry + Location -->
              <div class="crystal-panel p-4 rounded-2xl border border-slate-200 text-left space-y-2 relative">
                <div class="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-[11px] font-bold flex items-center justify-center">2</div>
                <div class="text-xs font-bold text-slate-900">Industry + Location</div>
                <p class="text-[10px] text-slate-500 leading-tight">CPCB Red/Orange/Green category & MIDC estate.</p>
              </div>

              <!-- Node 3: Rule Engine (Distinct visual look - authority) -->
              <div class="crystal-panel p-4 rounded-2xl border-2 border-blue-600 bg-gradient-to-b from-blue-50/90 to-white text-left space-y-2 relative shadow-md shadow-blue-600/10">
                <div class="flex items-center justify-between">
                  <div class="w-6 h-6 rounded-full bg-blue-600 text-white text-[11px] font-bold flex items-center justify-center">3</div>
                  <span class="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-blue-600 text-white">Engine</span>
                </div>
                <div class="text-xs font-extrabold text-blue-900">Rule Engine</div>
                <p class="text-[10px] text-blue-800 font-medium leading-tight">Database authority determining exact legal requirements.</p>
              </div>

              <!-- Node 4: Applicable Approvals -->
              <div class="crystal-panel p-4 rounded-2xl border border-slate-200 text-left space-y-2 relative">
                <div class="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-[11px] font-bold flex items-center justify-center">4</div>
                <div class="text-xs font-bold text-slate-900">Applicable Approvals</div>
                <p class="text-[10px] text-slate-500 leading-tight">CTE, CTO, Factory Plan, Water, Fire NOC.</p>
              </div>

              <!-- Node 5: Dynamic Checklist -->
              <div class="crystal-panel p-4 rounded-2xl border border-slate-200 text-left space-y-2 relative">
                <div class="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-[11px] font-bold flex items-center justify-center">5</div>
                <div class="text-xs font-bold text-slate-900">Dynamic Checklist</div>
                <p class="text-[10px] text-slate-500 leading-tight">Mandatory vs optional technical annexures.</p>
              </div>

              <!-- Node 6: Document Upload -->
              <div class="crystal-panel p-4 rounded-2xl border border-slate-200 text-left space-y-2 relative">
                <div class="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-[11px] font-bold flex items-center justify-center">6</div>
                <div class="text-xs font-bold text-slate-900">Document Upload</div>
                <p class="text-[10px] text-slate-500 leading-tight">Canvas blur, orientation & resolution check.</p>
              </div>

            </div>

            <!-- Horizontal Row 2 for Desktop -->
            <div class="hidden lg:grid grid-cols-5 gap-3 mt-4 relative z-10 max-w-5xl mx-auto">
              
              <!-- Node 7: AI Pre-check (Subtle blue/cyan intelligence effect) -->
              <div class="crystal-panel p-4 rounded-2xl border-2 border-cyan-500 bg-gradient-to-b from-cyan-50/80 to-white text-left space-y-2 shadow-md shadow-cyan-500/10">
                <div class="flex items-center justify-between">
                  <div class="w-6 h-6 rounded-full bg-cyan-600 text-white text-[11px] font-bold flex items-center justify-center">7</div>
                  <span class="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-cyan-600 text-white">AI OCR</span>
                </div>
                <div class="text-xs font-extrabold text-cyan-900">AI Pre-check</div>
                <p class="text-[10px] text-cyan-800 font-medium leading-tight">Gemini multimodal field extraction & detection.</p>
              </div>

              <!-- Node 8: Deterministic Validation -->
              <div class="crystal-panel p-4 rounded-2xl border border-slate-200 text-left space-y-2">
                <div class="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-[11px] font-bold flex items-center justify-center">8</div>
                <div class="text-xs font-bold text-slate-900">Deterministic Validation</div>
                <p class="text-[10px] text-slate-500 leading-tight">Rigid GSTIN/PAN regex & date validity checks.</p>
              </div>

              <!-- Node 9: Readiness Score -->
              <div class="crystal-panel p-4 rounded-2xl border border-slate-200 text-left space-y-2">
                <div class="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-[11px] font-bold flex items-center justify-center">9</div>
                <div class="text-xs font-bold text-slate-900">Readiness Score</div>
                <p class="text-[10px] text-slate-500 leading-tight">4-pillar score (Completeness, Validity, Quality, Consistency).</p>
              </div>

              <!-- Node 10: Verification Report -->
              <div class="crystal-panel p-4 rounded-2xl border border-slate-200 text-left space-y-2">
                <div class="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-[11px] font-bold flex items-center justify-center">10</div>
                <div class="text-xs font-bold text-slate-900">Verification Report</div>
                <p class="text-[10px] text-slate-500 leading-tight">Passed assertions, warnings & recommended fixes.</p>
              </div>

              <!-- Node 11: Official Government Portal -->
              <div class="crystal-panel p-4 rounded-2xl border border-emerald-300 bg-emerald-50/50 text-left space-y-2 shadow-xs">
                <div class="flex items-center justify-between">
                  <div class="w-6 h-6 rounded-full bg-emerald-600 text-white text-[11px] font-bold flex items-center justify-center">11</div>
                  <span class="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-600 text-white">Target</span>
                </div>
                <div class="text-xs font-extrabold text-emerald-900">Official Portal</div>
                <p class="text-[10px] text-emerald-800 font-medium leading-tight">Direct routing to MAITRI Single Window & MPCB.</p>
              </div>

            </div>

            <!-- Mobile & Tablet Vertical Flow -->
            <div class="lg:hidden space-y-3">
              ${[
                { n: 1, title: "Business Profile", desc: "Entity parameters, scale & capital investment" },
                { n: 2, title: "Industry + Location", desc: "Pollution category (Red/Orange/Green) & MIDC zone" },
                { n: 3, title: "Rule Engine", desc: "Authoritative database engine computing requirements", special: "rule" },
                { n: 4, title: "Applicable Approvals", desc: "NOCs (MPCB CTE, MIDC Plot, DISH, Fire)" },
                { n: 5, title: "Dynamic Checklist", desc: "Itemized required annexures & schemas" },
                { n: 6, title: "Document Upload", desc: "Drag & drop with canvas quality scanner" },
                { n: 7, title: "AI Pre-check", desc: "Gemini multimodal structured field extraction", special: "ai" },
                { n: 8, title: "Deterministic Validation", desc: "Regex checks on GSTIN/PAN & profile consistency" },
                { n: 9, title: "Readiness Score", desc: "0-100 rating based on 4 compliance pillars" },
                { n: 10, title: "Verification Report", desc: "Downloadable pre-submission dossier with fix guides" },
                { n: 11, title: "Official Government Portal", desc: "Verified deep links to MAITRI, MPCB, MIDC", special: "target" }
              ].map(step => `
                <div class="crystal-panel p-4 rounded-2xl border ${step.special === 'rule' ? 'border-blue-600 bg-blue-50/60' : (step.special === 'ai' ? 'border-cyan-500 bg-cyan-50/60' : (step.special === 'target' ? 'border-emerald-500 bg-emerald-50/60' : 'border-slate-200'))} flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full ${step.special === 'rule' ? 'bg-blue-600 text-white' : (step.special === 'ai' ? 'bg-cyan-600 text-white' : (step.special === 'target' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'))} flex items-center justify-center font-bold text-xs shrink-0">
                    ${step.n}
                  </div>
                  <div class="text-left">
                    <div class="text-xs font-bold text-slate-900">${step.title}</div>
                    <div class="text-[11px] text-slate-500">${step.desc}</div>
                  </div>
                </div>
              `).join('')}
            </div>

          </div>
        </section>

        <!-- Live Interactive Rule Pre-Check Widget (Embedded in Landing) -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div class="crystal-panel rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-[0_15px_40px_-10px_rgba(15,23,42,0.06)] relative">
            <div class="max-w-3xl mb-8 text-left">
              <span class="text-xs uppercase font-bold tracking-wider text-blue-700">Interactive Evaluation</span>
              <h3 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                Test the Rule Engine in Real Time
              </h3>
              <p class="text-xs text-slate-600 mt-1">
                Select an industry sector and Maharashtra industrial estate to observe instant statutory matching:
              </p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
              
              <div class="lg:col-span-6 space-y-4">
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1.5">Industry Sector & CPCB Pollution Category</label>
                  <select id="landing-hero-industry" onchange="window.updateHeroPreview()" class="w-full bg-white border border-slate-200 text-slate-800 rounded-xl p-3 text-xs font-semibold focus:ring-2 focus:ring-blue-500 shadow-xs outline-none">
                    <option value="IND-001" selected>Chemical & Petrochemicals (Red Category — Strict MPCB CTE)</option>
                    <option value="IND-002">Food & Agro Processing (Orange Category — Effluent & FSSAI)</option>
                    <option value="IND-003">Engineering & Metal Fabrication (Orange Category)</option>
                    <option value="IND-004">Electronics & Assembly (Green Category — Fast-Track)</option>
                  </select>
                </div>

                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1.5">Maharashtra Industrial Estate / MIDC Zone</label>
                  <select id="landing-hero-area" onchange="window.updateHeroPreview()" class="w-full bg-white border border-slate-200 text-slate-800 rounded-xl p-3 text-xs font-semibold focus:ring-2 focus:ring-blue-500 shadow-xs outline-none">
                    <option value="Chakan Industrial Area (Phase 1 & 2), Pune" selected>Chakan MIDC (Pune District)</option>
                    <option value="Taloja Chemical & Industrial Zone, Raigad">Taloja Chemical Zone (Raigad District)</option>
                    <option value="Waluj Industrial Area, Chhatrapati Sambhajinagar">Waluj MIDC (Sambhajinagar)</option>
                    <option value="Butibori Industrial Area, Nagpur">Butibori Industrial Area (Nagpur)</option>
                  </select>
                </div>
              </div>

              <div class="lg:col-span-6">
                <div class="p-6 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-3.5">
                  <div class="flex items-center justify-between text-xs">
                    <span class="text-slate-500">Database Compliance Rule:</span>
                    <span class="font-mono text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded" id="hero-rule-id">RULE-MAH-01 (v1.2)</span>
                  </div>

                  <div class="text-xs text-slate-800" id="hero-applicable-approvals">
                    Applicable Approvals: <strong class="text-slate-900">MPCB CTE, MIDC Plot Allotment, Fire NOC, DISH Plan</strong>
                  </div>

                  <div class="text-xs text-slate-600">
                    Mandatory Technical Annexures: <strong class="text-slate-900" id="hero-doc-count">6 Documents Required</strong>
                  </div>

                  <div class="pt-3 border-t border-slate-200 flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <div class="text-2xl font-black text-emerald-600" id="hero-score-val">88 / 100</div>
                      <div class="text-[10px] text-slate-500 leading-tight">
                        Document Readiness Score<br/><span class="text-emerald-700 font-bold">Ready for MAITRI Submission</span>
                      </div>
                    </div>

                    <button onclick="Store.navigate('dashboard')" class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition">
                      View Full Dossier &rarr;
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

      </div>
    `;
  }
};

window.updateHeroPreview = function() {
  const indId = document.getElementById("landing-hero-industry") ? document.getElementById("landing-hero-industry").value : "IND-001";
  const ind = window.MASTER_INDUSTRIES.find(i => i.id === indId);
  const ruleEl = document.getElementById("hero-rule-id");
  const appEl = document.getElementById("hero-applicable-approvals");
  const docEl = document.getElementById("hero-doc-count");
  const scoreEl = document.getElementById("hero-score-val");

  if (!ruleEl || !appEl) return;

  if (ind && ind.category === "Red") {
    ruleEl.innerText = "RULE-MAH-01 (v1.2)";
    appEl.innerHTML = "Applicable Approvals: <strong class='text-slate-900'>MPCB CTE, MIDC Plot Allotment, Fire NOC, DISH Plan</strong>";
    docEl.innerText = "6 Mandatory Documents Required";
    scoreEl.innerText = "88 / 100";
  } else if (ind && ind.category === "Orange") {
    ruleEl.innerText = "RULE-MAH-02 (v1.1)";
    appEl.innerHTML = "Applicable Approvals: <strong class='text-slate-900'>MPCB CTE, MIDC Allotment, DISH Plan, MSEDCL Power</strong>";
    docEl.innerText = "5 Mandatory Documents Required";
    scoreEl.innerText = "92 / 100";
  } else {
    ruleEl.innerText = "RULE-MAH-03 (v1.0)";
    appEl.innerHTML = "Applicable Approvals: <strong class='text-slate-900'>MPCB CTE (Fast-Track Green), MIDC Allotment</strong>";
    docEl.innerText = "4 Mandatory Documents Required";
    scoreEl.innerText = "96 / 100";
  }
};

window.LandingComponent = LandingComponent;

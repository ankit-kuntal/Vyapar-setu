/**
 * VYAPAR SETU - Crystal Business Profile Component
 * Deterministic Parameter Configuration (FR-02)
 */

const BusinessProfileComponent = {
  render: async function(state) {
    const profile = await API.getBusinessProfile() || {
      businessName: "Shinde Specialty Chemicals Pvt Ltd",
      industryId: "IND-001",
      industryName: "Chemical & Petrochemicals",
      industryCategory: "Red",
      subSector: "Specialty Chemicals",
      scale: "Medium",
      capitalInvestmentCr: 18.5,
      state: "Maharashtra",
      district: "Pune",
      industrialArea: "Chakan Industrial Area (Phase 1 & 2)",
      plotNo: "Plot C-42/B, Chakan MIDC",
      gstin: "27AABCS9821R1Z5",
      pan: "AABCS9821R",
      contactPerson: "Rajesh Shinde",
      phone: "+91 98230 45678"
    };

    const industries = await API.getIndustries();
    const locations = await API.getLocations();
    const selectedLoc = locations.find(l => l.district === (profile.district || "Pune")) || locations[0];

    return `
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-left">
        
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="text-xs uppercase font-bold tracking-wider text-blue-700">Section 4 • FR-02</span>
              <span class="text-slate-300">•</span>
              <span class="text-xs text-slate-500 font-medium">Maharashtra Industrial Jurisdiction</span>
            </div>
            <h1 class="text-2xl font-extrabold text-slate-900 tracking-tight">Business Profile & Industrial Unit Setup</h1>
            <p class="text-xs text-slate-500 mt-1">Configures the deterministic parameters for automatic rule engine matching.</p>
          </div>
          <button onclick="Store.navigate('dashboard')" class="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 shadow-xs transition">
            &larr; Dashboard
          </button>
        </div>

        <!-- Profile Crystal Form -->
        <form onsubmit="window.handleSaveProfile(event)" class="crystal-panel rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
          
          <!-- 1. Enterprise Identification -->
          <div class="space-y-4">
            <h3 class="text-xs font-bold text-blue-800 uppercase tracking-wider flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-blue-600"></span> 1. Legal Entity Identification
            </h3>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="sm:col-span-2">
                <label class="block text-xs font-bold text-slate-700 mb-1">Registered Enterprise / Business Legal Name *</label>
                <input type="text" id="prof-business-name" required value="${profile.businessName || ''}" class="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs font-medium focus:ring-2 focus:ring-blue-500 shadow-xs outline-none">
                <p class="text-[10px] text-slate-400 mt-1">Must match exact legal name on your GSTIN Form REG-06 and PAN card.</p>
              </div>

              <!-- GSTIN -->
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">15-Digit GSTIN Number *</label>
                <input type="text" id="prof-gstin" required maxlength="15" value="${profile.gstin || ''}" oninput="window.validateGstinInput(this.value)" class="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 font-mono text-blue-700 text-xs font-bold focus:ring-2 focus:ring-blue-500 shadow-xs outline-none uppercase">
                <div id="gstin-feedback" class="text-[11px] mt-1 text-emerald-600 font-semibold">Valid Maharashtra GSTIN (State Code 27)</div>
              </div>

              <!-- PAN -->
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Entity PAN *</label>
                <input type="text" id="prof-pan" required maxlength="10" value="${profile.pan || ''}" oninput="window.validatePanInput(this.value)" class="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 font-mono text-blue-700 text-xs font-bold focus:ring-2 focus:ring-blue-500 shadow-xs outline-none uppercase">
                <div id="pan-feedback" class="text-[11px] mt-1 text-slate-500 font-semibold">Company Entity PAN</div>
              </div>
            </div>
          </div>

          <!-- 2. Sector & Scale -->
          <div class="space-y-4 pt-4 border-t border-slate-200">
            <h3 class="text-xs font-bold text-blue-800 uppercase tracking-wider flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-blue-600"></span> 2. Industrial Sector & Scale
            </h3>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Industry Sector *</label>
                <select id="prof-industry" onchange="window.handleIndustrySelectChange(this.value)" class="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs font-semibold focus:ring-2 focus:ring-blue-500 shadow-xs outline-none">
                  ${industries.map(ind => `
                    <option value="${ind.id}" ${ind.id === profile.industryId ? 'selected' : ''}>
                      ${ind.name} (${ind.category} Category)
                    </option>
                  `).join('')}
                </select>
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Sub-Sector Activity *</label>
                <input type="text" id="prof-subsector" required value="${profile.subSector || 'Specialty Chemicals'}" class="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs font-medium focus:ring-2 focus:ring-blue-500 shadow-xs outline-none">
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Investment Scale (MSME) *</label>
                <select id="prof-scale" class="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs font-semibold focus:ring-2 focus:ring-blue-500 shadow-xs outline-none">
                  <option value="Micro" ${profile.scale === 'Micro' ? 'selected' : ''}>Micro Unit (&lt; ₹1 Cr)</option>
                  <option value="Small" ${profile.scale === 'Small' ? 'selected' : ''}>Small Unit (₹1 Cr – ₹10 Cr)</option>
                  <option value="Medium" ${profile.scale === 'Medium' ? 'selected' : ''}>Medium Unit (₹10 Cr – ₹50 Cr)</option>
                  <option value="Large" ${profile.scale === 'Large' ? 'selected' : ''}>Large Enterprise (&gt; ₹50 Cr)</option>
                </select>
              </div>

              <div class="sm:col-span-3">
                <label class="block text-xs font-bold text-slate-700 mb-1">Estimated Plant & Machinery Capital Investment (₹ Crores)</label>
                <input type="number" step="0.1" id="prof-capital" value="${profile.capitalInvestmentCr || 18.5}" class="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs font-semibold focus:ring-2 focus:ring-blue-500 shadow-xs outline-none">
              </div>
            </div>
          </div>

          <!-- 3. Maharashtra Industrial Location -->
          <div class="space-y-4 pt-4 border-t border-slate-200">
            <h3 class="text-xs font-bold text-blue-800 uppercase tracking-wider flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-blue-600"></span> 3. Location & Industrial Zone
            </h3>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">State Jurisdiction</label>
                <input type="text" disabled value="Maharashtra" class="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 text-xs font-semibold cursor-not-allowed">
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">District *</label>
                <select id="prof-district" onchange="window.handleDistrictChange(this.value)" class="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs font-semibold focus:ring-2 focus:ring-blue-500 shadow-xs outline-none">
                  ${locations.map(loc => `
                    <option value="${loc.district}" ${loc.district === profile.district ? 'selected' : ''}>${loc.district}</option>
                  `).join('')}
                </select>
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Industrial Estate / MIDC Zone *</label>
                <select id="prof-industrial-area" class="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs font-semibold focus:ring-2 focus:ring-blue-500 shadow-xs outline-none">
                  ${selectedLoc.industrialAreas.map(a => `
                    <option value="${a.name}" ${a.name === profile.industrialArea ? 'selected' : ''}>${a.name}</option>
                  `).join('')}
                </select>
              </div>

              <div class="sm:col-span-3">
                <label class="block text-xs font-bold text-slate-700 mb-1">Plot / Shed Number & Street Address *</label>
                <input type="text" id="prof-plot" required value="${profile.plotNo || 'Plot C-42/B, Chakan MIDC'}" class="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs font-medium focus:ring-2 focus:ring-blue-500 shadow-xs outline-none">
              </div>
            </div>
          </div>

          <!-- 4. Representative Contact -->
          <div class="space-y-4 pt-4 border-t border-slate-200">
            <h3 class="text-xs font-bold text-blue-800 uppercase tracking-wider flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-blue-600"></span> 4. Authorized Representative
            </h3>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Contact Person Name</label>
                <input type="text" id="prof-contact" required value="${profile.contactPerson || 'Rajesh Shinde'}" class="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs font-medium focus:ring-2 focus:ring-blue-500 shadow-xs outline-none">
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Official Mobile</label>
                <input type="text" id="prof-phone" required value="${profile.phone || '+91 98230 45678'}" class="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs font-medium focus:ring-2 focus:ring-blue-500 shadow-xs outline-none">
              </div>
            </div>
          </div>

          <!-- Save Button -->
          <div class="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
            <button type="button" onclick="Store.navigate('dashboard')" class="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100">
              Cancel
            </button>
            <button type="submit" class="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-600/20 transition flex items-center gap-2">
              <span>Save & Trigger Rule Engine</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
            </button>
          </div>

        </form>

      </div>
    `;
  }
};

window.validateGstinInput = function(val) {
  const fb = document.getElementById("gstin-feedback");
  if (!fb) return;
  const res = window.Validators.validateGSTIN(val);
  if (res.valid) {
    fb.className = "text-[11px] mt-1 text-emerald-600 font-semibold";
    fb.innerText = res.note;
  } else {
    fb.className = "text-[11px] mt-1 text-rose-600 font-semibold";
    fb.innerText = res.error;
  }
};

window.validatePanInput = function(val) {
  const fb = document.getElementById("pan-feedback");
  if (!fb) return;
  const res = window.Validators.validatePAN(val);
  if (res.valid) {
    fb.className = "text-[11px] mt-1 text-blue-700 font-semibold";
    fb.innerText = `Valid: ${res.entityType}`;
  } else {
    fb.className = "text-[11px] mt-1 text-rose-600 font-semibold";
    fb.innerText = res.error;
  }
};

window.handleDistrictChange = function(districtName) {
  const loc = window.MASTER_LOCATIONS.find(l => l.district === districtName);
  const areaSelect = document.getElementById("prof-industrial-area");
  if (!areaSelect || !loc) return;
  areaSelect.innerHTML = loc.industrialAreas.map(a => `<option value="${a.name}">${a.name}</option>`).join('');
};

window.handleIndustrySelectChange = function(indId) {
  const ind = window.MASTER_INDUSTRIES.find(i => i.id === indId);
  const subInput = document.getElementById("prof-subsector");
  if (ind && subInput && ind.subSectors.length > 0) {
    subInput.value = ind.subSectors[0];
  }
};

window.handleSaveProfile = async function(e) {
  e.preventDefault();
  const indId = document.getElementById("prof-industry").value;
  const ind = window.MASTER_INDUSTRIES.find(i => i.id === indId) || {};

  const profileData = {
    businessName: document.getElementById("prof-business-name").value,
    industryId: indId,
    industryName: ind.name || "Chemical & Petrochemicals",
    industryCategory: ind.category || "Red",
    subSector: document.getElementById("prof-subsector").value,
    scale: document.getElementById("prof-scale").value,
    capitalInvestmentCr: parseFloat(document.getElementById("prof-capital").value || 10),
    state: "Maharashtra",
    district: document.getElementById("prof-district").value,
    industrialArea: document.getElementById("prof-industrial-area").value,
    plotNo: document.getElementById("prof-plot").value,
    gstin: document.getElementById("prof-gstin").value,
    pan: document.getElementById("prof-pan").value,
    contactPerson: document.getElementById("prof-contact").value,
    phone: document.getElementById("prof-phone").value
  };

  await API.saveBusinessProfile(profileData);
  Store.setBusinessProfile(profileData);
  Store.addToast("Business Profile saved! Dynamic rule engine recomputed.", "success");
  Store.navigate('dashboard');
};

window.BusinessProfileComponent = BusinessProfileComponent;

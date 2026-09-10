/**
 * VYAPAR SETU - Authentication Component (Login & Register)
 * Modern Crystal + Glass Architecture
 * Section 4 (FR-01) & Section 11
 */

const AuthComponent = {
  renderLogin: function(state) {
    return `
      <div class="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div class="max-w-md w-full crystal-panel rounded-3xl p-8 border border-slate-200/90 shadow-xl bg-white/85 backdrop-blur-xl relative">
          
          <!-- Top subtle crystal glow accent -->
          <div class="absolute -top-10 -right-10 w-32 h-32 bg-blue-100/50 rounded-full blur-2xl pointer-events-none"></div>

          <div class="text-center mb-8 relative">
            <div class="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 border border-blue-200/80 mb-3 shadow-sm">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
            </div>
            <h2 class="text-2xl font-black text-slate-900 tracking-tight">Sign In to VYAPAR SETU</h2>
            <p class="text-xs text-slate-500 mt-1 font-medium">Industrial Approvals & Compliance Pre-Verification</p>
          </div>

          <!-- 1-Click Evaluation Personas -->
          <div class="mb-6 p-4 rounded-2xl bg-slate-50/80 border border-slate-200/90 shadow-sm">
            <div class="text-[11px] uppercase font-bold text-blue-700 tracking-wider mb-2.5 flex items-center justify-between">
              <span class="flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                <span>1-Click Fast Access</span>
              </span>
              <span class="text-[10px] text-slate-500 font-normal">Preloaded Personas</span>
            </div>
            <div class="grid grid-cols-1 gap-1.5">
              <button onclick="window.handlePersonaChange('demo-msme-1')" class="text-left px-3 py-2 rounded-xl bg-white hover:bg-blue-50/70 border border-slate-200 text-xs text-slate-800 flex items-center justify-between transition group shadow-2xs">
                <span class="font-medium text-slate-800">🏢 Rajesh Shinde (Pune Chemical MSME)</span>
                <span class="text-[10px] text-blue-600 font-semibold group-hover:translate-x-0.5 transition-transform">Select &rarr;</span>
              </button>
              <button onclick="window.handlePersonaChange('demo-consultant-1')" class="text-left px-3 py-2 rounded-xl bg-white hover:bg-blue-50/70 border border-slate-200 text-xs text-slate-800 flex items-center justify-between transition group shadow-2xs">
                <span class="font-medium text-slate-800">📑 Pooja Deshmukh (Compliance Consultant)</span>
                <span class="text-[10px] text-blue-600 font-semibold group-hover:translate-x-0.5 transition-transform">Select &rarr;</span>
              </button>
              <button onclick="window.handlePersonaChange('demo-admin-1')" class="text-left px-3 py-2 rounded-xl bg-white hover:bg-purple-50/70 border border-purple-200 text-xs text-purple-900 flex items-center justify-between transition group shadow-2xs">
                <span class="font-medium text-purple-900">🛡️ Sunil Wagh (System Admin)</span>
                <span class="text-[10px] text-purple-600 font-semibold group-hover:translate-x-0.5 transition-transform">Select &rarr;</span>
              </button>
            </div>
          </div>

          <div class="relative flex py-2 items-center mb-4">
            <div class="flex-grow border-t border-slate-200"></div>
            <span class="flex-shrink mx-4 text-[11px] uppercase text-slate-400 font-semibold tracking-wider">or sign in with email</span>
            <div class="flex-grow border-t border-slate-200"></div>
          </div>

          <!-- Regular Login Form -->
          <form onsubmit="window.handleLoginForm(event)" class="space-y-4">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
              <input type="email" id="login-email" required placeholder="name@company.com" value="rajesh@shindespecialty.com" class="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition shadow-2xs">
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Password</label>
              <input type="password" id="login-password" required value="demo12345" class="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition shadow-2xs">
            </div>

            <button type="submit" class="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-500/20 transition flex items-center justify-center gap-2">
              <span>Sign In to Platform</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </button>
          </form>

          <div class="mt-6 text-center text-xs text-slate-500">
            Don't have an enterprise account? 
            <button onclick="Store.navigate('register')" class="text-blue-600 hover:underline font-semibold ml-1">Register New Unit</button>
          </div>

        </div>
      </div>
    `;
  },

  renderRegister: function(state) {
    return `
      <div class="min-h-[85vh] flex items-center justify-center px-4 py-12">
        <div class="max-w-lg w-full crystal-panel rounded-3xl p-8 border border-slate-200/90 shadow-xl bg-white/85 backdrop-blur-xl relative">
          
          <div class="text-center mb-6">
            <div class="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 border border-cyan-200/80 mb-3 shadow-sm">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
            </div>
            <h2 class="text-2xl font-black text-slate-900 tracking-tight">Create Enterprise Account</h2>
            <p class="text-xs text-slate-500 mt-1 font-medium">Register for Maharashtra industrial pre-verification</p>
          </div>

          <form onsubmit="window.handleRegisterForm(event)" class="space-y-4">
            
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
              <input type="text" id="reg-name" required placeholder="e.g. Rajesh Shinde" class="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition shadow-2xs">
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Registered Enterprise / Business Name</label>
              <input type="text" id="reg-business-name" required placeholder="e.g. Shinde Specialty Chemicals Pvt Ltd" class="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition shadow-2xs">
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">User Role</label>
                <select id="reg-role" class="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition shadow-2xs">
                  <option value="Industrialist / MSME Owner">Industrialist / MSME Owner</option>
                  <option value="Compliance & Legal Officer">Compliance & Legal Officer</option>
                  <option value="Documentation Consultant">Documentation Consultant</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Official Email</label>
                <input type="email" id="reg-email" required placeholder="name@company.com" class="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition shadow-2xs">
              </div>
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Password</label>
              <input type="password" id="reg-password" required placeholder="••••••••" class="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition shadow-2xs">
            </div>

            <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 leading-relaxed">
              <strong class="text-slate-700 font-semibold">Statutory Disclaimer:</strong> VYAPAR SETU provides automated pre-submission checking and document readiness scoring. It does not replace statutory approvals issued by competent authorities (MPCB, MIDC, DISH).
            </div>

            <button type="submit" class="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-500/20 transition flex items-center justify-center gap-2">
              <span>Complete Registration &rarr;</span>
            </button>
          </form>

          <div class="mt-6 text-center text-xs text-slate-500">
            Already have an account? 
            <button onclick="Store.navigate('login')" class="text-blue-600 hover:underline font-semibold ml-1">Sign In</button>
          </div>

        </div>
      </div>
    `;
  }
};

window.handleLoginForm = async function(event) {
  event.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  const res = await API.login({ email, password });
  Store.setUser(res.user);
  Store.addToast(`Signed in as ${res.user.email}`, "success");
  if (res.user.isAdmin) {
    Store.navigate('admin');
  } else {
    Store.navigate('dashboard');
  }
};

window.handleRegisterForm = async function(event) {
  event.preventDefault();
  const name = document.getElementById("reg-name").value;
  const businessName = document.getElementById("reg-business-name").value;
  const role = document.getElementById("reg-role").value;
  const email = document.getElementById("reg-email").value;

  const res = await API.register({ name, businessName, role, email });
  Store.setUser(res.user);
  Store.addToast("Account created successfully! Welcome to VYAPAR SETU.", "success");
  Store.navigate('onboarding');
};

window.AuthComponent = AuthComponent;

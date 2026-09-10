/**
 * VYAPAR SETU - Crystal Navigation Bar Component
 * Modern Crystal + Glass Architecture
 */

const NavbarComponent = {
  render: function(state) {
    const user = state.currentUser || { name: "Guest User", role: "Visitor" };
    const currentRoute = state.currentRoute;
    const unreadCount = (state.notifications || []).filter(n => !n.read).length;

    return `
      <header class="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_2px_20px_-4px_rgba(15,23,42,0.04)]">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            
            <!-- Logo & Brand (VYAPAR SETU) -->
            <div class="flex items-center gap-3 cursor-pointer" onclick="Store.navigate('landing')">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-cyan-500 p-0.5 shadow-md shadow-blue-600/15">
                <div class="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                  <svg class="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                  </svg>
                </div>
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <span class="text-xl font-extrabold tracking-tight text-slate-900">VYAPAR SETU</span>
                  <span class="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">Pre-Check</span>
                </div>
                <p class="text-[10px] text-slate-500 font-medium">Compliance Command Center</p>
              </div>
            </div>

            ${currentRoute === 'landing' ? `
              <!-- Public Landing Navigation -->
              <nav class="hidden md:flex items-center gap-1.5">
                <a href="#hero-section" class="px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:text-blue-700 hover:bg-slate-100/70 transition">
                  Overview
                </a>
                <a href="#workflow-section" class="px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:text-blue-700 hover:bg-slate-100/70 transition">
                  Crystal Workflow
                </a>
                <a href="#dashboard-preview" class="px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:text-blue-700 hover:bg-slate-100/70 transition">
                  Command Center
                </a>
                <button onclick="Store.navigate('government-routing')" class="px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:text-blue-700 hover:bg-slate-100/70 transition">
                  Govt Portals
                </button>
                <button onclick="Store.navigate('admin')" class="px-3 py-2 rounded-lg text-xs font-semibold text-purple-700 hover:bg-purple-50 transition">
                  Rule Engine
                </button>
              </nav>

              <!-- Landing Right CTA -->
              <div class="flex items-center gap-3">
                <button onclick="Store.navigate('login')" class="hidden sm:block px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-blue-700 transition">
                  Sign In
                </button>
                <button onclick="Store.navigate('dashboard')" class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-600/20 transition flex items-center gap-1.5">
                  <span>Enter Dashboard</span>
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                </button>
                <!-- Quick Demo Persona Switcher -->
                <div class="relative hidden lg:block">
                  <select onchange="window.handlePersonaChange(this.value)" class="bg-white border border-slate-200 text-[11px] text-slate-700 rounded-lg px-2.5 py-1 font-medium cursor-pointer shadow-xs">
                    <option value="demo-msme-1" ${user.id === 'demo-msme-1' ? 'selected' : ''}>🏢 Pune Chemical MSME</option>
                    <option value="demo-consultant-1" ${user.id === 'demo-consultant-1' ? 'selected' : ''}>📑 Compliance Consultant</option>
                    <option value="demo-admin-1" ${user.id === 'demo-admin-1' ? 'selected' : ''}>🛡️ System Admin</option>
                  </select>
                </div>
              </div>
            ` : `
              <!-- App Enterprise Navigation: VYAPAR SETU logo | Dashboard | Applications | Documents | Reports | Government Portals | Profile -->
              <nav class="hidden md:flex items-center gap-1">
                <button onclick="Store.navigate('dashboard')" class="px-3 py-2 rounded-lg text-xs font-semibold transition ${currentRoute === 'dashboard' ? 'bg-blue-50 text-blue-700 border border-blue-200/80 shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'}">
                  Dashboard
                </button>
                <button onclick="Store.navigate('checklist')" class="px-3 py-2 rounded-lg text-xs font-semibold transition ${currentRoute === 'checklist' || currentRoute === 'application' ? 'bg-blue-50 text-blue-700 border border-blue-200/80 shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'}">
                  Applications
                </button>
                <button onclick="Store.navigate('upload')" class="px-3 py-2 rounded-lg text-xs font-semibold transition ${currentRoute === 'upload' ? 'bg-blue-50 text-blue-700 border border-blue-200/80 shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'}">
                  Documents
                </button>
                <button onclick="Store.navigate('report')" class="px-3 py-2 rounded-lg text-xs font-semibold transition ${currentRoute === 'report' ? 'bg-blue-50 text-blue-700 border border-blue-200/80 shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'}">
                  Reports
                </button>
                <button onclick="Store.navigate('government-routing')" class="px-3 py-2 rounded-lg text-xs font-semibold transition ${currentRoute === 'government-routing' ? 'bg-blue-50 text-blue-700 border border-blue-200/80 shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'}">
                  Government Portals
                </button>
                <button onclick="Store.navigate('profile')" class="px-3 py-2 rounded-lg text-xs font-semibold transition ${currentRoute === 'profile' || currentRoute === 'business-profile' ? 'bg-blue-50 text-blue-700 border border-blue-200/80 shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'}">
                  Profile
                </button>
                <button onclick="Store.navigate('admin')" class="px-3 py-2 rounded-lg text-xs font-semibold transition ${currentRoute === 'admin' ? 'bg-purple-50 text-purple-700 border border-purple-200 shadow-xs' : 'text-purple-700 hover:bg-purple-50/80'}">
                  Admin
                </button>
              </nav>

              <!-- Right Controls: Persona & Notifications & User -->
              <div class="flex items-center gap-2 sm:gap-3">
                
                <!-- Quick Persona Switcher -->
                <div class="relative">
                  <select onchange="window.handlePersonaChange(this.value)" class="bg-white border border-slate-200 text-xs text-slate-700 rounded-lg px-2.5 py-1.5 focus:ring-2 focus:ring-blue-500 font-medium cursor-pointer shadow-xs">
                    <option value="demo-msme-1" ${user.id === 'demo-msme-1' ? 'selected' : ''}>🏢 Pune Chemical MSME</option>
                    <option value="demo-consultant-1" ${user.id === 'demo-consultant-1' ? 'selected' : ''}>📑 Compliance Consultant</option>
                    <option value="demo-admin-1" ${user.id === 'demo-admin-1' ? 'selected' : ''}>🛡️ System Administrator</option>
                  </select>
                </div>

                <!-- Notifications Bell -->
                <div class="relative">
                  <button onclick="window.toggleNotificationsModal()" class="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition relative">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                    </svg>
                    ${unreadCount > 0 ? `<span class="absolute top-1 right-1 w-2 h-2 bg-blue-600 rounded-full"></span>` : ''}
                  </button>
                </div>

                <!-- User Avatar / Profile Menu -->
                <div class="flex items-center gap-2 pl-2 border-l border-slate-200 cursor-pointer" onclick="Store.navigate('profile')">
                  <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-700 to-cyan-500 flex items-center justify-center text-xs font-bold text-white shadow-xs">
                    ${user.name ? user.name.charAt(0) : 'U'}
                  </div>
                  <div class="hidden lg:block text-left">
                    <div class="text-xs font-bold text-slate-900 leading-tight">${user.name || 'User'}</div>
                    <div class="text-[10px] text-slate-500 truncate max-w-[120px]">${user.role || 'MSME'}</div>
                  </div>
                </div>

                <!-- Mobile Menu Toggle -->
                <button onclick="window.toggleMobileMenu()" class="md:hidden p-2 text-slate-600 hover:text-slate-900">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"/></svg>
                </button>

              </div>
            `}

          </div>
        </div>

        <!-- Mobile Drawer Menu -->
        <div id="mobile-nav-menu" class="hidden md:hidden px-4 pt-2 pb-4 space-y-1 border-t border-slate-200/80 bg-white/95 backdrop-blur-xl">
          <button onclick="Store.navigate('landing'); window.toggleMobileMenu();" class="block w-full text-left px-3 py-2 rounded-md text-sm font-semibold text-slate-700 hover:bg-slate-100">Home</button>
          <button onclick="Store.navigate('dashboard'); window.toggleMobileMenu();" class="block w-full text-left px-3 py-2 rounded-md text-sm font-semibold text-slate-700 hover:bg-slate-100">Dashboard</button>
          <button onclick="Store.navigate('checklist'); window.toggleMobileMenu();" class="block w-full text-left px-3 py-2 rounded-md text-sm font-semibold text-slate-700 hover:bg-slate-100">Applications</button>
          <button onclick="Store.navigate('upload'); window.toggleMobileMenu();" class="block w-full text-left px-3 py-2 rounded-md text-sm font-semibold text-slate-700 hover:bg-slate-100">Documents</button>
          <button onclick="Store.navigate('verification'); window.toggleMobileMenu();" class="block w-full text-left px-3 py-2 rounded-md text-sm font-semibold text-slate-700 hover:bg-slate-100">AI Pre-Check</button>
          <button onclick="Store.navigate('report'); window.toggleMobileMenu();" class="block w-full text-left px-3 py-2 rounded-md text-sm font-semibold text-slate-700 hover:bg-slate-100">Reports</button>
          <button onclick="Store.navigate('government-routing'); window.toggleMobileMenu();" class="block w-full text-left px-3 py-2 rounded-md text-sm font-semibold text-slate-700 hover:bg-slate-100">Government Portals</button>
          <button onclick="Store.navigate('profile'); window.toggleMobileMenu();" class="block w-full text-left px-3 py-2 rounded-md text-sm font-semibold text-slate-700 hover:bg-slate-100">Profile</button>
          <button onclick="Store.navigate('admin'); window.toggleMobileMenu();" class="block w-full text-left px-3 py-2 rounded-md text-sm font-semibold text-purple-700 hover:bg-purple-50">Admin Console</button>
        </div>
      </header>
    `;
  }
};

window.handlePersonaChange = async function(personaId) {
  const persona = await API.switchPersona(personaId);
  Store.setUser(persona);
  Store.setBusinessProfile(persona.businessProfile || null);
  Store.addToast(`Switched to persona: ${persona.name} (${persona.role})`, "info");
  if (persona.isAdmin) {
    Store.navigate('admin');
  } else {
    Store.navigate('dashboard');
  }
};

window.toggleMobileMenu = function() {
  const menu = document.getElementById("mobile-nav-menu");
  if (menu) menu.classList.toggle("hidden");
};

window.toggleNotificationsModal = function() {
  Store.markNotificationsRead();
  Store.addToast("Notifications marked as reviewed", "info");
};

window.NavbarComponent = NavbarComponent;

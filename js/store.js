/**
 * VYAPAR SETU - Global Reactive Store & Navigation State
 */

const Store = (function() {
  const state = {
    currentRoute: "landing",
    routeParams: {},
    currentUser: null,
    businessProfile: null,
    activeApplicationId: null,
    activeDocId: null,
    notifications: [
      { id: 1, text: "MPCB CTE Water balance guidelines revised for Red Category", time: "10m ago", read: false },
      { id: 2, text: "Application APP-2025-001 has 1 critical error on Site Plan", time: "1h ago", read: false }
    ],
    isDarkMode: true,
    activeAdminTab: "dashboard" // dashboard, industries, approvals, documents, rules, portals, logs
  };

  const listeners = [];

  function notify() {
    listeners.forEach(fn => {
      try {
        fn(state);
      } catch (err) {
        console.error("Store listener error:", err);
      }
    });
  }

  return {
    getState: function() {
      return { ...state };
    },

    subscribe: function(listener) {
      listeners.push(listener);
      return function unsubscribe() {
        const idx = listeners.indexOf(listener);
        if (idx !== -1) listeners.splice(idx, 1);
      };
    },

    navigate: function(route, params = {}) {
      state.currentRoute = route;
      state.routeParams = params;
      if (params.appId) state.activeApplicationId = params.appId;
      if (params.docId) state.activeDocId = params.docId;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      notify();
    },

    setUser: function(user) {
      state.currentUser = user;
      notify();
    },

    setBusinessProfile: function(profile) {
      state.businessProfile = profile;
      notify();
    },

    setActiveApplication: function(appId) {
      state.activeApplicationId = appId;
      notify();
    },

    setActiveDoc: function(docId) {
      state.activeDocId = docId;
      notify();
    },

    setAdminTab: function(tabName) {
      state.activeAdminTab = tabName;
      notify();
    },

    markNotificationsRead: function() {
      state.notifications.forEach(n => n.read = true);
      notify();
    },

    addToast: function(message, type = "info") {
      const container = document.getElementById("toast-container");
      if (!container) return;

      const toast = document.createElement("div");
      const bg = type === "success" ? "bg-emerald-950 border-emerald-500 text-emerald-200" 
               : type === "error" ? "bg-rose-950 border-rose-500 text-rose-200"
               : type === "warning" ? "bg-amber-950 border-amber-500 text-amber-200"
               : "bg-slate-900 border-indigo-500 text-slate-200";

      toast.className = `flex items-center gap-3 px-4 py-3 rounded-xl border shadow-xl backdrop-blur-md transition-all duration-300 transform translate-y-2 opacity-0 text-sm font-medium ${bg}`;
      
      const iconSvg = type === "success" ? `<svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>`
                    : type === "error" ? `<svg class="w-5 h-5 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>`
                    : `<svg class="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;

      toast.innerHTML = `
        ${iconSvg}
        <span class="flex-1">${message}</span>
      `;

      container.appendChild(toast);
      requestAnimationFrame(() => {
        toast.classList.remove("translate-y-2", "opacity-0");
      });

      setTimeout(() => {
        toast.classList.add("opacity-0", "translate-y-2");
        setTimeout(() => toast.remove(), 300);
      }, 4000);
    }
  };
})();

window.Store = Store;

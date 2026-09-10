/**
 * VYAPAR SETU - Main Application Bootstrap & Router
 */

const App = (function() {
  async function renderApp(state) {
    const headerContainer = document.getElementById("header-container");
    const mainContainer = document.getElementById("main-container");

    if (!headerContainer || !mainContainer) return;

    // Render Navbar (hidden only on landing or specific focus routes if desired, but nice to keep consistent)
    headerContainer.innerHTML = window.NavbarComponent.render(state);

    // Route Dispatcher
    const route = state.currentRoute;
    let contentHtml = "";

    try {
      switch (route) {
        case "landing":
          contentHtml = window.LandingComponent.render(state);
          break;
        case "login":
          contentHtml = window.AuthComponent.renderLogin(state);
          break;
        case "register":
          contentHtml = window.AuthComponent.renderRegister(state);
          break;
        case "onboarding":
          contentHtml = window.OnboardingComponent.render(state);
          break;
        case "dashboard":
          contentHtml = await window.DashboardComponent.render(state);
          break;
        case "business-profile":
          contentHtml = await window.BusinessProfileComponent.render(state);
          break;
        case "checklist":
          contentHtml = await window.ChecklistComponent.render(state);
          break;
        case "upload":
          contentHtml = await window.UploadComponent.render(state);
          break;
        case "verification":
          contentHtml = await window.VerificationComponent.render(state);
          break;
        case "report":
          contentHtml = await window.ReportComponent.render(state);
          break;
        case "government-routing":
          contentHtml = await window.RoutingComponent.render(state);
          break;
        case "profile":
          contentHtml = await window.ProfileComponent.render(state);
          break;
        case "admin":
          contentHtml = await window.AdminComponent.render(state);
          break;
        default:
          contentHtml = window.LandingComponent.render(state);
          break;
      }
    } catch (error) {
      console.error("View rendering error on route:", route, error);
      contentHtml = `
        <div class="max-w-md mx-auto p-8 glass-panel rounded-2xl border border-rose-500/40 text-center my-16">
          <h2 class="text-lg font-bold text-rose-400">View Rendering Error</h2>
          <p class="text-xs text-slate-300 mt-2">${error.message}</p>
          <button onclick="Store.navigate('dashboard')" class="mt-4 px-4 py-2 rounded-xl bg-indigo-600 text-xs font-semibold text-white">
            Return to Dashboard
          </button>
        </div>
      `;
    }

    mainContainer.innerHTML = contentHtml;
  }

  async function init() {
    // Sync current persona / user from persistent storage
    const user = API.getCurrentUser() || window.DEMO_PERSONAS[0];
    const profile = await API.getBusinessProfile() || (user.businessProfile || null);

    Store.setUser(user);
    Store.setBusinessProfile(profile);

    // Subscribe to store updates
    Store.subscribe(renderApp);

    // Initial render on Landing page
    renderApp(Store.getState());
  }

  return { init };
})();

// Bootstrap on DOM loaded
document.addEventListener("DOMContentLoaded", function() {
  App.init();
});

window.App = App;

/**
 * VYAPAR SETU - Crystal Document Upload & Canvas Quality Scanner
 * Section 4 (FR-04, FR-05)
 */

const UploadComponent = {
  render: async function(state) {
    const appId = state.activeApplicationId || "APP-2025-001";
    const app = await API.getApplicationById(appId);
    const selectedDocId = state.activeDocId || "DOC-GST";

    const checklist = app ? app.checklist : [];
    const currentDoc = checklist.find(c => c.docId === selectedDocId) || checklist[0] || window.MASTER_DOCUMENTS[0];
    const docDef = window.MASTER_DOCUMENTS.find(d => d.id === currentDoc.docId) || {};

    return `
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-left">
        
        <!-- Header -->
        <div class="flex items-center justify-between pb-4 border-b border-slate-200/80">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="text-xs uppercase font-bold tracking-wider text-blue-700">Section 4 • FR-04 & FR-05</span>
              <span class="text-slate-300">•</span>
              <span class="text-xs text-slate-500 font-mono">${app ? app.id : ''}</span>
            </div>
            <h1 class="text-2xl font-extrabold text-slate-900 tracking-tight">Compliance Document Upload & Quality Scan</h1>
            <p class="text-xs text-slate-500 mt-1">Files are pre-screened on the client using HTML5 Canvas before triggering Gemini Multimodal AI.</p>
          </div>
          <button onclick="Store.navigate('checklist', { appId: '${appId}' })" class="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 shadow-xs transition">
            &larr; Return to Checklist
          </button>
        </div>

        <!-- Document Selector -->
        <div class="crystal-panel rounded-3xl p-5 border border-slate-200/90 shadow-xs space-y-3">
          <label class="block text-xs font-bold text-slate-700">Target Statutory Document to Upload</label>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            ${checklist.map(item => `
              <button onclick="window.selectDocForUpload('${item.docId}')" class="text-left p-3 rounded-2xl border text-xs transition ${item.docId === currentDoc.docId ? 'bg-blue-50/90 border-blue-500 text-blue-900 font-bold shadow-xs' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'}">
                <div class="flex items-center justify-between mb-1">
                  <span class="font-mono text-[10px] text-slate-400 font-semibold">${item.docId}</span>
                  ${item.mandatory ? '<span class="text-[9px] text-rose-700 font-bold uppercase">Required</span>' : ''}
                </div>
                <div class="truncate font-semibold">${item.name}</div>
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Selected Document Criteria Banner -->
        <div class="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <div class="text-slate-900 font-bold">${currentDoc.name}</div>
            <div class="text-slate-500 text-[11px] mt-0.5">${docDef.description || 'Statutory requirement'}</div>
          </div>
          <div class="flex items-center gap-3 shrink-0 text-[11px] text-slate-600">
            <span>Allowed: <strong class="text-slate-900">${(docDef.allowedFormats || ['PDF', 'PNG', 'JPG']).join(', ')}</strong></span>
            <span class="text-slate-300">•</span>
            <span>Max Size: <strong class="text-slate-900">${docDef.maxSizeMB || 10} MB</strong></span>
          </div>
        </div>

        <!-- Drag & Drop Zone in Crystal Styling -->
        <div class="crystal-panel rounded-3xl p-8 border-2 border-dashed border-slate-300 hover:border-blue-500 transition text-center relative shadow-xs" id="drop-zone" ondragover="window.handleDragOver(event)" ondragleave="window.handleDragLeave(event)" ondrop="window.handleFileDrop(event)">
          
          <input type="file" id="file-input" onchange="window.handleFileSelect(event)" accept=".pdf,.png,.jpg,.jpeg" class="hidden">

          <div class="space-y-4">
            <div class="w-16 h-16 rounded-2xl bg-blue-50 text-blue-700 border border-blue-200 mx-auto flex items-center justify-center shadow-xs">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/></svg>
            </div>

            <div>
              <div class="text-base font-bold text-slate-900">Drag & drop your annexure file here</div>
              <p class="text-xs text-slate-500 mt-1">or browse from your device to run the client-side quality scan and AI pre-check</p>
            </div>

            <button type="button" onclick="document.getElementById('file-input').click()" class="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-600/20 transition">
              Choose Local File (PDF / Image)
            </button>
          </div>

          <!-- Quality Scan Live Preview Container -->
          <div id="quality-preview-container" class="hidden mt-6 p-5 rounded-2xl bg-white border border-slate-200 text-left space-y-3 shadow-xs">
            <div class="flex items-center justify-between text-xs font-bold text-slate-900 pb-2 border-b border-slate-100">
              <span class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-cyan-600 animate-pulse"></span>
                <span>Canvas Quality Scanner Findings (FR-05)</span>
              </span>
              <span id="preview-file-name" class="font-mono text-blue-700 font-bold">document.pdf</span>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div class="text-[10px] text-slate-400 uppercase font-bold">Readability</div>
                <div id="preview-readability" class="font-bold text-emerald-700 mt-0.5">High Clarity</div>
              </div>
              <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div class="text-[10px] text-slate-400 uppercase font-bold">Blur Metric</div>
                <div id="preview-blur" class="font-mono font-bold text-slate-800 mt-0.5">0.94 / 1.0</div>
              </div>
              <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div class="text-[10px] text-slate-400 uppercase font-bold">Brightness</div>
                <div id="preview-brightness" class="font-mono font-bold text-slate-800 mt-0.5">0.88 / 1.0</div>
              </div>
              <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div class="text-[10px] text-slate-400 uppercase font-bold">Orientation</div>
                <div id="preview-orientation" class="font-bold text-slate-800 mt-0.5">0° Portrait</div>
              </div>
            </div>

            <div id="preview-issues-box" class="text-xs"></div>

            <div class="flex items-center justify-end gap-3 pt-2">
              <button onclick="window.submitUploadAndVerify('${appId}', '${currentDoc.docId}')" class="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition flex items-center gap-2">
                <span>Start Gemini AI & Deterministic Pre-Check</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              </button>
            </div>
          </div>

        </div>

        <!-- 1-Click Sample Test Documents (Evaluator Test Suite) -->
        <div class="crystal-panel rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-3">
          <div class="flex items-center justify-between">
            <div class="text-xs font-extrabold uppercase tracking-wider text-slate-900">
              ⚡ Evaluator Suite: Instant Document Test Cases
            </div>
            <span class="text-[10px] text-slate-400">Pre-configured payloads</span>
          </div>

          <p class="text-xs text-slate-500">
            Simulate how the canvas quality scanner and Gemini multimodal OCR detect valid files, blurred drawings, or mismatched credentials:
          </p>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <button onclick="window.loadTestCaseDoc('${appId}', '${currentDoc.docId}', 'valid')" class="p-3.5 rounded-2xl bg-emerald-50/50 hover:bg-emerald-50 border border-emerald-200 text-left transition shadow-xs">
              <div class="text-xs font-bold text-emerald-800 flex items-center gap-1.5 mb-1">
                <span>✓ Test Case A: 100% Valid</span>
              </div>
              <div class="text-[11px] text-slate-600 leading-tight">Standard GSTIN/PAN with complete profile alignment.</div>
            </button>

            <button onclick="window.loadTestCaseDoc('${appId}', '${currentDoc.docId}', 'blur')" class="p-3.5 rounded-2xl bg-amber-50/50 hover:bg-amber-50 border border-amber-200 text-left transition shadow-xs">
              <div class="text-xs font-bold text-amber-800 flex items-center gap-1.5 mb-1">
                <span>⚠ Test Case B: Low Quality</span>
              </div>
              <div class="text-[11px] text-slate-600 leading-tight">Low-resolution factory drawing with blur warnings.</div>
            </button>

            <button onclick="window.loadTestCaseDoc('${appId}', '${currentDoc.docId}', 'mismatch')" class="p-3.5 rounded-2xl bg-rose-50/50 hover:bg-rose-50 border border-rose-200 text-left transition shadow-xs">
              <div class="text-xs font-bold text-rose-800 flex items-center gap-1.5 mb-1">
                <span>✕ Test Case C: Entity Mismatch</span>
              </div>
              <div class="text-[11px] text-slate-600 leading-tight">Extracted legal name and GSTIN mismatch profile.</div>
            </button>
          </div>
        </div>

      </div>
    `;
  }
};

window.UploadComponent = UploadComponent;

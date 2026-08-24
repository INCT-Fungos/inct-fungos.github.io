(function () {
    'use strict';

    // --- Localized Labels ---
    const i18n = {
        pt: {
            buttonText: 'Buscar',
            placeholder: 'Digite para buscar em todo o site...',
            stats: '{count} resultado(s) encontrado(s)',
            empty: 'Nenhum resultado encontrado para "{query}".',
            initial: 'Digite um termo acima para pesquisar nas abas e documentos do site.'
        },
        en: {
            buttonText: 'Search',
            placeholder: 'Type to search across the entire site...',
            stats: 'Found {count} result(s)',
            empty: 'No results found for "{query}".',
            initial: 'Type a keyword above to search across all site sections and guidelines.'
        },
        es: {
            buttonText: 'Buscar',
            placeholder: 'Escriba para buscar en todo el sitio...',
            stats: 'Encontrados {count} resultado(s)',
            empty: 'No se encontraron resultados para "{query}".',
            initial: 'Escriba un término arriba para buscar en todas las secciones y guías.'
        }
    };

    // Detect language from page path or html lang attribute
    function getLang() {
        const path = window.location.pathname;
        if (path.includes('index_en.html')) return 'en';
        if (path.includes('index_es.html')) return 'es';
        const langAttr = document.documentElement.lang;
        if (langAttr && i18n[langAttr]) return langAttr;
        return 'pt';
    }

    const currentLang = getLang();
    const labels = i18n[currentLang] || i18n.pt;

    // --- Inject Modal HTML ---
    function injectSearchModal() {
        if (document.getElementById('site-search-modal')) return;

        const modalHTML = `
        <div id="site-search-modal" class="search-modal-overlay">
            <div class="search-modal-card" role="dialog" aria-modal="true">
                <div class="search-modal-header">
                    <svg class="search-icon-svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                    </svg>
                    <input type="text" id="site-search-input" class="search-modal-input" placeholder="${labels.placeholder}" autocomplete="off" />
                    <button id="site-search-clear" class="search-clear-btn" style="display:none;" title="Limpar">
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </button>
                    <button id="site-search-close" class="search-close-btn" title="Fechar (Esc)">
                        <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854z"/>
                        </svg>
                    </button>
                </div>
                <div id="site-search-stats" class="search-stats-bar" style="display:none;"></div>
                <div id="site-search-results" class="search-results-container">
                    <div class="search-empty-state">
                        <svg width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                        <p>${labels.initial}</p>
                    </div>
                </div>
            </div>
        </div>`;
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Bind events
        document.getElementById('site-search-close').addEventListener('click', closeSearchModal);
        document.getElementById('site-search-clear').addEventListener('click', clearSearchInput);

        const overlay = document.getElementById('site-search-modal');
        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) closeSearchModal();
        });

        const input = document.getElementById('site-search-input');
        input.addEventListener('input', handleSearchInput);
    }

    // Map tab IDs to human readable names
    function getTabTitle(tabId, subtabId) {
        // Try finding button matching onclick="openTab(..., 'tabId')"
        let tabName = tabId;
        const tabBtn = document.querySelector(`.tab-link[onclick*="'${tabId}'"]`);
        if (tabBtn) {
            tabName = tabBtn.innerText.replace(/[\u25BE\u25B6\u25BC]/g, '').trim();
        }

        if (subtabId) {
            const subtabBtn = document.querySelector(`.nm-nav-btn[onclick*="'${subtabId}'"]`);
            if (subtabBtn) {
                const subtabName = subtabBtn.innerText.trim();
                return `${tabName} > ${subtabName}`;
            }
        }
        return tabName;
    }

    // Build Search Index from active DOM
    function searchDOM(query) {
        if (!query || query.trim().length < 2) return [];
        const cleanQuery = query.trim().toLowerCase();
        const results = [];
        const tabContents = document.querySelectorAll('.tab-content');

        tabContents.forEach(tab => {
            const tabId = tab.id;
            if (!tabId) return;

            // Check if tab contains subtabs (.nm-subtab-content)
            const subtabs = tab.querySelectorAll('.nm-subtab-content');

            if (subtabs.length > 0) {
                subtabs.forEach(subtab => {
                    const subtabId = subtab.id;
                    searchContainer(subtab, tabId, subtabId, cleanQuery, results);
                });
            } else {
                searchContainer(tab, tabId, null, cleanQuery, results);
            }
        });

        return results;
    }

    function searchContainer(container, tabId, subtabId, query, results) {
        // Targets: headings, paragraphs, list items, table cells
        const elements = container.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, td, th');
        const seenTexts = new Set();

        elements.forEach(el => {
            // Ignore pdf card text or nav buttons inside content
            if (el.closest('.nm-sidebar') || el.closest('.pdf-download-card')) return;

            const text = el.innerText || el.textContent;
            if (!text || text.trim().length === 0) return;

            const lowerText = text.toLowerCase();
            const matchIdx = lowerText.indexOf(query);

            if (matchIdx !== -1 && !seenTexts.has(text.trim())) {
                seenTexts.add(text.trim());

                // Find nearest heading title for context
                let headingContext = '';
                let current = el;
                while (current && current !== container) {
                    let prev = current.previousElementSibling;
                    while (prev) {
                        if (/^H[1-6]$/.test(prev.tagName)) {
                            headingContext = prev.innerText.trim();
                            break;
                        }
                        prev = prev.previousElementSibling;
                    }
                    if (headingContext) break;
                    current = current.parentElement;
                }

                // Extract snippet
                const start = Math.max(0, matchIdx - 40);
                const end = Math.min(text.length, matchIdx + query.length + 60);
                let snippet = text.substring(start, end);
                if (start > 0) snippet = '...' + snippet;
                if (end < text.length) snippet = snippet + '...';

                // Escape HTML characters before highlighting
                const safeSnippet = escapeHTML(snippet);
                const safeQuery = escapeHTML(text.substring(matchIdx, matchIdx + query.length));

                // Replace exact match ignoring case
                const reg = new RegExp(escapeRegExp(safeQuery), 'gi');
                const highlightedSnippet = safeSnippet.replace(reg, match => `<mark class="search-highlight">${match}</mark>`);

                const categoryPath = getTabTitle(tabId, subtabId);

                results.push({
                    tabId: tabId,
                    subtabId: subtabId,
                    element: el,
                    category: categoryPath,
                    heading: headingContext || categoryPath,
                    snippet: highlightedSnippet
                });
            }
        });
    }

    function escapeHTML(str) {
        return str.replace(/[&<>"']/g, function (m) {
            return {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#039;'
            }[m];
        });
    }

    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    let searchTimeout = null;
    function handleSearchInput(e) {
        const query = e.target.value;
        const clearBtn = document.getElementById('site-search-clear');
        clearBtn.style.display = query ? 'block' : 'none';

        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            renderResults(query);
        }, 150);
    }

    function renderResults(query) {
        const resultsContainer = document.getElementById('site-search-results');
        const statsBar = document.getElementById('site-search-stats');

        if (!query || query.trim().length < 2) {
            statsBar.style.display = 'none';
            resultsContainer.innerHTML = `
                <div class="search-empty-state">
                    <svg width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                    </svg>
                    <p>${labels.initial}</p>
                </div>`;
            return;
        }

        const results = searchDOM(query);

        statsBar.style.display = 'block';
        statsBar.textContent = labels.stats.replace('{count}', results.length);

        if (results.length === 0) {
            resultsContainer.innerHTML = `
                <div class="search-empty-state">
                    <p>${labels.empty.replace('{query}', escapeHTML(query))}</p>
                </div>`;
            return;
        }

        let html = '';
        results.forEach((item, index) => {
            html += `
                <div class="search-result-item" data-index="${index}">
                    <div class="search-result-header">
                        <span class="search-result-badge">${escapeHTML(item.category)}</span>
                    </div>
                    <h4 class="search-result-title">${escapeHTML(item.heading)}</h4>
                    <p class="search-result-snippet">${item.snippet}</p>
                </div>`;
        });

        resultsContainer.innerHTML = html;

        // Bind click events to items
        const itemEls = resultsContainer.querySelectorAll('.search-result-item');
        itemEls.forEach(itemEl => {
            itemEl.addEventListener('click', function () {
                const idx = parseInt(this.getAttribute('data-index'), 10);
                const item = results[idx];
                selectSearchResult(item);
            });
        });
    }

    function selectSearchResult(item) {
        closeSearchModal();

        // 1. Activate main tab
        if (typeof window.openTab === 'function') {
            window.openTab(null, item.tabId);
        }

        // 2. Activate subtab if applicable
        if (item.subtabId && typeof window.openNeoTab === 'function') {
            window.openNeoTab(null, item.subtabId);
        }

        // 3. Scroll to target element and flash highlight
        setTimeout(() => {
            if (item.element) {
                item.element.scrollIntoView({ behavior: 'smooth', block: 'center' });

                item.element.classList.remove('search-flash-target');
                // Trigger reflow
                void item.element.offsetWidth;
                item.element.classList.add('search-flash-target');

                setTimeout(() => {
                    item.element.classList.remove('search-flash-target');
                }, 2600);
            }
        }, 100);
    }

    function clearSearchInput() {
        const input = document.getElementById('site-search-input');
        if (input) {
            input.value = '';
            input.focus();
            renderResults('');
        }
        document.getElementById('site-search-clear').style.display = 'none';
    }

    window.openSearchModal = function () {
        injectSearchModal();
        const modal = document.getElementById('site-search-modal');
        if (modal) {
            modal.classList.add('active');
            const input = document.getElementById('site-search-input');
            if (input) {
                input.focus();
                input.select();
            }
        }
    };

    window.closeSearchModal = function () {
        const modal = document.getElementById('site-search-modal');
        if (modal) {
            modal.classList.remove('active');
        }
    };

    // Keyboard shortcut listeners
    document.addEventListener('keydown', function (e) {
        // Esc to close
        if (e.key === 'Escape') {
            closeSearchModal();
        }
        // Cmd+K or Ctrl+K to open
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            openSearchModal();
        }
    });

    // Auto-inject on DOM ready
    document.addEventListener('DOMContentLoaded', function () {
        injectSearchModal();
    });
})();

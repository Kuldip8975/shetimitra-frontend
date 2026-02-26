// language.js - Common language management for all pages

class LanguageManager {
    constructor() {
        this.currentLang = 'mr';
        this.initialize();
    }
    
    initialize() {
        // Get language from localStorage
        const savedLang = localStorage.getItem('shetimitra_lang');
        if(savedLang && ['mr', 'hi', 'en'].includes(savedLang)) {
            this.currentLang = savedLang;
        }
        
        // Set HTML lang attribute
        document.documentElement.setAttribute('lang', this.currentLang);
        
        // Apply language to current page
        this.applyLanguage();
        
        // Set up language buttons if they exist
        this.setupLanguageButtons();
    }
    
    applyLanguage() {
        // Update all elements with data attributes
        document.querySelectorAll('[data-mr]').forEach(element => {
            if(this.currentLang === 'mr') {
                element.textContent = element.getAttribute('data-mr');
            } else if(this.currentLang === 'hi') {
                element.textContent = element.getAttribute('data-hi');
            } else if(this.currentLang === 'en') {
                element.textContent = element.getAttribute('data-en');
            }
        });
        
        // Update page title
        this.updatePageTitle();
        
        // Update placeholders
        this.updatePlaceholders();
    }
    
    updatePageTitle() {
        const title = document.querySelector('title');
        if(!title) return;
        
        const pageName = title.textContent.split('|')[1]?.trim() || '';
        
        if(this.currentLang === 'mr') {
            title.textContent = `${pageName} | शेतिमित्र AI`;
        } else if(this.currentLang === 'hi') {
            title.textContent = `${pageName} | शेतिमित्र AI`;
        } else {
            title.textContent = `${pageName} | ShetiMitraAI`;
        }
    }
    
    updatePlaceholders() {
        // Update input placeholders based on language
        const inputs = document.querySelectorAll('input[placeholder]');
        inputs.forEach(input => {
            const placeholder = input.getAttribute('placeholder');
            
            if(this.currentLang === 'en') {
                // Convert Marathi numbers to English
                if(placeholder.includes('९') || placeholder.includes('०')) {
                    const englishNumber = placeholder
                        .replace(/०/g, '0')
                        .replace(/१/g, '1')
                        .replace(/२/g, '2')
                        .replace(/३/g, '3')
                        .replace(/४/g, '4')
                        .replace(/५/g, '5')
                        .replace(/६/g, '6')
                        .replace(/७/g, '7')
                        .replace(/८/g, '8')
                        .replace(/९/g, '9');
                    input.placeholder = englishNumber;
                }
            } else if(this.currentLang === 'mr' || this.currentLang === 'hi') {
                // Convert English numbers to Marathi if needed
                if(placeholder.match(/[0-9]/)) {
                    const marathiNumber = placeholder
                        .replace(/0/g, '०')
                        .replace(/1/g, '१')
                        .replace(/2/g, '२')
                        .replace(/3/g, '३')
                        .replace(/4/g, '४')
                        .replace(/5/g, '५')
                        .replace(/6/g, '६')
                        .replace(/7/g, '७')
                        .replace(/8/g, '८')
                        .replace(/9/g, '९');
                    input.placeholder = marathiNumber;
                }
            }
        });
    }
    
    setupLanguageButtons() {
        const langButtons = document.querySelectorAll('[data-lang]');
        
        langButtons.forEach(button => {
            // Set active state
            if(button.getAttribute('data-lang') === this.currentLang) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
            
            // Add click event
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = button.getAttribute('data-lang');
                this.changeLanguage(lang);
            });
        });
    }
    
    changeLanguage(lang) {
        if(!['mr', 'hi', 'en'].includes(lang)) return;
        
        this.currentLang = lang;
        localStorage.setItem('shetimitra_lang', lang);
        document.documentElement.setAttribute('lang', lang);
        
        this.applyLanguage();
        this.setupLanguageButtons();
        
        // Also update any dropdown text
        const langDropdownBtn = document.querySelector('.lang-btn .lang-text');
        if(langDropdownBtn) {
            if(lang === 'mr') {
                langDropdownBtn.textContent = 'मराठी';
            } else if(lang === 'hi') {
                langDropdownBtn.textContent = 'हिंदी';
            } else {
                langDropdownBtn.textContent = 'English';
            }
        }
    }
    
    getCurrentLanguage() {
        return this.currentLang;
    }
    
    getText(mr, hi, en) {
        if(this.currentLang === 'mr') return mr;
        if(this.currentLang === 'hi') return hi;
        return en;
    }
}

// Create global instance
window.languageManager = new LanguageManager();
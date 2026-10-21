const THEME_STORAGE_KEY = 'svu-theme';

const updateThemeIcon = () => {
  const toggle = document.querySelector('#theme-toggle');
  if (!toggle) return;
  const isDark = document.body.classList.contains('dark-mode');
  toggle.innerHTML = `<i class="bi bi-${isDark ? 'sun' : 'moon-stars'}"></i>`;
  toggle.setAttribute('aria-label', isDark ? 'تفعيل الوضع الفاتح' : 'تفعيل الوضع الداكن');
};

export const initializeTheme = () => {
  if (localStorage.getItem(THEME_STORAGE_KEY) === 'dark') document.body.classList.add('dark-mode');
  updateThemeIcon();
  const toggle = document.querySelector('#theme-toggle');
  toggle?.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem(THEME_STORAGE_KEY, document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    updateThemeIcon();
  });
};

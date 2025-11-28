export function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            try {
              const theme = localStorage.getItem('theme') || 'brand';
              const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
              
              let resolvedTheme = theme;
              if (theme === 'system') {
                resolvedTheme = systemTheme;
              }
              
              // Handle custom themes
              if (['brand', 'ocean', 'sunset', 'high-contrast'].includes(theme)) {
                document.documentElement.setAttribute('data-theme', theme);
                document.documentElement.classList.toggle('dark', resolvedTheme === 'dark');
              } else {
                document.documentElement.removeAttribute('data-theme');
                document.documentElement.classList.toggle('dark', resolvedTheme === 'dark');
              }
            } catch (e) {
              // Fallback to brand theme
              document.documentElement.setAttribute('data-theme', 'brand');
            }
          })();
        `,
      }}
    />
  )
}
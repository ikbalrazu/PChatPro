import React, {useEffect, useState} from 'react'

const ThemeToggle = () => {
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "light"
    );

    // Apply theme changes to the document
    useEffect(() => {
        const root = document.documentElement;

        if (theme === "dark") {
        root.classList.add("dark");
        } else {
        root.classList.remove("dark");
        }

        // Persist theme in localStorage
        localStorage.setItem("theme", theme);
    }, [theme]);

    // Handle toggle action
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
    };

  return (
    <button
      onClick={toggleTheme}
      className="w-12 h-12 p-2 rounded bg-white dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  )
}

export default ThemeToggle
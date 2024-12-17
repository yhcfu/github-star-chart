import { useEffect, useState } from "react";

const THEME_STORAGE_KEY = "theme";

export default function useTheme() {
	const [theme, setTheme] = useState(
		localStorage.getItem(THEME_STORAGE_KEY) ?? "light",
	);
	const colorTheme = theme === "dark" ? "light" : "dark";

	useEffect(() => {
		const root = window.document.documentElement;
		root.classList.remove(colorTheme);
		root.classList.add(theme);

		localStorage.setItem(THEME_STORAGE_KEY, theme);
	}, [theme, colorTheme]);

	return [colorTheme, setTheme];
}

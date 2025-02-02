'use client'

import React from 'react'

type MenuItem = {
    label: string,
    key: string,
    action: () => void,
}

const ActionMenu = ({
    label = '▼',
    labelTooltip,
    menuItems,
}: {
    label: React.ReactNode,
    labelTooltip?: React.ReactNode,
    menuItems: MenuItem[],
}) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [isDarkMode, setIsDarkMode] = React.useState(false);
    const menuRef = React.useRef<HTMLDivElement>(null);

    // Add effect to handle clicks outside menu
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Add effect to listen for system color scheme changes
    React.useEffect(() => {
        // Check initial preference
        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDarkMode(darkModeQuery.matches);

        // Listen for changes
        const handler = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
        darkModeQuery.addEventListener('change', handler);

        return () => darkModeQuery.removeEventListener('change', handler);
    }, []);

    const styles = {
        container: {
            position: 'relative' as const,
            zIndex: 1000,
        },
        button: {
            padding: '4px 8px',
            backgroundColor: isDarkMode ? '#1f1f1f' : 'white',
            border: `1px solid ${isDarkMode ? '#424242' : '#d9d9d9'}`,
            borderRadius: '2px',
            cursor: 'pointer',
            fontSize: '12px',
            color: isDarkMode ? '#ffffff' : '#000000',
        },
        dropdown: {
            display: isOpen ? 'block' : 'none',
            position: 'absolute' as const,
            top: '100%',
            left: '0',
            backgroundColor: isDarkMode ? '#1f1f1f' : 'white',
            border: `1px solid ${isDarkMode ? '#424242' : '#d9d9d9'}`,
            borderRadius: '2px',
            minWidth: '100px',
            boxShadow: isDarkMode
                ? '0 2px 8px rgba(0,0,0,0.5)'
                : '0 2px 8px rgba(0,0,0,0.15)',
            color: isDarkMode ? '#ffffff' : '#000000',
        },
        menuItem: {
            padding: '4px 8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '12px',
        }
    };

    const handleItemClick = (action: string) => {
        console.log(`Selected: ${action}`);
        setIsOpen(false);
    };

    const getHoverBackgroundColor = () => isDarkMode ? '#424242' : '#f5f5f5';

    return (
        <div style={styles.container} ref={menuRef}>
            <button
                style={styles.button}
                onClick={() => setIsOpen(!isOpen)}
                title={labelTooltip as string}
                data-tooltip={labelTooltip as string}
                data-tooltip-position='bottom'
                data-tooltip-style={{
                    backgroundColor: isDarkMode ? '#1f1f1f' : 'white',
                    border: `1px solid ${isDarkMode ? '#424242' : '#d9d9d9'}`,
                    borderRadius: '2px',
                    minWidth: '100px',
                    boxShadow: isDarkMode
                        ? '0 2px 8px rgba(0,0,0,0.5)'
                        : '0 2px 8px rgba(0,0,0,0.15)',
                    color: isDarkMode ? '#ffffff' : '#000000',
                }}
            >
                <span style={{  
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                }}>
                    {label}
                </span>
            </button>
            <div style={styles.dropdown}>
                {menuItems.map((item) => (
                    <div
                        key={item.key}
                        style={styles.menuItem}
                        onClick={() => handleItemClick(item.key)}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = getHoverBackgroundColor()}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? '#1f1f1f' : 'white'}
                    >
                        {item.label}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ActionMenu;

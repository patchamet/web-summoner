const applyDebugBorders = (element: HTMLElement | null) => {
    if (!element) return;

    const urlParams = new URLSearchParams(window.location.search);
    const isDebugBorder = urlParams.get('_isDebugBorder') === '1';
    if (!isDebugBorder) return;

    const colors = [
        '#ff0000', '#ffa500', '#008000', '#0000ff', '#800080',
        '#ff1493', '#00ffff', '#ffff00', '#ff4500', '#9400d3',
        '#32cd32', '#4169e1', '#ff69b4', '#20b2aa', '#ff8c00',
    ];

    const applyBordersByDepth = (el: HTMLElement, depth: number) => {
        const color = colors[depth % colors.length];
        el.style.boxShadow = `0 0 1px ${color}, 0 0 2px ${color}, 0 0 3px ${color}`;

        Array.from(el.children).forEach((child) => {
            if (child instanceof HTMLElement) {
                applyBordersByDepth(child, depth + 1);
            }
        });
    };

    applyBordersByDepth(element, 0);
};

export { applyDebugBorders };
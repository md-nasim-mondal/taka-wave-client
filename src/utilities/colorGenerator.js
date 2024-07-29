export const getColorForInitial = (initial) => {
    // Assign colors based on the ASCII value of the letter
    const colorPalette = [
        '#132dee', // A - Deep blue
        '#1E90FF', // B - Dodger blue
        '#32CD32', // C - Lime green
        '#00CED1', // D - Dark turquoise
        '#9370DB', // E - Medium purple
        '#8A2BE2', // F - Blue violet
        '#40E0D0', // G - Turquoise
        '#00BFFF', // H - Deep sky blue
        '#7FFF00', // I - Chartreuse
        '#00FF7F', // J - Spring green
        '#FF00FF', // K - Magenta
        '#00FFFF', // L - Cyan
        '#6495ED', // M - Cornflower blue
        '#4682B4', // N - Steel blue
        '#4169E1', // O - Royal blue
        '#87CEEB', // P - Sky blue
        '#00FA9A', // Q - Medium spring green
        '#2E8B57', // R - Sea green
        '#3CB371', // S - Medium sea green
        '#20B2AA', // T - Light sea green
        '#00FF00', // U - Lime
        '#FF1493', // V - Deep pink
        '#008080', // W - Teal
        '#8FBC8F', // X - Dark sea green
        '#6B8E23', // Y - Olive drab
        '#556B2F', // Z - Dark olive green
    ];



    // Convert initial to uppercase
    const upperInitial = initial.toUpperCase();

    // Get ASCII code of the initial
    const asciiCode = upperInitial.charCodeAt(0);

    // Index based on ASCII code, modulo to wrap around if more than colors
    const index = asciiCode % colorPalette.length;

    return colorPalette[index];
};
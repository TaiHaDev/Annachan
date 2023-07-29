export function getRandomLightColor() {
    const hue = Math.floor(Math.random() * 360); // Random hue value (0-359)
  
    // Generate a random saturation and lightness value in a specific range
    const saturation = Math.floor(Math.random() * 50) + 50; // 50-100
    const lightness = Math.floor(Math.random() * 30) + 70;   // 70-100
  
    // Convert HSL to RGB
    const h = hue / 360;
    const s = saturation / 100;
    const l = lightness / 100;
  
    // Algorithm to convert HSL to RGB
    const calculateChannel = (c, temp1, temp2) => {
      if (c < 0) c += 1;
      if (c > 1) c -= 1;
      if (6 * c < 1) return temp1 + (temp2 - temp1) * 6 * c;
      if (2 * c < 1) return temp2;
      if (3 * c < 2) return temp1 + (temp2 - temp1) * (2 / 3 - c) * 6;
      return temp1;
    };
  
    let r, g, b;
    if (s === 0) {
      r = g = b = l;
    } else {
      const temp2 = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const temp1 = 2 * l - temp2;
      r = calculateChannel(h + 1 / 3, temp1, temp2);
      g = calculateChannel(h, temp1, temp2);
      b = calculateChannel(h - 1 / 3, temp1, temp2);
    }
  
    // Convert RGB to hexadecimal
    const toHex = (channel) => {
      const hex = Math.round(channel * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
  
    const hexColor = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    return hexColor;
  }
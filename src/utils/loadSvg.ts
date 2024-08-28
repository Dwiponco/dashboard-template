// utils/loadSvg.ts
export async function loadSvg(iconName: string): Promise<React.FC<React.SVGProps<SVGSVGElement>> | null> {
  try {
    const svgModule = await import(`../assets/icons/${iconName}.svg`);
    if (svgModule && svgModule.ReactComponent) {
      return svgModule.ReactComponent as React.FC<React.SVGProps<SVGSVGElement>>;
    } else {
      console.error(`SVG component not found: ${iconName}`);
      return null;
    }
  } catch (error) {
    console.error(`Failed to load SVG: ${iconName}`, error);
    return null;
  }
}

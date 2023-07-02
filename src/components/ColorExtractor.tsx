import React, { useEffect, useState } from 'react';
import { wait, complementryRGBColor } from '~/lib/utils';
import {useElementQuery} from '~/lib/use-element';

import Vibrant from 'node-vibrant';
import type { Swatch } from 'node-vibrant/lib/color';

import styles from '~/styles/ColorExtractor.module.css';

enum PaletteItemType {
  Muted = 100,
  LightMuted = 101,
  DarkMuted = 102,
  Vibrant = 200,
  LightVibrant = 201,
  DarkVibrant = 202,
}

export type PaletteItem = {

  _: Swatch;
  type: PaletteItemType;
  hex: string;
  rgb: [number, number, number];
  complementary: [number, number, number];
  textColor?: string;

}

export type IExtractorProps = {
  className: string;
}

const ColorExtractor: React.FC<IExtractorProps> = ({ className: imageClass }) => {
  const image = useElementQuery<HTMLImageElement>(`.${imageClass}`);
  const [palette, setPalette] = useState<PaletteItem[]>();
  const [selectedSwatch, setSelectedSwatch] = useState(0);

  const onSelectSwatch = (idx: number) => {
    setSelectedSwatch(idx);
    const color = palette[idx];

    image.style.setProperty('border-color', `rgb(${color.complementary.join(' ')})`);
    console.log(image.style.getPropertyValue('border-color'));
  }

  useEffect(() => {
    if (!imageClass) return;

    const fn = async () => {
      await wait(1000);
      const pal = await Vibrant.from(image).getPalette();
      console.log(pal);
      if (!pal?.Vibrant) {
        await wait(2000);
        await fn();
        return;
      };
      let formatted: PaletteItem[] = Object.keys(pal).map((k, idx) => {
        let t = k.includes('Vibrant') ? 200 : 100;
        if (k.includes('Light')) t += 1;
        if (k.includes('Dark')) t += 2;

        return {
          type: t,
          hex: pal[k].hex,
          rgb: pal[k].rgb,
          complementary: complementryRGBColor(...pal[k].rgb),
          textColor: pal[k].bodyTextColor,
          _: pal[k],
        };
      });

      setPalette(formatted);
    }

    fn();
  }, [imageClass]);

  return (
    <div className={styles.container}>
      {
        palette?.[0] ? (
          <>
            {palette.map((p, idx) => 
            (
            <button key={idx} onClick={() => onSelectSwatch(idx)} className={styles.item} style={{ color: p?.textColor, backgroundColor: p.hex }}>{p.hex}</button>
            ))}
          </>
        ) : (
          <span className={styles.loading}>Loading...</span>
        )
      }
    </div>
  )
}

export default ColorExtractor;
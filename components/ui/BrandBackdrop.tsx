import { FishMark } from '@/components/ui/Logo';
import { clsx } from '@/lib/clsx';

/**
 * Subtle brand watermark for section backgrounds — the logo fish or the logo wave,
 * very low opacity, gently floating (motion-safe only). Purely decorative.
 */
export default function BrandBackdrop({
  variant = 'fish',
  className,
  float = true,
}: {
  variant?: 'fish' | 'wave';
  className?: string;
  float?: boolean;
}) {
  return (
    <div aria-hidden className={clsx('pointer-events-none absolute -z-0 select-none', className)}>
      <div className={clsx(float && 'motion-safe:animate-float-drift')}>
        {variant === 'fish' ? (
          <FishMark className="h-full w-full" />
        ) : (
          <svg viewBox="0 0 973 160" fill="currentColor" className="h-full w-full">
            <path d="M62.2061 57.4463C40.608 46.3314 22.0666 30.2897 0.15625 6.8418L0 76.7119C22.7192 95.982 41.8657 111.067 63.0449 121.326C84.2149 131.58 108.29 137.932 142.561 141.501C190.895 143.739 220.908 126.686 252.081 108.444C283.273 90.1918 315.617 70.7567 368.5 68.501L368.511 68.5H368.521C411.689 68.5001 435.808 86.2154 463.604 104.08C491.374 121.927 522.903 139.997 581.01 140.999C610.075 139.126 631.152 133.721 647.934 126.786C664.522 119.931 676.934 111.576 688.755 103.619L689.184 103.33C701.128 95.2902 712.526 87.6706 727.038 82.5225C741.559 77.3715 759.171 74.7022 783.559 76.502C806.981 78.2308 822.849 91.3467 841.583 106.902L841.824 107.103C860.516 122.624 882.174 140.608 917.174 152.524C936.924 158.603 951.181 159.212 972.021 159.212L972 122.212C909.608 112.69 880.204 87.3235 857.526 63.4219C834.847 39.5178 818.99 17.5876 783.491 14.999C733.627 12.0072 706.102 25.5847 679.523 41.0576C652.912 56.5496 627.195 73.9857 581.07 78.498L581.046 78.5H581.021C540.615 78.5 508.238 59.5143 475.622 40.2578L475.074 39.9345C442.607 20.7649 409.848 1.42323 368.506 0C319.163 0.00384499 288.537 18.2184 257.309 37.165L256.136 37.8764C225.265 56.611 193.573 75.8431 142.548 78.5L142.507 78.502L142.467 78.4971C108.426 74.7313 83.8051 68.5615 62.2061 57.4463Z" />
          </svg>
        )}
      </div>
    </div>
  );
}

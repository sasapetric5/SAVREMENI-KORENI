import React from 'react';

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-[#1A1512] rounded-2xl overflow-hidden border border-[#E8E0D5] dark:border-[#382C24] shadow-xs flex flex-col animate-pulse">
      {/* Image Skeleton */}
      <div className="aspect-3/4 bg-[#E8E0D5]/50 dark:bg-[#2A221C] relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent animate-[shimmer_1.8s_infinite]"></div>
      </div>

      {/* Info Skeleton */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          {/* Tag Skeleton */}
          <div className="flex gap-2">
            <div className="h-4 w-16 bg-[#E8E0D5]/60 dark:bg-[#2A221C] rounded"></div>
            <div className="h-4 w-20 bg-[#E8E0D5]/60 dark:bg-[#2A221C] rounded"></div>
          </div>

          {/* Title Skeleton */}
          <div className="h-5 w-3/4 bg-[#E8E0D5]/80 dark:bg-[#2A221C] rounded-md"></div>

          {/* Description Lines */}
          <div className="space-y-1.5 pt-1">
            <div className="h-3 w-full bg-[#E8E0D5]/50 dark:bg-[#2A221C] rounded"></div>
            <div className="h-3 w-5/6 bg-[#E8E0D5]/50 dark:bg-[#2A221C] rounded"></div>
          </div>
        </div>

        {/* Footer Skeleton */}
        <div className="pt-3.5 border-t border-[#E8E0D5] dark:border-[#382C24] flex items-center justify-between gap-3 bg-[#FAF7F2]/50 dark:bg-[#15110E]/50 -mx-5 -mb-5 px-5 py-3.5">
          <div className="space-y-1">
            <div className="h-2.5 w-10 bg-[#E8E0D5]/60 dark:bg-[#2A221C] rounded"></div>
            <div className="h-6 w-20 bg-[#9E3E26]/20 dark:bg-[#9E3E26]/30 rounded-md"></div>
          </div>
          <div className="flex gap-2">
            <div className="h-8 w-16 bg-[#E8E0D5]/60 dark:bg-[#2A221C] rounded-xl"></div>
            <div className="h-8 w-20 bg-[#9E3E26]/40 rounded-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const BlogCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-[#1A1512] rounded-2xl border border-[#E8E0D5] dark:border-[#382C24] overflow-hidden shadow-xs flex flex-col justify-between animate-pulse">
      <div className="space-y-4">
        {/* Cover Skeleton */}
        <div className="h-48 sm:h-52 bg-[#E8E0D5]/50 dark:bg-[#2A221C] relative overflow-hidden">
          <div className="absolute top-3 left-3 flex gap-2">
            <div className="h-5 w-20 bg-white/80 dark:bg-black/40 rounded-full"></div>
            <div className="h-5 w-14 bg-emerald-800/30 rounded-full"></div>
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="p-5 sm:p-6 space-y-3">
          <div className="flex justify-between">
            <div className="h-3 w-24 bg-[#E8E0D5]/60 dark:bg-[#2A221C] rounded"></div>
            <div className="h-3 w-16 bg-[#9E3E26]/20 rounded"></div>
          </div>

          <div className="h-6 w-5/6 bg-[#E8E0D5]/80 dark:bg-[#2A221C] rounded-md"></div>

          <div className="space-y-1.5 pt-1">
            <div className="h-3 w-full bg-[#E8E0D5]/50 dark:bg-[#2A221C] rounded"></div>
            <div className="h-3 w-4/5 bg-[#E8E0D5]/50 dark:bg-[#2A221C] rounded"></div>
            <div className="h-3 w-2/3 bg-[#E8E0D5]/50 dark:bg-[#2A221C] rounded"></div>
          </div>

          <div className="flex gap-1.5 pt-2">
            <div className="h-4 w-12 bg-[#FAF7F2] dark:bg-[#261F1A] border border-[#E8E0D5] dark:border-[#382C24] rounded"></div>
            <div className="h-4 w-16 bg-[#FAF7F2] dark:bg-[#261F1A] border border-[#E8E0D5] dark:border-[#382C24] rounded"></div>
          </div>
        </div>
      </div>

      <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-[#E8E0D5]/70 dark:border-[#382C24] flex items-center justify-between">
        <div className="h-3 w-24 bg-[#E8E0D5]/60 dark:bg-[#2A221C] rounded"></div>
        <div className="h-3 w-20 bg-[#9E3E26]/30 rounded"></div>
      </div>
    </div>
  );
};

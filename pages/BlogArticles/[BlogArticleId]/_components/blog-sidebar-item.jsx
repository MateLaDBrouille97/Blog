"use client";
import React from 'react';
import { CheckCircle, Lock, PlayCircle,CheckSquareIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import {cn} from "../../../../lib/utils"

// interface BlogArticleSidebarItemProps {
//   label: string;
//   id: string;
// //   isCompleted: boolean;
//   blogarticleId: string;
// //   isLocked: boolean;
// };

export default function BlogArticleSidebarItem  ({
  label,
  id,
  onSelectChapter,
  chapterBA,
//   isCompleted,
  blogarticleId,
//   isLocked,
}
// : BlogArticleSidebarItemProps
)  {
  const pathname = usePathname();
  const router = useRouter();

//   const Icon = isLocked ? Lock : (isCompleted ? CheckCircle : PlayCircle);
  const Icon =  CheckSquareIcon;
  const isActive = pathname?.includes(id);

  const onClick = () => {
    // Call the onSelectChapter callback with the selected chapter id
    onSelectChapter(chapterBA);
  }

  
  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20 ",
        isActive && "text-slate-700 bg-slate-200/20 hover:bg-slate-200/20 hover:text-slate-700",
        // isCompleted && "text-emerald-700 hover:text-emerald-700",
        // isCompleted && isActive && "bg-emerald-200/20",
      )}
    >
      <div className="flex justify-center items-center gap-x-4 py-4 text-lg sm:mt-50 sm:text-lg">
        <Icon
          size={22}
          className={cn(
            "text-slate-500 mx-4",
            isActive && "text-slate-700 mx-4",
            // isCompleted && "text-emerald-700"
          )}
        />
        {label}
      </div>
      <div className={cn(
        "ml-auto opacity-0 border-2 border-slate-700 h-full transition-all",
        isActive && "opacity-100",
        // isCompleted && "border-emerald-700"
      )} />
    </button>
  )
}
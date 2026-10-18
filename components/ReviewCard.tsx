import { memo } from "react";
import Image from "next/image";
import { Star1 } from "iconsax-react";
import { Review } from "@/lib/branchData";
import { toPersianDigits } from "@/lib/utils";

export const ReviewCard = memo(function ReviewCard({
  review,
  branchName,
}: {
  review: Review;
  branchName: string;
}) {
  return (
    <div className="w-77.5 sm:w-110 md:w-125 lg:w-135 xl:w-145 shrink-0 bg-white border border-neutral-200 rounded-xl p-5 sm:p-6 shadow-xs flex flex-col justify-between snap-start min-h-47.5">
      <div className="flex gap-3 sm:gap-4 items-start">
        <div className="flex flex-col items-center shrink-0 w-24 sm:w-28 text-center">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-neutral-100 border border-neutral-200 shadow-xs">
            <Image
              src={review.avatar}
              alt={review.name}
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>
          <h4 className="font-bold text-xs sm:text-sm text-tarkhineh-dark mt-2 line-clamp-1">
            {review.name}
          </h4>
          <span className="text-[11px] text-tarkhineh-muted mt-0.5 whitespace-nowrap">
            {review.date}
          </span>
        </div>

        <p className="flex-1 text-xs sm:text-sm text-tarkhineh-dark/80 leading-relaxed text-right pt-1.5 pr-1 sm:pr-2">
          {review.comment(branchName)}
        </p>
      </div>

      <div className="flex justify-end mt-4 pt-1">
        <div className="flex items-center gap-1 text-tarkhineh-dark">
          <span className="font-bold text-xs sm:text-sm">{toPersianDigits(review.rating)}</span>
          <Star1 size={16} color="#f59e0b" variant="Bold" className="text-amber-500" />
        </div>
      </div>
    </div>
  );
});

export default ReviewCard;

import { Suspense } from 'react';
import PopularPlans from '@/components/landing/PopularPlans';

export default function PlansPage() {
  return (
    <main className="min-h-[100dvh] bg-[#F2F4F6] pt-24 pb-20">
      <Suspense fallback={<div className="flex justify-center py-20 text-gray-500">요금제를 불러오는 중입니다...</div>}>
        {/* 재사용된 요금제 카드 리스트 */}
        <PopularPlans />
      </Suspense>
    </main>
  );
}

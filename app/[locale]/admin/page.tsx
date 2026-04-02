import prisma from '@/lib/prisma';
import AdminTable from './AdminTable';

export default async function AdminPage() {
  // DB에서 최신 순서대로 모든 지원 데이터 가져오기
  const applications = await prisma.application.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div style={{ paddingTop: '120px', minHeight: '100vh' }} className="bg-slate-50 pb-12 w-full flex justify-center">
      <div className="w-full max-w-[1600px] px-4 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">관리자 대시보드 (신청 내역)</h1>
          <p className="mt-2 text-sm text-slate-500">외국인 고객이 제출한 가입 신청 데이터 목록입니다.</p>
        </div>
        <div className="bg-white p-3 rounded-lg shadow-sm border border-slate-200">
          <span className="text-sm font-medium text-slate-500 mr-2">총 지원 건수:</span>
          <span className="text-lg font-bold text-blue-600">{applications.length}건</span>
        </div>
      </div>

      <AdminTable applications={applications} />
      </div>
    </div>
  );
}

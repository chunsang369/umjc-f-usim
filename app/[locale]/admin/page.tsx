import prisma from '@/lib/prisma';
import AdminTable from './AdminTable';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  let applications: any[] = [];
  let dbError = null;

  try {
    // DB에서 최신 순서대로 모든 지원 데이터 가져오기
    applications = await prisma.application.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch (error: any) {
    console.error('Database connection error on admin page:', error);
    dbError = error.message || '데이터베이스 연결에 실패했습니다.';
  }

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

      {dbError ? (
        <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-lg text-center">
          <h3 className="font-bold text-lg mb-2">데이터베이스 오류 발생 🚨</h3>
          <p className="mb-4">DB에서 데이터를 불러오지 못했습니다. Netlify 환경 변수(NETLIFY_DATABASE_URL)가 올바르게 설정되었는지 확인해 주세요.</p>
          <code className="bg-red-100 px-4 py-2 rounded block text-sm text-left overflow-x-auto">
            {dbError}
          </code>
        </div>
      ) : (
        <AdminTable applications={applications} />
      )}
      </div>
    </div>
  );
}

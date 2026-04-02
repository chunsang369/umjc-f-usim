'use client';

import { useState } from 'react';
import type { Application } from '@prisma/client';
import { deleteApplications } from './actions';
import { X, Download, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminTable({ applications }: { applications: Application[] }) {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedDetail, setSelectedDetail] = useState<Application | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(applications.map((app) => app.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!confirm(`선택한 ${selectedIds.length}개의 신청 건을 정말 삭제하시겠습니까?`)) return;

    setIsDeleting(true);
    const result = await deleteApplications(selectedIds);
    setIsDeleting(false);

    if (result.success) {
      setSelectedIds([]);
      router.refresh();
      alert('삭제되었습니다.');
    } else {
      alert(result.error);
    }
  };

  return (
    <>
      <div className="mb-4 flex justify-between items-center">
        <div className="text-sm text-slate-500">
          선택된 항목: <span className="font-bold text-blue-600">{selectedIds.length}</span>개
        </div>
        <button
          onClick={handleDelete}
          disabled={selectedIds.length === 0 || isDeleting}
          className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-md font-medium transition-colors"
        >
          <Trash2 size={16} />
          {isDeleting ? '삭제 중...' : '선택 항목 삭제'}
        </button>
      </div>

      <div className="bg-white shadow-md border border-slate-200">
        <div className="overflow-x-auto w-full">
          <table className="w-full max-w-[1500px] mx-auto border-collapse border border-slate-300 text-xs text-center bg-white">
            <thead className="bg-slate-100">
              <tr>
                <th className="border border-slate-300 px-2 py-3 w-10">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                    checked={selectedIds.length === applications.length && applications.length > 0}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="border border-slate-300 px-3 py-3 font-bold text-slate-700 whitespace-nowrap">번호 (ID)</th>
                <th className="border border-slate-300 px-3 py-3 font-bold text-slate-700 whitespace-nowrap">신청일시</th>
                <th className="border border-slate-300 px-3 py-3 font-bold text-slate-700 whitespace-nowrap">진행 상태</th>
                <th className="border border-slate-300 px-3 py-3 font-bold text-slate-700 whitespace-nowrap">이름 (영문)</th>
                <th className="border border-slate-300 px-3 py-3 font-bold text-slate-700 whitespace-nowrap">연락처</th>
                <th className="border border-slate-300 px-3 py-3 font-bold text-slate-700 whitespace-nowrap">구분 (인증/수령)</th>
                <th className="border border-slate-300 px-4 py-3 font-bold text-slate-700 min-w-[200px]">신청 요금제</th>
                <th className="border border-slate-300 px-3 py-3 font-bold text-slate-700 whitespace-nowrap">제출서류 현황</th>
                <th className="border border-slate-300 px-3 py-3 font-bold text-slate-700 whitespace-nowrap">상세정보</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {applications.length === 0 ? (
                <tr>
                  <td colSpan={10} className="border border-slate-300 px-6 py-12 text-center text-slate-500 text-base">
                    아직 접수된 신청 건이 없습니다.
                  </td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr
                    key={app.id}
                    onClick={() => setSelectedDetail(app)}
                    className="hover:bg-blue-50/50 transition-colors duration-150 cursor-pointer"
                  >
                    <td className="border border-slate-300 px-3 py-3" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                        checked={selectedIds.includes(app.id)}
                        onChange={() => handleSelectOne(app.id)}
                      />
                    </td>
                    <td className="border border-slate-300 px-3 py-3 text-slate-600 font-mono text-xs">
                      {app.id.slice(-6).toUpperCase()}
                    </td>
                    <td className="border border-slate-300 px-3 py-3 text-slate-700">
                      <div className="text-[11px]" suppressHydrationWarning>{new Date(app.createdAt).toLocaleDateString('ko-KR')}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5" suppressHydrationWarning>
                        {new Date(app.createdAt).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </td>
                    <td className="border border-slate-300 px-3 py-3 font-medium text-slate-800">
                      {app.status === 'pending' ? '접수 대기' : app.status}
                    </td>
                    <td className="border border-slate-300 px-3 py-3 font-bold text-slate-900 whitespace-nowrap">
                      {app.identityName}
                    </td>
                    <td className="border border-slate-300 px-3 py-3 text-slate-700 whitespace-nowrap">
                      {app.contactNumber || app.deliveryPhone || '-'}
                    </td>
                    <td className="border border-slate-300 px-3 py-3 text-[11px] whitespace-nowrap">
                      <div className="font-semibold text-slate-700">{app.verificationType === 'arc' ? '외국인등록증' : '여권'}</div>
                      <div className="text-slate-500 mt-1">{app.deliveryMethod === 'esim' ? 'eSIM 발급' : '택배 (USIM)'}</div>
                    </td>
                    <td className="border border-slate-300 px-4 py-3 text-left">
                      <div className="font-bold text-blue-700 leading-tight">{app.planName}</div>
                      <div className="text-[11px] text-slate-500 mt-1">{app.monthlyPrice}</div>
                    </td>
                    <td className="border border-slate-300 px-3 py-3">
                      <div className="flex flex-wrap items-center justify-center gap-1.5 relative" onClick={(e) => e.stopPropagation()}>
                        {app.arcFrontFile && (
                          <img src={app.arcFrontFile} alt="ARC" className="w-8 h-8 object-cover border border-slate-300 rounded shadow-sm hover:scale-110 transition-transform cursor-crosshair" title="등록증" />
                        )}
                        {app.mugshotFile && (
                          <img src={app.mugshotFile} alt="Mugshot" className="w-8 h-8 object-cover border border-slate-300 rounded shadow-sm hover:scale-110 transition-transform cursor-crosshair" title="머그샷" />
                        )}
                        {app.passportFile && (
                          <img src={app.passportFile} alt="Passport" className="w-8 h-8 object-cover border border-slate-300 rounded shadow-sm hover:scale-110 transition-transform cursor-crosshair" title="여권" />
                        )}
                        {app.entryProofFile && app.entryProofFile.startsWith('data:image') && (
                          <img src={app.entryProofFile} alt="Proof" className="w-8 h-8 object-cover border border-slate-300 rounded shadow-sm hover:scale-110 transition-transform cursor-crosshair" title="체류확인서" />
                        )}
                        {app.entryProofFile && !app.entryProofFile.startsWith('data:image') && (
                          <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded border border-blue-200">PDF</span>
                        )}
                      </div>
                    </td>
                    <td className="border border-slate-300 px-3 py-3">
                      <button
                        onClick={() => setSelectedDetail(app)}
                        className="text-xs px-3 py-1.5 border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-medium rounded transition-colors shadow-sm"
                      >
                        상세보기
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedDetail && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSelectedDetail(null)}
          />
          
          {/* Modal Content - flat clean design */}
          <div className="relative bg-white shadow-xl w-full max-w-5xl max-h-[90vh] flex flex-col border border-slate-300">
            {/* Close button */}
            <button
              onClick={() => setSelectedDetail(null)}
              className="absolute top-3 right-3 z-20 p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded transition-colors"
              title="닫기"
            >
              <X size={20} />
            </button>

            {/* Scrollable Content */}
            <div className="overflow-y-auto flex-1">
              <table className="w-full border-collapse text-sm">
                <colgroup>
                  <col style={{ width: '180px' }} />
                  <col />
                </colgroup>
                <tbody>
                  {/* ── 신청 정보 섹션 ── */}
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th colSpan={2} className="px-5 py-2.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                      신청 정보
                    </th>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <th className="bg-slate-100 border-r border-slate-200 px-5 py-3 text-center font-semibold text-slate-700 whitespace-nowrap">접수번호</th>
                    <td className="px-5 py-3 text-slate-900 font-mono font-bold">#{selectedDetail.id.slice(-6).toUpperCase()}</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <th className="bg-slate-100 border-r border-slate-200 px-5 py-3 text-center font-semibold text-slate-700 whitespace-nowrap">접수일시</th>
                    <td className="px-5 py-3 text-slate-900" suppressHydrationWarning>{new Date(selectedDetail.createdAt).toLocaleString('ko-KR')}</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <th className="bg-slate-100 border-r border-slate-200 px-5 py-3 text-center font-semibold text-slate-700 whitespace-nowrap">진행 상태</th>
                    <td className="px-5 py-3 text-slate-900 font-medium">{selectedDetail.status === 'pending' ? '접수 대기' : selectedDetail.status}</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <th className="bg-slate-100 border-r border-slate-200 px-5 py-3 text-center font-semibold text-slate-700 whitespace-nowrap">신청 요금제</th>
                    <td className="px-5 py-3 text-slate-900 font-bold">{selectedDetail.planName} <span className="text-blue-600 font-normal">({selectedDetail.monthlyPrice})</span></td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <th className="bg-slate-100 border-r border-slate-200 px-5 py-3 text-center font-semibold text-slate-700 whitespace-nowrap">개통 방식</th>
                    <td className="px-5 py-3 text-blue-700 font-medium">{selectedDetail.verificationType === 'arc' ? '외국인등록증 개통' : '여권 개통'}</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <th className="bg-slate-100 border-r border-slate-200 px-5 py-3 text-center font-semibold text-slate-700 whitespace-nowrap">수령 방법</th>
                    <td className="px-5 py-3 text-emerald-700 font-medium">{selectedDetail.deliveryMethod === 'esim' ? 'eSIM 발급' : '실물 USIM 택배'}</td>
                  </tr>

                  {/* ── 고객 정보 섹션 ── */}
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th colSpan={2} className="px-5 py-2.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                      고객 정보
                    </th>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <th className="bg-slate-100 border-r border-slate-200 px-5 py-3 text-center font-semibold text-slate-700 whitespace-nowrap">영문 성명</th>
                    <td className="px-5 py-3 text-slate-900 font-bold">{selectedDetail.identityName}</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <th className="bg-slate-100 border-r border-slate-200 px-5 py-3 text-center font-semibold text-slate-700 whitespace-nowrap">
                      {selectedDetail.verificationType === 'arc' ? '외국인등록번호' : '여권번호'}
                    </th>
                    <td className="px-5 py-3 text-slate-900 font-mono">{selectedDetail.identityNumber}</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <th className="bg-slate-100 border-r border-slate-200 px-5 py-3 text-center font-semibold text-slate-700 whitespace-nowrap">연락처</th>
                    <td className="px-5 py-3 text-slate-900">{selectedDetail.contactNumber || selectedDetail.deliveryPhone || '-'}</td>
                  </tr>
                  {selectedDetail.visaType && (
                    <tr className="border-b border-slate-200">
                      <th className="bg-slate-100 border-r border-slate-200 px-5 py-3 text-center font-semibold text-slate-700 whitespace-nowrap">체류자격 (Visa)</th>
                      <td className="px-5 py-3 text-slate-900">{selectedDetail.visaType}</td>
                    </tr>
                  )}

                  {/* ── 배송/디바이스 정보 섹션 ── */}
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th colSpan={2} className="px-5 py-2.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                      {selectedDetail.deliveryMethod === 'esim' ? '디바이스 정보' : '배송 정보'}
                    </th>
                  </tr>
                  {selectedDetail.deliveryMethod === 'esim' ? (
                    <>
                      <tr className="border-b border-slate-200">
                        <th className="bg-slate-100 border-r border-slate-200 px-5 py-3 text-center font-semibold text-slate-700 whitespace-nowrap">휴대폰 모델명</th>
                        <td className="px-5 py-3 text-slate-900 font-medium">{selectedDetail.phoneModel}</td>
                      </tr>
                      <tr className="border-b border-slate-200">
                        <th className="bg-slate-100 border-r border-slate-200 px-5 py-3 text-center font-semibold text-slate-700 whitespace-nowrap">EID</th>
                        <td className="px-5 py-3 text-slate-900 font-mono break-all">{selectedDetail.eid}</td>
                      </tr>
                      <tr className="border-b border-slate-200">
                        <th className="bg-slate-100 border-r border-slate-200 px-5 py-3 text-center font-semibold text-slate-700 whitespace-nowrap">IMEI 1</th>
                        <td className="px-5 py-3 text-slate-900 font-mono">{selectedDetail.imei1}</td>
                      </tr>
                      <tr className="border-b border-slate-200">
                        <th className="bg-slate-100 border-r border-slate-200 px-5 py-3 text-center font-semibold text-slate-700 whitespace-nowrap">IMEI 2</th>
                        <td className="px-5 py-3 text-slate-900 font-mono">{selectedDetail.imei2 || '-'}</td>
                      </tr>
                    </>
                  ) : (
                    <>
                      <tr className="border-b border-slate-200">
                        <th className="bg-slate-100 border-r border-slate-200 px-5 py-3 text-center font-semibold text-slate-700 whitespace-nowrap">수령인 연락처</th>
                        <td className="px-5 py-3 text-slate-900 font-medium">{selectedDetail.deliveryPhone || '-'}</td>
                      </tr>
                      <tr className="border-b border-slate-200">
                        <th className="bg-slate-100 border-r border-slate-200 px-5 py-3 text-center font-semibold text-slate-700 whitespace-nowrap">주소</th>
                        <td className="px-5 py-3 text-slate-900">{selectedDetail.deliveryAddress}</td>
                      </tr>
                    </>
                  )}

                  {/* ── 제출 서류 섹션 ── */}
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th colSpan={2} className="px-5 py-2.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                      제출 서류
                    </th>
                  </tr>
                  {selectedDetail.arcFrontFile && (
                    <tr className="border-b border-slate-200">
                      <th className="bg-slate-100 border-r border-slate-200 px-5 py-3 text-center font-semibold text-slate-700 whitespace-nowrap align-top">외국인등록증 앞면</th>
                      <td className="px-5 py-3">
                        <div className="flex items-start gap-4">
                          <img src={selectedDetail.arcFrontFile} alt="ARC" className="max-h-48 max-w-[300px] object-contain border border-slate-200 rounded" />
                          <a href={selectedDetail.arcFrontFile} download={`arc_${selectedDetail.identityNumber}.png`} className="flex items-center gap-1 text-xs bg-white border border-slate-300 text-slate-600 px-3 py-1.5 rounded hover:bg-slate-50 transition-colors font-medium whitespace-nowrap shrink-0">
                            <Download size={12} /> 다운로드
                          </a>
                        </div>
                      </td>
                    </tr>
                  )}
                  {selectedDetail.mugshotFile && (
                    <tr className="border-b border-slate-200">
                      <th className="bg-slate-100 border-r border-slate-200 px-5 py-3 text-center font-semibold text-slate-700 whitespace-nowrap align-top">얼굴+등록증 (머그샷)</th>
                      <td className="px-5 py-3">
                        <div className="flex items-start gap-4">
                          <img src={selectedDetail.mugshotFile} alt="Mugshot" className="max-h-48 max-w-[300px] object-contain border border-slate-200 rounded" />
                          <a href={selectedDetail.mugshotFile} download={`mugshot_${selectedDetail.identityNumber}.png`} className="flex items-center gap-1 text-xs bg-white border border-slate-300 text-slate-600 px-3 py-1.5 rounded hover:bg-slate-50 transition-colors font-medium whitespace-nowrap shrink-0">
                            <Download size={12} /> 다운로드
                          </a>
                        </div>
                      </td>
                    </tr>
                  )}
                  {selectedDetail.passportFile && (
                    <tr className="border-b border-slate-200">
                      <th className="bg-slate-100 border-r border-slate-200 px-5 py-3 text-center font-semibold text-slate-700 whitespace-nowrap align-top">여권 사본</th>
                      <td className="px-5 py-3">
                        <div className="flex items-start gap-4">
                          <img src={selectedDetail.passportFile} alt="Passport" className="max-h-48 max-w-[300px] object-contain border border-slate-200 rounded" />
                          <a href={selectedDetail.passportFile} download={`passport_${selectedDetail.identityNumber}.png`} className="flex items-center gap-1 text-xs bg-white border border-slate-300 text-slate-600 px-3 py-1.5 rounded hover:bg-slate-50 transition-colors font-medium whitespace-nowrap shrink-0">
                            <Download size={12} /> 다운로드
                          </a>
                        </div>
                      </td>
                    </tr>
                  )}
                  {selectedDetail.entryProofFile && (
                    <tr className="border-b border-slate-200">
                      <th className="bg-slate-100 border-r border-slate-200 px-5 py-3 text-center font-semibold text-slate-700 whitespace-nowrap align-top">체류기간확인서</th>
                      <td className="px-5 py-3">
                        <div className="flex items-start gap-4">
                          {selectedDetail.entryProofFile.startsWith('data:image') ? (
                            <img src={selectedDetail.entryProofFile} alt="Proof" className="max-h-48 max-w-[300px] object-contain border border-slate-200 rounded" />
                          ) : (
                            <span className="text-sm text-slate-500 font-medium">PDF 파일</span>
                          )}
                          <a href={selectedDetail.entryProofFile} download={`proof_${selectedDetail.identityNumber}.${selectedDetail.entryProofFile.startsWith('data:image') ? 'png' : 'pdf'}`} className="flex items-center gap-1 text-xs bg-white border border-slate-300 text-slate-600 px-3 py-1.5 rounded hover:bg-slate-50 transition-colors font-medium whitespace-nowrap shrink-0">
                            <Download size={12} /> 다운로드
                          </a>
                        </div>
                      </td>
                    </tr>
                  )}
                  {!selectedDetail.arcFrontFile && !selectedDetail.mugshotFile && !selectedDetail.passportFile && !selectedDetail.entryProofFile && (
                    <tr className="border-b border-slate-200">
                      <th className="bg-slate-100 border-r border-slate-200 px-5 py-3 text-center font-semibold text-slate-700">서류</th>
                      <td className="px-5 py-6 text-center text-slate-400 font-medium">등록된 서류가 없습니다.</td>
                    </tr>
                  )}

                  {/* ── 등록일자 ── */}
                  <tr>
                    <th className="bg-slate-100 border-r border-slate-200 px-5 py-3 text-center font-semibold text-red-600 whitespace-nowrap">등록일자</th>
                    <td className="px-5 py-3 text-red-600 font-medium" suppressHydrationWarning>{new Date(selectedDetail.createdAt).toLocaleString('ko-KR')}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="bg-white border-t border-slate-300 px-5 py-3 shrink-0 flex justify-end">
              <button
                onClick={() => setSelectedDetail(null)}
                className="px-6 py-2 bg-slate-700 text-white text-sm font-semibold hover:bg-slate-800 transition-colors"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

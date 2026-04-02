'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export type ApplicationData = {
  planId: string;
  planName: string;
  monthlyPrice: string;
  verificationType: 'arc' | 'passport';
  identityName: string;
  identityNumber: string;
  visaType?: string;
  contactNumber?: string;
  deliveryMethod: 'esim' | 'physical';
  phoneModel?: string;
  imei1?: string;
  imei2?: string;
  eid?: string;
  deliveryAddress?: string;
  deliveryPhone?: string;
  arcFrontFile?: string;
  mugshotFile?: string;
  passportFile?: string;
  entryProofFile?: string;
};

export async function submitApplication(data: ApplicationData) {
  try {
    const application = await prisma.application.create({
      data: {
        planId: data.planId,
        planName: data.planName,
        monthlyPrice: data.monthlyPrice,
        verificationType: data.verificationType,
        identityName: data.identityName,
        identityNumber: data.identityNumber,
        visaType: data.visaType || null,
        contactNumber: data.contactNumber || null,
        deliveryMethod: data.deliveryMethod,
        phoneModel: data.phoneModel || null,
        imei1: data.imei1 || null,
        imei2: data.imei2 || null,
        eid: data.eid || null,
        deliveryAddress: data.deliveryAddress || null,
        deliveryPhone: data.deliveryPhone || null,
        arcFrontFile: data.arcFrontFile || null,
        mugshotFile: data.mugshotFile || null,
        passportFile: data.passportFile || null,
        entryProofFile: data.entryProofFile || null,
        status: 'pending',
      },
    });

    // 신청 후 관련 경로 캐시 갱신 (필요 시)
    // revalidatePath('/[locale]/apply', 'page');

    return { success: true, applicationId: application.id };
  } catch (error) {
    console.error('Failed to submit application:', error);
    return { success: false, error: '데이터 저장 중 오류가 발생했습니다.' };
  }
}

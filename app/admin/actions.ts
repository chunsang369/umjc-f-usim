'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function deleteApplications(ids: string[]) {
  try {
    await prisma.application.deleteMany({
      where: {
        id: { in: ids },
      },
    });
    // 모든 locale에 대해 갱신을 보장하려면 layout이나 전체 페이지를 갱신할 수 있도록 라우트를 지정합니다.
    revalidatePath('/', 'layout');
    return { success: true };
  } catch (error) {
    console.error('Delete error:', error);
    return { success: false, error: '삭제 중 오류가 발생했습니다.' };
  }
}

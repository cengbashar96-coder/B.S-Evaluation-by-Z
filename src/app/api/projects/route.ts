import { NextResponse } from 'next/server';
export const runtime = 'edge';

// هذا الكود هو المسؤول عن جلب "قائمة" كل المشاريع الهندسية المسجلة
export async function GET() {
  // ملاحظة للمستقبل: هنا سنقوم بجلب مصفوفة (Array) تحتوي على كل المشاريع من قاعدة البيانات
  const mockProjects = [
    { id: '1', name: 'مشروع بناء سكني - طابق أول', date: '2026-04-27' },
    { id: '2', name: 'تقييم فيلا سكنية - ريف دمشق', date: '2026-04-25' }
  ];

  return NextResponse.json({ 
    status: "success",
    message: "تم جلب قائمة المشاريع بنجاح",
    count: mockProjects.length,
    projects: mockProjects
  });
}

// كود لإضافة مشروع جديد للقائمة
export async function POST(request: Request) {
  const data = await request.json();
  return NextResponse.json({ 
    status: "success", 
    message: "تم البدء في إنشاء مشروع جديد",
    receivedData: data 
  });
}
